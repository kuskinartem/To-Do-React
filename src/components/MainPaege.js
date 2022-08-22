import { useEffect, useState } from 'react';
import TodoItem from './TodoItem/Todoitem'
import AddTodo from './AddTodo/AddTodo';
import ShowError from '../Error/Error';
import {
  getTask,
  addTasks,
  changeIsCheckData,
  deleteTask
} from '../request/taskServes';
import '../style.scss'


const Components = () => {
  const [todos, setTodos] = useState([])
  const [error, setError] = useState('');
  useEffect(() => {
    getAllTask()

  })

  const getAllTask = async () => {
    try {
      const response = await getTask();
      setTodos(response.data);
    } catch (error) {
      setError('getAllTask erorr');
    }
  }

  const addTask = async (text) => {
    try {
      const response = await addTasks(text);
      if (response.statusText === "OK") {
        setTodos(response.data);
      }
    } catch (error) {
      setError(error);;
    }
  }

  const changeIsCheck = async (_id, isCheck) => {
    try {
      const resp = await changeIsCheckData(_id, {
        isCheck: !isCheck
      });
      if (resp.statusText === "OK") {
        setTodos(todos.map(todo => {
          if (todo._id === _id) {
            todo.isCheck = !todo.isCheck;
            resp.isCheck = todo.isCheck;
          }
          return todo;
        }))
      }
    } catch (error) {
      setError('changeIsCheck erorr');
    }
  }

  const removeTodo = async (_id) => {
    try {
      await deleteTask(_id);
      setTodos(todos.filter((todo) => todo._id !== _id));
    } catch (error) {
      setError('deletion error');
    }
  };

  return (

    <div className='wrapper'>
      <ShowError errorMessage={error} />
      <h1>To-Do List</h1>
      <AddTodo onCreate={addTask} />

      {todos.length ?
        <ul>
          {todos.map((todo, _id) => {
            return (
              <TodoItem
                todo={todo}
                key={todo._id}
                setTodos={setTodos}
                removeTodo={removeTodo}
                todos={todos}
                onChange={changeIsCheck}
                setError={setError}
              />
            );
          })}
        </ul>
        :
        <p>No ToDo</p>
      }
    </div>
  )
}

export default Components;