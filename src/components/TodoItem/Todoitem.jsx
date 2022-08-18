import { useState } from "react";
import { changeText } from "../../request/taskServes";
import Task from "../Task/Task";
import done from "../../img/done.svg";
import cancel from "../../img/cancel.svg";
import onDelete from "../../img/delete.svg";
import edit from "../../img/edit.svg";
import "./style.scss";

const Todoitem = ({
  todo,
  onChange,
  setTodos,
  todos,
  removeTodo,
  setError,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const handleEditInputChange = (e) => {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  };

  const doneEditTask = async (_id) => {
    try {
      const resp = await changeText(_id, currentTodo);
      setTodos(
        todos.map((todo) => {
          if (todo._id === _id) {
            todo.text = resp.text;
          }
          return todo;
        })
      );
      setIsEditing(false);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <li id={todo._id} className="li">
      <div>
        <div>
          {isEditing ? (
            <div>
              <form onSubmit={doneEditTask} className="doneTask">
                <input
                  name="editTodo"
                  type="text"
                  placeholder="Edit todo"
                  value={currentTodo.text}
                  onChange={handleEditInputChange}
                />
                <button
                  type="submit"
                  onClick={() => doneEditTask(todo._id, todo.text)}
                >
                  <img src={done} alt="" />
                </button>
                <button onClick={() => setIsEditing(false)}>
                  <img src={cancel} alt="" />
                </button>
              </form>
            </div>
          ) : (
            <div>
              <Task todo={todo} onChange={onChange} />
            </div>
          )}
        </div>
      </div>
      <div className="button">
        <button onClick={() => handleEditClick()}>
          <img src={edit} alt="" />
        </button>
        <button className="deleteTask" onClick={() => removeTodo(todo._id)}>
          <img src={onDelete} alt="" />
        </button>
      </div>
    </li>
  );
};

export default Todoitem;
