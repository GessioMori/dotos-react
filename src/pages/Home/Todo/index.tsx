import dayjs from 'dayjs'
import { CheckCircle, TrashSimple, XCircle } from 'phosphor-react'
import { useState } from 'react'
import { useContextSelector } from 'use-context-selector'
import { TodosContext } from '../../../contexts/TodoContext'
import {
  TodoActionButton,
  TodoButtonsContainer,
  TodoDetails,
  TodoStatus,
} from './styles'

interface TodoProps {
  id: string
  is_completed: boolean
  content: string
  due_to: string | null
  created_at: string
}

export function Todo({
  id,
  content,
  created_at,
  due_to,
  is_completed,
}: TodoProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const handleTodoDelete = useContextSelector(
    TodosContext,
    (context) => context.handleTodoDelete,
  )
  const handleTodoStatusChange = useContextSelector(
    TodosContext,
    (context) => context.handleTodoStatusChange,
  )

  function toggleExpanded() {
    setIsExpanded((current) => !current)
  }

  function defineStatus() {
    if (is_completed) {
      return 'completed'
    } else if (due_to && dayjs().isAfter(dayjs(due_to))) {
      return 'delayed'
    } else {
      return 'ongoing'
    }
  }

  function defineStatusColor() {
    if (defineStatus() === 'completed') {
      return 'green'
    } else if (defineStatus() === 'delayed') {
      return 'red'
    } else {
      return 'yellow'
    }
  }

  return (
    <>
      <tr>
        <td onClick={toggleExpanded}>
          <TodoStatus variant={defineStatusColor()}></TodoStatus>
        </td>
        <td onClick={toggleExpanded}>{content}</td>
        <td>
          <TodoButtonsContainer>
            <TodoActionButton
              variant={defineStatusColor() === 'green' ? 'yellow' : 'green'}
              onClick={() => handleTodoStatusChange(id, !is_completed)}
            >
              {defineStatusColor() === 'green' ? (
                <XCircle weight="bold" />
              ) : (
                <CheckCircle weight="bold" />
              )}
            </TodoActionButton>
            <TodoActionButton
              variant="red"
              onClick={() => handleTodoDelete(id)}
            >
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
