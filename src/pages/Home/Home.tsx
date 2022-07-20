import { todoMock } from '../../assets/todoMock'
import { MainContainer } from '../../components/MainContainer.styles'
import { TodosContainer } from './Home.styles'
import { Todo } from './Todo'

export function Home() {
  return (
    <MainContainer>
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
