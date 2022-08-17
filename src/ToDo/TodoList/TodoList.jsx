import TodoItem from "../TodoItem/Todoitem";
import './style.scss'

const TodoList = ({todos, setTodos, chengeIsCheck, }) => {
  return (
    <ul>
    { todos.map((todo, index, _id) => {
    return (
    <TodoItem todo={todo}
  key={todo._id}
  index={index}
  setTodos={setTodos}
  todos={todos}
  onChange={chengeIsCheck}
  />  
  )})}
  </ul>
  )
}

export default TodoList