import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch,
  faFilter,
  faList,
  faThLarge,
  faBars,
} from '@fortawesome/free-solid-svg-icons'
import { useTasks } from '../../contexts/TasksContext'

interface MobileHeaderProps {
  activeMobileTool: string
  toggleSearch: () => void // Renamed to be specific to the Ghost Bar
  onOpenSort: () => void // New prop to trigger the Bottom Sheet
  searchQuery: string
  onSearchChange: (value: string) => void
  viewMode: 'grid' | 'list'
  setViewMode: (mode: 'grid' | 'list') => void
  onOpenMenu: () => void
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
  activeMobileTool,
  toggleSearch,
  onOpenSort,
  searchQuery,
  onSearchChange,
  onOpenMenu,
}) => {
  const { viewMode, setviewMode } = useTasks()
  // Auto-reset search when the Ghost Bar closes
  useEffect(() => {
    if (activeMobileTool === 'none') {
      onSearchChange('')
    }
  }, [activeMobileTool, onSearchChange])

  return (
    <header className='md:hidden flex flex-col bg-[var(--bg-task)] border-b border-[var(--border-subtle)]'>
      <div className='h-16 flex items-center justify-between px-6'>
        <h1 className='text-sm font-black text-[var(--text-main)] uppercase tracking-[0.3em]'>
          CODEX_OS
          <span className='animate-pulse text-[var(--accent-color)]'>_</span>
        </h1>

        <div className='flex items-center gap-5 text-[var(--text-dim)]'>
          {/* SEARCH TRIGGER */}
          <button
            onClick={toggleSearch}
            className={
              activeMobileTool === 'search' ? 'text-[var(--accent-action)]' : ''
            }
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>

          {/* SORT TRIGGER: Opens Bottom Sheet */}
          <button
            onClick={onOpenSort}
            className='hover:text-[var(--text-main)]'
          >
            <FontAwesomeIcon icon={faFilter} />
          </button>

          {/* VIEW MODE TOGGLE */}
          <button
            onClick={() => setviewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className='hover:text-[var(--text-main)]'
          >
            <FontAwesomeIcon icon={viewMode === 'grid' ? faList : faThLarge} />
          </button>

          {/* SIDEBAR TRIGGER */}
          <button className='text-[var(--text-main)] ml-1' onClick={onOpenMenu}>
            <FontAwesomeIcon icon={faBars} size='lg' />
          </button>
        </div>
      </div>

      {/* THE GHOST BAR (Search Only) */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out bg-black/40 backdrop-blur-md ${
          activeMobileTool === 'search'
            ? 'h-14 border-t border-[var(--border-subtle)] opacity-100'
            : 'h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className='px-6 h-full flex items-center'>
          <div className='w-full flex items-center gap-3 animate-in fade-in zoom-in-95 duration-300'>
            <span className='text-[var(--accent-action)] font-mono text-[10px] opacity-70'>
              &gt;
            </span>
            <input
              autoFocus
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder='COMMAND_INPUT...'
              className='w-full bg-transparent font-mono text-[11px] text-[var(--text-main)] outline-none uppercase tracking-[0.2em] placeholder:opacity-30'
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default MobileHeader
