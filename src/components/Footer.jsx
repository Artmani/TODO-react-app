import PropTypes from 'prop-types'
import TasksFilter from './TasksFilter'

const Footer = ({ currentFilter, onFilterChange }) => {
  return (
    <footer className="footer">
      <span className="todo-count">1 items left</span>
      <TasksFilter currentFilter={currentFilter} onFilterChange={onFilterChange} />
      <button className="clear-completed">Clear completed</button>
    </footer>
  )
}

Footer.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
}

export default Footer
