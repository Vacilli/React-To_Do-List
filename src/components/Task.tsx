import { Link } from 'react-router-dom'
import { type TaskItem } from '../contexts/TasksContext'
import EditOrDeleteTask from './taskManipulation'

type TaskProps = {
  task: TaskItem
}

export default function Task({ task }: TaskProps) {
  return (
    <article>
      <div>
        <h2
          style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
        >
          {task.title.slice(0, 30)}...
        </h2>
        <p>{task.description.slice(0, 50)}...</p>
        <Link to={`/tasks/${task.id}`}>View Details</Link>
      </div>
      <EditOrDeleteTask task={task} />
    </article>
  )
}
