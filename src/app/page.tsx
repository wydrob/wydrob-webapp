'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { useMotionValue, animate, motion } from 'framer-motion'
import TransformingCanvas from '@/components/TransformingCanvas'

const NUM_SECTIONS = 4
const SCROLL_DURATION = 1.2

export default function Home() {
  const scrollProgress = useMotionValue(0)
  const baseViewportHeight = useRef(0)
  const isAnimating = useRef(false)
  const currentSection = useRef(0)
  const [isMobile, setIsMobile] = useState(false)
  const [currentSectionState, setCurrentSectionState] = useState(0)

  const navigateToSection = useCallback((direction: number) => {
    if (isAnimating.current) return

    const targetSection = Math.max(0, Math.min(NUM_SECTIONS - 1, currentSection.current + direction))

    if (targetSection !== currentSection.current) {
      isAnimating.current = true
      currentSection.current = targetSection
      setCurrentSectionState(targetSection)

      const vh = baseViewportHeight.current
      const targetScroll = targetSection * vh
      const totalScrollable = vh * (NUM_SECTIONS - 1)
      const targetProgress = targetScroll / totalScrollable

      animate(scrollProgress.get(), targetProgress, {
        duration: SCROLL_DURATION,
        ease: [0.32, 0.72, 0, 1],
        onUpdate: (value) => {
          scrollProgress.set(value)
          window.scrollTo(0, value * totalScrollable)
        },
        onComplete: () => {
          isAnimating.current = false
        }
      })
    }
  }, [scrollProgress])

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640 || 'ontouchstart' in window)
    }
    checkMobile()

    // Always reset to top on mount
    window.scrollTo({ top: 0, behavior: 'instant' })
    baseViewportHeight.current = window.innerHeight
    currentSection.current = 0
    scrollProgress.set(0)
    setCurrentSectionState(0)

    const handleWheel = (e: WheelEvent) => {
      // Prevent zoom
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        return
      }

      // Always prevent default scroll
      e.preventDefault()

      // If animating, ignore
      if (isAnimating.current) return

      const direction = e.deltaY > 0 ? 1 : -1
      navigateToSection(direction)
    }

    // Block touch scrolling on mobile
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
    }

    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0')) {
        e.preventDefault()
        return
      }

      if (isAnimating.current) return

      let direction = 0
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        direction = 1
        e.preventDefault()
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        direction = -1
        e.preventDefault()
      }

      if (direction !== 0) {
        navigateToSection(direction)
      }
    }

    const handleResize = () => {
      baseViewportHeight.current = window.innerHeight
      const totalScrollable = window.innerHeight * (NUM_SECTIONS - 1)
      window.scrollTo(0, scrollProgress.get() * totalScrollable)
      checkMobile()
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('keydown', handleKeydown)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('keydown', handleKeydown)
      window.removeEventListener('resize', handleResize)
    }
  }, [scrollProgress, navigateToSection])

  return (
    <main className="relative bg-[#0a0a0a]">
      <TransformingCanvas scrollProgress={scrollProgress} />

      {/* Mobile navigation buttons */}
      {isMobile && (
        <>
          {/* Up button - top left */}
          <motion.button
            onClick={() => navigateToSection(-1)}
            className="fixed top-4 left-4 z-50 w-[84px] h-[84px] flex items-center justify-center"
            style={{ opacity: currentSectionState === 0 ? 0.3 : 0.7 }}
            whileTap={{ scale: 0.9 }}
            disabled={currentSectionState === 0}
          >
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#f5f5f5]/80">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </motion.button>

          {/* Down button - bottom left */}
          <motion.button
            onClick={() => navigateToSection(1)}
            className="fixed bottom-4 left-4 z-50 w-[84px] h-[84px] flex items-center justify-center"
            style={{ opacity: currentSectionState === NUM_SECTIONS - 1 ? 0.3 : 0.7 }}
            whileTap={{ scale: 0.9 }}
            disabled={currentSectionState === NUM_SECTIONS - 1}
          >
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#f5f5f5]/80">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.button>
        </>
      )}
    </main>
  )
}
