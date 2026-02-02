'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

export default function Navigation() {
  const { scrollYProgress } = useScroll()

  // Progress bar width
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <>
      {/* Progress bar */}
      <motion.div
        style={{ width: progressWidth }}
        className="fixed top-0 left-0 h-[2px] bg-white z-[60]"
      />

      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-6 mix-blend-difference"
      >
        <Link href="#hero" className="font-display text-2xl tracking-wider text-white">
          W.
        </Link>
        <div className="flex gap-6 md:gap-10">
          <Link
            href="#about"
            className="text-sm uppercase tracking-[0.2em] text-white hover:opacity-60 transition-opacity"
          >
            About
          </Link>
          <Link
            href="#music"
            className="text-sm uppercase tracking-[0.2em] text-white hover:opacity-60 transition-opacity"
          >
            Music
          </Link>
          <Link
            href="#connect"
            className="text-sm uppercase tracking-[0.2em] text-white hover:opacity-60 transition-opacity"
          >
            Connect
          </Link>
        </div>
      </motion.nav>
    </>
  )
}
