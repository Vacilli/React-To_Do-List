import { FormEvent, useRef, useEffect } from 'react'
import { type TaskItem } from '../contexts/TasksContext'
import { useTasks } from '../contexts/TasksContext'

export default function NewTask() {
  const { editingTask, createTask, editTask } = useTasks()

  const taskRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const enteredTask = taskRef.current?.value || ''
    const enteredDescription = descriptionRef.current?.value || ''

    const newTask: TaskItem = {
      title: enteredTask,
      description: enteredDescription,
      id: editingTask ? editingTask.id : Math.random(),
      status: editingTask ? editingTask.status : 'all',
      completed: false,
      priority: editingTask ? editingTask.priority : false,
    }

    if (editingTask) {
      editTask(newTask)
      editTask(null)
    } else {
      createTask(newTask)
    }

    e.currentTarget.reset()
  }

  useEffect(() => {
    if (editingTask) {
      taskRef.current!.value = editingTask.title
      descriptionRef.current!.value = editingTask.description
    }
  }, [editingTask])

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor='name'>Task</label>
        <input id='name' type='text' ref={taskRef} />
      </p>
      <p>
        <label htmlFor='description'>Description</label>
        <input id='description' type='text' ref={descriptionRef} />
      </p>
      <p>
        <button>{editingTask ? 'Update Task' : 'New Task'}</button>
      </p>
    </form>
  )
}
