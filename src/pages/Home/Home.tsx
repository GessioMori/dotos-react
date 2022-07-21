import dayjs from 'dayjs'
import { useState } from 'react'
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
        <InputContainer type="text" placeholder="Type your todo here." />
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
        <table>
          <tbody>
            {todoMock.map((todo) => (
              <Todo key={todo.id} {...todo} />
            ))}
          </tbody>
        </table>
      </TodosContainer>
    </MainContainer>
  )
}
