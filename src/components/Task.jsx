import '../styles/index.css';
import PropTypes from 'prop-types';

const Task = ({ task, onToggle, onDelete }) => {
    return (
        <li className={task.completed ? 'completed' : ''}>
            <div className="view">
                <input
                    className="toggle"
                    type="checkbox"
                    checked={task.completed}
                    onChange={onToggle}
                />
                <label>
                <span className="description">{task.description}</span>
                </label>
                <button className="icon icon-edit"></button>
                <button className="icon icon-destroy" onClick={onDelete}></button>
            </div>
        </li>
    );
};

Task.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
    }).isRequired,
    onToggle: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default Task;