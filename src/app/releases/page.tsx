'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, animate, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const releases = [
  { title: 'FLANK', year: '2025', type: 'Single', color: '#ff4444' },
  { title: 'ILY', year: '2025', type: 'Single', color: '#ff88ff' },
  { title: 'MISFIRE', year: '2025', type: 'Single', color: '#44ff88' },
  { title: 'RIPTIDE', year: '2025', type: 'EP', color: '#4488ff' },
  { title: 'ROOTS', year: '2025', type: 'Single', color: '#88ff44' },
  { title: 'STARLIGHTS', year: '2025', type: 'Single', color: '#ffff44' },
  { title: 'SHOUTOUT', year: '2025', type: 'Single', color: '#ff8844' },
  { title: 'EGO!', year: '2025', type: 'Single', color: '#ff4488' },
  { title: 'TAKE UR CIGARETTE', year: '2024', type: 'Single', color: '#8844ff' },
  { title: 'TAMAGOTCHI', year: '2024', type: 'Single', color: '#44ffff' },
  { title: 'OTHER HALF', year: '2024', type: 'Single', color: '#ff44ff' },
  { title: 'WHOAMI?', year: '2024', type: 'Single', color: '#44ff44' },
  { title: 'HAYWIRE!', year: '2024', type: 'Single', color: '#ffaa44' },
  { title: 'REMEDY', year: '2024', type: 'Single', color: '#44aaff' },
]

