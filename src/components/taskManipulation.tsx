import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrash,
  faPenToSquare,
  faFire,
  faCheckDouble,
  faRotateLeft,
  faBoxArchive, // New for the Vault
} from '@fortawesome/free-solid-svg-icons'
import { type TaskItem } from '../contexts/TasksContext'
import { useTasks } from '../contexts/TasksContext'

export default function EditOrDeleteTask({ task }: { task: TaskItem }) {
  const { deleteTask, setEditingTask, openPanel, updateTask } = useTasks()

  const handleEdit = () => {
    setEditingTask(task)
    openPanel()
  }

  // Base style preserved exactly
  const btnBase =
    'p-2.5 transition-all duration-200 flex items-center justify-center border border-white/5 bg-white/5 hover:bg-white/10'

  return (
    <div className='flex items-center gap-1 bg-black/40 p-1 rounded-sm border border-white/10'>
      {/* PRIORITY - Only show if NOT completed/archived */}
      {task.status === 'active' && (
        <button
          onClick={() => updateTask({ ...task, priority: !task.priority })}
          className={`${btnBase} hover:border-orange-500/50 text-slate-500 hover:text-orange-500`}
        >
          <FontAwesomeIcon
            icon={faFire}
            className={`w-3.5 h-3.5 transition-all ${
              task.priority
                ? 'text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]'
                : ''
            }`}
          />
        </button>
      )}

      {/* EDIT - Only show if NOT completed/archived */}
      {task.status === 'active' && (
        <button
          onClick={handleEdit}
          className={`${btnBase} hover:border-blue-500/50 text-slate-500 hover:text-blue-500`}
        >
          <FontAwesomeIcon icon={faPenToSquare} className='w-3.5 h-3.5' />
        </button>
      )}

      {/* ARCHIVE - Only shows when COMPLETED */}
      {task.status === 'completed' && (
        <button
          onClick={() => updateTask({ ...task, status: 'archived' })}
          className={`${btnBase} border-cyan-500/30 text-cyan-500 hover:text-cyan-400 hover:border-cyan-500/60`}
          title='Move to Deep_Sync_Vault'
        >
          <FontAwesomeIcon icon={faBoxArchive} className='w-3.5 h-3.5' />
        </button>
      )}

      {/* RESTORE / COMPLETE TOGGLE */}
      {/* If Archived, this button restores to active. If Active/Comp, it toggles between them. */}
      <button
        onClick={() => {
          let nextStatus: 'active' | 'completed' = 'completed'
          if (task.status === 'completed' || task.status === 'archived') {
            nextStatus = 'active'
          }
          updateTask({
            ...task,
            status: nextStatus,
            updatedAt: new Date().toISOString(),
          })
        }}
        className={`${btnBase} ${
          task.status !== 'active'
            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
            : 'hover:border-emerald-500/50 text-slate-500 hover:text-emerald-400'
        }`}
      >
        <FontAwesomeIcon
          icon={task.status !== 'active' ? faRotateLeft : faCheckDouble}
          className='w-3.5 h-3.5'
        />
      </button>

      {/* Vertical Spacer */}
      <div className='w-[1px] h-4 bg-white/10 mx-1' />

      {/* DELETE - Purge from Codex */}
      <button
        onClick={() => deleteTask(task.id)}
        className={`${btnBase} text-slate-500 hover:text-red-500 hover:border-red-500/50 ${
          task.status === 'archived' ? 'border-red-900/50 text-red-900' : ''
        }`}
      >
        <FontAwesomeIcon icon={faTrash} className='w-3.5 h-3.5' />
      </button>
    </div>
  )
}
