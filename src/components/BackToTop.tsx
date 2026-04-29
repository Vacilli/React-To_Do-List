import { useState, useEffect, RefObject } from 'react'

export default function BackToTop({
  scrollRef,
}: {
  scrollRef: RefObject<HTMLElement>
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const handleScroll = () => setVisible(container.scrollTop > 400)
    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [scrollRef])

  return (
    <button
      onClick={() =>
        scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
      }
      className={`fixed bottom-10 right-10 z-[100] group flex items-center justify-center w-12 h-12 transition-all duration-700 ${
        visible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-10 scale-75 pointer-events-none'
      }`}
      title='SYSTEM_RESET_TOP'
    >
      {/* Outer Rotating Frame (Artifact Style) */}
      <div className='absolute rotate-45 w-10 h-10 border border-[var(--accent-primary)] opacity-40 group-hover:opacity-100 group-hover:rotate-[135deg] transition-all duration-700 shadow-[0_0_20px_var(--accent-active-bg)]' />

      {/* Inner Solid Diamond */}
      <div className='absolute rotate-45 w-5 h-5 bg-[var(--accent-primary)] opacity-20 group-hover:opacity-80 transition-opacity duration-300' />

      {/* Core HUD Lines */}
      <div className='z-10 flex flex-col gap-0.5 items-center'>
        <div className='w-1.5 h-1.5 bg-[var(--text-main)] rotate-45' />
      </div>

      {/* Vertical Label - Slides out on hover */}
      <span className='absolute -left-12 text-[7px] font-mono uppercase tracking-[0.4em] text-[var(--accent-primary)] -rotate-90 opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap'>
        RET_TO_ZERO
      </span>
    </button>
  )
}
