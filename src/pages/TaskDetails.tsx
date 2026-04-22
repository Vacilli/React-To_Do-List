import { useParams, useNavigate } from 'react-router-dom'
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
  const { tasks } = useTasks()
  const navigate = useNavigate()
  const task = tasks.find((t) => t.id === id)

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

  // GUARD CLAUSE: If task is missing, show the 404 System Alert
  if (!task) {
    return (
      <div className='flex flex-col items-center justify-center h-full bg-[#0d0d0d] p-6 text-center'>
        <div className='relative mb-8'>
          <div className='absolute inset-0 bg-red-500/10 blur-2xl animate-pulse' />
          <div className='text-red-500 text-6xl font-black font-mono tracking-tighter'>
            404
          </div>
        </div>
        <div className='max-w-md space-y-4'>
          <h2 className='text-xl font-black text-white uppercase tracking-[0.3em]'>
            CRITICAL_ERROR: SECTOR_NULL
          </h2>
          <div className='bg-red-500/5 border-l-2 border-red-500 p-4 font-mono text-[11px] text-red-400/80 leading-relaxed uppercase tracking-wider'>
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
          onClick={() => navigate(-1)}
          className='mt-12 flex items-center gap-3 px-8 py-3 bg-transparent border border-white/10 text-slate-500 hover:border-red-500 hover:text-red-500 transition-all duration-300 group'
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
        color: 'text-yellow-600',
        border: 'border-yellow-600',
        bg: 'bg-yellow-600/5',
        label: 'VAULT_FRAGMENT',
      }
    if (task.status === 'completed')
      return {
        color: 'text-emerald-500/70',
        border: 'border-emerald-500/50',
        bg: 'bg-emerald-500/5',
        label: 'COMPLETED_PROTOCOL',
      }
    if (task.priority)
      return {
        color: 'text-orange-500/70',
        border: 'border-orange-500/50',
        bg: 'bg-orange-500/5',
        label: 'CRITICAL_THREAD',
      }
    return {
      color: 'text-blue-500/70',
      border: 'border-blue-500/50',
      bg: 'bg-blue-500/5',
      label: 'STANDARD_LOG',
    }
  }

  const theme = getStatusTheme()

  return (
    <div className='max-w-5xl mx-auto py-12 px-6 h-full overflow-y-auto'>
      {/* 1. Header Navigation */}
      <button
        className='flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 group'
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
        className={`bg-[#1e1e1e] border rounded-sm shadow-2xl transition-all duration-500 relative border-white/5`}
      >
        {task.status === 'archived' && (
          <>
            <div className='absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-yellow-600/40' />
            <div className='absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-yellow-600/40' />
          </>
        )}

        {/* Status Bar */}
        <div
          className={`p-6 border-b bg-black/50 flex flex-wrap gap-4 items-center justify-between 'border-white/5`}
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
                  ? 'border-cyan-400/50 text-cyan-400 bg-cyan-400/5'
                  : 'border-slate-500/50 text-slate-400'
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
          {task.status === 'archived' && (
            <div className='absolute inset-0 opacity-[0.03] pointer-events-none bg-[#111]' />
          )}
          <div className='mb-12 relative z-10'>
            <span
              className={`text-[10px] font-mono uppercase tracking-[0.3em] mb-4 block ${task.status === 'archived' ? 'text-cyan-600' : 'text-slate-500'}`}
            >
              //{' '}
              {task.status === 'archived'
                ? 'Archive_Sequence_Entry'
                : 'Protocol_Title'}
            </span>
            <h1
              className={`text-5xl font-black tracking-tighter leading-none uppercase transition-colors duration-500 ${task.status === 'archived' ? 'text-white' : 'text-slate-100'}`}
            >
              {task.title}
            </h1>
          </div>

          <div className='space-y-4 relative z-10'>
            <span
              className={`text-[10px] font-mono uppercase tracking-[0.3em] block ${task.status === 'archived' ? 'text-cyan-600' : 'text-slate-500'}`}
            >
              //{' '}
              {task.status === 'archived'
                ? 'Fragment_Parameters'
                : 'Operational_Parameters'}
            </span>
            <div
              className={`bg-black/20 p-8 border-l-2 transition-colors border-white/5'}`}
            >
              <p
                className={`text-lg leading-relaxed whitespace-pre-wrap font-mono italic transition-colors ${task.status === 'archived' ? 'text-cyan-500/70' : 'text-slate-300'}`}
              >
                /* {task.description || 'No context provided for this entry.'}{' '}
                */
              </p>
            </div>
          </div>
        </div>

        {/* Technical Metadata Footer */}
        <div
          className={`p-6 bg-black/40 border-t grid grid-cols-1 md:grid-cols-2 gap-8 ${task.status === 'archived' ? 'border-yellow-600/10' : 'border-white/5'}`}
        >
          <div className='flex items-start gap-4'>
            <div className='w-12 h-12 border flex items-center justify-center bg-white/5 transition-colors border-white/10 text-slate-500'>
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
                className={`text-xs font-black font-mono tracking-widest ${task.status === 'archived' ? 'text-cyan-400' : 'text-white'}`}
              >
                '{formatDateTime(task.createdAt)}'
              </p>
            </div>
          </div>

          <div
            className={`flex items-start gap-4 transition-opacity ${task.updatedAt ? 'opacity-100' : 'opacity-20'}`}
          >
            <div className='w-12 h-12 border flex items-center justify-center bg-white/5 border-white/10 text-slate-500'>
              <FontAwesomeIcon
                icon={faSync}
                className={
                  task.updatedAt
                    ? task.status === 'archived'
                      ? 'text-cyan-400 text-sm'
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
                className={`text-xs font-black font-mono tracking-widest ${task.status === 'archived' ? 'text-cyan-400' : 'text-white'}`}
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
