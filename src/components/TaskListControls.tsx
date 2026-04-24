import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFilter,
  faTableCellsLarge,
  faList,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons'
import { useTasks, SortOption } from '../contexts/TasksContext'

export default function TaskListControls() {
  const { tasks, sortBy, setBy } = useTasks()
  const [isSortOpen, setIsSortOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const totalTasks = tasks.length

  // Options matching our Context Type
  const sortOptions: SortOption[] = [
    'Date_Created',
    'Date_Updated',
    'Priority',
    'Alphabetical',
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsSortOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const ctrlBase =
    'flex items-center gap-2 bg-black/20 border border-white/5 px-3 py-1.5 transition-all duration-200'

  return (
    <div className='flex items-center justify-between px-2 py-4 bg-[#191b1c] border-b border-white/5'>
      {/* LEFT SIDE: Protocol Counter */}
      <div className='flex items-center gap-3'>
        <div className='flex flex-col'>
          <span className='text-[10px] font-mono text-slate-500 uppercase tracking-tighter'>
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
        <div className='relative group' ref={dropdownRef}>
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className={`${ctrlBase} hover:border-white/20 hover:bg-white/5 cursor-pointer min-w-[190px] justify-between`}
          >
            <div className='flex items-center gap-2'>
              <FontAwesomeIcon
                icon={faFilter}
                className={`w-3 h-3 ${isSortOpen ? 'text-blue-400' : 'text-slate-500'}`}
              />
              <span className='text-[10px] font-bold uppercase tracking-widest text-slate-300'>
                Sort::{sortBy.replace('_', ' ')}
              </span>
            </div>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`w-2 h-2 text-slate-600 transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* TERMINAL DROPDOWN */}
          {isSortOpen && (
            <div
              className='absolute top-full right-0 mt-2 w-full min-w-[200px] bg-[#1e2021] border border-white/10 z-[999] shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-top-1 duration-200'
              style={{ backgroundColor: '#1e2021' }} // Force solid color override
            >
              <div className='flex flex-col py-1'>
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation() // Stops the click from hitting the tasks underneath
                      setBy(option)
                      setIsSortOpen(false)
                    }}
                    className={`w-full text-left px-4 py-3 text-[10px] font-mono uppercase tracking-widest transition-all ${
                      sortBy === option
                        ? 'text-blue-400 bg-white/10'
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {option.replace('_', ' ')}
                    {sortBy === option && (
                      <span className='float-right text-blue-400/50'>
                        _ACTIVE
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
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
