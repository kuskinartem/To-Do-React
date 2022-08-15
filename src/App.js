import { useEffect, useState } from 'react';
import TodoList from './ToDo/TodoList';
import Context from './context';
import AddTodo from './ToDo/AddTodo';
import { 
  getTask,
  addTask,
  deleteTask,
  changeIsCheck,
 } from './request/TaskServes';


 const App = () => {
  const [todos, setTodos] = useState([])
  
  useEffect(() => {
    allTask()
  })

  const  allTask = async () => {
    try {
    const response = await getTask()
    setTodos(response.data)
  } catch {
    console.error('append error');
  }
  }

  const taskAdd = async (text, _id) => {
    try {
    const response = await addTask(text)
    setTodos(response.data)
  } catch {
    console.error('creation error');
  }
  }

  const  chengeIsCheck = async (_id, isCheck) => {
    try {
    const resp = await changeIsCheck(_id, isCheck)
    setTodos(todos.map(todo => {
      if (todo._id === _id) {                                          
        todo.isCheck = !todo.isCheck
        resp.isCheck = todo.isCheck
      }
      return todo;
    }))
  } catch {
    console.error('error change checkbox');
  }
  }

  const  removeTodo = async (_id) => {
    try {
    await deleteTask(_id)
    setTodos(todos.filter(todo => todo._id !== _id))
    } catch {
      console.error('deklete error');
    }
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className='wrapper'>
        <h1>To-Do List</h1>
        <AddTodo onCreate={taskAdd} />

        {todos.length ? 
        <TodoList
         todos={todos} 
         onToggle={chengeIsCheck}
          /> : <p>No ToDo</p>}

      </div>
    </Context.Provider>
   
  )
}


export default App
