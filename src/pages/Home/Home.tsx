import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { todoMock } from '../../assets/todoMock'
import { ButtonContainer } from '../../components/Button.styles'
import { InputContainer } from '../../components/Input.styles'
import { MainContainer } from '../../components/MainContainer.styles'
import {
  Checkbox,
  CreateTodoContainer,
  DueToButtonContainer,
  DueToContainer,
  FilterAndSortContainer,
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

  const [filter, setFilter] = useState<'created_at' | 'due_to' | null>(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  function handleDateChange(newDate: string) {
    setDate(newDate)
  }
  function handleTimeChange(newTime: string) {
    setTime(newTime)
  }
  function send() {
    time
      ? console.log(dayjs(date + time).toISOString())
      : console.log(dayjs(date + '23:59:59').toISOString())
  }
  function handleSetFilter(filterType: typeof filter) {
    setFilter((current) => (current === filterType ? null : filterType))
  }
  function sortTodos(todosList: ITodo[]) {
    const completedTodos = todosList.filter((todo) => todo.is_completed)
    const delayedTodos = todosList.filter(
      (todo) =>
        !todo.is_completed &&
        todo.due_to &&
        dayjs().isAfter(dayjs(todo.due_to)),
    )
    const incompletedTodos = todosList.filter(
      (todo) => !todo.is_completed && dayjs().isBefore(dayjs(todo.due_to)),
    )
    setTodos(() => [...delayedTodos, ...incompletedTodos, ...completedTodos])
  }

  useEffect(() => {
    sortTodos(todoMock)
  }, [])

  return (
    <MainContainer>
      <CreateTodoContainer>
        <InputContainer type="text" placeholder="Type your new todo here." />
        <DueToButtonContainer>
          <DueToContainer>
            <InputContainer
              min={dayjs(new Date()).format('YYYY-MM-DD')}
              type="date"
              value={date}
              onChange={(e) => handleDateChange(e.target.value)}
              maxWidth="10rem"
            />
            <InputContainer
              type="time"
              value={time}
              onChange={(e) => handleTimeChange(e.target.value)}
              maxWidth="8rem"
            />
          </DueToContainer>
          <ButtonContainer onClick={send} maxWidth="5rem">
            Send
          </ButtonContainer>
        </DueToButtonContainer>
      </CreateTodoContainer>
      <FilterAndSortContainer>
        <Checkbox
          checked={filter === 'created_at'}
          onClick={() => handleSetFilter('created_at')}
        />
        <Checkbox
          checked={filter === 'due_to'}
          onClick={() => handleSetFilter('due_to')}
        />
      </FilterAndSortContainer>
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
