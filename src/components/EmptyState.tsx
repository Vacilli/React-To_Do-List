import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTerminal, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useTasks } from '../contexts/TasksContext'

export default function EmptyState() {
  const { openPanel } = useTasks()

  return (
    <div className='flex flex-col items-center justify-center p-20 border-2 border-dashed border-white/5 rounded-sm bg-black/10'>
      {/* The Central Icon with a Pulse */}
      <div className='relative mb-6'>
        <div className='absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse' />
        <FontAwesomeIcon
          icon={faTerminal}
          className='relative text-4xl text-slate-700'
        />
      </div>

      {/* System Status Text */}
      <div className='text-center space-y-2'>
        <h3 className='text-sm font-black text-slate-100 uppercase tracking-[0.3em]'>
          SYSTEM_IDLE
        </h3>
        <p className='text-[10px] font-mono text-slate-500 uppercase tracking-widest'>
          No active threads found in current directory.
        </p>
      </div>

      {/* Tactical Prompt */}
      <div className='mt-8 flex flex-col items-center gap-4'>
        <div className='h-[1px] w-12 bg-white/10' />

        <button
          onClick={openPanel}
          className='group flex items-center gap-3 px-6 py-3 bg-white/5 border text-white border-white/10 hover:bg-white hover:text-black transition-all duration-300'
        >
          <FontAwesomeIcon icon={faPlus} className='text-[10px]' />
          <span className='text-[10px] font-black uppercase tracking-[0.2em]'>
            Initialize_New_Protocol
          </span>
        </button>

        <span className='text-[9px] font-mono text-slate-400 animate-pulse'>
          _waiting_for_input
        </span>
      </div>
    </div>
  )
}
