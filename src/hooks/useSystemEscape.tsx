import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function useSystemEscape(targetPath = '/') {
  // <--- Added the argument here
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        navigate(targetPath)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigate, targetPath])

  return () => navigate(targetPath)
}
