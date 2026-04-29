import { TaskFilter, useTasks } from '../contexts/TasksContext'
import { useTheme } from '../contexts/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSun,
  faMoon,
  faFire,
  faBolt,
  faCheckDouble,
  faPlus,
  faTerminal,
  IconDefinition,
  faBoxArchive,
} from '@fortawesome/free-solid-svg-icons'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Sidebar() {
  const { allTasks, setEditingTask, selectedFilter, setFilter, openPanel } =
    useTasks()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation() // 2. Grab current path

  const handleNewTaskClick = () => {
    setEditingTask(null)
    openPanel()
  }

  const handleFilterClick = (id: TaskFilter) => {
    // 3. Check if we are currently on a Task Detail route
    const isDetailView = location.pathname.startsWith('/task/')

    if (isDetailView) {
      // FORCE HOME FIRST: Kill the component before the data changes
      navigate('/')

      // Delay the filter/state update slightly to ensure
      // the TaskDetails component has unmounted.
      setTimeout(() => {
        setEditingTask(null)
        setFilter(id)
      }, 0)
    } else {
      // NORMAL FLOW: Stay on home, just change the list
      setEditingTask(null)
      setFilter(id)
    }
  }

  const priorityCount = allTasks.filter((t) => t.priority).length
  const activeCount = allTasks.filter((t) => t.status === 'active').length
  const completedCount = allTasks.filter((t) => t.status === 'completed').length
  const archiveCount = allTasks.filter((t) => t.status === 'archived').length

  const navItems: {
    id: TaskFilter
    label: string
    icon: IconDefinition
    activeColor: string
    hoverColor: string
    baseColor: string
    count: number
  }[] = [
    {
      id: 'all',
      label: 'All_Entries',
      icon: faTerminal,
      activeColor: theme === 'dark' ? 'text-slate-200' : 'text-slate-900',
      hoverColor:
        theme === 'dark'
          ? 'group-hover:text-slate-200'
          : 'group-hover:text-slate-900',
      baseColor: theme === 'dark' ? 'text-slate-200/20' : 'text-slate-900/30',
      count: allTasks.length - archiveCount,
    },
    {
      id: 'priority',
      label: 'Priority_Link',
      icon: faFire,
      activeColor: 'text-orange-500',
      hoverColor: 'group-hover:text-orange-500',
      baseColor: 'text-orange-500/20',
      count: priorityCount,
    },
    {
      id: 'active',
      label: 'Active_Threads',
      icon: faBolt,
      activeColor: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
      hoverColor:
        theme === 'dark'
          ? 'group-hover:text-blue-400'
          : 'group-hover:text-blue-600',
      baseColor: theme === 'dark' ? 'text-blue-400/20' : 'text-blue-600/20',
      count: activeCount,
    },
    {
      id: 'completed',
      label: 'Completed_Logs',
      icon: faCheckDouble,
      activeColor: 'text-emerald-500',
      hoverColor: 'group-hover:text-emerald-500',
      baseColor: 'text-emerald-500/20',
      count: completedCount,
    },
  ]

  return (
    <aside className='w-full h-full bg-[var(--bg-sidebar)] text-[var(--text-main)] p-6 flex flex-col border-r border-[var(--border-subtle)]'>
      {/* System Branding */}
      <div className='mb-12'>
        <h1 className='text-sm font-black tracking-[0.4em] uppercase text-[var(--text-main)] mb-1'>
          Codex_OS
        </h1>
        <div className='h-[2px] w-12 bg-[var(--accent-action)]/40' />
      </div>

      <nav className='flex-1 space-y-1'>
        {/* SECTION: ACTIVE PROTOCOLS */}
        <div className='px-3 mb-3'>
          <p className='text-[9px] font-mono text-[var(--text-dim)] tracking-[0.5em] uppercase'>
            Active_Protocols
          </p>
        </div>

        {/* MAIN NAV ITEMS LOOP */}
        {navItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleFilterClick(item.id)}
            className={`flex justify-between items-center p-3 cursor-pointer transition-all group relative border-l-2 ${
              selectedFilter === item.id
                ? 'bg-[var(--text-main)]/10 border-[var(--text-main)] text-[var(--text-main)]'
                : 'border-transparent text-[var(--text-dim)] hover:bg-[var(--text-main)]/5'
            }`}
          >
            <div className='flex items-center gap-3'>
              <FontAwesomeIcon
                icon={item.icon}
                className={`w-4 h-4 transition-all duration-300 ${
                  selectedFilter === item.id
                    ? item.activeColor
                    : `${item.baseColor} ${item.hoverColor}`
                }`}
              />
              {/* RESTORED: font-black for selected, font-bold for hover */}
              <span
                className={`text-[11px] uppercase tracking-[0.25em] transition-colors ${
                  selectedFilter === item.id
                    ? 'text-[var(--text-main)] font-black'
                    : 'group-hover:text-[var(--text-main)] font-bold'
                }`}
              >
                {item.label}
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <span className='text-[14px] font-mono opacity-50 tracking-tighter text-[var(--text-dim)]'>
                #_
              </span>
              <span
                className={`text-[12px] font-mono font-bold transition-colors ${
                  selectedFilter === item.id
                    ? item.activeColor
                    : `text-[var(--text-dim)] ${item.hoverColor}`
                }`}
              >
                {String(item.count).padStart(2, '0')}
              </span>
            </div>
            {selectedFilter === item.id && (
              <div className='absolute inset-0 bg-[var(--text-main)]/10 animate-pulse pointer-events-none' />
            )}
          </div>
        ))}

        {/* SECTION: THE VAULT */}
        <div className='pt-8 mt-4 border-t border-[var(--border-subtle)]'>
          <div className='px-3 mb-3'>
            <p className='text-[9px] font-mono text-[var(--accent-secondary)] tracking-[0.5em] uppercase'>
              Deep_Sync_Vault
            </p>
          </div>

          <div
            onClick={() => handleFilterClick('archived')}
            className={`flex justify-between items-center p-3 cursor-pointer transition-all group relative border-l-2 ${
              selectedFilter === 'archived'
                ? 'bg-[var(--accent-active-bg)] border-[var(--accent-primary)] text-[var(--accent-primary)]'
                : 'border-transparent text-[var(--text-dim)] hover:bg-[var(--accent-active-bg)]'
            }`}
          >
            <div className='flex items-center gap-3'>
              <FontAwesomeIcon
                icon={faBoxArchive}
                className={`w-4 h-4 transition-all duration-300 ${
                  selectedFilter === 'archived'
                    ? 'text-[var(--accent-primary)]'
                    : 'text-[var(--accent-primary)]/20 group-hover:text-[var(--accent-primary)]'
                }`}
              />
              <span
                className={`text-[11px] text-[var(--text-dim)] uppercase tracking-[0.25em] transition-colors ${
                  selectedFilter === 'archived'
                    ? 'text-[var(--text-main)] font-black'
                    : 'group-hover:text-[var(--text-main)] font-bold'
                }`}
              >
                Codex_Archive
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <span className='text-[14px] font-mono opacity-50 tracking-tighter text-[var(--text-dim)]'>
                #_
              </span>
              <span
                className={`text-[12px] font-mono font-bold transition-colors ${
                  selectedFilter === 'archived'
                    ? 'text-[var(--accent-primary)]'
                    : 'text-[var(--text-dim)] group-hover:text-[var(--accent-primary)]'
                }`}
              >
                {String(archiveCount).padStart(2, '0')}
              </span>
            </div>

            {selectedFilter === 'archived' && (
              <div className='absolute inset-0 bg-[var(--accent-primary)]/10 animate-pulse pointer-events-none' />
            )}
          </div>
        </div>
      </nav>

      {/* FOOTER ACTIONS */}
      <div className='mt-auto pt-6'>
        <button
          onClick={handleNewTaskClick}
          className='flex items-center justify-center gap-3 w-full bg-[var(--text-main)] text-[var(--bg-sidebar)] hover:bg-[var(--accent-action)] hover:text-white font-black text-[11px] uppercase tracking-[0.3em] py-4 transition-all active:scale-[0.98] shadow-md shadow-black/20'
        >
          <FontAwesomeIcon icon={faPlus} className='text-[10px]' />
          <span>Initialize_Entry</span>
        </button>

        <p className='text-[8px] font-mono text-[var(--text-dim)] my-4 text-center uppercase tracking-widest opacity-50'>
          System_Status_Stable // V.1.0.2
        </p>
      </div>
      <div className='p-0 border-t border-[var(--border-subtle)] pt-4'>
        <button
          onClick={toggleTheme}
          className='w-full flex items-center justify-between px-4 py-3 bg-[var(--bg-task)] border border-[var(--border-subtle)] hover:border-[var(--accent-action)]/40 transition-all group'
        >
          <span className='text-[9px] font-mono font-black tracking-[0.2em] text-[var(--text-dim)] group-hover:text-[var(--accent-action)]'>
            {theme === 'dark' ? 'MODE::NETSPHERE' : 'MODE::CLEAN_ROOM'}
          </span>
          <FontAwesomeIcon
            icon={theme === 'dark' ? faMoon : faSun}
            className={`text-[10px] ${theme === 'dark' ? 'text-blue-400' : 'text-[var(--accent-action)]'}`}
          />
        </button>
      </div>
    </aside>
  )
}
