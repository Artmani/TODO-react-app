import { useState } from 'react';
import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import './styles/index.css';

const App = () => {
    const [tasks, setTasks] = useState([
        { id: 1, description: 'Completed task', completed: true },
        { id: 2, description: 'Editing task', completed: false },
        { id: 3, description: 'Active task', completed: false },
    ]);

    const toggleTaskCompletion = (taskId) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const deleteTask = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    };

    return (
        <section className="todoapp">
            <header className="header">
                <h1>todos</h1>
                <NewTaskForm />
            </header>
            <section className="main">
                <TaskList tasks={tasks} onToggleTask={toggleTaskCompletion} onDeleteTask={deleteTask} />
            </section>
            <Footer />
        </section>
    );
};


export default App;
