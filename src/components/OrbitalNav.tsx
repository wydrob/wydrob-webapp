'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface NavOrb {
  name: string
  path: string
  icon: string
  description: string
  color: string
}

const navOrbs: NavOrb[] = [
  { name: 'Contact', path: '/contact', icon: '◉', description: 'Connect', color: '#95e1d3' },
  { name: 'About', path: '/about', icon: '◎', description: 'The story', color: '#4ecdc4' },
  { name: 'Shop', path: '/shop', icon: '◇', description: 'Merch drops', color: '#ffe66d' },
]

interface Props {
  isVisible: boolean
  scrollSection: number
}

export default function OrbitalNav({ isVisible, scrollSection }: Props) {
  const [hoveredOrb, setHoveredOrb] = useState<number | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!isVisible) return null

  // Orbs arranged in a perfect quarter-circle arc from the hub center
  const getOrbPosition = (index: number) => {
    const radius = 100
    const totalOrbs = navOrbs.length
    // Arc from 0° (right) to 90° (up), evenly spaced
    const angle = (index / (totalOrbs - 1)) * (Math.PI / 2)

    // Hub is 48px (w-12), orbs are 44px (w-11)
    // Center offset: (48 - 44) / 2 = 2px
    const hubCenter = 24 // half of 48px hub
    const orbCenter = 22 // half of 44px orb
    const offset = hubCenter - orbCenter // 2px

    const x = Math.cos(angle) * radius + offset
    const y = -Math.sin(angle) * radius + offset

    return { x, y }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[45]">
      {/* Desktop version */}
      {!isMobile && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-8 left-8 pointer-events-auto"
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => {
            setIsExpanded(false)
            setHoveredOrb(null)
          }}
        >
          {/* Invisible expanded hover zone to prevent gap issues */}
          {isExpanded && (
            <div
              className="absolute rounded-full pointer-events-auto"
              style={{
                width: '260px',
                height: '260px',
                left: '-100px',
                top: '-220px',
              }}
            />
          )}

          {/* Core hub */}
          <motion.div
            className="relative z-10 w-12 h-12 rounded-full border border-[#f5f5f5]/30 flex items-center justify-center bg-[#0a0a0a]/80 backdrop-blur-sm cursor-pointer"
          >
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.4 }}
              className="text-[#f5f5f5]/60 text-lg"
            >
              ✦
            </motion.div>
          </motion.div>

          {/* Nav orbs - expand outward */}
          <AnimatePresence>
            {isExpanded && navOrbs.map((orb, index) => {
              const pos = getOrbPosition(index)
              const isHovered = hoveredOrb === index

              return (
                <motion.div
                  key={orb.path}
                  initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                  animate={{
                    scale: isHovered ? 1.2 : 1,
                    opacity: 1,
                    x: pos.x,
                    y: pos.y,
                  }}
                  exit={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                    delay: index * 0.05,
                  }}
                  className="absolute left-0 top-0"
                >
                  <Link
                    href={orb.path}
                    onMouseEnter={() => setHoveredOrb(index)}
                    onMouseLeave={() => setHoveredOrb(null)}
                    className="group relative block"
                  >
                    {/* Orb */}
                    <motion.div
                      className="w-11 h-11 rounded-full border border-[#f5f5f5]/20 hover:border-[#f5f5f5]/50 flex items-center justify-center bg-[#0a0a0a]/90 backdrop-blur-sm transition-all duration-300"
                      style={{
                        background: isHovered
                          ? `radial-gradient(circle, ${orb.color}20, #0a0a0a)`
                          : '#0a0a0a'
                      }}
                    >
                      <span
                        className="text-base transition-all duration-300"
                        style={{ color: isHovered ? orb.color : '#f5f5f5' }}
                      >
                        {orb.icon}
                      </span>
                    </motion.div>

                    {/* Tooltip - appears to the right */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, x: -5, scale: 0.95 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: -5, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap z-10"
                        >
                          <div className="bg-[#0a0a0a] border border-[#f5f5f5]/20 px-3 py-2 rounded-sm">
                            <div className="font-display text-base tracking-wide" style={{ color: orb.color }}>
                              {orb.name}
                            </div>
                            <div className="text-[9px] text-[#f5f5f5]/40 tracking-widest uppercase">
                              {orb.description}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Link>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Mobile version - horizontal row at top */}
      {isMobile && (
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-9 left-1/2 -translate-x-1/2 pointer-events-auto"
        >
          <div className="flex flex-row gap-4">
            {navOrbs.map((orb, index) => (
              <motion.div
                key={orb.path}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <Link
                  href={orb.path}
                  className="flex items-center"
                >
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 rounded-full border border-[#f5f5f5]/20 flex items-center justify-center bg-[#0a0a0a]/80 backdrop-blur-sm"
                  >
                    <span className="text-sm" style={{ color: orb.color }}>{orb.icon}</span>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
