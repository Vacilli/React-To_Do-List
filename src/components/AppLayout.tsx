import { useEffect } from 'react'
import { Outlet, useNavigation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Loader from './Loader'
import NewTask from './NewTask'
import { useTasks } from '../contexts/TasksContext'
import Header from './Header'

export default function AppLayout() {
  const { isPanelOpen, closePanel, setEditingTask } = useTasks()
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

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
    <div className='flex h-screen w-full bg-[#191b1c] overflow-hidden'>
      {/* 1. Global Loader */}
      {isLoading && <Loader />}

      {/* 2. Fixed Sidebar (30%) */}
      <div className='w-1/3 max-w-[300px] h-full'>
        <Sidebar />
      </div>

      {/* 3. Main Content Area (70%) */}
      <div className='flex-1 flex bg-[#191b1c] flex-col relative overflow-hidden'>
        {/* THE MASTER HEADER: Now handles its own internal views */}
        <Header />

        <main className='flex-1 overflow-y-auto bg-[#191b1c]'>
          {!isPanelOpen ? (
            /* VIEW MODE: Task List or Task Details (via Router) */
            <div className='mx-auto w-full max-w-[1600px] px-8 pb-8'>
              <Outlet />
            </div>
          ) : (
            /* EDIT/ADD MODE: The Terminal-style Form */
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
