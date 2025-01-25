import { useState } from 'react'

import NewTaskForm from './components/NewTaskForm'
import TaskList from './components/TaskList'
import Footer from './components/Footer'
import './styles/index.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [timers, setTimers] = useState({})

  const addTask = (description, totalSeconds) => {
    const newTask = {
      id: Date.now(),
      description,
      completed: false,
      createdAt: new Date(),
      timeLeft: totalSeconds, // Initialize with total time
      isRunning: false,
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

    clearInterval(timers[taskId])
    setTimers((prevTimers) => {
      const updatedTimers = { ...prevTimers }
      delete updatedTimers[taskId]
      return updatedTimers
    })
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

    setTimers((prevTimers) => ({ ...prevTimers, [taskId]: intervalId }))
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

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
        />
      </section>
      <Footer currentFilter={filter} onFilterChange={setFilter} />
    </section>
  )
}

export default App
