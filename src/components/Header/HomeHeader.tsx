import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTerminal, faPlus } from '@fortawesome/free-solid-svg-icons'

interface HomeHeaderProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  onNewEntry: () => void
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
  searchQuery,
  onSearchChange,
  onNewEntry,
}) => {
  return (
    <header className='h-16 flex items-center justify-between px-8 bg-[var(--bg-task)] border-b border-[var(--border-subtle)] hidden md:flex'>
      <div className='w-[80%] pr-8'>
        {/* WE WERE MISSING THIS: Added the codex-edge-cursor wrapper class here */}
        <div className='relative group flex items-center w-full codex-edge-cursor'>
          <span className='absolute left-0 text-[var(--text-dim)] group-focus-within:text-[var(--text-main)] transition-colors'>
            <FontAwesomeIcon icon={faTerminal} className='text-xs' />
          </span>

          <input
            type='text'
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder='EXECUTE_SEARCH_PROTOCOL...'
            /* codex-terminal-input ensures the native line updates color, while the wrapper handles the far-right indicator block */
            className='w-full bg-transparent border-b border-[var(--border-subtle)] focus:border-[var(--text-main)] py-2 pl-7 pr-8 text-sm font-mono tracking-[0.1em] text-[var(--text-main)] focus:outline-none transition-all placeholder:text-[var(--text-dim)] uppercase codex-terminal-input'
          />
        </div>
      </div>

      <div className='w-[20%] flex items-center justify-end gap-6'>
        <button
          onClick={onNewEntry}
          className='flex items-center gap-2 bg-[var(--text-main)] text-[var(--bg-sidebar)] hover:bg-[var(--accent-action)] hover:text-white font-black text-[10px] uppercase tracking-[0.2em] py-2.5 px-5 transition-all shadow-[var(--shadow-codex)]'
        >
          <FontAwesomeIcon icon={faPlus} className='text-[8px]' />
          <span>Initialize_Entry</span>
        </button>
      </div>
    </header>
  )
}

export default HomeHeader
