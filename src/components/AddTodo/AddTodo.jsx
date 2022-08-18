import { useState } from "react";

const AddTodo = ({ onCreate }) => {
  const [text, setText] = useState("");

  const handler = () => {
    if (text.trim()) {
      onCreate(text);
      setText("");
    } else {
      return;
    }
  };

  return (
    <form onSubmit={handler}>
      <input value={text} onChange={(event) => setText(event.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodo;
