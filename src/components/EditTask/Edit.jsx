import cancel from "../../img/cancel.svg";
import done from "../../img/done.svg";

const Edit = ({
  setIsEditing,
  doneEditTask,
  currentTodo,
  handleEditInputChange,
  text,
  _id,
}) => {
  return (
    <div>
      <form onSubmit={doneEditTask} className="completed-task">
        <input
          name="editTodo"
          type="text"
          placeholder="Edit todo"
          value={currentTodo.text}
          onChange={handleEditInputChange}
        />
        <button type="submit" onClick={() => doneEditTask(_id, text)}>
          <img src={done} alt="" />
        </button>
        <button onClick={() => setIsEditing(false)}>
          <img src={cancel} alt="" />
        </button>
      </form>
    </div>
  );
};

export default Edit;
