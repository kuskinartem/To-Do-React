import TodoItem from "../TodoItem/Todoitem";
import "./style.scss";

const TodoList = ({ todos, setTodos, changeIsCheck, removeTodo, setError }) => {
  return (
    <ul>
      {todos.map((todo, _id) => {
        return (
          <TodoItem
            todo={todo}
            key={todo._id}
            setTodos={setTodos}
            removeTodo={removeTodo}
            todos={todos}
            onChange={changeIsCheck}
            setError={setError}
          />
        );
      })}
    </ul>
  );
};

export default TodoList;
