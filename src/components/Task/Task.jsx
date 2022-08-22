import "../Task/style.scss";

const Task = ({ todo, changeIsCheck, isCheck }) => {
  return (
    <span className={todo.isCheck ? "done-task" : "text"}>
      <input
        type="checkbox"
        checked={todo.isCheck}
        onChange={() => changeIsCheck(isCheck)}
      />
      {todo.text}
    </span>
  );
};

export default Task;
