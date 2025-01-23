import '../styles/index.css'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

function Task({ task, onToggle, onDelete, onStartTimer, onStopTimer }) {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <li className={task.completed ? 'completed' : ''}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
          aria-label="Toggle task completion"
        />
        <label>
          <span className="description">{task.description}</span>
          <span className="timer">{formatTime(task.timeSpent)}</span>
          {task.isRunning ? (
            <button
              className="icon icon-pause"
              onClick={() => onStopTimer(task.id)}
              type="button"
              aria-label="Pause timer"
            />
          ) : (
            <button
              className="icon icon-play"
              onClick={() => onStartTimer(task.id)}
              type="button"
              aria-label="Start timer"
            />
          )}
          <span className="created">{`created ${formatDistanceToNow(new Date(task.createdAt))} ago`}</span>
        </label>
        <button className="icon icon-edit" type="button" aria-label="Edit task" />
        <button className="icon icon-destroy" onClick={onDelete} type="button" aria-label="Delete task" />
      </div>
    </li>
  )
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    timeSpent: PropTypes.number.isRequired,
    isRunning: PropTypes.bool.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onStartTimer: PropTypes.func.isRequired,
  onStopTimer: PropTypes.func.isRequired,
}

export default Task
