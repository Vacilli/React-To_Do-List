import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTerminal } from '@fortawesome/free-solid-svg-icons'
import ExitSequence from './ExitSequence'

interface TaskDetailHeaderProps {
  taskId: string
  onExit: () => void
}

const TaskDetailHeader: React.FC<TaskDetailHeaderProps> = ({
  taskId,
  onExit,
}) => {
  return (
    <header className='h-16 flex items-center justify-between px-8 bg-[var(--bg-task)] border-b border-[var(--border-subtle)] hidden md:flex'>
      <div className='flex items-center gap-6'>
        <div className='flex items-center gap-3'>
          <div className='p-1.5'>
            <FontAwesomeIcon
              icon={faTerminal}
              className='text-[10px] text-[var(--text-main)]'
            />
          </div>
          <h2 className='text-sm font-black text-[var(--text-main)] uppercase tracking-[0.2em]'>
            Task_Data_Access
          </h2>
        </div>

        <div className='hidden lg:flex items-center gap-4 border-l border-[var(--border-subtle)] pl-6'>
          <div className='flex flex-col'>
            <span className='text-[9px] font-mono text-[var(--text-dim)] uppercase tracking-tighter'>
              Hash_Signature
            </span>
            <span className='text-[10px] font-mono text-[var(--text-main)] uppercase font-bold'>
              {taskId.substring(0, 12)}...
            </span>
          </div>

          <div className='flex flex-col'>
            <span className='text-[9px] font-mono text-[var(--text-dim)] uppercase tracking-tighter'>
              Connection
            </span>
            <span className='text-[10px] font-mono text-emerald-500 uppercase flex items-center gap-1.5 font-bold'>
              <span className='h-2 w-2 bg-emerald-500 rounded-full animate-pulse'></span>
              Secure_Link
            </span>
          </div>
        </div>
      </div>
      <ExitSequence onExit={onExit} />
    </header>
  )
}

export default TaskDetailHeader
