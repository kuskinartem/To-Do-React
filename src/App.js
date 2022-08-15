import React, { useEffect, useState } from 'react';
import TodoList from './ToDo/TodoList';
import Context from './context';
import AddTodo from './ToDo/AddTodo';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([])
  todos.sort((a, b) => (a.isCheck > b.isCheck) ? 1 : a.isCheck < b.isCheck ? -1 : 0);
  useEffect(() => {
    fetchPost()
  })

  async function fetchPost() {
    const response = await axios.get('http://localhost:8000/tasks')
    setTodos(response.data)
  }

  const addTodo = async (text, _id, isCheck) => {
    const response = await axios.post('http://localhost:8000/tasks', {
      _id,
      text,                                                           //Создаем новою задачу
      isCheck
    })
    setTodos(response.data)
  }

  async function toggleTodo(_id, isCheck) {
    const resp = await axios.patch(`http://localhost:8000/tasks/${_id}/checkbox`, {
      isCheck: !isCheck
    })
    setTodos(todos.map(todo => {
      if (todo._id === _id) {                                          
        todo.isCheck = !todo.isCheck
        resp.isCheck = todo.isCheck
      }
      return todo;
    }))
  }

  async function removeTodo(_id) {
    await axios.delete(`http://localhost:8000/tasks/${_id}`)     // удалить
    setTodos(todos.filter(todo => todo._id !== _id))
  }




  return (
    <Context.Provider value={{ removeTodo }}>
      <div className='wrapper'>
        <h1>To-Do List</h1>
        <AddTodo onCreate={addTodo} />

        {todos.length ? <TodoList todos={todos} onToggle={toggleTodo} /> : <p>No ToDo</p>}

      </div>
    </Context.Provider>
  )
}


export default App
