import { changeText } from "../../service/taskServes";
import { useState } from "react";
import { changeCheckbox } from "../../service/taskServes";
import Task from "../Task/Task";
import "./style.scss";
import EditTask from "../EditTask/EditTask";

const OneTodo = ({ todo, setTodos, todos, setError, _id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState("");

  const setEditing = (isEditing) => {
    isEditing = false;
  };

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

  return (
    <li _id={todo._id} text={todo.text} className="onTask">
      {isEditing ? (
        <EditTask
          todo={todo}
          setEditing={setEditing}
          doneEditTask={doneEditTask}
          handleEditInputChange={handleEditInputChange}
          currentText={currentText}
          _id={todo._id}
          text={todo.text}
        />
      ) : (
        <Task
          todo={todo}
          changeIsCheck={changeIsCheck}
          isCheck={todo.isCheck}
          handleEditClick={handleEditClick}
          _id={todo._id}
          todos={todos}
        />
      )}
    </li>
  );
};

export default OneTodo;
