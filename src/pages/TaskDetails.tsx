import { useParams, useNavigate } from 'react-router-dom'
import { useTasks } from '../contexts/TasksContext'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function TaskDetails() {
  const { taskId } = useParams()
  const { tasks } = useTasks()
  const navigate = useNavigate()
  const task = tasks.find((task) => task.id === Number(taskId))

  console.log(useParams())

  if (!task) {
    return <p>Task not found!</p>
  }

  return (
    <>
      <button
        className='icon back-btn'
        onClick={(e) => {
          e.preventDefault()
          navigate(-1)
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className='task-details'>
        <h1>{task.title}</h1>
        <p>{task.description}</p>
        <p>Priority: {task.priority ? 'High' : 'Normal'}</p>
        <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>
      </div>
    </>
  )
}
