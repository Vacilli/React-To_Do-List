import { TasksProvider } from './contexts/TasksContext'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import './index.css'
import Home from './pages/Home'
import TaskDetails from './pages/TaskDetails'
import Error from './components/Error'

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
    ],
  },
])

export default function App() {
  return (
    <TasksProvider>
      <RouterProvider router={router} />
    </TasksProvider>
  )
}
