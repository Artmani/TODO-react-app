import PropTypes from 'prop-types'

import Task from './Task'
import '../styles/index.css'

function TaskList({ tasks, onToggleTask, onDeleteTask, onStartTimer, onStopTimer, onEditTask, onUpdateTask }) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onToggle={() => onToggleTask(task.id)}
          onDelete={() => onDeleteTask(task.id)}
          onStartTimer={onStartTimer}
          onStopTimer={onStopTimer}
          onEditTask={onEditTask}
          onUpdateTask={onUpdateTask}
        />
      ))}
    </ul>
  )
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onToggleTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onStartTimer: PropTypes.func.isRequired,
  onStopTimer: PropTypes.func.isRequired,
}

export default TaskList
