import Task from './Task'
import { useTasks } from '../contexts/TasksContext'
import EmptyState from './EmptyState'
// import { motion, AnimatePresence } from 'framer-motion'

export default function TaskList() {
  const { tasks, viewMode } = useTasks()

  if (tasks.length === 0) return <EmptyState />

  // Only change the UL layout, keep the LI structure identical to maintain your ultra-wide fix
  const containerClasses =
    viewMode === 'grid'
      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6'
      : 'flex flex-col gap-4 max-w-7xl mx-auto w-full' // List is just a single column stack

  return (
    <div className='infinite-scroll-container'>
      <ul
        key={`${viewMode}-${tasks.length}`}
        className={`${containerClasses} animate-scan`}
      >
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`
              relative group bg-[#111111] border border-white/5 p-1 transition-all duration-300 hover:border-white/10
              ${task.status === 'completed' ? 'opacity-40 grayscale-[0.5]' : 'opacity-100'}
            `}
          >
            {/* Internal Padding & Layout */}
            <div className='bg-[#111111] p-5 border border-white/2'>
              <Task task={task} />

              {/* Status Ribbon - This stays exactly as you wrote it */}
              <div className='mt-6 pt-4 border-t border-white/5 flex justify-between items-center'>
                <span
                  className={`
                  text-[9px] font-mono font-black uppercase px-2 py-1 tracking-widest transition-all duration-300
                  ${
                    task.status === 'archived'
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
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

                <span className='text-[8px] font-mono text-white/40 uppercase tracking-tighter'>
                  Sector_0x{String(task.id).slice(-3).toUpperCase()}
                </span>
              </div>
            </div>

            {/* Corner Accents */}
            <div className='absolute top-0 right-0 w-2 h-2 border-t border-r border-white/10 group-hover:border-white/40 transition-colors' />
            <div className='absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/10 group-hover:border-white/40 transition-colors' />
          </li>
        ))}
      </ul>
    </div>
  )
}
