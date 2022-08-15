import React, { useContext, useState } from 'react';
import Context from '../context';
import axios from 'axios';
import done from '../img/done.svg';
import cancel from '../img/cancel.svg';
import Delete from '../img/delete.svg';
import edit from '../img/edit.svg'


const styles = {
  li: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '.4rem 1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '.5rem',
  },
  input: {
    marginRight: '1rem'
  }

}

function Todoitem({ todo, index, onChange, setTodo, setTodos, todos }) {
  const { removeTodo } = useContext(Context)
  const classes = [];

  if (todo.isCheck) {
    classes.push('done')
  }

  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  function handleEditInputChange(e) {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
  }

  function handleEditClick() {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    setTodo(todo.text);
  }

  const doneEditTask = async (_id, text) => {
    const resp = await axios.patch(`http://localhost:8000/tasks/${_id}`, {
      text: currentTodo.text
    })
    setTodos(todos.map(todo => {
      if (todo._id === _id) {                                                   
        todo.text = resp.text;
      }
      return todo;
    }))
    setIsEditing(false)
  }

  return (
    <li style={styles.li} id={todo._id}>

      <div>
        <div>
          
          {isEditing ? (
            <div>
            <form onSubmit={doneEditTask} className='form'>
              <input
                name="editTodo"
                type="text"
                placeholder="Edit todo"
                value={currentTodo.text}
                onChange={handleEditInputChange}
              />
              <button type="submit" onClick={() => doneEditTask(todo._id, todo.text)}>
              <img src={done} alt='' />
              </button>
              <button onClick={() => setIsEditing(false)}>
                <img src={cancel} alt=''/>
              </button>
            </form>
            </div>
          ) : (
            <div>
            <form onSubmit={handleFormSubmit}>
              <span className={classes.join(' ')}>
                <input
                  type="checkbox"
                  checked={todo.isCheck}
                  style={styles.input}
                  onChange={() => onChange(todo._id, todo.isCheck)} />
                <strong>{index + 1}</strong>
                &nbsp;
                {todo.text}
              </span>
            </form>
          </div>
          )}
        </div>
      </div>
      <div className='button'>
        <button onClick={() => handleEditClick(todo)}>
          <img src={edit} alt='' />
        </button>
        <button className='rm' onClick={() => removeTodo(todo._id)}>
          <img src={Delete} alt=''/>
        </button>
      </div>
    </li>
  )
}

export default Todoitem