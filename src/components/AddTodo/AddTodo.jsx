import { useState } from "react";
import ShowError from "../Error/Error";

const AddTodo = ({ onCreate, error, setError }) => {
  const [text, setText] = useState("");

  const handler = () => {
    try {
      text.trim();
      onCreate(text);
      setText("");
    } catch (error) {
      setError("Faile Add");
    }
  };

  return (
    <div>
      <ShowError errorMessage={error} />
      <form onSubmit={handler}>
        <input value={text} onChange={(event) => setText(event.target.value)} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddTodo;
