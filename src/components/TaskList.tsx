import Task from './Task'
import { useTasks } from '../contexts/TasksContext'
import EmptyState from './EmptyState'

export default function TaskList() {
  const { tasks } = useTasks()

  // 1. Sort the data: Priorities first, then Active, then Completed.
  const sortedTasks = [...tasks].sort((a, b) => {
    // First: Sort by Status (Active threads above Completed/Archived)
    // We check if one is 'completed' and the other isn't.
    if (a.status !== b.status) {
      return a.status === 'completed' ? 1 : -1
    }

    // Second: Sort by Priority (Burners at the top)
    if (a.priority !== b.priority) {
      return a.priority ? -1 : 1
    }

    // Third: Sort by Date (Newest first) - The "Chronological" layer
    // This prepares you for the future "Sort by Date" feature.
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <div className='infinite-scroll-container'>
      {sortedTasks.length === 0 ? (
        <EmptyState />
      ) : (
        /* JUST ONE LIST - This keeps the grid perfectly aligned */
        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {sortedTasks.map((task) => (
            <li
              key={task.id}
              className={`
        relative group
        bg-[#111111] 
        border border-white/5 
        p-1
        transition-all duration-300
        hover:border-white/10
        ${task.status === 'completed' ? 'opacity-40 grayscale-[0.5]' : 'opacity-100'}
      `}
            >
              {/* 1. Internal Padding & Layout */}
              <div className='bg-[#111111] p-5 border border-white/2'>
                <Task task={task} />

                {/* 2. Status Ribbon - Integrated into the card bottom */}
                <div className='mt-6 pt-4 border-t border-white/5 flex justify-between items-center'>
                  <span
                    className={`
    text-[9px] font-mono font-black uppercase px-2 py-1 tracking-widest transition-all duration-300
    ${
      task.status === 'archived'
        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.1)]'
        : task.status === 'completed'
          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
          : task.priority
            ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20'
            : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
    }
  `}
                  >
                    {task.status === 'archived'
                      ? 'STATUS::DEEP_SYNC'
                      : task.status === 'completed'
                        ? 'STATUS::COMPLETED'
                        : task.priority
                          ? 'STATUS::PRIORITY'
                          : 'STATUS::ACTIVE'}
                  </span>

                  {/* Hex Detail for that industrial 'serial number' look */}
                  <span className='text-[8px] font-mono text-white/40 uppercase tracking-tighter'>
                    Sector_0x{task.id.slice(-3).toUpperCase()}
                  </span>
                </div>
              </div>

              {/* 3. Corner Accents - The "Pimp" touch */}
              <div className='absolute top-0 right-0 w-2 h-2 border-t border-r border-white/10 group-hover:border-white/40 transition-colors' />
              <div className='absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/10 group-hover:border-white/40 transition-colors' />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
