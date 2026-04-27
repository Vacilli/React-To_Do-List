import { Link } from 'react-router-dom'
import { useTasks, type TaskItem } from '../contexts/TasksContext'
import EditOrDeleteTask from './taskManipulation'

type TaskProps = {
  task: TaskItem
}

export default function Task({ task }: TaskProps) {
  const { viewMode } = useTasks()
  const isArchived = task.status === 'archived'

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return 'No date set'
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date)
  }

  const syntaxColors = {
    priority:
      'text-orange-400 border-orange-500/30 group-hover:border-orange-500',
    ongoing: 'text-blue-400 border-blue-500/30 group-hover:border-blue-500',
    completed:
      'text-emerald-400 border-emerald-500/30 group-hover:border-emerald-500',
    archived:
      'text-cyan-400 border-cyan-800/50 group-hover:border-[var(--accent-color)]',
  }

  const currentSyntax =
    task.status === 'archived'
      ? syntaxColors.archived
      : task.status === 'completed'
        ? syntaxColors.completed
        : task.priority
          ? syntaxColors.priority
          : syntaxColors.ongoing

  // --- 1. LIST VIEW LOGIC ---
  if (viewMode === 'list') {
    return (
      <div className='group relative flex flex-row items-center justify-between gap-6 p-6 bg-[var(--bg-task-inner)] border-b border-[var(--border-subtle)] transition-all duration-300'>
        {/* HUD Brackets */}
        <div
          className={`absolute top-0 left-0 w-2 h-2 border-t border-l opacity-0 group-hover:opacity-100 transition-all duration-300 ${currentSyntax.split(' ')[2]}`}
        />
        <div
          className={`absolute top-0 right-0 w-2 h-2 border-t border-r opacity-0 group-hover:opacity-100 transition-all duration-300 ${currentSyntax.split(' ')[2]}`}
        />
        <div
          className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l opacity-0 group-hover:opacity-100 transition-all duration-300 ${currentSyntax.split(' ')[2]}`}
        />
        <div
          className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r opacity-0 group-hover:opacity-100 transition-all duration-300 ${currentSyntax.split(' ')[2]}`}
        />

        {/* LEFT: Core Data Stack */}
        <div className='flex flex-col gap-1 relative z-10 flex-grow min-w-0'>
          <div className='flex items-center gap-3'>
            <span
              className={`text-[9px] font-mono font-bold uppercase tracking-[0.2em] ${isArchived ? 'text-[var(--accent-color)]/70' : currentSyntax.split(' ')[0]}`}
            >
              {isArchived
                ? '[V]'
                : task.status === 'completed'
                  ? '[]'
                  : task.priority
                    ? '!!'
                    : '>>'}
            </span>
            <h2
              className={`text-base font-black uppercase tracking-tight truncate ${task.status === 'completed' ? 'line-through text-[var(--text-dim)]' : 'text-[var(--text-main)]'}`}
            >
              {task.title}
            </h2>
          </div>

          {task.description && (
            <p className='text-[12px] font-mono text-[var(--text-dim)] italic line-clamp-1 pl-7'>
              /* {task.description} */
            </p>
          )}

          <div className='flex items-center gap-2 pl-7 opacity-40 group-hover:opacity-80 transition-opacity'>
            <span className='text-[9px] font-mono uppercase tracking-widest text-[var(--text-dim)]'>
              timestamp:
            </span>
            <span
              className={`text-[10px] font-mono font-bold ${isArchived ? 'text-cyan-600' : 'text-emerald-500'}`}
            >
              '{formatDate(task.createdAt)}'
            </span>
          </div>
        </div>

        {/* RIGHT: Control Modules */}
        <div className='flex items-center gap-4 relative z-10 shrink-0'>
          <div className='flex justify-end border-[var(--border-subtle)]'>
            <EditOrDeleteTask task={task} />
          </div>

          <Link
            to={`/task/${task.id}`}
            className={`text-[9px] font-black uppercase tracking-widest px-4 py-2 border transition-all duration-300 ${
              isArchived
                ? 'border-cyan-900 text-cyan-900 group-hover:border-cyan-400 group-hover:text-cyan-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]'
                : `${currentSyntax} hover:bg-[var(--text-main)]/5`
            }`}
          >
            {isArchived ? 'DECRYPT_LOG' : 'DEBUG_LOG'}
          </Link>
        </div>
      </div>
    )
  }

  // --- 2. GRID VIEW LOGIC ---
  return (
    <article
      className={`group relative p-5 transition-all duration-200 shadow-2xl
        ${isArchived ? 'bg-[var(--bg-task-inner)] border border-cyan-900/30' : 'bg-[var(--bg-task-inner)] border border-[var(--border-subtle)]'} 
        ${task.status === 'completed' ? 'opacity-50' : 'opacity-100'}`}
    >
      {/* HUD Brackets */}
      <div
        className={`absolute top-0 left-0 w-2 h-2 border-t border-l opacity-0 group-hover:opacity-100 transition-all duration-300 ${currentSyntax.split(' ')[2]}`}
      />
      <div
        className={`absolute top-0 right-0 w-2 h-2 border-t border-r opacity-0 group-hover:opacity-100 transition-all duration-300 ${currentSyntax.split(' ')[2]}`}
      />
      <div
        className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l opacity-0 group-hover:opacity-100 transition-all duration-300 ${currentSyntax.split(' ')[2]}`}
      />
      <div
        className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r opacity-0 group-hover:opacity-100 transition-all duration-300 ${currentSyntax.split(' ')[2]}`}
      />

      <div className='space-y-3 relative z-10'>
        <div className='flex justify-between items-start'>
          <div className='flex flex-col flex-grow'>
            <span
              className={`text-[9px] font-mono font-bold uppercase tracking-[0.2em] mb-1 
              ${isArchived ? 'text-[var(--accent-color)]/50 group-hover:text-[var(--accent-color)]' : currentSyntax.split(' ')[0]}`}
            >
              {isArchived
                ? '[V]'
                : task.status === 'completed'
                  ? '[]'
                  : task.priority
                    ? '!!'
                    : '>>'}{' '}
              {isArchived
                ? 'CODEX_ARCHIVE'
                : task.status === 'completed'
                  ? 'ARCHIVED_SYNC'
                  : task.priority
                    ? 'PRIORITY_LINK'
                    : 'ACTIVE_THREAD'}
            </span>
            <h2
              className={`text-base font-black tracking-tight uppercase transition-colors min-h-[3rem] flex items-center
              ${isArchived ? 'text-cyan-100/90 group-hover:text-[var(--text-main)]' : 'text-[var(--text-main)]'} 
              ${task.status === 'completed' ? 'line-through decoration-[var(--text-dim)]' : ''}`}
            >
              {task.title}
            </h2>
          </div>

          <span
            className={`text-[9px] font-mono transition-colors ${isArchived ? 'text-cyan-800' : 'text-[var(--text-dim)]/50 group-hover:text-[var(--text-dim)]'}`}
          >
            0x{String(task.id).slice(0, 4).toUpperCase()}
          </span>
        </div>

        <p
          className={`text-md leading-5 line-clamp-2 font-mono italic transition-colors flex-grow min-h-[40px] ${isArchived ? 'text-cyan-900 group-hover:text-cyan-400' : 'text-[var(--text-dim)]'}`}
        >
          /* {task.description || 'no_context_provided'} */
        </p>

        <div className='flex items-center gap-4 pt-2'>
          <div className='flex flex-col opacity-60 group-hover:opacity-100 transition-opacity'>
            <span
              className={`text-[10px] font-mono uppercase tracking-tighter ${isArchived ? 'text-[var(--accent-color)]' : 'text-[var(--text-main)]'}`}
            >
              const timestamp =
            </span>
            <p
              className={`text-[11px] font-mono font-bold uppercase ${isArchived ? 'text-cyan-600 group-hover:text-cyan-400' : 'text-emerald-500'}`}
            >
              '{formatDate(task.createdAt)}'
            </p>
          </div>

          <Link
            to={`/task/${task.id}`}
            className={`ml-auto text-[9px] font-black uppercase tracking-widest px-3 py-1.5 border transition-all ${
              isArchived
                ? 'border-cyan-900 text-cyan-900 group-hover:border-cyan-400 group-hover:text-cyan-400 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.3)]'
                : currentSyntax
            }`}
          >
            {isArchived ? 'DECRYPT_LOG' : 'DEBUG_LOG'}
          </Link>
        </div>
      </div>

      <div
        className={`mt-5 pt-4 border-t flex justify-end ${isArchived ? 'border-cyan-900/20' : 'border-[var(--border-subtle)]'}`}
      >
        <EditOrDeleteTask task={task} />
      </div>
    </article>
  )
}
