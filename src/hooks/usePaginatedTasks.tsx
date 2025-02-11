import { useState, useEffect, useMemo } from 'react'

export function usePaginatedTasks<T>(tasks: T[], itemsPerPage: number) {
  const [page, setPage] = useState(1)

  const totalPages = useMemo(() => {
    return Math.ceil(tasks.length / itemsPerPage) || 1
  }, [tasks, itemsPerPage])

  const paginatedTasks = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = page * itemsPerPage

    return tasks.slice(startIndex, endIndex)
  }, [tasks, page, itemsPerPage])

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages)
    }
  }, [page, totalPages])

  return {
    paginatedTasks,
    page,
    totalPages,
    setPage,
  }
}
