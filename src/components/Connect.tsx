'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const socials = [
  { name: 'Instagram', url: 'https://instagram.com/WYDROB' },
  { name: 'Twitter / X', url: 'https://twitter.com/WYDROB' },
  { name: 'TikTok', url: 'https://tiktok.com/@WYDROB' },
]

export default function Connect() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"]
  })

  // Dramatic zoom and reveal
  const scale = useTransform(scrollYProgress, [0, 0.5], [2, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0])

  // Title animations - coming from different directions
  const xLets = useTransform(scrollYProgress, [0.1, 0.4], [-100, 0])
  const xLinkUp = useTransform(scrollYProgress, [0.15, 0.45], [100, 0])
  const opacityLets = useTransform(scrollYProgress, [0.1, 0.4], [0, 1])
  const opacityLinkUp = useTransform(scrollYProgress, [0.15, 0.45], [0, 1])
  const rotateLinkUp = useTransform(scrollYProgress, [0.15, 0.45], [10, 0])

  // Socials stagger
  const ySocials = useTransform(scrollYProgress, [0.3, 0.6], [50, 0])
  const opacitySocials = useTransform(scrollYProgress, [0.3, 0.6], [0, 1])

  // Footer
  const opacityFooter = useTransform(scrollYProgress, [0.5, 0.8], [0, 1])
  const yFooter = useTransform(scrollYProgress, [0.5, 0.8], [30, 0])

  return (
    <section
      id="connect"
      ref={ref}
      className="min-h-[150vh] relative bg-dark-section"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-between py-32 px-6 md:px-12">
        <motion.div style={{ scale, y }} className="max-w-4xl">
          <motion.span
            style={{ opacity }}
            className="block text-xs tracking-[0.2em] uppercase text-text-secondary mb-8"
          >
            Connect
          </motion.span>

          <h2 className="font-display text-[15vw] md:text-[12vw] leading-[0.95] mb-12 overflow-hidden">
            <motion.span
              style={{ x: xLets, opacity: opacityLets }}
              className="font-serif italic text-[0.7em] block"
            >
              let&apos;s
            </motion.span>
            <motion.span
              style={{ x: xLinkUp, opacity: opacityLinkUp, rotate: rotateLinkUp }}
              className="block"
            >
              LINK UP
            </motion.span>
          </h2>

          <motion.div
            style={{ y: ySocials, opacity: opacitySocials }}
            className="flex flex-wrap gap-8 md:gap-12"
          >
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-text-secondary hover:text-white transition-colors duration-300 text-base md:text-lg tracking-wide"
              >
                {social.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.footer
          style={{ opacity: opacityFooter, y: yFooter }}
          className="flex justify-between items-center pt-8 border-t border-border-color mt-auto"
        >
          <span className="text-xs tracking-[0.1em] text-text-secondary">
            &copy; 2025 WYDROB
          </span>
          <span className="text-xs tracking-[0.1em] text-text-secondary">
            NOTECORE
          </span>
        </motion.footer>
      </div>
    </section>
  )
}
