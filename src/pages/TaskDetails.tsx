import { useParams, useNavigate } from 'react-router-dom'
import { useSystemEscape } from '../hooks/useSystemEscape'
import { useTasks } from '../contexts/TasksContext'
import {
  faArrowLeft,
  faCalendarAlt,
  faSync,
  faBoxArchive,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function TaskDetails() {
  const { id } = useParams()
  const { allTasks } = useTasks()
  const navigate = useNavigate()
  const task = allTasks.find((t) => t.id === id)

  useSystemEscape('/')

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date)
  }

  // --- VIEW 0: 404 SYSTEM ALERT ---
  if (!task) {
    return (
      <div className='absolute inset-0 flex flex-col items-center justify-center bg-[var(--bg-main)] text-center z-[50]'>
        {/* 'absolute inset-0' is the key here. 
         It tells the component to fill its parent container 
         EXACTLY, ignoring external padding and preventing 
         the extra 100vh height jump.
      */}

        <div className='relative mb-8'>
          <div className='absolute inset-0 bg-red-500/10 blur-2xl animate-pulse' />
          <div className='text-red-600 text-6xl font-black font-mono tracking-tighter'>
            404
          </div>
        </div>

        <div className='max-w-md space-y-4 px-6'>
          <h2 className='text-xl font-black text-[var(--text-main)] uppercase tracking-[0.3em]'>
            CRITICAL_ERROR: SECTOR_NULL
          </h2>

          <div className='bg-red-500/5 border-l-2 border-red-600 p-4 font-mono text-[11px] text-red-500 leading-relaxed uppercase tracking-wider text-left'>
            <p>
              [ALERT] Identity sequence "{id?.slice(0, 12)}..." could not be
              located.
            </p>
            <p className='mt-2'>
              Possibility: Data_Purge, Invalid_Link, or Memory_Corruption.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          className='mt-12 flex items-center gap-3 px-8 py-3 bg-transparent border border-[var(--border-subtle)] text-[var(--text-dim)] hover:border-red-600 hover:text-red-600 transition-all duration-300 group'
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className='text-[10px] group-hover:-translate-x-1 transition-transform'
          />
          <span className='text-[10px] font-black uppercase tracking-[0.4em]'>
            Return_to_Safe_Root
          </span>
        </button>
      </div>
    )
  }

  // THEME ENGINE: Centralized color logic
  const getStatusTheme = () => {
    if (task.status === 'archived')
      return {
        color: 'text-[var(--accent-primary)]',
        border: 'border-[var(--accent-secondary)]/50',
        bg: 'bg-[var(--accent-secondary)]/5',
        label: 'VAULT_FRAGMENT',
      }
    if (task.status === 'completed')
      return {
        color: 'text-emerald-500',
        border: 'border-emerald-500/50',
        bg: 'bg-emerald-500/5',
        label: 'COMPLETED_PROTOCOL',
      }
    if (task.priority)
      return {
        color: 'text-orange-500',
        border: 'border-orange-500/50',
        bg: 'bg-orange-500/5',
        label: 'CRITICAL_THREAD',
      }
    return {
      color: 'text-blue-500',
      border: 'border-blue-500/50',
      bg: 'bg-blue-500/5',
      label: 'STANDARD_LOG',
    }
  }

  const theme = getStatusTheme()

  return (
    <div className='max-w-5xl mx-auto py-12 px-6 h-full overflow-y-auto animate-scan'>
      {/* 1. Header Navigation */}
      <button
        className='flex items-center gap-2 text-[var(--text-dim)] hover:text-[var(--text-main)] transition-colors mb-12 group'
        onClick={() => navigate(-1)}
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          className='text-xs transition-transform group-hover:-translate-x-1'
        />
        <span className='text-[10px] font-black uppercase tracking-[0.4em]'>
          Root // Tasks //{' '}
          <span className={`animate-pulse ${theme.color}`}>
            {task.id.slice(0, 8)}
          </span>
        </span>
      </button>

      {/* 2. The Main Protocol Window */}
      <div
        className={`bg-[var(--bg-task-inner)] border rounded-sm shadow-2xl transition-all duration-500 relative border-[var(--border-subtle)]`}
      >
        {task.status === 'archived' && (
          <>
            <div className='absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-[var(--accent-secondary)]/40' />
            <div className='absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-[var(--accent-secondary)]/40' />
          </>
        )}

        {/* Status Bar */}
        <div
          className={`p-6 border-b bg-[var(--bg-sidebar)]/30 flex flex-wrap gap-4 items-center justify-between border-[var(--border-subtle)]`}
        >
          <div className='flex gap-3'>
            <span
              className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest border ${theme.border} ${theme.color} ${theme.bg}`}
            >
              {theme.label}
            </span>
            <span
              className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest border ${
                task.status === 'archived'
                  ? 'border-[var(--accent-secondary)]/50 text-[var(--accent-primary)] bg-[var(--accent-secondary)]/5'
                  : 'border-[var(--border-subtle)] text-[var(--text-dim)]'
              }`}
            >
              {task.status === 'archived'
                ? 'DEEP_SYNC_ACTIVE'
                : 'PROCESS_ACTIVE'}
            </span>
          </div>
          <span
            className={`text-[9px] font-mono transition-colors duration-500 ${theme.color}`}
          >
            UID: {task.id.toUpperCase()}
          </span>
        </div>

        {/* Content Area */}
        <div className='p-10 relative overflow-hidden'>
          <div className='mb-12 relative z-10'>
            <span
              className={`text-[10px] font-mono uppercase tracking-[0.3em] mb-4 block ${task.status === 'archived' ? 'text-[var(--accent-secondary)]' : 'text-[var(--text-dim)]'}`}
            >
              //{' '}
              {task.status === 'archived'
                ? 'Archive_Sequence_Entry'
                : 'Protocol_Title'}
            </span>
            <h1
              className={`text-5xl font-black tracking-tighter leading-none uppercase transition-colors duration-500 ${task.status === 'archived' ? 'text-[var(--text-main)]' : 'text-[var(--text-main)]'}`}
            >
              {task.title}
            </h1>
          </div>

          <div className='space-y-4 relative z-10'>
            <span
              className={`text-[10px] font-mono uppercase tracking-[0.3em] block ${task.status === 'archived' ? 'text-[var(--accent-secondary)]' : 'text-[var(--text-dim)]'}`}
            >
              //{' '}
              {task.status === 'archived'
                ? 'Fragment_Parameters'
                : 'Operational_Parameters'}
            </span>
            <div className='bg-[var(--bg-main)]/30 p-8 border-l-2 transition-colors border-[var(--border-subtle)]'>
              <p
                className={`text-lg leading-relaxed whitespace-pre-wrap font-mono italic transition-colors text-[var(--text-main)]/80`}
              >
                /* {task.description || 'No context provided for this entry.'}{' '}
                */
              </p>
            </div>
          </div>
        </div>

        {/* Technical Metadata Footer */}
        <div
          className={`p-6 bg-[var(--bg-sidebar)]/50 border-t grid grid-cols-1 md:grid-cols-2 gap-8 border-[var(--border-subtle)]`}
        >
          <div className='flex items-start gap-4'>
            <div className='w-12 h-12 border flex items-center justify-center bg-[var(--text-main)]/5 transition-colors border-[var(--border-subtle)] text-[var(--text-dim)]'>
              <FontAwesomeIcon
                icon={task.status === 'archived' ? faBoxArchive : faCalendarAlt}
                className='text-sm'
              />
            </div>
            <div>
              <p
                className={`text-[9px] font-mono uppercase tracking-[0.2em] mb-1 ${theme.color}`}
              >
                {task.status === 'archived'
                  ? 'Seal_Timestamp_Ref'
                  : 'Init_Timestamp'}
              </p>
              <p
                className={`text-xs font-black font-mono tracking-widest text-[var(--text-main)]`}
              >
                '{formatDateTime(task.createdAt)}'
              </p>
            </div>
          </div>

          <div
            className={`flex items-start gap-4 transition-opacity ${task.updatedAt ? 'opacity-100' : 'opacity-20'}`}
          >
            <div className='w-12 h-12 border flex items-center justify-center bg-[var(--text-main)]/5 border-[var(--border-subtle)] text-[var(--text-dim)]'>
              <FontAwesomeIcon
                icon={faSync}
                className={
                  task.updatedAt
                    ? task.status === 'archived'
                      ? 'text-[var(--accent-secondary)] text-sm'
                      : theme.color
                    : 'text-sm'
                }
              />
            </div>
            <div>
              <p
                className={`text-[9px] font-mono uppercase tracking-[0.2em] mb-1 ${theme.color}`}
              >
                {task.status === 'completed'
                  ? 'Final_Sync_Stamp'
                  : 'Last_Sync_Event'}
              </p>
              <p
                className={`text-xs font-black font-mono tracking-widesttext-[var(--text-main)]`}
              >
                {task.updatedAt
                  ? `'${formatDateTime(task.updatedAt)}'`
                  : 'STABLE_VERSION'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
