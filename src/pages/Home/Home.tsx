import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
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
  TodosContainer,
} from './Home.styles'
import { Todo } from './Todo'

interface ITodo {
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

  function sortTodosByCreationDate(todosList: ITodo[]) {
    return todosList.sort(
      (a, b) => dayjs(b.created_at).valueOf() - dayjs(a.created_at).valueOf(),
    )
  }

  useEffect(() => {
    sortTodos(filterTodosByDate(todoMock))
  }, [startDate, endDate])

  return (
    <MainContainer>
      <CreateTodoContainer>
        <InputContainer type="text" placeholder="Type your new todo here." />
        <DueToButtonContainer>
          <DueToContainer>
            <InputContainer
              min={dayjs().format('YYYY-MM-DD')}
              type="date"
              value={date}
              onChange={(e) => handleDateInputChange(e.target.value, 'newDate')}
              maxWidth="10rem"
            />
            <InputContainer
              type="time"
              value={time}
              onChange={(e) => handleDateInputChange(e.target.value, 'newTime')}
              maxWidth="8rem"
            />
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

function PaginatedItems({
  itemsPerPage,
  todosList,
}: {
  itemsPerPage: number
  todosList: ITodo[]
}) {
  const [currentItems, setCurrentItems] = useState<ITodo[] | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage
    setCurrentItems(todosList.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(todosList.length / itemsPerPage))
  }, [itemOffset, itemsPerPage, todosList])

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % todosList.length
    setItemOffset(newOffset)
  }

  return (
    <>
      {currentItems?.length !== 0 && (
        <>
          <Items currentItems={currentItems} />
          <ReactPaginate
            breakLabel="..."
            nextLabel="ᐅ"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            marginPagesDisplayed={0}
            pageCount={pageCount}
            previousLabel="ᐊ"
            disabledClassName="disabled"
            activeClassName="active"
          />
        </>
      )}
    </>
  )
}

function Items({ currentItems }: { currentItems: ITodo[] | null }) {
  return (
    <table>
      <tbody>
        {currentItems &&
          currentItems.map((todo) => <Todo key={todo.id} {...todo} />)}
      </tbody>
    </table>
  )
}
