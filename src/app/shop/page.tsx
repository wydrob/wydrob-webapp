'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform, animate, useSpring } from 'framer-motion'
import Link from 'next/link'

// Coming soon products
const products = [
  {
    id: 1,
    name: '???',
    price: '$???',
    status: 'COMING SOON',
    description: '???'
  },
  {
    id: 2,
    name: '???',
    price: '$???',
    status: 'COMING SOON',
    description: '???'
  },
  {
    id: 3,
    name: '???',
    price: '$???',
    status: 'COMING SOON',
    description: '???'
  },
]

export default function ShopPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollX = useMotionValue(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
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

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const navigateToProduct = (direction: number) => {
    if (isAnimating.current) return

    const newIndex = Math.max(0, Math.min(products.length - 1, activeIndex + direction))
    if (newIndex !== activeIndex) {
      isAnimating.current = true
      setActiveIndex(newIndex)

      const targetX = -newIndex * (isMobile ? window.innerWidth : window.innerWidth * 0.6)

      animate(scrollX.get(), targetX, {
        duration: 0.8,
        ease: [0.32, 0.72, 0, 1],
        onUpdate: (v) => scrollX.set(v),
        onComplete: () => { isAnimating.current = false }
      })
    }
  }

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (isAnimating.current) return

      const direction = e.deltaY > 0 ? 1 : -1
      navigateToProduct(direction)
    }

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        navigateToProduct(1)
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        navigateToProduct(-1)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [activeIndex, isMobile])

  // Progress transforms for each product
  const cardWidth = isMobile ? 100 : 60 // vw

  return (
    <main
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen bg-[#0a0a0a] overflow-hidden touch-none"
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

      {/* Title - fixed */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 sm:top-8 left-1/2 -translate-x-1/2 z-50"
      >
        <h1 className="font-display text-3xl sm:text-5xl tracking-tighter">SHOP</h1>
      </motion.div>

      {/* Horizontal scrolling products */}
      <motion.div
        style={{ x: scrollX }}
        className="absolute top-0 left-0 h-full flex"
      >
        {products.map((product, i) => {
          const isActive = i === activeIndex

          return (
            <motion.div
              key={product.id}
              className="relative h-full flex items-center justify-center"
              style={{ width: isMobile ? '100vw' : '60vw' }}
            >
              {/* Product card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                animate={{
                  opacity: isActive ? 1 : 0.3,
                  scale: isActive ? 1 : 0.85,
                  rotateY: isActive ? 0 : (i < activeIndex ? 15 : -15),
                }}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                className="relative w-[80vw] sm:w-[45vw] max-w-[500px] aspect-square"
                style={{ perspective: '1000px' }}
              >
                {/* Product image placeholder */}
                <div className="absolute inset-0 border border-[#f5f5f5]/10 bg-[#f5f5f5]/[0.02]">
                  {/* Grid pattern background */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, #f5f5f5 1px, transparent 1px),
                        linear-gradient(to bottom, #f5f5f5 1px, transparent 1px)
                      `,
                      backgroundSize: '12.5% 12.5%'
                    }}
                  />

                  {/* Coming soon badge */}
                  <motion.div
                    initial={{ scale: 0, rotate: -12 }}
                    animate={{ scale: isActive ? 1 : 0, rotate: -12 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                    className="absolute top-4 right-4 bg-[#f5f5f5] text-black px-3 py-1 text-[10px] tracking-widest font-bold"
                  >
                    {product.status}
                  </motion.div>

                  {/* Product icon/placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{
                        scale: isActive ? [1, 1.05, 1] : 1,
                      }}
                      transition={{
                        duration: 2,
                        repeat: isActive ? Infinity : 0,
                        ease: 'easeInOut'
                      }}
                      className="text-[#f5f5f5]/5 font-display text-[20vw] sm:text-[12vw]"
                    >
                      ?
                    </motion.div>
                  </div>
                </div>

                {/* Product info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="absolute -bottom-[101px] left-0 right-0 text-center"
                >
                  <h2 className="font-display text-2xl sm:text-3xl tracking-tight mb-2">{product.name}</h2>
                  <p className="text-[#f5f5f5]/60 text-lg font-display">{product.price}</p>
                </motion.div>
              </motion.div>

              {/* Decorative lines */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: isActive ? 1 : 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute left-[10%] top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[#f5f5f5]/20 to-transparent origin-top"
              />
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: isActive ? 1 : 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute right-[10%] top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[#f5f5f5]/20 to-transparent origin-bottom"
              />
            </motion.div>
          )
        })}
      </motion.div>

      {/* Navigation arrows and progress dots */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-50">
        {/* Progress dots */}
        <div className="flex gap-2">
          {products.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => {
                if (isAnimating.current) return
                isAnimating.current = true
                setActiveIndex(i)
                const targetX = -i * (isMobile ? window.innerWidth : window.innerWidth * 0.6)
                animate(scrollX.get(), targetX, {
                  duration: 0.8,
                  ease: [0.32, 0.72, 0, 1],
                  onUpdate: (v) => scrollX.set(v),
                  onComplete: () => { isAnimating.current = false }
                })
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: i === activeIndex ? '#f5f5f5' : 'transparent',
                border: '1px solid rgba(245, 245, 245, 0.3)'
              }}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex gap-4">
          <motion.button
            onClick={() => navigateToProduct(-1)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 border border-[#f5f5f5]/20 flex items-center justify-center hover:bg-[#f5f5f5] hover:text-black transition-all duration-300"
            style={{ opacity: activeIndex === 0 ? 0.3 : 1 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </motion.button>
          <motion.button
            onClick={() => navigateToProduct(1)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 border border-[#f5f5f5]/20 flex items-center justify-center hover:bg-[#f5f5f5] hover:text-black transition-all duration-300"
            style={{ opacity: activeIndex === products.length - 1 ? 0.3 : 1 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Background SHOP text */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.02 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-display text-[40vw] sm:text-[50vw] tracking-tighter w-full text-center leading-none translate-y-[5%]"
        >
          SHOP
        </motion.div>
      </div>
    </main>
  )
}
