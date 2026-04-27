import { useLocation, useNavigate } from 'react-router-dom'
import { useTasks } from '../contexts/TasksContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTerminal, faPlus, faBell } from '@fortawesome/free-solid-svg-icons'

/**
 * REUSABLE COMPONENT: Exit Sequence
 * Tactical mechanical key look for "ESC" triggers.
 */
const ExitSequence = ({ onExit }: { onExit: () => void }) => (
  <div className='flex items-center gap-6'>
    {/* PROTOCOL VERSION: Sharp Chiseled Look */}
    <div className='flex items-center px-3 py-1 border-l-2 border-[var(--border-subtle)]'>
      <span className='text-[9px] font-mono text-[var(--text-dim)] uppercase tracking-[0.2em]'>
        PROT_ID:{' '}
        <span className='text-[var(--text-main)] font-black'>V-04-23-26</span>
      </span>
    </div>

    {/* EXIT TRIGGER: Mechanical Keycap */}
    <div
      onClick={onExit}
      className='flex items-center gap-3 group cursor-pointer'
    >
      <div
        className='
        relative flex items-center justify-center 
        px-2 py-0.5 
        bg-[var(--text-main)] text-[var(--bg-main)] 
        rounded-sm 
        font-mono font-black text-[9px] tracking-tighter
        shadow-[0_2px_0_0_var(--text-dim)] 
        group-hover:translate-y-[1px] 
        group-hover:shadow-[0_1px_0_0_var(--text-dim)] 
        active:translate-y-[2px] 
        active:shadow-none 
        transition-all duration-75
      '
      >
        ESC
      </div>
      <span className='text-[9px] font-mono font-bold text-[var(--text-dim)] uppercase tracking-[0.3em] group-hover:text-[var(--accent-color)] transition-colors'>
        EXIT_PROTOCOL
      </span>
    </div>
  </div>
)

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
  const navigate = useNavigate()
  const taskId = location.pathname.split('/').pop() || '000000'

  const isTaskDetail = location.pathname.startsWith('/task/')

  function handleNewEntry() {
    setEditingTask(null)
    openPanel()
  }

  const handleExit = () => {
    if (isPanelOpen) {
      closePanel()
    } else if (isTaskDetail) {
      navigate('/')
    }
  }

  const headerBaseClass =
    'h-16 border-b border-[var(--border-subtle)] bg-[var(--bg-task)] flex items-center px-6 justify-between transition-colors'

  // --- VIEW 1: ENTRY/EDIT PROTOCOL (Slide-in Panel) ---
  if (isPanelOpen) {
    return (
      <header className={headerBaseClass}>
        <div className='flex flex-col'>
          <div className='flex items-center gap-2'>
            <span className='relative flex h-2 w-2'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--text-dim)] opacity-40'></span>
              <span className='relative inline-flex rounded-full h-2 w-2 bg-[var(--text-dim)]'></span>
            </span>
            <h2 className='text-sm font-black text-[var(--text-main)] uppercase tracking-[0.25em]'>
              {editingTask ? 'Edit_Protocol' : 'New_Entry_Protocol'}
            </h2>
          </div>
          <p className='text-[10px] font-mono text-[var(--text-dim)] mt-0.5 uppercase tracking-widest'>
            System Status:{' '}
            <span className='text-emerald-500 font-bold'>Ready</span>
          </p>
        </div>
        <ExitSequence onExit={handleExit} />
      </header>
    )
  }

  // --- VIEW 2: DATA_PROTOCOL (Task Details) ---
  if (isTaskDetail) {
    return (
      <header className={headerBaseClass}>
        <div className='flex items-center gap-6'>
          <div className='flex items-center gap-3'>
            <div className='p-1.5'>
              <FontAwesomeIcon
                icon={faTerminal}
                className='text-[10px] text-[var(--text-main)]'
              />
            </div>
            <h2 className='text-sm font-black text-[var(--text-main)] uppercase tracking-[0.2em]'>
              Task_Data_Access
            </h2>
          </div>

          <div className='hidden lg:flex items-center gap-4 border-l border-[var(--border-subtle)] pl-6'>
            <div className='flex flex-col'>
              <span className='text-[9px] font-mono text-[var(--text-dim)] uppercase tracking-tighter'>
                Hash_Signature
              </span>
              <span className='text-[10px] font-mono text-[var(--text-main)] uppercase font-bold'>
                {taskId.substring(0, 12)}...
              </span>
            </div>
            <div className='flex flex-col'>
              <span className='text-[9px] font-mono text-[var(--text-dim)] uppercase tracking-tighter'>
                Connection
              </span>
              <span className='text-[10px] font-mono text-emerald-500 uppercase flex items-center gap-1.5 font-bold'>
                <span className='h-2 w-2 bg-emerald-500 rounded-full animate-pulse'></span>
                Secure_Link
              </span>
            </div>
          </div>
        </div>
        <ExitSequence onExit={handleExit} />
      </header>
    )
  }

  // --- VIEW 3: SEARCH_PROTOCOL (Home View) ---
  return (
    <header className={headerBaseClass}>
      <div className='w-[80%] pr-8'>
        <div className='relative group flex items-center'>
          <span className='absolute left-0 text-[var(--text-dim)] group-focus-within:text-[var(--text-main)] transition-colors'>
            <FontAwesomeIcon icon={faTerminal} className='text-xs' />
          </span>
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='EXECUTE_SEARCH_PROTOCOL...'
            className='w-full bg-transparent border-b border-[var(--border-subtle)] focus:border-[var(--text-main)] py-2 pl-7 pr-4 text-sm font-mono tracking-[0.1em] text-[var(--text-main)] focus:outline-none transition-all placeholder:text-[var(--text-dim)] uppercase'
          />
          <span className='absolute right-0 w-2 h-4 bg-[var(--text-main)] animate-pulse hidden group-focus-within:block'></span>
        </div>
      </div>

      <div className='w-[20%] flex items-center justify-end gap-6'>
        <button
          onClick={handleNewEntry}
          className='flex items-center gap-2 bg-[var(--text-main)] text-[var(--bg-sidebar)] hover:bg-[var(--accent-action)] hover:text-white font-black text-[10px] uppercase tracking-[0.2em] py-2.5 px-5 transition-all shadow-sm'
        >
          <FontAwesomeIcon icon={faPlus} className='text-[8px]' />
          <span>Initialize_Entry</span>
        </button>
        <button className='text-[var(--text-dim)] hover:text-[var(--text-main)] transition-colors relative'>
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
