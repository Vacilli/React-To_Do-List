import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
  useState,
  useMemo,
} from 'react'

export type SortOption =
  | 'Date_Created'
  | 'Date_Updated'
  | 'Priority'
  | 'Alphabetical'
export type TaskStatus = 'active' | 'completed' | 'archived'
export type TaskFilter =
  | 'all'
  | 'active'
  | 'priority'
  | 'completed'
  | 'archived'

export type TaskItem = {
  title: string
  description: string
  id: string
  status: TaskStatus
  priority: boolean
  createdAt: string
  updatedAt: string
}

type TasksContextType = {
  // Data
  tasks: TaskItem[] // The filtered list for the UI
  allTasks: TaskItem[]
  editingTask: TaskItem | null

  // Filtering/Search
  selectedFilter: TaskFilter
  setFilter: (filter: TaskFilter) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  sortBy: SortOption
  setBy: (option: SortOption) => void

  // Actions
  createTask: (task: TaskItem) => void
  updateTask: (task: TaskItem) => void // Replaces toggleCompleted, togglePriority, etc.
  deleteTask: (id: string) => void
  setEditingTask: (task: TaskItem | null) => void

  // UI State
  isPanelOpen: boolean
  openPanel: () => void
  closePanel: () => void
}

type Action =
  | { type: 'task/create'; payload: TaskItem }
  | { type: 'task/delete'; payload: string }
  /* This is the master update. It handles titles, descriptions, status, AND priority */
  | { type: 'task/update'; payload: TaskItem }
  /* This controls which task is currently being edited in the UI */
  | { type: 'task/setEditing'; payload: TaskItem | null }
  /* This controls the lens (Filter) we are looking through */
  | { type: 'task/setFilter'; payload: TaskFilter }

type State = {
  allTasks: TaskItem[]
  editingTask: TaskItem | null
  selectedFilter: TaskFilter // Changed from selectedStatus to use our new Filter type
}

const initialState: State = {
  allTasks: [],
  editingTask: null,
  selectedFilter: 'all',
}

type TasksProviderProps = {
  children: ReactNode
}

const TasksContext = createContext<TasksContextType | undefined>(undefined)

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'task/create':
      // We only update allTasks. The "tasks" view is handled elsewhere.
      return {
        ...state,
        allTasks: [...state.allTasks, action.payload],
        editingTask: null,
      }

    case 'task/update':
      // Handle the 'Cancel' reset
      if (!action.payload) return { ...state, editingTask: null }

      return {
        ...state,
        allTasks: state.allTasks.map((t) =>
          t.id === action.payload?.id ? { ...t, ...action.payload } : t,
        ),
        editingTask: action.payload,
      }

    case 'task/delete':
      return {
        ...state,
        allTasks: state.allTasks.filter((t) => t.id !== action.payload),
      }

    /* --- THE MISSING LINK --- */
    case 'task/setEditing':
      return { ...state, editingTask: action.payload }

    case 'task/setFilter':
      return { ...state, selectedFilter: action.payload }

    default:
      throw new Error('Unhandled action type')
  }
}

function init(initialState: State): State {
  const savedTasks = localStorage.getItem('tasks')

  if (savedTasks) {
    const parsedTasks = JSON.parse(savedTasks)
    // We only care about populating the Master List (allTasks)
    return { ...initialState, allTasks: parsedTasks }
  }

  return { ...initialState, allTasks: [] }
}

function TasksProvider({ children }: TasksProviderProps) {
  const [{ allTasks, editingTask }, dispatch] = useReducer(
    reducer,
    initialState,
    init,
  )
  const [sortBy, setBy] = useState<SortOption>('Date_Created')
  const [selectedFilter, setSelectedFilter] = useState<TaskFilter>('all')
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const openPanel = () => setIsPanelOpen(true)

  const closePanel = () => {
    setIsPanelOpen(false)
    dispatch({ type: 'task/setEditing', payload: null }) // Clears the "Editing" state
  }

  // The Monitor (useMemo) - using the local selectedFilter state
  const visibleTasks = useMemo(() => {
    // 1. Initial Filtering (Status/Category)
    let filtered = allTasks

    switch (selectedFilter) {
      case 'priority':
        filtered = allTasks.filter((t) => t.priority)
        break
      case 'active':
        filtered = allTasks.filter((t) => t.status === 'active')
        break
      case 'completed':
        filtered = allTasks.filter((t) => t.status === 'completed')
        break
      case 'archived':
        filtered = allTasks.filter((t) => t.status === 'archived')
        break
      default:
        filtered = allTasks.filter((t) => t.status !== 'archived')
    }

    // 2. Search Logic
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query),
      )
    }

    // 3. NEW: Sorting Logic (The final touch)
    // We clone the array with [...] to avoid mutating state
    return [...filtered].sort((a, b) => {
      // --- PRIORITY PROTOCOL ---
      if (sortBy === 'Priority') {
        if (a.priority !== b.priority) {
          return a.priority ? -1 : 1
        }
        // Tie-breaker: Newest first within the same priority group
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }

      // --- DATE CREATED PROTOCOL ---
      if (sortBy === 'Date_Created') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }

      // --- DATE UPDATED PROTOCOL ---
      if (sortBy === 'Date_Updated') {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      }

      // --- ALPHABETICAL PROTOCOL ---
      if (sortBy === 'Alphabetical') {
        return a.title.localeCompare(b.title)
      }

      return 0
    })

    // Don't forget to add sortBy to the dependency array!
  }, [allTasks, selectedFilter, searchQuery, sortBy])

  /* --- ACTIONS --- */

  const createTask = (newTask: TaskItem) => {
    dispatch({ type: 'task/create', payload: newTask })
  }

  const updateTask = (updatedTask: TaskItem) => {
    dispatch({ type: 'task/update', payload: updatedTask })
  }

  const deleteTask = (id: string) => {
    dispatch({ type: 'task/delete', payload: id })
  }

  const setEditingTask = (task: TaskItem | null) => {
    dispatch({ type: 'task/setEditing', payload: task })
    if (task) openPanel() // Tactical auto-open
  }

  // The helper function the Sidebar will call
  const setFilter = (filter: TaskFilter) => {
    setSelectedFilter(filter)
  }

  /* --- STORAGE SYNC --- */
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(allTasks))
  }, [allTasks])

  /* --- THE EXPORTED INTERFACE --- */
  return (
    <TasksContext.Provider
      value={{
        // Data (The Monitor & The Hard Drive)
        tasks: visibleTasks,
        allTasks,
        editingTask,
        sortBy,
        setBy,

        // Actions (Data)
        createTask,
        updateTask,
        deleteTask,

        // UI Control (Filtering & Panel)
        selectedFilter,
        setFilter,
        setEditingTask,
        searchQuery,
        setSearchQuery,
        isPanelOpen,
        openPanel,
        closePanel,
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
