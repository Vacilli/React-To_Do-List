import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import PaginationIndicator from './PaginationIndicator'

type TaskPaginationProps = {
  page: number
  totalPages: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export default function TaskPagination({
  page,
  totalPages,
  setPage,
}: TaskPaginationProps) {
  return (
    <div className='pagination-controls'>
      <button
        className='navigation-icons left-icon'
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <div className='pagination-indicator'>
        {[...Array(totalPages).keys()].map((index) => {
          return (
            <PaginationIndicator
              className={index + 1 === page ? `active` : ''}
              key={index}
            />
          )
        })}
      </div>
      <button
        className='navigation-icons right-icon'
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  )
}
