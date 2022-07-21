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
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

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
  return (
    <MainContainer>
      <CreateTodoContainer>
        <InputContainer type="text" placeholder="Type your new todo here." />
        <DueToButtonContainer>
          <DueToContainer>
            <InputContainer
              min={dayjs(new Date()).format('YYYY-MM-DD')}
              placeholder={'DD/MM/YYYY'}
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
      <TodosContainer>
        <PaginatedItems itemsPerPage={8} />
      </TodosContainer>
    </MainContainer>
  )
}

function PaginatedItems({ itemsPerPage }: { itemsPerPage: number }) {
  const [currentItems, setCurrentItems] = useState<ITodo[] | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage
    setCurrentItems(todoMock.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(todoMock.length / itemsPerPage))
  }, [itemOffset, itemsPerPage])

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % todoMock.length
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
