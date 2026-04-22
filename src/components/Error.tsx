import {
  useNavigate,
  useRouteError,
  isRouteErrorResponse,
} from 'react-router-dom'

function isError(error: unknown): error is Error {
  return error instanceof Error
}

function Error() {
  const error = useRouteError()
  const navigate = useNavigate()
  console.log(error)

  // This is how you "Git Gud" with TypeScript:
  let errorMessage: string

  if (isRouteErrorResponse(error)) {
    // This handles 404s and other Response errors
    errorMessage = error.data || error.statusText
  } else if (isError(error)) {
    // This handles standard JS crashes (like "cannot read map of undefined")
    errorMessage = error.message
  } else if (typeof error === 'string') {
    errorMessage = error
  } else {
    errorMessage = 'Unknown error'
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1>Something went wrong 😢</h1>
      <p className='text-red-500'>{errorMessage}</p>
      <button
        className='mt-4 px-4 py-2 bg-blue-600 text-white rounded'
        onClick={() => navigate('/')}
      >
        Go Back
      </button>
    </div>
  )
}

export default Error
