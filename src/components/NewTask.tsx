import { FormEvent, useRef, useEffect, useState } from 'react'
import { type TaskItem, useTasks } from '../contexts/TasksContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlus,
  faSave,
  faTimes,
  faPen,
  faBolt,
  faFire,
} from '@fortawesome/free-solid-svg-icons'

interface NewTaskProps {
  onSave: () => void
}

export default function NewTask({ onSave }: NewTaskProps) {
  const { editingTask, updateTask, createTask, setEditingTask } = useTasks()
  const [error, setError] = useState<string | null>(null)

  // New state for the Priority selection
  const [isPriority, setIsPriority] = useState(false)

  const taskRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (editingTask && taskRef.current && descriptionRef.current) {
      taskRef.current.value = editingTask.title
      descriptionRef.current.value = editingTask.description
      setIsPriority(editingTask.priority) // Sync selection with editing task
    } else if (taskRef.current && descriptionRef.current) {
      taskRef.current.value = ''
      descriptionRef.current.value = ''
      setIsPriority(false) // Default to standard (Thunder)
    }
  }, [editingTask])

  function handleCancel() {
    setEditingTask(null)
    onSave()
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const title = taskRef.current?.value || ''
    const description = descriptionRef.current?.value || ''

    if (!title.trim()) {
      setError('Entry Title is required!')
      return
    }

    const taskData: TaskItem = editingTask
      ? {
          ...editingTask,
          title,
          description,
          priority: isPriority, // Save the selected state
          updatedAt: new Date().toISOString(),
        }
      : {
          id: crypto.randomUUID(),
          title,
          description,
          priority: isPriority, // Initialize with selected state
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

    if (editingTask) {
      updateTask(taskData)
    } else {
      createTask(taskData)
    }

    setEditingTask(null)
    setError(null)
    e.currentTarget.reset()
    onSave()
  }

  return (
    <div className='h-full flex flex-col bg-[var(--bg-sidebar)] text-[var(--text-main)]'>
      {/* Header Area */}
      <div className='p-8 border-b border-[var(--border-subtle)]'>
        <h2 className='text-lg font-black text-[var(--text-main)] uppercase tracking-tighter flex items-center gap-3'>
          <FontAwesomeIcon
            icon={editingTask ? faPen : faPlus}
            className={editingTask ? 'text-blue-400' : 'text-emerald-500'}
          />
          {editingTask ? 'EDIT_PROTOCOL' : 'INITIALIZE_ENTRY'}
        </h2>
        <p className='text-[9px] font-mono text-[var(--text-main)] mt-2 uppercase tracking-[0.4em] opacity-80'>
          {editingTask
            ? `RE_INDEXING_ID::${String(editingTask.id).slice(0, 8)}`
            : 'SYSTEM_READY::WAITING_FOR_INPUT'}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className='flex-1 flex flex-col border border-[var(--border-subtle)] p-8 space-y-6 bg-[var(--bg-main)]'
      >
        {/* Task Name Input */}
        <div className='space-y-3'>
          <label
            htmlFor='name'
            className='text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[var(--text-dim)] block'
          >
            // OBJECTIVE_IDENTIFIER
          </label>
          <input
            id='name'
            type='text'
            ref={taskRef}
            placeholder='DEFINE_TITLE...'
            className={`w-full bg-[var(--bg-sidebar)]/40 border-l-2 p-4 outline-none font-mono text-sm transition-all placeholder:text-[var(--text-dim)] text-[var(--text-main)] ${
              error
                ? 'border-red-500 bg-red-500/5'
                : 'border-[var(--border-subtle)] focus:border-blue-500 bg-[var(--bg-sidebar)]/20'
            }`}
          />
          {error && (
            <p className='text-red-500 font-mono text-[9px] uppercase tracking-widest mt-2'>
              !! ERROR: {error}
            </p>
          )}
        </div>

        {/* THREADING MODE SELECTOR (The Bug Fix) */}
        <div className='space-y-3'>
          <label className='text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[var(--text-dim)] block'>
            // SELECT_THREAD_TYPE
          </label>
          <div className='flex gap-3'>
            {/* Standard Link (Active) */}
            <button
              type='button'
              onClick={() => setIsPriority(false)}
              className={`flex-1 flex items-center justify-center gap-3 p-3 border transition-all duration-300 ${
                !isPriority
                  ? 'bg-blue-500/10 border-blue-500 text-blue-400'
                  : 'bg-[var(--bg-sidebar)]/20 border-[var(--border-subtle)] text-[var(--text-dim)] hover:border-[var(--text-main)]/20'
              }`}
            >
              <FontAwesomeIcon icon={faBolt} className='text-[10px]' />
              <span className='text-[10px] font-black uppercase tracking-widest'>
                Active
              </span>
            </button>

            {/* Critical Thread (Priority) */}
            <button
              type='button'
              onClick={() => setIsPriority(true)}
              className={`flex-1 flex items-center justify-center gap-3 p-3 border transition-all duration-300 ${
                isPriority
                  ? 'bg-orange-500/10 border-orange-500 text-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.05)]'
                  : 'bg-[var(--bg-sidebar)]/20 border-[var(--border-subtle)] text-[var(--text-dim)] hover:border-[var(--text-main)]/20'
              }`}
            >
              <FontAwesomeIcon icon={faFire} className='text-[10px]' />
              <span className='text-[10px] font-black uppercase tracking-widest'>
                Priority
              </span>
            </button>
          </div>
        </div>

        {/* Description Input */}
        <div className='space-y-3 flex-1 flex flex-col'>
          <label
            htmlFor='description'
            className='text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[var(--text-dim)] block'
          >
            // OPERATIONAL_CONTEXT
          </label>
          <div className='flex-1 flex flex-col bg-[var(--bg-sidebar)]/20 border-l-2 border-[var(--border-subtle)] focus-within:border-blue-500 transition-all'>
            <textarea
              id='description'
              ref={descriptionRef}
              placeholder='ENTER_DETAILS...'
              className='w-full h-full bg-transparent p-4 outline-none text-[var(--text-main)] font-mono text-sm placeholder:text-[var(--text-dim)] resize-none leading-relaxed'
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col gap-4 pt-4'>
          <button
            type='submit'
            className='w-full bg-[var(--text-main)] text-[var(--bg-sidebar)] hover:bg-[var(--accent-action)] hover:text-white py-4 font-black uppercase tracking-[0.3em] text-[11px] transition-all flex items-center justify-center gap-2 group'
          >
            <FontAwesomeIcon
              icon={faSave}
              className='group-hover:scale-110 transition-transform'
            />
            {editingTask ? 'UPDATE_THREAD' : 'COMMIT_TO_CODEX'}
          </button>

          <button
            type='button'
            onClick={handleCancel}
            className='w-full bg-[var(--bg-task)] border border-[var(--border-subtle)] text-[var(--text-main)] hover:text-red-500 hover:border-red-500/50 hover:bg-red-500/5 py-3 font-mono uppercase tracking-[0.2em] text-[10px] transition-all'
          >
            <FontAwesomeIcon icon={faTimes} className='mr-2' />
            ABORT_PROTOCOL
          </button>
        </div>
      </form>
    </div>
  )
}
