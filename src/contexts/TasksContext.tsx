import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
  useState,
  useMemo,
} from 'react'

export type TaskItem = {
  title: string
  description: string
  id: number
  status: string
  completed: boolean
  priority: boolean
}

type TasksContextType = {
  tasks: TaskItem[]
  editingTask: TaskItem | null
  selectedStatus: string
  createTask: (task: TaskItem) => void
  deleteTask: (id: number) => void
  editTask: (task: TaskItem | null) => void
  toggleTaskCompleted: (id: number, status: string) => void
  toggleTaskPriority: (id: number, status: string) => void
  sortTasks: (status: string) => void
  searchedTasks: TaskItem[]
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

type Action =
  | { type: 'task/create'; payload: TaskItem }
  | { type: 'task/delete'; payload: number }
  | { type: 'task/update'; payload: TaskItem | null }
  | { type: 'task/toggleCompleted'; payload: { id: number; status: string } }
  | { type: 'task/togglePriority'; payload: { id: number; status: string } }
  | { type: 'task/sort'; payload: string }

type State = {
  tasks: TaskItem[]
  allTasks: TaskItem[]
  editingTask: TaskItem | null
  status: string
  completed: boolean
  priority: boolean
  selectedStatus: string
}

const initialState = {
  tasks: [],
  allTasks: [],
  editingTask: null,
  completed: false,
  priority: false,
  status: 'all',
  selectedStatus: 'all',
}

type TasksProviderProps = {
  children: ReactNode
}

const TasksContext = createContext<TasksContextType | undefined>(undefined)

function reducer(state: State, action: Action): State {
  console.log('Dispatched action:', action)
  switch (action.type) {
    case 'task/create': {
      if (
        !action.payload ||
        !action.payload.title ||
        !action.payload.description
      ) {
        return { ...state, allTasks: [...state.allTasks] }
      }
      const updatedTasks = [...state.allTasks, action.payload]
      return {
        ...state,
        tasks: updatedTasks,
        allTasks: updatedTasks,
        editingTask: null,
      }
    }
    case 'task/delete': {
      if (action.payload == null || typeof action.payload !== 'number') {
        return { ...state }
      }
      const filteredTasks = state.allTasks.filter(
        (task) => task.id !== action.payload
      )
      return { ...state, tasks: filteredTasks, allTasks: filteredTasks }
    }
    case 'task/update': {
      if (!action.payload) {
        return { ...state, editingTask: null }
      }
      if (action.payload.status === 'completed') {
        return { ...state }
      }
      const updatedAllTasks = state.allTasks.map((task) =>
        task.id === action.payload?.id ? { ...task, ...action.payload } : task
      )
      return {
        ...state,
        tasks: updatedAllTasks,
        allTasks: updatedAllTasks,
        editingTask: action.payload,
      }
    }
    case 'task/toggleCompleted': {
      const { id, status } = action.payload
      const updatedAllTasks = state.allTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === status ? 'all' : status,
              completed: !task.completed,
              priority: false,
            }
          : task
      )
      return {
        ...state,
        tasks: updatedAllTasks,
        allTasks: updatedAllTasks,
      }
    }
    case 'task/togglePriority': {
      const { id, status } = action.payload
      const updatedAllTasks = state.allTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === status ? 'all' : status,
              priority: !task.priority,
            }
          : task
      )
      return {
        ...state,
        tasks: updatedAllTasks,
        allTasks: updatedAllTasks,
      }
    }
    case 'task/sort': {
      const filteredTasks =
        action.payload === 'all'
          ? [...state.allTasks]
          : state.allTasks.filter((task) => task.status === action.payload)
      return {
        ...state,
        tasks: filteredTasks,
        selectedStatus: action.payload, // Update the selected status
      }
    }
    default: {
      // const _: never = action
      throw new Error('Unhandled action type')
    }
  }
}

function init(initialState: State): State {
  const savedTasks = localStorage.getItem('tasks')
  if (savedTasks) {
    const parsedTasks = JSON.parse(savedTasks)
    return { ...initialState, tasks: parsedTasks, allTasks: parsedTasks }
  }
  return { ...initialState, allTasks: [] }
}

function TasksProvider({ children }: TasksProviderProps) {
  const [{ tasks, editingTask, selectedStatus }, dispatch] = useReducer(
    reducer,
    initialState,
    init
  )

  const [searchQuery, setSearchQuery] = useState('')

  const searchedTasks = useMemo(() => {
    return searchQuery.length > 0
      ? tasks.filter((task) =>
          `${task.title} ${task.description}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : tasks
  }, [tasks, searchQuery])

  function createTask(newTask: TaskItem) {
    dispatch({ type: 'task/create', payload: newTask })
  }

  function deleteTask(id: number) {
    dispatch({ type: 'task/delete', payload: id })
  }

  function editTask(task: TaskItem | null) {
    dispatch({ type: 'task/update', payload: task })
  }

  function toggleTaskCompleted(id: number, status: string) {
    dispatch({ type: 'task/toggleCompleted', payload: { id, status } })
  }

  function toggleTaskPriority(id: number, status: string) {
    dispatch({ type: 'task/togglePriority', payload: { id, status } })
  }

  function sortTasks(status: string) {
    dispatch({ type: 'task/sort', payload: status })
  }

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  return (
    <TasksContext.Provider
      value={{
        tasks,
        editingTask,
        createTask,
        deleteTask,
        editTask,
        toggleTaskCompleted,
        toggleTaskPriority,
        sortTasks,
        selectedStatus,
        searchedTasks,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}

function useTasks() {
  const context = useContext(TasksContext)
  if (context === undefined)
    throw new Error('TasksContext was used outside of TasksProvider')
  return context
}

export { TasksProvider, useTasks }
