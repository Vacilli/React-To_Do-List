import { TaskFilter, useTasks } from '../contexts/TasksContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFire,
  faBolt,
  faCheckDouble,
  faPlus,
  faTerminal,
  IconDefinition,
  faBoxArchive,
} from '@fortawesome/free-solid-svg-icons'

export default function Sidebar() {
  const { allTasks, setEditingTask, selectedFilter, setFilter, openPanel } =
    useTasks()

  const handleNewTaskClick = () => {
    setEditingTask(null)
    openPanel()
  }

  /* Explicitly use TaskFilter here */
  // const handleFilterChange = (id: TaskFilter) => {
  //   setFilter(id)
  // }

  /* Master Tip: Calculate counts from allTasks so the numbers stay static 
     while you navigate. If you use 'tasks', the numbers vanish as you filter! */
  const priorityCount = allTasks.filter((t) => t.priority).length
  const activeCount = allTasks.filter((t) => t.status === 'active').length
  const completedCount = allTasks.filter((t) => t.status === 'completed').length
  const archiveCount = allTasks.filter((t) => t.status === 'archived').length

  /* 1. Define the items outside or at the start of the component */
  const navItems: {
    id: TaskFilter
    label: string
    icon: IconDefinition // <--- The correct type
    activeColor: string
    hoverColor: string
    baseColor: string
    count: number
  }[] = [
    {
      id: 'all',
      label: 'All_Entries',
      icon: faTerminal,
      activeColor: 'text-slate-200',
      hoverColor: 'group-hover:text-slate-200',
      baseColor: 'text-slate-200/20',
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
      activeColor: 'text-blue-400',
      hoverColor: 'group-hover:text-blue-400',
      baseColor: 'text-blue-400/20',
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
    <aside className='w-full h-full bg-[#0d0d0d] text-white p-6 flex flex-col border-r border-white/5'>
      {/* System Branding */}
      <div className='mb-12'>
        <h1 className='text-sm font-black tracking-[0.4em] uppercase text-slate-200 mb-1'>
          Codex_OS
        </h1>
        <div className='h-[2px] w-12 bg-white/20' />
      </div>

      <nav className='flex-1 space-y-1'>
        {/* SECTION: ACTIVE PROTOCOLS */}
        <div className='px-3 mb-3'>
          <p className='text-[9px] font-mono text-slate-500 tracking-[0.5em] uppercase'>
            Active_Protocols
          </p>
        </div>

        {/* MAIN NAV ITEMS LOOP */}
        {navItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setFilter(item.id)}
            className={`flex justify-between items-center p-3 cursor-pointer transition-all group relative border-l-2 ${
              selectedFilter === item.id
                ? 'bg-white/10 border-white text-white'
                : 'border-transparent text-slate-400 hover:bg-white/5'
            }`}
          >
            {/* Shared Content Markup (Icon + Label) */}
            <div className='flex items-center gap-3'>
              <FontAwesomeIcon
                icon={item.icon}
                className={`w-4 h-4 transition-all duration-300 ${
                  selectedFilter === item.id
                    ? item.activeColor
                    : `${item.baseColor} ${item.hoverColor}`
                }`}
              />
              <span
                className={`text-[11px] uppercase tracking-[0.25em] transition-colors ${
                  selectedFilter === item.id
                    ? 'text-white font-black'
                    : 'group-hover:text-slate-200 font-bold'
                }`}
              >
                {item.label}
              </span>
            </div>

            {/* Shared Count Markup */}
            <div className='flex items-center gap-2'>
              <span className='text-[14px] font-mono opacity-50 tracking-tighter text-slate-500'>
                #_
              </span>
              <span
                className={`text-[12px] font-mono font-bold transition-colors ${
                  selectedFilter === item.id
                    ? item.activeColor
                    : `text-slate-500 ${item.hoverColor}`
                }`}
              >
                {String(item.count).padStart(2, '0')}
              </span>
            </div>
            {selectedFilter === item.id && (
              <div className='absolute inset-0 bg-white/10 animate-pulse pointer-events-none' />
            )}
          </div>
        ))}

        {/* SECTION: THE VAULT (Copy-Paste the markup logic, only change the style classes) */}
        <div className='pt-8 mt-4 border-t border-cyan-900/20'>
          <div className='px-3 mb-3'>
            <p className='text-[9px] font-mono text-cyan-500 tracking-[0.5em] uppercase'>
              Deep_Sync_Vault
            </p>
          </div>

          <div
            onClick={() => setFilter('archived')}
            className={`flex justify-between items-center p-3 cursor-pointer transition-all group relative border-l-2 ${
              selectedFilter === 'archived'
                ? 'bg-cyan-950/20 border-cyan-500 text-cyan-400'
                : 'border-transparent text-slate-400 hover:bg-cyan-950/20'
            }`}
          >
            <div className='flex items-center gap-3'>
              <FontAwesomeIcon
                icon={faBoxArchive}
                className={`w-4 h-4 transition-all duration-300 ${
                  selectedFilter === 'archived'
                    ? 'text-cyan-400'
                    : 'text-cyan-900 group-hover:text-cyan-400'
                }`}
              />
              <span
                className={`text-[11px] uppercase tracking-[0.25em] transition-colors ${
                  selectedFilter === 'archived'
                    ? 'text-white font-black'
                    : 'group-hover:text-slate-200 font-bold'
                }`}
              >
                Codex_Archive
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <span className='text-[14px] font-mono opacity-50 tracking-tighter text-slate-500'>
                #_
              </span>
              <span
                className={`text-[12px] font-mono font-bold transition-colors ${
                  selectedFilter === 'archived'
                    ? 'text-cyan-400'
                    : 'text-slate-400 group-hover:text-cyan-400'
                }`}
              >
                {String(archiveCount).padStart(2, '0')}
              </span>
            </div>
            {selectedFilter === 'archived' && (
              <div className='absolute inset-0 bg-cyan-400/10 animate-pulse pointer-events-none' />
            )}
          </div>
        </div>
      </nav>

      {/* NEW TASK BUTTON - Initialize Entry */}
      <div className='mt-auto pt-6'>
        <button
          onClick={handleNewTaskClick}
          className='flex items-center justify-center gap-3 w-full bg-white text-black hover:bg-emerald-500 hover:text-white font-black text-[11px] uppercase tracking-[0.3em] py-4 transition-all active:scale-[0.98] shadow-lg shadow-white/5'
        >
          <FontAwesomeIcon icon={faPlus} className='text-[10px]' />
          <span>Initialize_Entry</span>
        </button>

        <p className='text-[8px] font-mono text-slate-100 mt-4 text-center uppercase tracking-widest opacity-50'>
          System_Status_Stable // V.2.0.4
        </p>
      </div>
    </aside>
  )
}
