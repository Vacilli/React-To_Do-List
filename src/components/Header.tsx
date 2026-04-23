import { useLocation } from 'react-router-dom'
import { useTasks } from '../contexts/TasksContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTerminal, faPlus, faBell } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
  const {
    searchQuery,
    setSearchQuery,
    openPanel,
    closePanel,
    isPanelOpen,
    editingTask,
    setEditingTask,
  } = useTasks()
  const location = useLocation()
  const taskId = location.pathname.split('/').pop() || '000000'

  // Determine which protocol to run
  const isTaskDetail = location.pathname.startsWith('/task/')

  function handleNewEntry() {
    setEditingTask(null)
    openPanel()
  }

  // --- VIEW 1: ENTRY/EDIT PROTOCOL (The Slide-in Panel Header) ---
  if (isPanelOpen) {
    return (
      <header className='h-16 border-b border-slate-200 flex justify-between items-center bg-white px-6'>
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
          <p className='text-[10px] font-mono text-slate-400 mt-0.5 uppercase tracking-widest'>
            System Status: <span className='text-emerald-500'>Ready</span>
          </p>
        </div>

        <button
          onClick={closePanel}
          className='group flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-100 bg-slate-50 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 hover:border-slate-900 hover:text-slate-900 transition-all'
        >
          <span>Exit</span>
          <kbd className='bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-300 group-hover:text-slate-900'>
            ESC
          </kbd>
        </button>
      </header>
    )
  }

  // --- VIEW 2: DATA_PROTOCOL (Task Details) ---
  if (isTaskDetail) {
    return (
      <header className='h-16 border-b border-slate-200 bg-white flex items-center px-6 justify-between'>
        <div className='flex items-center gap-6'>
          <div className='flex items-center gap-3'>
            <div className='p-1.5'>
              <FontAwesomeIcon
                icon={faTerminal}
                className='text-[10px] text-black'
              />
            </div>
            <h2 className='text-sm font-black text-slate-900 uppercase tracking-[0.2em]'>
              Task_Data_Access
            </h2>
          </div>

          <div className='hidden lg:flex items-center gap-4 border-l border-slate-100 pl-6'>
            <div className='flex flex-col'>
              <span className='text-[9px] font-mono text-slate-400 uppercase tracking-tighter'>
                Hash_Signature
              </span>
              <span className='text-[10px] font-mono text-slate-500 uppercase font-bold'>
                {taskId.substring(0, 12)}...
              </span>
            </div>
            <div className='flex flex-col'>
              <span className='text-[9px] font-mono text-slate-400 uppercase tracking-tighter'>
                Connection
              </span>
              <span className='text-[10px] font-mono text-emerald-500 uppercase flex items-center gap-1.5 font-bold'>
                <span className='h-2 w-2 bg-emerald-500 rounded-full animate-pulse'></span>
                Secure_Link
              </span>
            </div>
          </div>
        </div>

        <div className='flex items-center gap-4'>
          <div className='px-3 py-1 bg-slate-50 border border-slate-100 rounded text-[9px] font-mono text-slate-400 uppercase tracking-widest'>
            Protocol: <span className='text-slate-900'>V-04-23-26</span>
          </div>
          <span className='text-[9px] font-mono text-slate-300 uppercase tracking-widest'>
            [ESC] TO_EXIT
          </span>
        </div>
      </header>
    )
  }

  // --- VIEW 3: SEARCH_PROTOCOL (Standard Home View) ---
  return (
    <header className='h-16 border-b border-slate-200 bg-white flex items-center px-6'>
      <div className='w-[80%] pr-8'>
        <div className='relative group flex items-center'>
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
          <span className='absolute right-0 w-2 h-4 bg-slate-900 animate-pulse hidden group-focus-within:block'></span>
        </div>
      </div>

      <div className='w-[20%] flex items-center justify-end gap-6'>
        <button
          onClick={handleNewEntry}
          className='flex items-center gap-2 bg-[#2f2f2f] text-white font-black text-[10px] uppercase tracking-[0.2em] py-2.5 px-5 hover:bg-emerald-500 transition-all'
        >
          <FontAwesomeIcon icon={faPlus} className='text-[8px]' />
          <span>New_Entry</span>
        </button>
        <button className='text-slate-300 hover:text-slate-900 transition-colors relative'>
          <FontAwesomeIcon icon={faBell} className='text-lg' />
          <span className='absolute -top-1 -right-1 flex h-2 w-2'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75'></span>
            <span className='relative inline-flex rounded-full h-2 w-2 bg-orange-500'></span>
          </span>
        </button>
      </div>
    </header>
  )
}
