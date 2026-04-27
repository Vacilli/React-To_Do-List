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
  const { tasks, sortBy, setBy, viewMode, setViewMode } = useTasks()
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

  /* Variable-driven base for controls */
  const ctrlBase =
    'flex items-center gap-2 bg-[var(--bg-main)]/40 border border-[var(--border-subtle)] px-3 py-1.5 transition-all duration-200'

  return (
    /* Removed shadow-xl and applied border-subtle for a seamless transition */
    <div className='flex items-center justify-between px-4 py-4 bg-[var(--bg-main)] border-b border-[var(--border-subtle)]'>
      {/* LEFT SIDE: Protocol Counter - FIXED WIDTH ANCHOR */}
      <div className='flex items-center gap-3 w-[200px] shrink-0'>
        <div className='flex flex-col'>
          <span className='text-[10px] font-mono text-[var(--text-dim)] uppercase tracking-tighter'>
            Active_Processes
          </span>
          <div className='flex items-center gap-2'>
            <span className='text-lg font-black font-mono text-[var(--text-main)] inline-block w-[2ch]'>
              {String(totalTasks).padStart(2, '0')}
            </span>
            <span className='h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]' />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: System Parameters - FIXED WIDTH ANCHOR */}
      <div className='flex items-center justify-end gap-3 min-w-[400px] shrink-0'>
        {/* SORT SELECTOR */}
        <div className='relative group' ref={dropdownRef}>
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className={`${ctrlBase} hover:border-[var(--accent-action)]/40 hover:bg-[var(--text-main)]/[0.05] cursor-pointer min-w-[190px] justify-between`}
          >
            <div className='flex items-center gap-2'>
              <FontAwesomeIcon
                icon={faFilter}
                className={`w-3 h-3 ${isSortOpen ? 'text-[var(--accent-action)]' : 'text-[var(--text-dim)]'}`}
              />
              <span className='text-[10px] font-bold uppercase tracking-widest text-[var(--text-main)]'>
                Sort::{sortBy.replace('_', ' ')}
              </span>
            </div>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`w-2 h-2 text-[var(--text-dim)] transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* TERMINAL DROPDOWN */}
          {isSortOpen && (
            <div
              className='absolute top-full right-0 mt-2 w-full min-w-[200px] bg-[var(--bg-task)] border border-[var(--border-subtle)] z-[999] animate-in fade-in slide-in-from-top-1 duration-200'
              style={{ backgroundColor: 'var(--bg-task)' }}
            >
              <div className='flex flex-col py-1'>
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setBy(option)
                      setIsSortOpen(false)
                    }}
                    className={`w-full text-left px-4 py-3 text-[10px] font-mono uppercase tracking-widest transition-all ${
                      sortBy === option
                        ? 'text-[var(--accent-action)] bg-[var(--text-main)]/[0.05]'
                        : 'text-[var(--text-dim)] hover:bg-[var(--text-main)]/[0.03] hover:text-[var(--text-main)]'
                    }`}
                  >
                    {option.replace('_', ' ')}
                    {sortBy === option && (
                      <span className='float-right text-[var(--accent-action)]/50'>
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
        <div className='h-6 w-[1px] bg-[var(--border-subtle)] mx-1' />

        {/* DISPLAY MODE */}
        <div className='flex bg-[var(--bg-sidebar)] p-1 border border-[var(--border-subtle)] shrink-0 w-[86px]'>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 px-3 border transition-all ${
              viewMode === 'grid'
                ? 'bg-[var(--text-main)]/[0.1] text-[var(--text-main)] border-[var(--border-subtle)]'
                : 'text-[var(--text-dim)] border-transparent hover:text-[var(--text-main)]'
            }`}
            title='Grid_Layout'
          >
            <FontAwesomeIcon icon={faTableCellsLarge} className='w-3 h-3' />
          </button>

          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 px-3 border transition-all ${
              viewMode === 'list'
                ? 'bg-[var(--text-main)]/[0.1] text-[var(--text-main)] border-[var(--border-subtle)]'
                : 'text-[var(--text-dim)] border-transparent hover:text-[var(--text-main)]'
            }`}
            title='List_Layout'
          >
            <FontAwesomeIcon icon={faList} className='w-3 h-3' />
          </button>
        </div>
      </div>
    </div>
  )
}
