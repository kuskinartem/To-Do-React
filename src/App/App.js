import { useEffect, useState } from 'react';
import TodoList from '../ToDo/TodoList/TodoList';
import AddTodo from '../ToDo/AddTodo/AddTodo';
import {
  getTask,
  addTask,
  changeIsCheck,
} from '../request/TaskServes';
import './style.scss'


const App = () => {
  const [todos, setTodos] = useState([])
  useEffect(() => {
    allTask()
    
  }, [])

  const allTask = async () => {
    try {
      const response = await getTask()

      setTodos(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  const taskAdd = async (text, _id) => {
    try {
      const response = await addTask(text)
      setTodos(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  const chengeIsCheck = async (_id, isCheck) => {
    try {
      const resp = await changeIsCheck(_id, isCheck)
      setTodos(todos.map(todo => {
        if (todo._id === _id) {
          todo.isCheck = !todo.isCheck
          resp.isCheck = todo.isCheck
        }
        return todo;
      }))
    } catch (error) {
      console.error(error);
    }
  }


  return (

    <div className='wrapper'>
      <h1>To-Do List</h1>
      <AddTodo onCreate={taskAdd} />

      {todos.length ?
        <TodoList
          todos={todos}
          chengeIsCheck={chengeIsCheck}
          setTodos={setTodos}
        /> : <p>No ToDo</p>}

    </div>


  )
}


export default App
