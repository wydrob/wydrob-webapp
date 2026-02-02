'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring, animate } from 'framer-motion'
import Link from 'next/link'

const facts = [
  { label: 'STARTED', value: '2023' },
  { label: 'GENRE', value: 'NOTECORE' },
  { label: 'RELEASES', value: '20+' },
  { label: 'STREAMS', value: '20M+' },
]

const timeline = [
  { year: '2023', title: 'THE BEGINNING', desc: 'First tracks dropped. GLAZ, 911!, POWER UP!' },
  { year: '2024', title: 'BUILDING', desc: 'Momentum. HAYWIRE, TAMAGOTCHI, REMEDY' },
  { year: '2025', title: 'NOTECORE', desc: 'The sound clicks. RIPTIDE EP, FLANK, ILY' },
  { year: '2026', title: '???', desc: 'Stay tuned.' },
]

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollProgress = useMotionValue(0)
  const [currentSection, setCurrentSection] = useState(0)
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

  const NUM_SECTIONS = 4

  const navigateToSection = (direction: number) => {
    if (isAnimating.current) return

    const newSection = Math.max(0, Math.min(NUM_SECTIONS - 1, currentSection + direction))
    if (newSection !== currentSection) {
      isAnimating.current = true
      setCurrentSection(newSection)

      const targetProgress = newSection / (NUM_SECTIONS - 1)

      animate(scrollProgress.get(), targetProgress, {
        duration: 1,
        ease: [0.32, 0.72, 0, 1],
        onUpdate: (v) => scrollProgress.set(v),
        onComplete: () => { isAnimating.current = false }
      })
    }
  }

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (isAnimating.current) return
      navigateToSection(e.deltaY > 0 ? 1 : -1)
    }

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        navigateToSection(1)
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        navigateToSection(-1)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeydown)
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [currentSection])

  // Horizontal scroll transform - simpler, keeps content centered
  const scrollX = useTransform(scrollProgress, [0, 1], ['0vw', '-300vw'])

  // Section opacities
  const section1Opacity = useTransform(scrollProgress, [0, 0.2, 0.3], [1, 1, 0])
  const section2Opacity = useTransform(scrollProgress, [0.2, 0.33, 0.5, 0.6], [0, 1, 1, 0])
  const section3Opacity = useTransform(scrollProgress, [0.5, 0.66, 0.8, 0.9], [0, 1, 1, 0])
  const section4Opacity = useTransform(scrollProgress, [0.8, 1], [0, 1])

  // Skew effects
  const globalSkew = useTransform(scrollProgress, [0, 0.5, 1], [0, -3, 0])

  return (
    <main
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen bg-[#0a0a0a] overflow-hidden"
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

      {/* Horizontal scrolling container */}
      <motion.div
        style={{ x: scrollX, skewY: globalSkew }}
        className="absolute top-0 left-0 h-screen flex items-center"
      >
        {/* Section 1: INTRO */}
        <motion.div
          style={{ opacity: section1Opacity }}
          className="w-screen h-screen flex items-center justify-center flex-shrink-0"
        >
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[15vw] sm:text-[12vw] tracking-tighter leading-none"
            >
              ABOUT
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-sm sm:text-base tracking-widest uppercase mt-4"
            >
              The story so far
            </motion.p>
          </div>
        </motion.div>

        {/* Section 2: WHO IS WYDROB */}
        <motion.div
          style={{ opacity: section2Opacity }}
          className="w-screen h-screen flex items-center justify-center flex-shrink-0 px-8"
        >
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl sm:text-6xl tracking-tight mb-8">WHO IS WYDROB?</h2>
            <p className="text-[#f5f5f5]/60 text-lg leading-relaxed mb-8">
              WYDROB is a music artist and engineer behind NOTECORE.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {facts.map((fact, i) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="border-l border-[#f5f5f5]/20 pl-4"
                >
                  <div className="text-[10px] text-[#f5f5f5]/30 tracking-widest mb-1">{fact.label}</div>
                  <div className="font-display text-2xl">{fact.value}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Section 3: TIMELINE */}
        <motion.div
          style={{ opacity: section3Opacity }}
          className="w-screen h-screen flex items-center justify-center flex-shrink-0 px-8"
        >
          <div>
            <h2 className="font-display text-4xl sm:text-6xl tracking-tight mb-12 text-center">THE JOURNEY</h2>
            <div className="flex gap-6 sm:gap-12 flex-wrap justify-center">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="w-[200px] sm:w-[250px] relative"
                >
                  <div className="text-5xl sm:text-7xl font-display text-[#f5f5f5]/10 mb-4">{item.year}</div>
                  <h3 className="font-display text-xl mb-2">{item.title}</h3>
                  <p className="text-[#f5f5f5]/40 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Section 4: THANKS */}
        <motion.div
          style={{ opacity: section4Opacity }}
          className="w-screen h-screen flex items-center justify-center flex-shrink-0 px-8"
        >
          <div className="text-center max-w-3xl relative">
            <p className="text-[#f5f5f5]/30 text-sm tracking-widest uppercase mb-10">
              there&apos;s nowhere else to go
            </p>

            {/* Spinning animation */}
            <div className="w-64 h-64 mx-auto mb-10">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain"
              >
                <source src="/TRANSPARENT_hires_animation.webm" type="video/webm" />
                <source src="/TRANSPARENT_hires_animation.mov" type="video/quicktime" />
              </video>
            </div>

            <div className="flex gap-4 justify-center">
              <Link href="/">
                <motion.button
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-[#f5f5f5]/20 px-8 py-3 text-sm tracking-widest uppercase hover:bg-[#f5f5f5] hover:text-black transition-all duration-300"
                >
                  Back Home
                </motion.button>
              </Link>
              <Link href="/releases">
                <motion.button
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-[#f5f5f5]/20 px-8 py-3 text-sm tracking-widest uppercase hover:bg-[#f5f5f5] hover:text-black transition-all duration-300"
                >
                  Releases
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Progress indicator */}
      <div className="fixed right-6 sm:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {['INTRO', 'WHO', 'JOURNEY', 'THANKS'].map((label, i) => (
          <motion.button
            key={label}
            onClick={() => {
              if (isAnimating.current) return
              isAnimating.current = true
              setCurrentSection(i)
              animate(scrollProgress.get(), i / (NUM_SECTIONS - 1), {
                duration: 1,
                ease: [0.32, 0.72, 0, 1],
                onUpdate: (v) => scrollProgress.set(v),
                onComplete: () => { isAnimating.current = false }
              })
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="group flex items-center gap-2"
          >
            <span className={`text-[8px] tracking-widest transition-all duration-300 ${
              currentSection === i ? 'text-[#f5f5f5]' : 'text-[#f5f5f5]/20 group-hover:text-[#f5f5f5]/40'
            }`}>
              {label}
            </span>
            <div className={`w-8 h-px transition-all duration-300 ${
              currentSection === i ? 'bg-[#f5f5f5]' : 'bg-[#f5f5f5]/20'
            }`} />
          </motion.button>
        ))}
      </div>

      {/* Decorative grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #f5f5f5 1px, transparent 1px),
            linear-gradient(to bottom, #f5f5f5 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}
      />
    </main>
  )
}
