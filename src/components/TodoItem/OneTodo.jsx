import { changeText } from "../../service/taskServes";
import { useState } from "react";
import { changeCheckbox, deleteTask } from "../../service/taskServes";
import Task from "../Task/Task";
import onDelete from "../../img/delete.svg";
import edit from "../../img/edit.svg";
import "./style.scss";
import Edit from "../EditTask/Edit";

const OneTodo = ({ todo, setTodos, todos, setError, _id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState({});

  const handleEditInputChange = (e) => {
    setCurrentText({ ...currentText, text: e.target.value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setCurrentText({ ...todo });
  };

  const doneEditTask = async (_id) => {
    try {
      const resp = await changeText({
        _id: _id,
        text: currentText.text,
      });
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
      setError("doneEditTask error");
    }
  };

  const changeIsCheck = async (isCheck) => {
    try {
      const resp = await changeCheckbox({
        _id: _id,
        isCheck: !isCheck,
      });
      if (resp.statusText === "OK") {
        setTodos(
          todos.map((todo) => {
            if (todo._id === _id) {
              todo.isCheck = !todo.isCheck;
              resp.isCheck = todo.isCheck;
            }
            return todo;
          })
        );
      }
    } catch (error) {
      setError("changeIsCheck erorr");
    }
  };

  const removeTodo = async (_id) => {
    try {
      await deleteTask(_id);
      setTodos(todos.filter((todo) => todo._id !== _id));
    } catch (error) {
      setError("deletion error");
    }
  };

  return (
    <li _id={todo._id} text={todo.text} className="onTask">
      <div>
        {isEditing ? (
          <Edit
            todo={todo}
            setIsEditing={setIsEditing}
            doneEditTask={doneEditTask}
            handleEditInputChange={handleEditInputChange}
            currentTodo={currentText}
            _id={todo._id}
            text={todo.text}
          />
        ) : (
          <div>
            <Task
              todo={todo}
              changeIsCheck={changeIsCheck}
              isCheck={todo.isCheck}
            />
          </div>
        )}
      </div>
      <div className="button">
        <button onClick={handleEditClick}>
          <img src={edit} alt="" />
        </button>
        <button className="deleteTask" onClick={() => removeTodo(_id)}>
          <img src={onDelete} alt="" />
        </button>
      </div>
    </li>
  );
};

export default OneTodo;
