import { useTasks } from '../contexts/TasksContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTerminal, faPlus, faBell } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
  const { searchQuery, setSearchQuery, openPanel, setEditingTask } = useTasks()

  function handleClick() {
    setEditingTask(null)
    openPanel()
  }

  return (
    <header className='h-16 border-b border-slate-200 bg-white flex items-center px-6'>
      {/* 80% Section: Terminal Search Bar */}
      <div className='w-[80%] pr-8'>
        <div className='relative group flex items-center'>
          {/* Terminal Icon instead of Search Glass */}
          <span className='absolute left-0 text-slate-400 group-focus-within:text-slate-900 transition-colors'>
            <FontAwesomeIcon icon={faTerminal} className='text-xs' />
          </span>

          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='EXECUTE_SEARCH_PROTOCOL...'
            className='w-full bg-transparent border-b border-slate-100 focus:border-slate-900 py-2 pl-7 pr-4 text-sm font-mono tracking-[0.1em] text-slate-900 focus:outline-none transition-all placeholder:text-slate-300 uppercase'
          />

          {/* The "Live" Blinking Cursor - only shows when typing */}
          <span className='absolute right-0 w-2 h-4 bg-slate-900 animate-pulse hidden group-focus-within:block shadow-[0_0_8px_rgba(0,0,0,0.2)]'></span>
        </div>
      </div>

      {/* 20% Section: System Actions */}
      <div className='w-[20%] flex items-center justify-end gap-6'>
        {/* New Task Button with the Obsidian/Yellow Logic */}
        <button
          onClick={handleClick}
          className='flex items-center gap-2 bg-[#2f2f2f] text-white font-black text-[10px] uppercase tracking-[0.2em] py-2.5 px-5 hover:bg-emerald-500 hover:text-white active:scale-95 transition-all shadow-black/10'
        >
          <FontAwesomeIcon icon={faPlus} className='text-[8px]' />
          <span>New_Entry</span>
        </button>

        {/* Notification Icon - Simplified */}
        <button className='text-slate-300 hover:text-slate-900 transition-colors relative'>
          <FontAwesomeIcon icon={faBell} className='text-lg' />
          {/* A tiny status dot to make it feel alive */}
          <span className='absolute -top-1 -right-1 flex h-2 w-2'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75'></span>
            <span className='relative inline-flex rounded-full h-2 w-2 bg-orange-500'></span>
          </span>
        </button>
      </div>
    </header>
  )
}
