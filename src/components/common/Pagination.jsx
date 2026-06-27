import React from 'react'
import Button from './Button'

export default function Pagination({ currentPage = 1, totalPages = 1, onPageChange }) {
  const hasPrevious = currentPage > 1
  const hasNext = currentPage < totalPages

  function handlePageChange(nextPage) {
    if (nextPage >= 1 && nextPage <= totalPages && nextPage !== currentPage) {
      onPageChange?.(nextPage)
    }
  }

  return (
    <nav className="d-flex flex-wrap align-items-center justify-content-between gap-2 mt-3" aria-label="Pagination">
      <Button variant="outline" disabled={!hasPrevious} onClick={() => handlePageChange(currentPage - 1)}>
        Previous
      </Button>

      <div className="d-flex flex-wrap align-items-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1
          const isActive = pageNumber === currentPage

          return (
            <Button
              key={pageNumber}
              variant={isActive ? 'primary' : 'outline'}
              disabled={isActive}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </Button>
          )
        })}
      </div>

      <Button variant="outline" disabled={!hasNext} onClick={() => handlePageChange(currentPage + 1)}>
        Next
      </Button>
    </nav>
  )
}
