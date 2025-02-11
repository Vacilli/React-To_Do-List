import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useTasks } from '../contexts/TasksContext'

export default function SortTasks() {
  const { sortTasks, searchQuery, setSearchQuery } = useTasks()
  const [activeStatus, setActiveStatus] = useState('all') // Default to "All"

  function handleStatus(e: React.MouseEvent<HTMLParagraphElement>) {
    const taskStatus = e.currentTarget.innerText.toLowerCase()
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
      <div className='input-container'>
        <FontAwesomeIcon icon={faSearch} className='search-icon' />
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Search tasks...'
        />
      </div>
    </div>
  )
}
