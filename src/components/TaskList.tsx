import Task from './Task'
import { usePaginatedTasks } from '../hooks/usePaginatedTasks'
import { useTasks } from '../contexts/TasksContext'
import TaskPagination from './TaskPagination'

export default function TaskList() {
  const { tasks, searchedTasks, selectedStatus } = useTasks()

  const itemsPerPage = 3

  // Determine which tasks to display based on the search query
  const displayedTasks = searchedTasks.length > 0 ? searchedTasks : tasks

  // Apply category filters to the displayed tasks
  const completedTasks = displayedTasks.filter((task) => task.completed)
  const onGoingTasks = displayedTasks.filter(
    (task) => !task.completed && !task.priority
  )
  const priorityTasks = displayedTasks.filter((task) => task.priority)

  const priorityPagination = usePaginatedTasks(priorityTasks, itemsPerPage)
  const ongoingPagination = usePaginatedTasks(onGoingTasks, itemsPerPage)
  const completedPagination = usePaginatedTasks(completedTasks, itemsPerPage)

  const totalPriority = priorityTasks.length
  const totalonGoing = onGoingTasks.length
  const totalCompleted = completedTasks.length

  function calculateTasks({
    categoryPage,
    itemsPerPage,
    totalTasks,
  }: {
    categoryPage: number
    itemsPerPage: number
    totalTasks: number
  }) {
    const startTask = Math.min(
      (categoryPage - 1) * itemsPerPage + 1,
      totalTasks
    )
    const endTask = Math.min((categoryPage - 1 + 1) * itemsPerPage, totalTasks)
    return `${startTask} - ${endTask} of ${totalTasks}`
  }

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
              <p>
                {calculateTasks({
                  categoryPage: priorityPagination.page,
                  itemsPerPage,
                  totalTasks: totalPriority,
                })}
              </p>
            </div>
          )}
          <ul className='task-list'>
            {priorityPagination.paginatedTasks.map((task) => (
              <li key={task.id}>
                <Task task={task} />
                <div className='status-box'>
                  <p className='priority-message' aria-live='polite'>
                    Priority
                  </p>
                </div>
              </li>
            ))}
            {priorityPagination.paginatedTasks.length > 0 && (
              <TaskPagination
                page={priorityPagination.page}
                totalPages={priorityPagination.totalPages}
                setPage={priorityPagination.setPage}
              />
            )}
          </ul>
          {totalonGoing > 0 && (
            <div className='tasks-header'>
              <h3>Ongoing Tasks</h3>
              <p>
                {calculateTasks({
                  categoryPage: ongoingPagination.page,
                  itemsPerPage,
                  totalTasks: totalonGoing,
                })}
              </p>
            </div>
          )}
          <ul className='task-list'>
            {ongoingPagination.paginatedTasks.map((task) => (
              <li key={task.id}>
                <Task task={task} />
              </li>
            ))}
            {ongoingPagination.paginatedTasks.length > 0 && (
              <TaskPagination
                page={ongoingPagination.page}
                totalPages={ongoingPagination.totalPages}
                setPage={ongoingPagination.setPage}
              />
            )}
          </ul>
          {totalCompleted > 0 && (
            <div className='tasks-header'>
              <h3>Completed Tasks</h3>
              <p>
                {calculateTasks({
                  categoryPage: completedPagination.page,
                  itemsPerPage,
                  totalTasks: totalCompleted,
                })}
              </p>
            </div>
          )}
          <ul className='task-list'>
            {completedPagination.paginatedTasks.map((task) => (
              <li className='completed' key={task.id}>
                <Task task={task} />
                <div className='status-box'>
                  <p className='completed-message' aria-live='polite'>
                    Completed
                  </p>
                </div>
              </li>
            ))}
            {completedPagination.paginatedTasks.length > 0 && (
              <TaskPagination
                page={completedPagination.page}
                totalPages={completedPagination.totalPages}
                setPage={completedPagination.setPage}
              />
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
