import { useLocation } from 'react-router-dom'
import NewTask from '../components/NewTask'
import TaskList from '../components/TaskList'
import Header from '../components/Header'
import SortTasks from '../components/SortTasks'

function Home() {
  const location = useLocation()

  // Only show the form and header on the home route
  const isHome = location.pathname === '/'

  return (
    <div>
      {isHome && (
        <div>
          <Header />
          <NewTask />
          <SortTasks />
        </div>
      )}
      <TaskList />
    </div>
  )
}

export default Home
