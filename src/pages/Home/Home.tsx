import { useState } from 'react'
import { todoMock } from '../../assets/todoMock'
import { MainContainer } from '../../components/MainContainer.styles'
import {
  CreateTodoContainer,
  CustomDateTimePicker,
  TodosContainer,
} from './Home.styles'
import { Todo } from './Todo'

export function Home() {
  const [dateTime, setDateTime] = useState<undefined | Date>(undefined)

  function handleDateTimeChange(newDateTime: Date) {
    setDateTime(newDateTime)
  }
  return (
    <MainContainer>
      <CreateTodoContainer>
        <CustomDateTimePicker
          minDate={new Date()}
          value={dateTime}
          onChange={handleDateTimeChange}
        />
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
