import PropTypes from 'prop-types'

import TasksFilter from './TasksFilter'

function Footer({ currentFilter, onFilterChange, incompleteTaskCount, onClearCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">
        {incompleteTaskCount} {incompleteTaskCount === 1 ? 'item' : 'items'} left
      </span>
      <TasksFilter currentFilter={currentFilter} onFilterChange={onFilterChange} />
      <button className="clear-completed" type="button" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  incompleteTaskCount: PropTypes.number.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
}

export default Footer
