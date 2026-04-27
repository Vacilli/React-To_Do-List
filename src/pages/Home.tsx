import TaskList from '../components/TaskList'
import TaskListControls from '../components/TaskListControls'

function Home() {
  return (
    <div className='relative min-h-screen'>
      {/* 1. THE WALL: Force solid background and kill the light border */}
      <div className='sticky top-0 z-[100] bg-[#191b1c] border-b border-[var(--border-subtle)]'>
        <TaskListControls />
      </div>

      {/* 2. THE CONTENT: Add enough padding so the first card isn't choked */}
      <div className='p-6'>
        <TaskList />
      </div>
    </div>
  )
}

export default Home
