import { useState } from "react";
import ShowError from "../Error/Error";

const AddTodo = ({ onCreate }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("")

  const  handlerAddTask = async () => {
    try {
      if (text.trim()) {
     await onCreate(text);
      setText("");
      }
    } catch (error) {
      setError("Error in adding a task");
    }
  };

  return (
    <div>
      <ShowError errorMessage={error} />
      <form onSubmit={handlerAddTask}>
        <input value={text} onChange={(event) => setText(event.target.value)} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddTodo;

