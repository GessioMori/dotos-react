import dayjs from 'dayjs'
import { Calendar, Clock, NotePencil } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { todoMock } from '../../assets/todoMock'
import { ButtonContainer } from '../../components/Button.styles'
import { InputContainer } from '../../components/Input.styles'
import { MainContainer } from '../../components/MainContainer.styles'
import {
  CreateTodoContainer,
  DueToButtonContainer,
  DueToContainer,
  FilterContainer,
  FilterDateContainer,
  IconInputContainer,
  TodosContainer,
} from './Home.styles'
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
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const [startDate, setStartDate] = useState<string>(
    dayjs().startOf('month').format('YYYY-MM-DD'),
  )
  const [endDate, setEndDate] = useState<string>(
    dayjs().endOf('month').format('YYYY-MM-DD'),
  )

  function handleDateInputChange(
    value: string,
    type: 'newDate' | 'newTime' | 'newStartDate' | 'newEndDate',
  ) {
    if (type === 'newDate') {
      setDate(() => value)
    } else if (type === 'newTime') {
      setTime(() => value)
    } else if (type === 'newStartDate') {
      setStartDate(() => value)
    } else if (type === 'newEndDate') {
      setEndDate(() => value)
    }
  }
  function send() {
    time
      ? console.log(dayjs(date + time).toISOString())
      : console.log(dayjs(date + '23:59:59').toISOString())
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
      <CreateTodoContainer>
        <IconInputContainer>
          <NotePencil size={24} weight="bold" />
          <InputContainer type="text" placeholder="Type your new todo here." />
        </IconInputContainer>
        <DueToButtonContainer>
          <DueToContainer>
            <IconInputContainer>
              <Calendar size={24} weight="bold" />
              <InputContainer
                min={dayjs().format('YYYY-MM-DD')}
                type="date"
                value={date}
                onChange={(e) =>
                  handleDateInputChange(e.target.value, 'newDate')
                }
                maxWidth="10rem"
              />
            </IconInputContainer>
            <IconInputContainer>
              <Clock size={24} weight="bold" />
              <InputContainer
                type="time"
                value={time}
                onChange={(e) =>
                  handleDateInputChange(e.target.value, 'newTime')
                }
                maxWidth="8rem"
              />
            </IconInputContainer>
          </DueToContainer>
          <ButtonContainer onClick={send} maxWidth="5rem">
            Send
          </ButtonContainer>
        </DueToButtonContainer>
      </CreateTodoContainer>
      <FilterContainer>
        <FilterDateContainer>
          <p>Start:</p>
          <InputContainer
            type="date"
            max={dayjs(endDate).format('YYYY-MM-DD')}
            value={startDate}
            onChange={(e) =>
              handleDateInputChange(e.target.value, 'newStartDate')
            }
            maxWidth="10rem"
          />
        </FilterDateContainer>
        <FilterDateContainer>
          <p>End:</p>
          <InputContainer
            type="date"
            min={dayjs(startDate).format('YYYY-MM-DD')}
            value={endDate}
            onChange={(e) =>
              handleDateInputChange(e.target.value, 'newEndDate')
            }
            maxWidth="10rem"
          />
        </FilterDateContainer>
      </FilterContainer>
      <TodosContainer>
        <PaginatedItems itemsPerPage={8} todosList={todos} />
      </TodosContainer>
    </MainContainer>
  )
}
