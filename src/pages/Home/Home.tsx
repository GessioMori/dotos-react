import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { todoMock } from '../../assets/todoMock'
import { MainContainer } from '../../components/MainContainer.styles'
import { CreateTodo } from './CreateTodo'
import { FilterTodos } from './FilterTodos'
import { TodosContainer } from './Home.styles'
import { PaginatedItems } from './PaginatedItems'

export interface ITodo {
  id: string
  is_completed: boolean
  content: string
  due_to: string | null
  created_at: string
}

export function Home() {
  const [todos, setTodos] = useState<ITodo[]>([])

  const [startDate, setStartDate] = useState<string>(
    dayjs().startOf('month').format('YYYY-MM-DD'),
  )
  const [endDate, setEndDate] = useState<string>(
    dayjs().endOf('month').format('YYYY-MM-DD'),
  )

  function handleDateChange(
    value: string,
    type: 'newStartDate' | 'newEndDate',
  ) {
    if (type === 'newStartDate') {
      setStartDate(() => value)
    } else if (type === 'newEndDate') {
      setEndDate(() => value)
    }
  }

  function sortTodosByCreationDate(todosList: ITodo[]) {
    return todosList.sort(
      (a, b) => dayjs(b.created_at).valueOf() - dayjs(a.created_at).valueOf(),
    )
  }

  useEffect(() => {
    function filterTodosByDate(todosList: ITodo[]) {
      return todosList.filter(
        (todo) =>
          dayjs(todo.created_at).isAfter(startDate) &&
          dayjs(todo.created_at).isBefore(endDate + '23:59:59'),
      )
    }

    function sortTodos(todosList: ITodo[]) {
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
      setTodos(() => [...delayedTodos, ...incompleteTodos, ...completedTodos])
    }
    sortTodos(filterTodosByDate(todoMock))
  }, [startDate, endDate])

  return (
    <MainContainer>
      <CreateTodo />
      <FilterTodos
        endDate={endDate}
        startDate={startDate}
        handleDateChange={handleDateChange}
      />
      <TodosContainer>
        <PaginatedItems itemsPerPage={8} todosList={todos} />
      </TodosContainer>
    </MainContainer>
  )
}
