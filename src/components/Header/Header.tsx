import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTasks } from '../../contexts/TasksContext'

import HomeHeader from './HomeHeader'
import MobileHeader from './MobileHeader'
import PanelHeader from './PanelHeader'
import TaskDetailHeader from './TaskDetailHeader'
import SortBottomSheet from './SortBottomSheet' // 1. Import the sheet

interface HeaderProps {
  onOpenMobileMenu: () => void
}

export default function Header({ onOpenMobileMenu }: HeaderProps) {
  const location = useLocation()
  const navigate = useNavigate()

  // 1. GLOBAL DATA
  const {
    searchQuery,
    setSearchQuery,
    openPanel,
    closePanel,
    isPanelOpen,
    editingTask,
    setEditingTask,
  } = useTasks()

  // 2. UI STATE
  // activeMobileTool now only tracks 'search' because 'sort' is an overlay
  const [activeMobileTool, setActiveMobileTool] = useState<'none' | 'search'>(
    'none',
  )
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // 3. DERIVED LOGIC
  const isTaskDetail = location.pathname.startsWith('/task/')
  const taskId = isTaskDetail
    ? location.pathname.split('/').pop() || '000000'
    : ''
  const mode = isPanelOpen ? 'panel' : isTaskDetail ? 'taskDetail' : 'home'

  // 4. HANDLERS
  // Updated to handle Search (Ghost Bar) and Sort (Bottom Sheet) separately
  const handleToggleSearch = () => {
    setActiveMobileTool((prev) => (prev === 'search' ? 'none' : 'search'))
  }

  const handleOpenSort = () => {
    // If search bar is open, close it to keep the UI clean
    setActiveMobileTool('none')
    setIsSortOpen(true)
  }

  function handleNewEntry() {
    setEditingTask(null)
    openPanel()
  }

  function handleExit() {
    if (isPanelOpen) {
      closePanel()
    } else if (isTaskDetail) {
      navigate('/')
    }
  }

  return (
    <>
      {/* MOBILE LAYER */}
      <div className='md:hidden'>
        <MobileHeader
          activeMobileTool={activeMobileTool}
          toggleSearch={handleToggleSearch} // Changed prop name for clarity
          onOpenSort={handleOpenSort} // New prop for Bottom Sheet
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onOpenMenu={onOpenMobileMenu}
        />
      </div>

      {/* DESKTOP LAYER */}
      <div className='hidden md:block'>
        {(() => {
          switch (mode) {
            case 'panel':
              return (
                <PanelHeader
                  isEditing={Boolean(editingTask)}
                  onExit={handleExit}
                />
              )
            case 'taskDetail':
              return <TaskDetailHeader taskId={taskId} onExit={handleExit} />
            default:
              return (
                <HomeHeader
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  onNewEntry={handleNewEntry}
                />
              )
          }
        })()}
      </div>

      {/* 5. OVERLAYS */}
      <SortBottomSheet
        isOpen={isSortOpen}
        onClose={() => setIsSortOpen(false)}
      />
    </>
  )
}
