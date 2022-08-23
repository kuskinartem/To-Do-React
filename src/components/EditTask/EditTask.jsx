import cancel from "../../img/cancel.svg";
import done from "../../img/done.svg";

const EditTask = ({
  setEditing,
  doneEditTask,
  currentText,
  handleEditInputChange,
  text,
  _id,
}) => {
  return (
    <div>
      <form className="completed-task">
        <input
          name="editTodo"
          type="text"
          placeholder="Edit todo"
          value={currentText.text}
          onChange={handleEditInputChange}
        />
        <button type="submit" onClick={() => doneEditTask(_id, text)}>
          <img src={done} alt="" />
        </button>
        <button onClick={() => setEditing()}>
          <img src={cancel} alt="" />
        </button>
      </form>
    </div>
  );
};

export default EditTask;