export default function ReleasesPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const isAnimating = useRef(false)

  // Cursor
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const cursorScale = useMotionValue(0)
  const smoothX = useSpring(cursorX, { stiffness: 500, damping: 30 })
  const smoothY = useSpring(cursorY, { stiffness: 500, damping: 30 })
  const smoothScale = useSpring(cursorScale, { stiffness: 400, damping: 25 })

  const handleMouseMove = (e: React.MouseEvent) => {
    cursorX.set(e.clientX)
    cursorY.set(e.clientY)
  }
  const handleMouseEnter = () => cursorScale.set(1)
  const handleMouseLeave = () => cursorScale.set(0)

  const navigate = (dir: number) => {
    if (isAnimating.current) return
    isAnimating.current = true
    setDirection(dir)

    const newIndex = dir > 0
      ? (activeIndex + 1) % releases.length
      : (activeIndex - 1 + releases.length) % releases.length

    setActiveIndex(newIndex)
    setTimeout(() => { isAnimating.current = false }, 600)
  }

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      navigate(e.deltaY > 0 ? 1 : -1)
    }

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        navigate(1)
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        navigate(-1)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeydown)
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [activeIndex])

  const currentRelease = releases[activeIndex]
  const prevRelease = releases[(activeIndex - 1 + releases.length) % releases.length]
  const nextRelease = releases[(activeIndex + 1) % releases.length]

  const variants = {
    enter: (dir: number) => ({
      rotateY: dir > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      rotateY: dir > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.8,
    }),
  }

  return (
    <main
      onMouseMove={handleMouseMove}
      className="relative h-screen bg-[#0a0a0a] overflow-hidden"
      style={{ perspective: '1500px' }}
    >
      {/* Cursor */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          scale: smoothScale,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none z-[100] mix-blend-difference bg-[#f5f5f5]"
      />

      {/* Back button */}
      <Link href="/">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="fixed top-6 left-6 sm:top-8 sm:left-8 z-50 flex items-center gap-2 text-[#f5f5f5]/40 hover:text-[#f5f5f5] transition-colors cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span className="text-xs tracking-widest uppercase hidden sm:block">Back</span>
        </motion.div>
      </Link>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="fixed top-6 sm:top-8 left-1/2 -translate-x-1/2 z-50"
      >
        <h1 className="font-display text-3xl sm:text-5xl tracking-tighter">RELEASES</h1>
      </motion.div>

      {/* Main card area */}
      <div className="fixed inset-0 flex items-center justify-center" style={{ perspective: '1500px' }}>
        {/* Background color glow */}
        <motion.div
          key={`glow-${activeIndex}`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.15, scale: 1.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute w-[60vw] h-[60vw] rounded-full blur-[100px]"
          style={{ backgroundColor: currentRelease.color }}
        />

        {/* Previous card preview */}
        <motion.div
          onClick={() => navigate(-1)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={{ x: '-70vw', rotateY: 45, scale: 0.6, opacity: 0.3 }}
          transition={{ duration: 0.5 }}
          className="absolute w-[40vw] max-w-[400px] aspect-square cursor-pointer"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="w-full h-full border border-[#f5f5f5]/10 bg-[#f5f5f5]/[0.02] flex items-center justify-center">
            <span className="font-display text-2xl text-[#f5f5f5]/20">{prevRelease.title}</span>
          </div>
        </motion.div>

        {/* Main card */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="relative w-[70vw] sm:w-[45vw] max-w-[500px] aspect-square"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Card face */}
            <div className="absolute inset-0 border-2 border-[#f5f5f5]/20 bg-[#0a0a0a]">
              {/* Accent color strip */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: currentRelease.color }}
              />

              {/* Grid pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, ${currentRelease.color} 1px, transparent 1px),
                    linear-gradient(to bottom, ${currentRelease.color} 1px, transparent 1px)
                  `,
                  backgroundSize: '30px 30px'
                }}
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <div className="text-[10px] tracking-[0.3em] text-[#f5f5f5]/30 mb-4">
                    {currentRelease.type} · {currentRelease.year}
                  </div>
                  <h2 className="font-display text-5xl sm:text-7xl tracking-tight mb-6">
                    {currentRelease.title}
                  </h2>
                  <motion.button
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border border-[#f5f5f5]/30 px-6 py-2 text-xs tracking-widest uppercase hover:bg-[#f5f5f5] hover:text-black transition-all duration-300"
                  >
                    Listen Now
                  </motion.button>
                </motion.div>
              </div>

              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2" style={{ borderColor: currentRelease.color }} />
              <div className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2" style={{ borderColor: currentRelease.color }} />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2" style={{ borderColor: currentRelease.color }} />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2" style={{ borderColor: currentRelease.color }} />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Next card preview */}
        <motion.div
          onClick={() => navigate(1)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={{ x: '70vw', rotateY: -45, scale: 0.6, opacity: 0.3 }}
          transition={{ duration: 0.5 }}
          className="absolute w-[40vw] max-w-[400px] aspect-square cursor-pointer"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="w-full h-full border border-[#f5f5f5]/10 bg-[#f5f5f5]/[0.02] flex items-center justify-center">
            <span className="font-display text-2xl text-[#f5f5f5]/20">{nextRelease.title}</span>
          </div>
        </motion.div>
      </div>

      {/* Navigation arrows */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-50">
        <motion.button
          onClick={() => navigate(-1)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 border border-[#f5f5f5]/20 flex items-center justify-center hover:bg-[#f5f5f5] hover:text-black transition-all duration-300"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </motion.button>
        <motion.button
          onClick={() => navigate(1)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 border border-[#f5f5f5]/20 flex items-center justify-center hover:bg-[#f5f5f5] hover:text-black transition-all duration-300"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </motion.button>
      </div>

      {/* Year filter */}
      <div className="fixed left-6 sm:left-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        {['2025', '2024', '2023'].map((year) => (
          <button
            key={year}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`text-[10px] tracking-widest transition-all duration-300 ${
              currentRelease.year === year ? 'text-[#f5f5f5]' : 'text-[#f5f5f5]/20 hover:text-[#f5f5f5]/40'
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Track list mini view */}
      <div className="fixed right-6 sm:right-8 bottom-8 z-50 hidden sm:block">
        <div className="flex flex-col gap-1 max-h-[200px] overflow-hidden">
          {releases.slice(Math.max(0, activeIndex - 2), activeIndex + 3).map((release, i) => {
            const actualIndex = Math.max(0, activeIndex - 2) + i
            return (
              <motion.button
                key={release.title}
                onClick={() => {
                  if (isAnimating.current) return
                  isAnimating.current = true
                  setDirection(actualIndex > activeIndex ? 1 : -1)
                  setActiveIndex(actualIndex)
                  setTimeout(() => { isAnimating.current = false }, 600)
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`text-right text-xs transition-all duration-300 ${
                  actualIndex === activeIndex
                    ? 'text-[#f5f5f5]'
                    : 'text-[#f5f5f5]/20 hover:text-[#f5f5f5]/40'
                }`}
              >
                {release.title}
              </motion.button>
            )
          })}
        </div>
      </div>
    </main>
  )
}
