import { ITodo } from '../../../contexts/TodoContext'
import { Todo } from '../Todo'

export function Items({ currentItems }: { currentItems: ITodo[] | null }) {
  return (
    <table>
      <tbody>
        {currentItems &&
          currentItems.map((todo) => <Todo key={todo.id} {...todo} />)}
      </tbody>
    </table>
  )
}
