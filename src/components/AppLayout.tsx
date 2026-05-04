import { useEffect, useRef, useState } from 'react' // Added useState
import { Outlet, useNavigation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Loader from './Loader'
import NewTask from './NewTask'
import { useTasks } from '../contexts/TasksContext'
import Header from './Header/Header'
import BackToTop from './BackToTop'
import { motion, AnimatePresence } from 'framer-motion'

export default function AppLayout() {
  const { isPanelOpen, closePanel, setEditingTask } = useTasks()
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

  // NEW: State for the mobile sidebar drawer
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const mainScrollRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isPanelOpen) {
          closePanel()
          setEditingTask(null)
        }
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false) // Close menu on ESC
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPanelOpen, closePanel, setEditingTask, isMobileMenuOpen])

  return (
    <div className='flex h-screen w-full bg-[var(--bg-main)] overflow-hidden transition-colors duration-500'>
      {isLoading && <Loader />}

      {/* 2. MOBILE SIDEBAR: Overlay/Drawer version */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className='fixed inset-0 z-50 md:hidden'>
            {/* Backdrop: Fades in/out */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='absolute inset-0 bg-black/60 backdrop-blur-sm'
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content: Slides in/out from left */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className='relative w-4/5 max-w-[300px] h-full bg-[var(--bg-main)] border-r border-[var(--border-subtle)]'
            >
              <Sidebar onSelect={() => setIsMobileMenuOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. DESKTOP SIDEBAR: Standard persistent version */}
      <div className='hidden md:block md:w-1/3 md:max-w-[300px] h-full'>
        <Sidebar />
      </div>

      <div className='flex-1 flex bg-[var(--bg-main)] flex-col relative overflow-hidden transition-colors duration-500'>
        {/* Pass the setter to the Header */}
        <Header onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

        {!isPanelOpen && <BackToTop scrollRef={mainScrollRef} />}

        <main
          ref={mainScrollRef}
          className='flex-1 overflow-y-auto bg-[var(--bg-main)] transition-colors duration-500'
        >
          {!isPanelOpen ? (
            <div className='mx-auto w-full max-w-[1600px] px-4 md:px-8 pb-8'>
              <Outlet />
            </div>
          ) : (
            <div className='flex-1 flex flex-col animate-scan p-6 md:p-12'>
              <div className='max-w-2xl mx-auto w-full'>
                <NewTask onSave={closePanel} />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
