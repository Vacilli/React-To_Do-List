import React from 'react'
import ExitSequence from './ExitSequence'

interface PanelHeaderProps {
  isEditing: boolean
  onExit: () => void
}

const PanelHeader: React.FC<PanelHeaderProps> = ({ isEditing, onExit }) => {
  return (
    <header className='h-16 flex items-center justify-between px-8 bg-[var(--bg-task)] border-b border-[var(--border-subtle)] hidden md:flex'>
      <div className='flex flex-col'>
        <div className='flex items-center gap-2'>
          <span className='relative flex h-2 w-2'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--text-dim)] opacity-40'></span>
            <span className='relative inline-flex rounded-full h-2 w-2 bg-[var(--text-dim)]'></span>
          </span>
          <h2 className='text-sm font-black text-[var(--text-main)] uppercase tracking-[0.25em]'>
            {isEditing ? 'Edit_Protocol' : 'New_Entry_Protocol'}
          </h2>
        </div>
        <p className='text-[10px] font-mono text-[var(--text-dim)] mt-0.5 uppercase tracking-widest'>
          System Status:{' '}
          <span className='text-emerald-500 font-bold'>Ready</span>
        </p>
      </div>
      <ExitSequence onExit={onExit} />
    </header>
  )
}

export default PanelHeader
