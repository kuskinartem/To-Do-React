import { useEffect, useState } from "react";
import OneTodo from "../TodoItem/OneTodo";
import AddTodo from "../AddTodo/AddTodo";
import DeleteAllTasks from "../DeleteAllTask/DeleteAllTasks";
import { getTask, addTasks } from "../../service/taskServes";
import "./style.scss";

const MainPage = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllTasks();
  });

  const getAllTasks = async () => {
    try {
      const response = await getTask();  
      if (response.statusText === "OK") {
      setTodos(response.data);
      }
    } catch (error) {
      setError("Task output error");
    }
  };

  const addTask = async (text) => {
      const response = await addTasks(text);
      if (response.statusText === "OK") {
        setTodos(response.data);
      }
  };

  return (
    <div className="wrapper">
      <h1>To-Do List</h1>
      <AddTodo
        onCreate={addTask}
        errorMessage={error}
      />
      {todos.length ? (
        <ul>
          {todos.map((todo) => (
            <OneTodo
              todo={todo}
              key={todo._id}
              setTodos={setTodos}
              _id={todo._id}
              text={todo.text}
              todos={todos}
              setError={setError}
            />
          ))}
        </ul>
      ) : (
        <p>No ToDo</p>
      )}
      <DeleteAllTasks setTodos={setTodos} setError={setError}/>
    </div>
  );
};

export default MainPage;

