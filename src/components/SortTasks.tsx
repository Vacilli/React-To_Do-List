import { useState } from 'react'
import { TaskStatus, useTasks } from '../contexts/TasksContext'

export default function SortTasks() {
  const { sortTasks } = useTasks()
  const [activeStatus, setActiveStatus] = useState<TaskStatus>('all') // Default to "All"

  function handleStatus(e: React.MouseEvent<HTMLParagraphElement>) {
    const taskStatus = e.currentTarget.innerText.toLowerCase() as TaskStatus
    setActiveStatus(taskStatus) // Update active status
    sortTasks(taskStatus) // Trigger sorting
  }

  return (
    <div className='sort-container'>
      <ul>
        {['All', 'Priority', 'Completed'].map((status) => (
          <li key={status}>
            <p
              onClick={handleStatus}
              className={`sort-category ${status.toLowerCase()} ${
                activeStatus === status.toLowerCase() ? 'active' : ''
              }`}
              aria-live='polite'
            >
              {status}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
