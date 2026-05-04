import React from 'react'
import { useTasks, SortOption } from '../../contexts/TasksContext'
import { motion, AnimatePresence } from 'framer-motion'

interface SortBottomSheetProps {
  isOpen: boolean
  onClose: () => void
}

const SortBottomSheet: React.FC<SortBottomSheetProps> = ({
  isOpen,
  onClose,
}) => {
  const { sortBy, setBy } = useTasks()

  const sortOptions: SortOption[] = [
    'Date_Created',
    'Date_Updated',
    'Priority',
    'Alphabetical',
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <div className='fixed inset-0 z-[100] md:hidden'>
          {/* Backdrop: The Void */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='absolute inset-0 bg-black/60 backdrop-blur-sm'
            onClick={onClose}
          />

          {/* The Sheet: Terminal Style */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className='absolute bottom-0 left-0 right-0 bg-[var(--bg-task)] border-t border-[var(--border-subtle)] p-6 rounded-t-2xl'
          >
            <div className='w-12 h-1 bg-[var(--text-dim)]/20 rounded-full mx-auto mb-6' />

            <h2 className='text-[10px] font-mono text-[var(--text-dim)] uppercase tracking-[0.4em] mb-4'>
              Select_Sort_Protocol
            </h2>

            <div className='flex flex-col gap-2'>
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setBy(option)
                    onClose()
                  }}
                  className={`w-full flex items-center justify-between p-4 font-mono text-[11px] uppercase tracking-widest transition-all rounded-lg ${
                    sortBy === option
                      ? 'bg-[var(--accent-action)]/10 text-[var(--accent-action)] border border-[var(--accent-action)]/30'
                      : 'bg-[var(--text-main)]/5 text-[var(--text-dim)] border border-transparent'
                  }`}
                >
                  <span>{option.replace('_', ' ')}</span>
                  {sortBy === option && (
                    <span className='text-[8px] animate-pulse'>[_ACTIVE]</span>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={onClose}
              className='w-full mt-6 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-dim)] hover:text-[var(--text-main)] transition-colors'
            >
              Cancel_Operation
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default SortBottomSheet
