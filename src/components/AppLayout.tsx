import { useEffect } from 'react'
import { Outlet, useNavigation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Loader from './Loader'
import NewTask from './NewTask'
import { useTasks } from '../contexts/TasksContext'
import Header from './Header'

export default function AppLayout() {
  const { setEditingTask } = useTasks()
  // DON'T REMOVE THESE - They handle your global loading state
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

  const { isPanelOpen, closePanel, editingTask } = useTasks()

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
      {/* 1. Global Loader (only shows when navigation.state is 'loading') */}
      {isLoading && <Loader />}

      {/* 2. Fixed Sidebar (30%) */}
      <div className='w-1/3 max-w-[300px] h-full'>
        <Sidebar />
      </div>

      {/* 3. Main Content Area (70%) */}
      <div className='flex-1 flex bg-[#191b1c] flex-col relative overflow-hidden'>
        {!isPanelOpen ? (
          /* VIEW MODE: Task List */
          <>
            <Header />
            <main className='flex-1 overflow-y-auto px-8 pb-8'>
              <Outlet />
            </main>
          </>
        ) : (
          /* EDIT/ADD MODE: Full Panel Slide-in */
          <div className='flex-1 flex flex-col animate-in slide-in-from-right duration-300'>
            <div className='p-6 border-b border-slate-200 flex justify-between items-center bg-white'>
              <div className='flex flex-col'>
                <div className='flex items-center gap-2'>
                  {/* Small "Active" Indicator dot */}
                  <span className='relative flex h-2 w-2'>
                    <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75'></span>
                    <span className='relative inline-flex rounded-full h-2 w-2 bg-slate-500'></span>
                  </span>
                  <h2 className='text-sm font-black text-slate-900 uppercase tracking-[0.25em]'>
                    {editingTask ? 'Edit_Protocol' : 'New_Entry_Protocol'}
                  </h2>
                </div>
                <p className='text-[10px] font-mono text-slate-400 mt-1 uppercase tracking-widest'>
                  System Status: <span className='text-emerald-500'>Ready</span>{' '}
                  // {new Date().toLocaleDateString('en-CR')}
                </p>
              </div>

              <button
                onClick={closePanel}
                className='group flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-100 bg-slate-50 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 hover:border-slate-900 hover:text-slate-900 transition-all shadow-sm'
              >
                <span>Exit</span>
                <kbd className='bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-300 group-hover:text-slate-900 transition-colors'>
                  ESC
                </kbd>
              </button>
            </div>

            <div className='flex-1 overflow-y-auto p-12'>
              <div className='max-w-2xl mx-auto'>
                {/* This onSave prop will trigger the close when the user is done */}
                <NewTask onSave={closePanel} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
