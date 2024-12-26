import Task from './Task';
import '../styles/index.css';
import PropTypes from 'prop-types';

const TaskList = ({ tasks, onToggleTask, onDeleteTask }) => {
    return (
        <ul className="todo-list">
            {tasks.map((task) => (
                <Task
                    key={task.id}
                    task={task}
                    onToggle={() => onToggleTask(task.id)}
                    onDelete={() => onDeleteTask(task.id)}
                />
            ))}
        </ul>
    );
};

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
};

export default TaskList;
