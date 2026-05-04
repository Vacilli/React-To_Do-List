import React from 'react'

interface ExitSequenceProps {
  onExit: () => void
}

const ExitSequence: React.FC<ExitSequenceProps> = ({ onExit }) => {
  return (
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
}

export default ExitSequence
