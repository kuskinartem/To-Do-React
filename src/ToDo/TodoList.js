import Todoitem from "./Todoitem";

const styles = {
  ul: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  }
}

const TodoList = (props) => {
  return (
    <ul style={styles.ul}>
    { props.todos.map((todo, index, _id) => {
    return (
    <Todoitem todo={todo}
  key={todo._id}
  index={index}
  onChange={props.onToggle}
  setCurrentTodo={props.setCurrentTodo}
  setIsEditing={props.setIsEditing}
  />  
  )})}
  </ul>
  )
}

export default TodoList