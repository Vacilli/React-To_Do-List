import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFilter,
  faTableCellsLarge,
  faList,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons'
import { useTasks } from '../contexts/TasksContext'

export default function TaskListControls() {
  const { tasks } = useTasks()
  const totalTasks = tasks.length

  // Shared "Terminal Input" style for the dropdown and buttons
  const ctrlBase =
    'flex items-center gap-2 bg-black/20 border border-white/5 px-3 py-1.5 transition-all duration-200'

  return (
    <div className='flex items-center justify-between px-2 py-4 bg-[#191b1c] border-b border-white/5'>
      {/* LEFT SIDE: Protocol Counter */}
      <div className='flex items-center gap-3'>
        <div className='flex flex-col'>
          <span className='text-[10px] font-mono text-slate-100 uppercase tracking-tighter'>
            Active_Processes
          </span>
          <div className='flex items-center gap-2'>
            <span className='text-lg font-black font-mono text-white'>
              {String(totalTasks).padStart(2, '0')}
            </span>
            <span className='h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]' />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: System Parameters */}
      <div className='flex items-center gap-3'>
        {/* SORT SELECTOR */}
        <div className='relative group'>
          <div
            className={`${ctrlBase} hover:border-white/20 hover:bg-white/5 cursor-pointer`}
          >
            <FontAwesomeIcon
              icon={faFilter}
              className='w-3 h-3 text-slate-500 group-hover:text-blue-400'
            />
            <span className='text-[10px] font-bold uppercase tracking-widest text-slate-300'>
              Sort_By::Date_Created
            </span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className='w-2 h-2 text-slate-600'
            />
          </div>
        </div>

        {/* SEPARATOR */}
        <div className='h-6 w-[1px] bg-white/5 mx-1' />

        {/* DISPLAY MODE (Grid vs List) */}
        <div className='flex bg-black/40 p-1 border border-white/5'>
          <button
            className='p-1.5 px-3 bg-white/10 text-white border border-white/10 transition-all'
            title='Grid_Layout'
          >
            <FontAwesomeIcon icon={faTableCellsLarge} className='w-3 h-3' />
          </button>
          <button
            className='p-1.5 px-3 text-slate-600 hover:text-slate-300 transition-all'
            title='List_Layout'
          >
            <FontAwesomeIcon icon={faList} className='w-3 h-3' />
          </button>
        </div>
      </div>
    </div>
  )
}
