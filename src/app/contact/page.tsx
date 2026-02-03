'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import Link from 'next/link'

const contactMethods = [
  {
    label: 'Business Inquiries',
    value: 'WYDROB@WYDROB.APP',
    type: 'email',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    )
  },
  {
    label: 'Instagram',
    value: '@wydoinrob',
    type: 'social',
    url: 'https://instagram.com/wydoinrob',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    )
  },
  {
    label: 'Twitter / X',
    value: '@wydoinrob',
    type: 'social',
    url: 'https://x.com/wydoinrob',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
      </svg>
    )
  },
]

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

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

      {/* Background text */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.02, scale: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="font-display text-[25vw] sm:text-[30vw] tracking-tighter w-full text-center leading-none"
        >
          CONTACT
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-20">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-6xl sm:text-8xl tracking-tight mb-4">CONTACT</h1>
        </motion.div>

        {/* Contact cards */}
        <div className="w-full max-w-2xl space-y-4">
          {contactMethods.map((method, i) => (
            <motion.div
              key={method.label}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => {
                setHoveredIndex(i)
                handleMouseEnter()
              }}
              onMouseLeave={() => {
                setHoveredIndex(null)
                handleMouseLeave()
              }}
            >
              {method.url ? (
                <a
                  href={method.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <ContactCard method={method} isHovered={hoveredIndex === i} />
                </a>
              ) : (
                <a
                  href={`mailto:${method.value}`}
                  className="group block"
                >
                  <ContactCard method={method} isHovered={hoveredIndex === i} />
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* Decorative elements */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="absolute left-1/4 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[#f5f5f5]/10 to-transparent origin-top hidden sm:block"
        />
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute right-1/4 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[#f5f5f5]/10 to-transparent origin-bottom hidden sm:block"
        />

        {/* Footer note */}
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed w-1 h-1 bg-[#f5f5f5]/10 rounded-full pointer-events-none"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
          }}
          animate={{
            y: [null, Math.random() * -200, null],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 5,
          }}
        />
      ))}
    </main>
  )
}

function ContactCard({ method, isHovered }: { method: typeof contactMethods[0], isHovered: boolean }) {
  return (
    <div className={`relative p-6 border transition-all duration-500 ${
      isHovered
        ? 'border-[#f5f5f5]/30 bg-[#f5f5f5]/5'
        : 'border-[#f5f5f5]/10 bg-transparent'
    }`}>
      {/* Corner accents */}
      <motion.div
        animate={{ scale: isHovered ? 1 : 0 }}
        className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-[#f5f5f5]/40"
      />
      <motion.div
        animate={{ scale: isHovered ? 1 : 0 }}
        className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-[#f5f5f5]/40"
      />
      <motion.div
        animate={{ scale: isHovered ? 1 : 0 }}
        className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-[#f5f5f5]/40"
      />
      <motion.div
        animate={{ scale: isHovered ? 1 : 0 }}
        className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-[#f5f5f5]/40"
      />

      <div className="flex items-center gap-6">
        {/* Icon */}
        <div className={`transition-colors duration-300 ${isHovered ? 'text-[#f5f5f5]' : 'text-[#f5f5f5]/30'}`}>
          {method.icon}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="text-[10px] text-[#f5f5f5]/30 tracking-widest uppercase mb-1">
            {method.label}
          </div>
          <div className={`font-display text-xl sm:text-2xl transition-all duration-300 ${
            isHovered ? 'tracking-wide' : 'tracking-normal'
          }`}>
            {method.value}
          </div>
        </div>

        {/* Arrow */}
        <motion.div
          animate={{ x: isHovered ? 5 : 0, opacity: isHovered ? 1 : 0.3 }}
          className="text-[#f5f5f5]/40"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </motion.div>
      </div>
    </div>
  )
}
