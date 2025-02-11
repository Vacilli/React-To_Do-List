import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import {
  faCircleCheck as faRegularCircleCheck,
  faStar as FaRegularStar,
} from '@fortawesome/free-regular-svg-icons'
import { type TaskItem } from '../contexts/TasksContext'
import { useTasks } from '../contexts/TasksContext'

type DeleteTaskProps = {
  task: TaskItem
}

export default function EditOrDeleteTask({ task }: DeleteTaskProps) {
  const { deleteTask, editTask, toggleTaskCompleted, toggleTaskPriority } =
    useTasks()

  function HandleDelete() {
    deleteTask(task.id)
  }

  function HandleEdit() {
    editTask(task)
  }

  function HandleComplete() {
    toggleTaskCompleted(task.id, 'completed')
  }

  function HandlePriority() {
    toggleTaskPriority(task.id, 'priority')
  }

  return (
    <div>
      <button onClick={HandleDelete} className='icon delete-btn'>
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <button
        onClick={HandleEdit}
        className='icon edit-btn'
        disabled={task.completed}
      >
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
      <button
        onClick={HandlePriority}
        className='icon priority-btn'
        disabled={task.completed}
      >
        <FontAwesomeIcon icon={FaRegularStar} />
      </button>
      <button onClick={HandleComplete} className='icon complete-btn'>
        <FontAwesomeIcon icon={faRegularCircleCheck} />
      </button>
    </div>
  )
}
