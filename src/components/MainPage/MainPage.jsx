import { useEffect, useState } from "react";
import OneTodo from "../TodoItem/OneTodo";
import AddTodo from "../AddTodo/AddTodo";
import { getTask, addTasks, deleteTasks } from "../../service/taskServes";
import "./style.scss";

const MainPage = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllTask();
  });

  const getAllTask = async () => {
    try {
      const response = await getTask();
      setTodos(response.data);
    } catch (error) {
      setError("getAllTask erorr");
    }
  };

  const addTask = async (text) => {
    try {
      const response = await addTasks(text);
      if (response.statusText === "OK") {
        setTodos(response.data);
      }
    } catch (error) {
      setError("error");
    }
  };

  const deleteAllTask = async () => {
    try {
      const response = await deleteTasks();
      if (response.statusText === "OK") {
        setTodos(response.data);
      }
    } catch (error) {
      setError("error DeleteAllTask");
    }
  };

  return (
    <div className="wrapper">
      <h1>To-Do List</h1>
      <AddTodo
        onCreate={addTask}
        errorMessage={error}
        error={error}
        setError={setError}
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
      <button onClick={deleteAllTask}>DeleteAll</button>
    </div>
  );
};

export default MainPage;
