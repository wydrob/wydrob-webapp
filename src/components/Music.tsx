'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const platforms = [
  { name: 'Spotify', url: 'https://open.spotify.com/search/WYDROB' },
  { name: 'Apple Music', url: 'https://music.apple.com/search?term=WYDROB' },
  { name: 'SoundCloud', url: 'https://soundcloud.com/search?q=WYDROB' },
  { name: 'YouTube', url: 'https://www.youtube.com/results?search_query=WYDROB' },
]

export default function Music() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Horizontal scroll effect for title
  const xTitle = useTransform(scrollYProgress, [0, 0.5], [200, 0])
  const opacityTitle = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const scaleTitle = useTransform(scrollYProgress, [0, 0.3], [0.9, 1])

  // Staggered reveal for platforms
  const yPlatform1 = useTransform(scrollYProgress, [0.15, 0.35], [80, 0])
  const yPlatform2 = useTransform(scrollYProgress, [0.2, 0.4], [80, 0])
  const yPlatform3 = useTransform(scrollYProgress, [0.25, 0.45], [80, 0])
  const yPlatform4 = useTransform(scrollYProgress, [0.3, 0.5], [80, 0])

  const opacityPlatform1 = useTransform(scrollYProgress, [0.15, 0.35], [0, 1])
  const opacityPlatform2 = useTransform(scrollYProgress, [0.2, 0.4], [0, 1])
  const opacityPlatform3 = useTransform(scrollYProgress, [0.25, 0.45], [0, 1])
  const opacityPlatform4 = useTransform(scrollYProgress, [0.3, 0.5], [0, 1])

  const platformAnimations = [
    { y: yPlatform1, opacity: opacityPlatform1 },
    { y: yPlatform2, opacity: opacityPlatform2 },
    { y: yPlatform3, opacity: opacityPlatform3 },
    { y: yPlatform4, opacity: opacityPlatform4 },
  ]

  // Background line animation
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.4], ["0%", "100%"])

  return (
    <section id="music" ref={ref} className="min-h-[150vh] relative bg-dark">
      <div className="sticky top-0 h-screen py-32 px-6 md:px-12 flex flex-col justify-center">
        <div className="max-w-6xl mx-auto w-full">
          <motion.span
            style={{ opacity: opacityTitle }}
            className="block text-xs tracking-[0.2em] uppercase text-text-secondary mb-8"
          >
            Listen
          </motion.span>

          <motion.h2
            style={{ x: xTitle, opacity: opacityTitle, scale: scaleTitle }}
            className="font-display text-[12vw] md:text-[8vw] leading-[1] mb-16"
          >
            <span className="font-serif italic text-[0.85em] block">find me</span>
            <span className="block">EVERYWHERE</span>
          </motion.h2>

          <div className="relative">
            <motion.div
              style={{ width: lineWidth }}
              className="absolute top-0 left-0 h-px bg-white/30"
            />
            <div className="border-t border-border-color">
              {platforms.map((platform, index) => (
                <motion.a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={platformAnimations[index]}
                  className="group flex items-center py-6 md:py-8 border-b border-border-color hover:pl-8 hover:bg-white/[0.02] transition-all duration-400"
                >
                  <span className="text-sm text-text-secondary w-12 md:w-16">
                    0{index + 1}
                  </span>
                  <span className="font-display text-2xl md:text-5xl flex-1 tracking-wide">
                    {platform.name}
                  </span>
                  <span className="text-2xl opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-400">
                    →
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
