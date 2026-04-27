import { useState, useEffect, RefObject } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'

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

  if (!visible) return null

  return (
    <button
      onClick={() =>
        scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
      }
      className='absolute bottom-10 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center group transition-all duration-700 animate-scan'
    >
      {/* TOP HALF: Holographic Border */}
      <div
        className='w-14 h-7 border border-[#C5A059]/30 bg-transparent backdrop-blur-[2px] transition-all duration-500 group-hover:border-[#C5A059] group-hover:bg-[#C5A059]/5 group-hover:-translate-y-1'
        style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}
      >
        <div className='flex items-end justify-center h-full pb-1'>
          <FontAwesomeIcon
            icon={faChevronUp}
            className='text-[10px] text-[#C5A059]/40 group-hover:text-[#C5A059] transition-all duration-500'
          />
        </div>
      </div>

      {/* CENTER CHANNEL: Lexical Data */}
      <div className='py-1 px-3 border-l border-r border-[#C5A059]/10 group-hover:border-[#C5A059]/40 transition-colors flex items-center justify-center overflow-hidden'>
        <span
          className='text-[7px] font-mono font-black tracking-[0.5em] text-[#C5A059]/80 
                 group-hover:text-[#C5A059] group-hover:tracking-[0.7em] 
                 uppercase whitespace-nowrap flex self-center 
                 transition-all duration-500 ease-out'
        >
          GO_TO_TOP
        </span>
      </div>

      {/* BOTTOM HALF: Holographic Border */}
      <div
        className='w-14 h-7 border border-[#C5A059]/30 bg-transparent backdrop-blur-[2px] transition-all duration-500 group-hover:border-[#C5A059] group-hover:bg-[#C5A059]/5 group-hover:translate-y-1'
        style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }}
      >
        <div className='flex items-start justify-center h-full pt-2'>
          <div className='w-1.5 h-1.5 rounded-full bg-[#C5A059]/10 group-hover:bg-[#C5A059] group-hover:shadow-[0_0_10px_#C5A059] transition-all duration-500' />
        </div>
      </div>
    </button>
  )
}
