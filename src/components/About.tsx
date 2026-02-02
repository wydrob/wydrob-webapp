'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Text reveal and transform effects
  const y1 = useTransform(scrollYProgress, [0, 0.3], [100, 0])
  const y2 = useTransform(scrollYProgress, [0.1, 0.4], [100, 0])
  const y3 = useTransform(scrollYProgress, [0.2, 0.5], [100, 0])
  const y4 = useTransform(scrollYProgress, [0.3, 0.6], [50, 0])

  const opacity1 = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const opacity2 = useTransform(scrollYProgress, [0.1, 0.4], [0, 1])
  const opacity3 = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])
  const opacity4 = useTransform(scrollYProgress, [0.3, 0.6], [0, 1])

  const scale1 = useTransform(scrollYProgress, [0, 0.3], [0.8, 1])
  const scale2 = useTransform(scrollYProgress, [0.1, 0.4], [0.8, 1])

  const rotate1 = useTransform(scrollYProgress, [0, 0.3], [5, 0])
  const x1 = useTransform(scrollYProgress, [0, 0.3], [-50, 0])
  const x2 = useTransform(scrollYProgress, [0.1, 0.4], [50, 0])

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-[150vh] relative bg-dark-section"
    >
      <div className="sticky top-0 h-screen flex items-center py-32 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.span
            style={{ opacity: opacity1, y: y1 }}
            className="block text-xs tracking-[0.2em] uppercase text-text-secondary mb-8"
          >
            About
          </motion.span>

          <h2 className="font-display text-[12vw] md:text-[8vw] leading-[1] mb-12 overflow-hidden">
            <motion.span
              style={{ y: y1, opacity: opacity1, x: x1, rotate: rotate1, scale: scale1 }}
              className="block"
            >
              <span className="font-serif italic text-[0.85em]">making</span> sounds
            </motion.span>
            <motion.span
              style={{ y: y2, opacity: opacity2, x: x2, scale: scale2 }}
              className="block"
            >
              in the <span className="font-serif italic text-[0.85em]">NOTECORE</span>
            </motion.span>
            <motion.span
              style={{ y: y3, opacity: opacity3 }}
              className="block"
            >
              lane.
            </motion.span>
          </h2>

          <motion.p
            style={{ y: y4, opacity: opacity4 }}
            className="text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed"
          >
          </motion.p>
        </div>
      </div>
    </section>
  )
}
