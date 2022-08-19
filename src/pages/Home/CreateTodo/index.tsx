import dayjs from 'dayjs'
import { Calendar, Clock, NotePencil } from 'phosphor-react'
import { useState } from 'react'
import { ButtonContainer } from '../../../components/Button.styles'
import { InputContainer } from '../../../components/Input.styles'
import {
  CreateTodoContainer,
  DueToButtonContainer,
  DueToContainer,
  IconInputContainer,
} from './styles'

export function CreateTodo() {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  function handleDateTimeInputChange(
    value: string,
    type: 'newDate' | 'newTime',
  ) {
    if (type === 'newDate') {
      setDate(() => value)
    } else if (type === 'newTime') {
      setTime(() => value)
    }
  }
  function send() {
    time
      ? console.log(dayjs(date + time).toISOString())
      : console.log(dayjs(date + '23:59:59').toISOString())
  }

  return (
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
                handleDateTimeInputChange(e.target.value, 'newDate')
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
                handleDateTimeInputChange(e.target.value, 'newTime')
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
  )
}
