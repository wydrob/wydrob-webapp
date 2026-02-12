'use client'

import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'Home', path: '/', icon: '⌂', subtitle: 'Return' },
  { name: 'Shop', path: '/shop', icon: '◇', subtitle: 'Merch' },
  { name: 'Contact', path: '/contact', icon: '◉', subtitle: 'Connect' },
]

export default function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const pathname = usePathname()

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Custom cursor for menu
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const cursorScale = useMotionValue(0)
  const smoothX = useSpring(cursorX, { stiffness: 500, damping: 30 })
  const smoothY = useSpring(cursorY, { stiffness: 500, damping: 30 })
  const smoothScale = useSpring(cursorScale, { stiffness: 400, damping: 25 })

  const handleMouseEnter = () => cursorScale.set(1)
  const handleMouseLeave = () => cursorScale.set(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    if (isOpen) {
      window.addEventListener('mousemove', handleMouseMove)
    }
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isOpen, cursorX, cursorY])

  return (
    <>
      {/* Menu button with morphing animation */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className="fixed top-6 right-6 sm:top-8 sm:right-8 z-[70] w-12 h-12 sm:w-14 sm:h-14 border border-[#f5f5f5]/20 flex items-center justify-center hover:bg-[#f5f5f5] hover:text-black transition-all duration-300 group overflow-hidden"
      >
        {/* Animated background sweep */}
        <motion.div
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f5f5f5]/10 to-transparent"
        />

        <div className="relative flex flex-col gap-1.5 group-hover:gap-2 transition-all duration-300">
          <motion.div
            animate={{
              rotate: isOpen ? 45 : 0,
              y: isOpen ? 8 : 0,
              width: isOpen ? 20 : 16,
            }}
            className="h-0.5 bg-current origin-center"
            style={{ width: 16 }}
          />
          <motion.div
            animate={{
              opacity: isOpen ? 0 : 1,
              scaleX: isOpen ? 0 : 1,
            }}
            className="w-4 h-0.5 bg-current"
          />
          <motion.div
            animate={{
              rotate: isOpen ? -45 : 0,
              y: isOpen ? -8 : 0,
              width: isOpen ? 20 : 16,
            }}
            className="h-0.5 bg-current origin-center"
            style={{ width: 16 }}
          />
        </div>

        {/* Corner accents */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute top-0 left-0 w-2 h-2 border-l border-t border-[#f5f5f5]/50"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-[#f5f5f5]/50"
        />
      </motion.button>

      {/* Fullscreen menu with creative reveal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop with noise */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#0a0a0a] z-[200]"
            >


            </motion.div>

            {/* Menu content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[201] flex items-center justify-center"
            >
              {/* Custom cursor for menu */}
              <motion.div
                style={{ x: smoothX, y: smoothY, scale: smoothScale, translateX: '-50%', translateY: '-50%' }}
                className="fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none z-[100] mix-blend-difference bg-[#f5f5f5] hidden sm:block"
              />

              <nav className="flex flex-col items-center gap-2 sm:gap-4">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: 50, rotateX: -20 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: -30, rotateX: 20 }}
                    transition={{
                      delay: i * 0.08,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="relative"
                    onMouseEnter={() => { setHoveredIndex(i); handleMouseEnter(); }}
                    onMouseLeave={() => { setHoveredIndex(null); handleMouseLeave(); }}
                  >
                    <Link
                      href={item.path}
                      onClick={(e) => {
                        if (pathname === item.path) {
                          e.preventDefault()
                          setIsOpen(false)
                        }
                      }}
                      className={`group relative block text-center transition-all duration-300 ${
                        pathname === item.path
                          ? 'text-[#f5f5f5]'
                          : 'text-[#f5f5f5]/30 hover:text-[#f5f5f5]'
                      }`}
                    >
                      {/* Name */}
                      <div className="relative">
                        <span className="font-display text-4xl sm:text-6xl md:text-7xl tracking-tight transition-all duration-300 group-hover:tracking-wide">
                          {item.name}
                        </span>

                        {/* Subtitle */}
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{
                            opacity: hoveredIndex === i ? 1 : 0,
                            x: hoveredIndex === i ? 0 : -10
                          }}
                          className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] uppercase text-[#f5f5f5]/40 whitespace-nowrap"
                        >
                          {item.subtitle}
                        </motion.span>
                      </div>
                    </Link>

                  </motion.div>
                ))}
              </nav>



            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
