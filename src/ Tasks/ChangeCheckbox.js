import { changeIsCheck } from "../request/TaskServes"

const ChangeIsCheck = async ({todos, setTodos, todo},_id, isCheck) => {
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

  export default ChangeIsCheck