import {
  useNavigate,
  useRouteError,
  isRouteErrorResponse,
} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faSkullCrossbones,
} from '@fortawesome/free-solid-svg-icons'

function isError(error: unknown): error is Error {
  return error instanceof Error
}

export default function ErrorPage() {
  const error = useRouteError()
  const navigate = useNavigate()

  let errorMessage: string
  let errorCode: string = 'CORE_DUMP'

  if (isRouteErrorResponse(error)) {
    errorMessage = error.data || error.statusText
    errorCode = `HTTP_${error.status}`
  } else if (isError(error)) {
    errorMessage = error.message
  } else if (typeof error === 'string') {
    errorMessage = error
  } else {
    errorMessage = 'Unknown architectural failure'
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[var(--bg-main)] p-6 text-center animate-scan'>
      {/* Glitch Hazard Icon */}
      <div className='relative mb-10'>
        <div className='absolute inset-0 bg-red-600/20 blur-3xl animate-pulse' />
        <div className='relative flex items-center justify-center w-24 h-24 border-2 border-red-600/30 rounded-full'>
          <FontAwesomeIcon
            icon={faSkullCrossbones}
            className='text-4xl text-red-600'
          />
        </div>
      </div>

      <div className='max-w-2xl w-full space-y-6'>
        {/* Error Header */}
        <div className='space-y-2'>
          <h1 className='text-[10px] font-mono font-black uppercase tracking-[0.5em] text-red-600'>
            [!] CRITICAL_SYSTEM_R_COLLAPSE [!]
          </h1>
          <h2 className='text-4xl font-black text-[var(--text-main)] uppercase tracking-tighter'>
            {errorCode}
          </h2>
        </div>

        {/* The "Paper Trail" / Error Log */}
        <div className='relative group'>
          <div className='absolute -inset-1 bg-gradient-to-r from-red-600/20 to-transparent opacity-50' />
          <div className='relative bg-[var(--bg-sidebar)] border border-red-900/30 p-8 font-mono text-[11px] text-red-500/80 leading-relaxed text-left uppercase tracking-wider overflow-hidden'>
            <div className='flex justify-between mb-4 border-b border-red-900/20 pb-2'>
              <span>SOURCE: INTERNAL_RUNTIME</span>
              <span>TYPE: EXCEPTION_THROW</span>
            </div>
            <p className='mb-2'>&gt; STACK_TRACE_ANALYSIS:</p>
            <p className='bg-red-950/30 p-3 border border-red-600/20 italic'>
              "{errorMessage}"
            </p>
            <p className='mt-4 text-[9px] opacity-50'>
              Possibility: Unhandled_Promise, Memory_Leak, or
              Protocol_Violation.
            </p>
          </div>
        </div>

        {/* Navigation Actions */}
        <div className='flex flex-col items-center gap-6 pt-8'>
          <button
            onClick={() => navigate('/')}
            className='group flex items-center gap-4 px-10 py-4 bg-transparent border border-[var(--border-subtle)] text-[var(--text-dim)] hover:border-red-600 hover:text-red-600 transition-all duration-500'
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              className='text-[10px] group-hover:-translate-x-2 transition-transform'
            />
            <span className='text-[10px] font-black uppercase tracking-[0.4em]'>
              Reboot_to_Safe_Root
            </span>
          </button>

          <span className='text-[8px] font-mono text-[var(--text-dim)]/60 uppercase tracking-[0.2em]'>
            System status: unstable // awaiting_user_directive
          </span>
        </div>
      </div>
    </div>
  )
}
