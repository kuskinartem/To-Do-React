import "../Task/style.scss";
import onDelete from "../../img/delete.svg";
import edit from "../../img/edit.svg";
import { deleteTask } from "../../service/taskServes";
import ShowError from "../Error/Error";
import { useState } from "react";
const Task = ({
  todo,
  changeIsCheck,
  isCheck,
  handleEditClick,
  _id,
  setTodos,
  todos,
}) => {
  const [error, setError] = useState("");

  const removeTodo = async (_id) => {
    try {
      await deleteTask(_id);
      setTodos(todos.filter((todo) => todo._id !== _id));
    } catch (error) {
      setError("deletion error");
    }
  };

  return (
    <div className="main-block">
      <ShowError errorMessage={error} />
      <div>
      <span className={todo.isCheck ? "done-task" : "text"}>
        <input
          type="checkbox"
          checked={todo.isCheck}
          onChange={() => changeIsCheck(isCheck)}
        />
        {todo.text}
      </span>
      </div>
      <div className="button">
        <button onClick={handleEditClick}>
          <img src={edit} alt="" />
        </button>
        <button className="deleteTask" onClick={() => removeTodo(_id)}>
          <img src={onDelete} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Task;
