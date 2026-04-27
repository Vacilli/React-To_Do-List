import { useEffect, useRef } from 'react'
import { Outlet, useNavigation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Loader from './Loader'
import NewTask from './NewTask'
import { useTasks } from '../contexts/TasksContext'
import Header from './Header'
import BackToTop from './BackToTop'

export default function AppLayout() {
  const { isPanelOpen, closePanel, setEditingTask } = useTasks()
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

  // Create a ref for the scrollable container
  const mainScrollRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isPanelOpen) {
        closePanel()
        // Optional: clear the editing task state here too
        setEditingTask(null)
      }
    }

    // Add the listener when the component mounts
    window.addEventListener('keydown', handleKeyDown)

    // CLEANUP: Remove it when the component unmounts
    // (Prevents memory leaks and weird bugs)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPanelOpen, closePanel, setEditingTask]) // Re-run if these change

  return (
    <div className='flex h-screen w-full bg-[var(--bg-main)] overflow-hidden transition-colors duration-500'>
      {isLoading && <Loader />}

      <div className='w-1/3 max-w-[300px] h-full'>
        <Sidebar />
      </div>

      <div className='flex-1 flex bg-[var(--bg-main)] flex-col relative overflow-hidden transition-colors duration-500'>
        <Header />

        {/* Back to Top Component - anchored to mainScrollRef */}
        {!isPanelOpen && <BackToTop scrollRef={mainScrollRef} />}

        <main
          ref={mainScrollRef} // Attach the ref here
          className='flex-1 overflow-y-auto bg-[var(--bg-main)] transition-colors duration-500'
        >
          {!isPanelOpen ? (
            <div className='mx-auto w-full max-w-[1600px] px-8 pb-8'>
              <Outlet />
            </div>
          ) : (
            <div className='flex-1 flex flex-col animate-scan p-12'>
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
