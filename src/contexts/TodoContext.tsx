import dayjs from 'dayjs'
import { ReactNode, useCallback, useState } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../libs/axios'

export interface ITodo {
  id: string
  is_completed: boolean
  content: string
  due_to: string | null
  created_at: string
}

interface ITodoContext {
  handleFetchTodos: (todosList: ITodo[]) => void
  handleTodoStatusChange: (id: string, status: boolean) => void
  handleTodoDelete: (id: string) => void
  handleTodoCreation: (data: ITodo) => void
  handleDateChange: (value: string, type: 'newStartDate' | 'newEndDate') => void
  sortTodos: (todosList: ITodo[]) => ITodo[]
  filterTodosByDate: (todosList: ITodo[]) => ITodo[]
  endDate: string
  startDate: string
  todos: ITodo[]
}

export const TodosContext = createContext({} as ITodoContext)

interface TransactionsProviderProps {
  children: ReactNode
}

export function TodosContextProvider({ children }: TransactionsProviderProps) {
  const [todos, setTodos] = useState<ITodo[]>([])

  const [startDate, setStartDate] = useState<string>(
    dayjs().startOf('month').format('YYYY-MM-DD'),
  )
  const [endDate, setEndDate] = useState<string>(
    dayjs().endOf('month').format('YYYY-MM-DD'),
  )

  const sortTodosByCreationDate = useCallback((todosList: ITodo[]) => {
    return todosList.sort(
      (a, b) => dayjs(b.created_at).valueOf() - dayjs(a.created_at).valueOf(),
    )
  }, [])

  const sortTodos = useCallback(
    (todosList: ITodo[]) => {
      const completedTodos = sortTodosByCreationDate(
        todosList.filter((todo) => todo.is_completed),
      )
      const delayedTodos = sortTodosByCreationDate(
        todosList.filter(
          (todo) =>
            !todo.is_completed &&
            todo.due_to &&
            dayjs().isAfter(dayjs(todo.due_to)),
        ),
      )
      const incompleteTodos = sortTodosByCreationDate(
        todosList.filter(
          (todo) =>
            !todo.is_completed &&
            (dayjs().isBefore(dayjs(todo.due_to)) || !todo.due_to),
        ),
      )
      return [...delayedTodos, ...incompleteTodos, ...completedTodos]
    },
    [sortTodosByCreationDate],
  )

  const filterTodosByDate = useCallback(
    (todosList: ITodo[]) => {
      return todosList.filter(
        (todo) =>
          dayjs(todo.created_at).isAfter(startDate) &&
          dayjs(todo.created_at).isBefore(endDate + '23:59:59'),
      )
    },
    [endDate, startDate],
  )

  const handleFetchTodos = useCallback(
    (todosList: ITodo[]) => {
      setTodos(() => sortTodos(filterTodosByDate(todosList)))
    },
    [sortTodos, filterTodosByDate],
  )

  const handleDateChange = useCallback(
    (value: string, type: 'newStartDate' | 'newEndDate') => {
      if (type === 'newStartDate') {
        setStartDate(() => value)
      } else if (type === 'newEndDate') {
        setEndDate(() => value)
      }
    },
    [],
  )

  const handleTodoCreation = useCallback(
    ({ id, is_completed, content, due_to, created_at }: ITodo) => {
      setTodos((current) =>
        sortTodos(
          filterTodosByDate([
            ...current,
            { id, is_completed, content, due_to, created_at },
          ]),
        ),
      )
    },
    [filterTodosByDate, sortTodos],
  )

  const handleTodoStatusChange = useCallback(
    async (id: string, status: boolean) => {
      await api
        .patch(`/todos/${id}`, { is_completed: status })
        .then((response) => {
          setTodos((current) => {
            return sortTodos(
              filterTodosByDate(
                current.map((todo) => {
                  if (todo.id === response.data.id) {
                    return response.data
                  }
                  return todo
                }),
              ),
            )
          })
        })
    },
    [filterTodosByDate, sortTodos],
  )

  const handleTodoDelete = useCallback(
    async (id: string) => {
      await api.delete(`/todos/${id}`).then(() => {
        setTodos((current) => {
          return sortTodos(
            filterTodosByDate(current.filter((todo) => todo.id !== id)),
          )
        })
      })
    },
    [sortTodos, filterTodosByDate],
  )

  return (
    <TodosContext.Provider
      value={{
        handleFetchTodos,
        handleTodoDelete,
        handleTodoStatusChange,
        handleDateChange,
        handleTodoCreation,
        sortTodos,
        filterTodosByDate,
        todos,
        endDate,
        startDate,
      }}
    >
      {children}
    </TodosContext.Provider>
  )
}
