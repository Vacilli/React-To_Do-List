import { useTasks } from '../contexts/TasksContext'
import { useSystemEscape } from '../hooks/useSystemEscape'

export default function ProtocolHeader() {
  const { editingTask } = useTasks()
  const abort = useSystemEscape('/') // Our clever hook handles keypresses and button

  return (
    <div className='h-16 p-6 border-b border-slate-200 flex justify-between items-center bg-white'>
      <div className='flex flex-col'>
        <div className='flex items-center gap-2'>
          <span className='relative flex h-2 w-2'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75'></span>
            <span className='relative inline-flex rounded-full h-2 w-2 bg-slate-500'></span>
          </span>
          <h2 className='text-sm font-black text-slate-900 uppercase tracking-[0.25em]'>
            {editingTask ? 'Edit_Protocol' : 'New_Entry_Protocol'}
          </h2>
        </div>
        <p className='text-[10px] font-mono text-slate-400 mt-1 uppercase tracking-widest'>
          System Status: <span className='text-emerald-500'>Ready</span> //{' '}
          {new Date().toLocaleDateString('en-CR')}
        </p>
      </div>

      <button
        onClick={abort}
        className='group flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-100 bg-slate-50 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 hover:border-slate-900 hover:text-slate-900 transition-all shadow-sm'
      >
        <span>Exit</span>
        <kbd className='bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-300 group-hover:text-slate-900 transition-colors'>
          ESC
        </kbd>
      </button>
    </div>
  )
}
