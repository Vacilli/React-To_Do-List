import { useEffect, useState } from 'react'

export default function Loader() {
  const [progress, setProgress] = useState(0)

  // Purely aesthetic progress increment
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 99 ? prev + 1 : 99))
    }, 20)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[var(--bg-main)] transition-colors duration-500'>
      {/* Background Grid Effect */}
      <div className='absolute inset-0 bg-[url("https://grainy-gradients.vercel.app/noise.svg")] opacity-20 pointer-events-none' />

      <div className='relative flex flex-col items-center'>
        {/* Terminal Text */}
        <div className='mb-4 font-mono text-[10px] tracking-[0.5em] text-[var(--accent-action)] uppercase animate-pulse'>
          Initializing_Sequence... {progress}%
        </div>

        {/* The Progress Bar Container */}
        <div className='h-[2px] w-64 bg-[var(--border-subtle)] relative overflow-hidden'>
          {/* Moving Bit */}
          <div
            className='h-full bg-[var(--accent-action)] transition-all duration-300 ease-out shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)]'
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Subtle Scanline Effect */}
        <div className='mt-8 flex gap-4'>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className='w-1 h-1 bg-[var(--text-dim)] opacity-20'
              style={{ animation: `pulse 1.5s infinite ${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
