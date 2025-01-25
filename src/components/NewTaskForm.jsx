import { useState } from 'react'
import PropTypes from 'prop-types'

function NewTaskForm({ onAddTask }) {
  const [description, setDescription] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (description.trim() !== '' && (minutes || seconds)) {
      const totalSeconds = parseInt(minutes || 0, 10) * 60 + parseInt(seconds || 0, 10)
      onAddTask(description, totalSeconds)
      setDescription('')
      setMinutes('')
      setSeconds('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="new-todo-form" onKeyDown={handleKeyDown}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className="new-todo-form__timer"
        type="number"
        placeholder="Min"
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
      />
      <input
        className="new-todo-form__timer"
        type="number"
        placeholder="Sec"
        value={seconds}
        onChange={(e) => setSeconds(e.target.value)}
      />
    </form>
  )
}

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
}

export default NewTaskForm
