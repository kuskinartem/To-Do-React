import "../Task/style.scss";

const Task = ({ todo, onChange }) => {

  return (
    <span className={todo.isCheck ? 'done' : 'text'}>
      <input
        type="checkbox"
        checked={todo.isCheck}
        onChange={() => onChange(todo._id, todo.isCheck)}
      />
      &nbsp;
      {todo.text}
    </span>
  );
};

export default Task;
