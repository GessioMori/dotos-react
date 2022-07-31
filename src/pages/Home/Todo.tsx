import dayjs from 'dayjs'
import { CheckCircle, TrashSimple } from 'phosphor-react'
import { useState } from 'react'
import {
  TodoActionButton,
  TodoButtonsContainer,
  TodoDetails,
  TodoStatus,
} from './Home.styles'

interface TodoProps {
  is_completed: boolean
  content: string
  due_to: string | null
  created_at: string
}

export function Todo({ content, created_at, due_to, is_completed }: TodoProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  function toggleExpanded() {
    setIsExpanded((current) => !current)
  }

  function defineStatus() {
    if (is_completed) {
      return 'green'
    } else if (due_to && dayjs().isAfter(dayjs(due_to))) {
      return 'red'
    } else {
      return 'yellow'
    }
  }

  return (
    <>
      <tr>
        <td onClick={toggleExpanded}>
          <TodoStatus variant={defineStatus()}></TodoStatus>
        </td>
        <td onClick={toggleExpanded}>{content}</td>
        <td>
          <TodoButtonsContainer>
            <TodoActionButton variant="green">
              <CheckCircle weight="bold" />
            </TodoActionButton>
            <TodoActionButton variant="red">
              <TrashSimple weight="bold" />
            </TodoActionButton>
          </TodoButtonsContainer>
        </td>
      </tr>
      {isExpanded && (
        <tr>
          <TodoDetails colSpan={3}>
            {due_to && (
              <p>
                <strong>Due to:</strong>{' '}
                {dayjs(due_to).format('DD/MM/YYYY - HH:mm')}
              </p>
            )}

            <p>
              <strong>Created at: </strong>
              {dayjs(created_at).format('DD/MM/YYYY - HH:mm')}
            </p>
          </TodoDetails>
        </tr>
      )}
    </>
  )
}
