import { TasksProvider } from './contexts/TasksContext'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import './index.css'
import Home from './pages/Home'
import TaskDetails from './pages/TaskDetails'
import Error from './components/Error'
import { ThemeProvider } from './contexts/ThemeContext'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/task/:id',
        element: <TaskDetails />,
        errorElement: <Error />,
      },
      // The Sector_Null Catch-All
      {
        path: '*',
        element: <Error />,
      },
    ],
  },
])

export default function App() {
  return (
    <ThemeProvider>
      <TasksProvider>
        <RouterProvider router={router} />
      </TasksProvider>
    </ThemeProvider>
  )
}
