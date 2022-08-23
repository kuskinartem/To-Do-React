import { useState } from "react";
import "../DeleteAllTask/style.scss";
import ShowError from "../Error/Error";
import { deleteTasks } from "../../service/taskServes";



const DeleteAllTasks = ({setTodos}) => {
  const [error, setError] = useState("")

  const deleteAllTask = async () => {
    try {
      const response = await deleteTasks();
      if (response.statusText === "OK") {
        setTodos(response.data);
      }
    } catch (error) {
      setError("Tasks deletion error");
    }
  };

  return (
    <div>
    <ShowError errorMessage={error} />
    <button onClick={deleteAllTask}>DeleteAll</button>
    </div>
  );
};

export default DeleteAllTasks;

