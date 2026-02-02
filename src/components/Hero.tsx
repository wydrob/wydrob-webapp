'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  // Parallax and transform effects based on scroll
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.7])
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const letterSpacing1 = useTransform(scrollYProgress, [0, 0.5], ["0em", "0.3em"])
  const letterSpacing2 = useTransform(scrollYProgress, [0, 0.5], ["0em", "0.5em"])
  const rotate = useTransform(scrollYProgress, [0, 0.5], [0, -10])
  const x1 = useTransform(scrollYProgress, [0, 0.5], [0, -100])
  const x2 = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <section
      ref={ref}
      id="hero"
      className="h-[200vh] relative"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-dark">
        <motion.div
          style={{ scale }}
          className="text-center px-4 relative z-10"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ opacity }}
            className="block text-xs md:text-sm tracking-[0.3em] uppercase text-text-secondary mb-8"
          >
            NOTECORE
          </motion.span>

          <h1 className="font-display text-[20vw] md:text-[18vw] leading-[0.85] tracking-tight overflow-hidden">
            <motion.span
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: y1, letterSpacing: letterSpacing1, x: x1 }}
              className="block"
            >
              WYD
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: y2, rotate, letterSpacing: letterSpacing2, x: x2 }}
              className="block text-transparent [-webkit-text-stroke:2px_white]"
            >
              ROB
            </motion.span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          style={{ opacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase text-text-secondary">
            scroll
          </span>
          <motion.div
            animate={{ scaleY: [0.6, 1, 0.6], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-text-secondary to-transparent origin-top"
          />
        </motion.div>
      </div>
    </section>
  )
}
