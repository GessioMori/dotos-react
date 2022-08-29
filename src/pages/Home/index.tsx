import { useEffect } from 'react'
import { useContextSelector } from 'use-context-selector'
import { MainContainer } from '../../components/MainContainer.styles'
import { TodosContext } from '../../contexts/TodoContext'
import { api } from '../../libs/axios'
import { CreateTodo } from './CreateTodo'
import { FilterTodos } from './FilterTodos'
import { PaginatedItems } from './PaginatedItems'
import { TodosContainer } from './styles'

export function Home() {
  const { handleFetchTodos, startDate, endDate } = useContextSelector(
    TodosContext,
    (context) => {
      return {
        handleFetchTodos: context.handleFetchTodos,
        startDate: context.startDate,
        endDate: context.endDate,
      }
    },
  )

  useEffect(() => {
    async function fetchTodos(startDate: string, endDate: string) {
      await api
        .post('/todos/interval', {
          begin: startDate,
          end: endDate,
        })
        .then((response) => handleFetchTodos(response.data))
    }
    fetchTodos(startDate, endDate)
  }, [startDate, endDate, handleFetchTodos])

  return (
    <MainContainer>
      <CreateTodo />
      <FilterTodos />
      <TodosContainer>
        <PaginatedItems itemsPerPage={8} />
      </TodosContainer>
    </MainContainer>
  )
}
