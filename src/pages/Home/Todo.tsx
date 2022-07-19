import { CheckCircle, TrashSimple } from 'phosphor-react'
import { useState } from 'react'
import { TodoActionButton, TodoButtonsContainer } from './Home.styles'

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

  return (
    <>
      <tr>
        <td onClick={toggleExpanded}>{content}</td>
        <td onClick={toggleExpanded}>{is_completed.toString()}</td>
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
        <td colSpan={3} style={{ width: '100%', backgroundColor: 'red' }}>
          teste
        </td>
      )}
    </>
  )
}
