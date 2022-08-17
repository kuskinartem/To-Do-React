import { useState } from 'react';
import done from '../../img/done.svg';
import cancel from '../../img/cancel.svg';
import onDelete from '../../img/delete.svg';
import edit from '../../img/edit.svg'
import { changeText, deleteTask } from '../../request/TaskServes'
import './style.scss'

const Todoitem = ({ todo, index, onChange, setTodo, setTodos, todos }) => {

  const  removeTodo = async (_id) => {
    try {
    await deleteTask(_id);
  setTodos(todos.filter(todo => todo._id !== _id));
     } catch(error) {
       console.error( error);
     }
  }
  
  const classes = [];   //Если isCheck  измениться тогда измениться класс на done 
  if (todo.isCheck) {
    classes.push('done')
  }

  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const handleEditInputChange = (e) => {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
  }

  const handleEditClick = () => {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setTodo(todo.text);
  }

  const doneEditTask = async (_id) => {
    try {
      const resp = await changeText(_id, currentTodo)
      setTodos(todos.map(todo => {
        if (todo._id === _id) {
          todo.text = resp.text;
        }
        return todo;
      }))
      setIsEditing(false)
    } catch(error) {
      console.error(error);
    }
  }


  return (
    <li id={todo._id}>

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
                  <img src={cancel} alt='' />
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
                    
                    onChange={() => onChange(todo._id, todo.isCheck)} />
                  <strong>{index + 1 + ')'}</strong>
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
          <img src={onDelete} alt='' />
        </button>
      </div>
    </li>
  )
}

export default Todoitem