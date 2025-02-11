import Task from './Task'
import { useTasks } from '../contexts/TasksContext'
import { useEffect, useRef, useState } from 'react'

export default function TaskList() {
  const { tasks, searchedTasks, selectedStatus } = useTasks()

  // States for visible tasks in each category
  const [visibleTasksPriority, setVisibleTasksPriority] = useState(3)
  const [visibleTasksOngoing, setVisibleTasksOngoing] = useState(3)
  const [visibleTasksCompleted, setVisibleTasksCompleted] = useState(3)

  // Determine which tasks to display based on the search query
  const displayedTasks = searchedTasks.length > 0 ? searchedTasks : tasks

  // Apply category filters to the displayed tasks
  const priorityTasks = displayedTasks.filter((task) => task.priority)
  const onGoingTasks = displayedTasks.filter(
    (task) => !task.completed && !task.priority
  )
  const completedTasks = displayedTasks.filter((task) => task.completed)

  // Refs for the load-more triggers
  const priorityTrigger = useRef<HTMLDivElement | null>(null)
  const ongoingTrigger = useRef<HTMLDivElement | null>(null)
  const completedTrigger = useRef<HTMLDivElement | null>(null)

  const totalPriority = priorityTasks.length
  const totalonGoing = onGoingTasks.length
  const totalCompleted = completedTasks.length

  // Infinite scroll logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === priorityTrigger.current) {
              setVisibleTasksPriority((prev) =>
                Math.min(prev + 3, priorityTasks.length)
              )
            } else if (entry.target === ongoingTrigger.current) {
              setVisibleTasksOngoing((prev) =>
                Math.min(prev + 3, onGoingTasks.length)
              )
            } else if (entry.target === completedTrigger.current) {
              setVisibleTasksCompleted((prev) =>
                Math.min(prev + 3, completedTasks.length)
              )
            }
          }
        })
      },
      { threshold: 1.0 }
    )

    // Observe the triggers
    if (priorityTrigger.current) observer.observe(priorityTrigger.current)
    if (ongoingTrigger.current) observer.observe(ongoingTrigger.current)
    if (completedTrigger.current) observer.observe(completedTrigger.current)

    console.log('Updated Visible Priority Tasks:', visibleTasksPriority)

    return () => {
      observer.disconnect()
    }
  }, [priorityTasks.length, onGoingTasks.length, completedTasks.length])

  console.log('Visible Priority Tasks:', visibleTasksPriority)

  return (
    <div>
      {displayedTasks.length === 0 ? (
        <p>
          No tasks found for the selected category{' '}
          <span className='category'>{`"${selectedStatus}"`}</span>
        </p>
      ) : (
        <div>
          {totalPriority > 0 && (
            <div className='tasks-header'>
              <h3>Priority Tasks</h3>
              <p>Total: {totalPriority}</p>
            </div>
          )}
          <ul className='task-list'>
            {priorityTasks.slice(0, visibleTasksPriority).map((task) => (
              <li key={task.id}>
                <Task task={task} />
                <div className='status-box'>
                  <p className='priority-message' aria-live='polite'>
                    Priority
                  </p>
                </div>
              </li>
            ))}
            {visibleTasksPriority < totalPriority && (
              <div ref={priorityTrigger} style={{ height: '1px' }}></div>
            )}
          </ul>
          {totalonGoing > 0 && (
            <div className='tasks-header'>
              <h3>Ongoing Tasks</h3>
              <p>Total: {totalonGoing}</p>
            </div>
          )}
          <ul className='task-list'>
            {onGoingTasks.slice(0, visibleTasksOngoing).map((task) => (
              <li key={task.id}>
                <Task task={task} />
              </li>
            ))}
            {visibleTasksOngoing < totalonGoing && (
              <div ref={ongoingTrigger} style={{ height: '1px' }}></div>
            )}
          </ul>
          {totalCompleted > 0 && (
            <div className='tasks-header'>
              <h3>Completed Tasks</h3>
              <p>Total: {totalCompleted}</p>
            </div>
          )}
          <ul className='task-list'>
            {completedTasks.slice(0, visibleTasksCompleted).map((task) => (
              <li className='completed' key={task.id}>
                <Task task={task} />
                <div className='status-box'>
                  <p className='completed-message' aria-live='polite'>
                    Completed
                  </p>
                </div>
              </li>
            ))}
            {visibleTasksCompleted < totalCompleted && (
              <div ref={completedTrigger} style={{ height: '1px' }}></div>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
