import TaskList from '../components/TaskList'
import TaskListControls from '../components/TaskListControls'

function Home() {
  return (
    <div className='relative'>
      {/* This wrapper ensures the search stays at the top of the 70% area */}
      <div className='sticky top-0 z-10 bg-[#191b1c] py-4 border-b border-slate-200'>
        <TaskListControls />
      </div>

      {/* The actual task list that scrolls underneath */}
      <div className='mt-4'>
        <TaskList />
      </div>
    </div>
  )
}

export default Home
