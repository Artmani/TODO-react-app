import { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ onAddTask }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim() !== '') {
      onAddTask(description);
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </form>
  );
};

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

export default NewTaskForm;
