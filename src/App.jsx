import { useState, useRef } from 'react'

import NewTaskForm from './components/NewTaskForm'
import TaskList from './components/TaskList'
import Footer from './components/Footer'
import './styles/index.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const timersRef = useRef({})

  const addTask = (description, totalSeconds) => {
    const newTask = {
      id: Date.now(),
      description,
      completed: false,
      createdAt: new Date(),
      timeLeft: totalSeconds,
      isRunning: false,
      isEditing: false,
    }
    setTasks((prevTasks) => [...prevTasks, newTask])
  }

  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
    )
  }

  const stopTimer = (taskId) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, isRunning: false } : task)))

    clearInterval(timersRef.current[taskId])
    delete timersRef.current[taskId]
  }

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
    stopTimer(taskId)
  }

  const startTimer = (taskId) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, isRunning: true } : task)))

    const intervalId = setInterval(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.id === taskId) {
            if (task.timeLeft > 0) {
              return { ...task, timeLeft: task.timeLeft - 1 }
            }
            clearInterval(intervalId)
            return { ...task, isRunning: false }
          }
          return task
        })
      )
    }, 1000)

    timersRef.current[taskId] = intervalId
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  const incompleteTaskCount = tasks.filter((task) => !task.completed).length

  const clearCompletedTasks = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed))
  }

  const toggleEditTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isEditing: !task.isEditing } : { ...task, isEditing: false }
      )
    )
  }

  const updateTaskDescription = (taskId, newDescription) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, description: newDescription, isEditing: false } : task))
    )
  }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAddTask={addTask} />
      </header>
      <section className="main">
        <TaskList
          tasks={filteredTasks}
          onToggleTask={toggleTaskCompletion}
          onDeleteTask={deleteTask}
          onStartTimer={startTimer}
          onStopTimer={stopTimer}
          onEditTask={toggleEditTask}
          onUpdateTask={updateTaskDescription}
        />
      </section>
      <Footer
        currentFilter={filter}
        onFilterChange={setFilter}
        incompleteTaskCount={incompleteTaskCount}
        onClearCompleted={clearCompletedTasks}
      />
    </section>
  )
}

export default App
