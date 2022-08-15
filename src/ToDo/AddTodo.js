import { useState } from 'react';

const AddTodo = ({ onCreate }) => {
  const [value, setValue] = useState('')

  const submitHandler = (event) => {
    event.preventDefault()

    if (value.trim()) {
      onCreate(value)
      setValue('')
      }
    }

  return (
    <form style={{ marginBottom: '1rem' }} onSubmit={submitHandler}>
      <input value={value} onChange={event => setValue(event.target.value)} />
        <button type="submit">Add</button>
    </form>
  )
}


export default AddTodo