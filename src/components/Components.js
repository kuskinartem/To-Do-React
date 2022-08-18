import { useEffect, useState } from 'react';
import TodoList from '../components/TodoList/TodoList';
import AddTodo from '../components/AddTodo/AddTodo';
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
      setError(error);
    }
  }

  const addTask = async (text ) => {
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
      const resp = await changeIsCheckData(_id, isCheck);
      if (resp.statusText === "OK") {
      setTodos(todos.map(todo => {
        if (todo._id === _id) {
          todo.isCheck = !todo.isCheck;
          resp.isCheck = todo.isCheck;
        }
        return todo;
      }))}
    } catch (error) {
      setError(error);
    }
    }

    const removeTodo = async (_id) => {
        try {
          await deleteTask(_id);
          setTodos(todos.filter((todo) => todo._id !== _id));
        } catch (error) {
          setError(error);
        }
      };

  

  return (

    <div className='wrapper'>
        <ShowError errorMessage={error} />
      <h1>To-Do List</h1>
      <AddTodo onCreate={addTask} />

      {todos.length ?
        <TodoList
          todos={todos}
          removeTodo={removeTodo}
          changeIsCheck={changeIsCheck}
          setTodos={setTodos}
          setError={setError}/> 
        : 
        <p>No ToDo</p>
        }
    </div>
  )
}

export default Components;