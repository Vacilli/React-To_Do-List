import { TasksProvider } from './contexts/TasksContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TaskDetails from './pages/TaskDetails'
import Home from './pages/Home'

// function formatTime(date) {
//   return new Intl.DateTimeFormat('en', {
//     month: 'short',
//     year: '2-digit',
//     hour: '2-digit',
//     minute: '2-digit',
//     second: '2-digit',
//   }).format(date)
// }

function App() {
  return (
    <main>
      <TasksProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/tasks/:taskId' element={<TaskDetails />} />
          </Routes>
        </BrowserRouter>
      </TasksProvider>
    </main>
  )
}

export default App
