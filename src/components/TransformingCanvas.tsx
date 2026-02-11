'use client'

import { motion, useTransform, MotionValue, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import SideMenu from './SideMenu'

interface Props {
  scrollProgress: MotionValue<number>
}

const platforms = [
  { name: 'Spotify', url: 'https://open.spotify.com/artist/5zE8tp1p5BP61LaWenHdNG' },
  { name: 'Apple Music', url: 'https://music.apple.com/us/artist/wydrob/1709404725' },
  { name: 'SoundCloud', url: 'https://soundcloud.com/wydrob' },
  { name: 'YouTube', url: 'https://youtube.com/@wydrob' },
]

const socials = [
  { name: 'IG', url: 'https://instagram.com/wydoinrob' },
  { name: 'X', url: 'https://x.com/wydoinrob' },
  { name: 'TikTok', url: 'https://tiktok.com/@wydoinrob' },
]

const notecoreLetters = [
  { src: '/n.png', alt: 'N' },
  { src: '/o.png', alt: 'O' },
  { src: '/t.png', alt: 'T' },
  { src: '/e.png', alt: 'E' },
  { src: '/c.png', alt: 'C' },
  { src: '/o2.png', alt: 'O' },
  { src: '/r.png', alt: 'R' },
  { src: '/e2.png', alt: 'E' },
]

export default function TransformingCanvas({ scrollProgress }: Props) {
  // ===== PHASE 1 & 2: WYDROB -> CONNECT =====
  // Direct scroll-linked transforms - no springs to avoid overshoot issues

  // WYDROB letters fly up (staggered left to right)
  // Eased keyframes: slow start, quick middle, slow end
  const wY = useTransform(scrollProgress, [0, 0.04, 0.08, 0.14, 0.20], [0, 0, -30, -240, -300])
  const wOpacity = useTransform(scrollProgress, [0, 0.04, 0.08, 0.14, 0.20], [1, 1, 0.9, 0.2, 0])

  const yY = useTransform(scrollProgress, [0, 0.06, 0.10, 0.16, 0.22], [0, 0, -30, -240, -300])
  const yOpacity = useTransform(scrollProgress, [0, 0.06, 0.10, 0.16, 0.22], [1, 1, 0.9, 0.2, 0])

  const dY = useTransform(scrollProgress, [0, 0.08, 0.12, 0.18, 0.24], [0, 0, -30, -240, -300])
  const dOpacity = useTransform(scrollProgress, [0, 0.08, 0.12, 0.18, 0.24], [1, 1, 0.9, 0.2, 0])

  const rY = useTransform(scrollProgress, [0, 0.10, 0.14, 0.20, 0.26], [0, 0, -30, -240, -300])
  const rOpacity = useTransform(scrollProgress, [0, 0.10, 0.14, 0.20, 0.26], [1, 1, 0.9, 0.2, 0])

  const oY = useTransform(scrollProgress, [0, 0.12, 0.16, 0.22, 0.28], [0, 0, -30, -240, -300])
  const oOpacity = useTransform(scrollProgress, [0, 0.12, 0.16, 0.22, 0.28], [1, 1, 0.9, 0.2, 0])

  const bY = useTransform(scrollProgress, [0, 0.14, 0.18, 0.24, 0.30], [0, 0, -30, -240, -300])
  const bOpacity = useTransform(scrollProgress, [0, 0.14, 0.18, 0.24, 0.30], [1, 1, 0.9, 0.2, 0])

  // CONNECT letters rise up (staggered left to right)
  // Eased keyframes: slow start, quick middle, slow end
  const cY = useTransform(scrollProgress, [0, 0.04, 0.08, 0.14, 0.20], [300, 300, 270, 60, 0])
  const cOpacity = useTransform(scrollProgress, [0, 0.04, 0.08, 0.14, 0.20, 0.55, 0.66], [0, 0, 0.1, 0.8, 1, 1, 0])

  const oConnectY = useTransform(scrollProgress, [0, 0.06, 0.10, 0.16, 0.22], [300, 300, 270, 60, 0])
  const oConnectOpacity = useTransform(scrollProgress, [0, 0.06, 0.10, 0.16, 0.22, 0.55, 0.66], [0, 0, 0.1, 0.8, 1, 1, 0])

  const nY = useTransform(scrollProgress, [0, 0.08, 0.12, 0.18, 0.24], [300, 300, 270, 60, 0])
  const nOpacity = useTransform(scrollProgress, [0, 0.08, 0.12, 0.18, 0.24, 0.55, 0.66], [0, 0, 0.1, 0.8, 1, 1, 0])

  const n2Y = useTransform(scrollProgress, [0, 0.10, 0.14, 0.20, 0.26], [300, 300, 270, 60, 0])
  const n2Opacity = useTransform(scrollProgress, [0, 0.10, 0.14, 0.20, 0.26, 0.55, 0.66], [0, 0, 0.1, 0.8, 1, 1, 0])

  const eConnectY = useTransform(scrollProgress, [0, 0.12, 0.16, 0.22, 0.28], [300, 300, 270, 60, 0])
  const eConnectOpacity = useTransform(scrollProgress, [0, 0.12, 0.16, 0.22, 0.28, 0.55, 0.66], [0, 0, 0.1, 0.8, 1, 1, 0])

  const cConnect2Y = useTransform(scrollProgress, [0, 0.14, 0.18, 0.24, 0.30], [300, 300, 270, 60, 0])
  const cConnect2Opacity = useTransform(scrollProgress, [0, 0.14, 0.18, 0.24, 0.30, 0.55, 0.66], [0, 0, 0.1, 0.8, 1, 1, 0])

  const tY = useTransform(scrollProgress, [0, 0.16, 0.20, 0.26, 0.32], [300, 300, 270, 60, 0])
  const tOpacity = useTransform(scrollProgress, [0, 0.16, 0.20, 0.26, 0.32, 0.55, 0.66], [0, 0, 0.1, 0.8, 1, 1, 0])

  const connectPointerEventsValue = useTransform(scrollProgress, (v) => (v >= 0.2 && v <= 0.66) ? 'auto' : 'none')

  // ===== PHASE 3: MUSIC (0.5 - 0.75) =====
  const musicOpacity = useTransform(scrollProgress, [0.45, 0.53, 0.72, 0.75], [0, 1, 1, 0])
  const musicScale = useTransform(scrollProgress, [0.45, 0.55], [1.2, 1])

  // Platforms fade in with slight delays
  const platform1Opacity = useTransform(scrollProgress, [0.5, 0.58], [0, 1])
  const platform2Opacity = useTransform(scrollProgress, [0.52, 0.6], [0, 1])
  const platform3Opacity = useTransform(scrollProgress, [0.54, 0.62], [0, 1])
  const platform4Opacity = useTransform(scrollProgress, [0.56, 0.64], [0, 1])
  const platformOpacities = [platform1Opacity, platform2Opacity, platform3Opacity, platform4Opacity]

  const platform1Y = useTransform(scrollProgress, [0.5, 0.58], [30, 0])
  const platform2Y = useTransform(scrollProgress, [0.52, 0.6], [30, 0])
  const platform3Y = useTransform(scrollProgress, [0.54, 0.62], [30, 0])
  const platform4Y = useTransform(scrollProgress, [0.56, 0.64], [30, 0])
  const platformYs = [platform1Y, platform2Y, platform3Y, platform4Y]

  // ===== PHASE 4: NOTECORE (snaps at 0.833, fades out before SOTM) =====
  const notecoreOpacity = useTransform(scrollProgress, [0.7, 0.78, 0.9, 0.96], [0, 1, 1, 0])
  const notecoreScale = useTransform(scrollProgress, [0.7, 0.8], [0.95, 1])
  const notecoreY = useTransform(scrollProgress, [0.7, 0.8], [30, 0])

  // ===== PHASE 5: SOTM (snaps at 1.0) =====
  const sotmOpacity = useTransform(scrollProgress, [0.92, 0.98, 1], [0, 1, 1])
  const sotmScale = useTransform(scrollProgress, [0.92, 0.98], [0.97, 1])
  const sotmY = useTransform(scrollProgress, [0.92, 0.98], [20, 0])

  // Bounce-in effect for marquee rows - spring physics for that bounce/ease feel
  // Flipped: left rows come from right, right rows come from left
  const marqueeLeftTarget = useMotionValue(3000)
  const marqueeRightTarget = useMotionValue(-3000)
  const marqueeLeftX = useSpring(marqueeLeftTarget, { stiffness: 50, damping: 20 })
  const marqueeRightX = useSpring(marqueeRightTarget, { stiffness: 50, damping: 20 })
  const hasAnimatedIn = useRef(false)

  // Letter animation state
  const [notecoreVisible, setNotecoreVisible] = useState(false)
  const [sotmVisible, setSotmVisible] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)
  const [sotmAnimationKey, setSotmAnimationKey] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [currentScrollSection, setCurrentScrollSection] = useState(0)
  const sotmHasAnimatedIn = useRef(false)

  useEffect(() => {
    setMounted(true)
  }, [])


  // Separate refs for marquee and logo/letters
  const marqueeHasAnimatedIn = useRef(false)

  useEffect(() => {
    const unsubscribe = scrollProgress.on('change', (v) => {
      // Track current section for nav (snaps at 0, 0.333, 0.666, 0.833, 1.0)
      if (v < 0.17) setCurrentScrollSection(0)
      else if (v < 0.5) setCurrentScrollSection(1)
      else if (v < 0.75) setCurrentScrollSection(2)
      else if (v < 0.92) setCurrentScrollSection(3)
      else setCurrentScrollSection(4)

      // Marquee starts earlier so it's already moving when you arrive
      if (v >= 0.75 && !marqueeHasAnimatedIn.current) {
        marqueeHasAnimatedIn.current = true
        marqueeLeftTarget.set(0)
        marqueeRightTarget.set(0)
      } else if (v < 0.75 && marqueeHasAnimatedIn.current) {
        marqueeHasAnimatedIn.current = false
        marqueeLeftTarget.set(3000)
        marqueeRightTarget.set(-3000)
      }

      // Logo/letters animate when fully in NOTECORE section
      if (v >= 0.83 && v < 0.95 && !hasAnimatedIn.current) {
        hasAnimatedIn.current = true
        setAnimationKey(k => k + 1)
        setNotecoreVisible(true)
      } else if ((v < 0.83 || v >= 0.95) && hasAnimatedIn.current) {
        hasAnimatedIn.current = false
        setNotecoreVisible(false)
      }

      // SOTM section animations
      if (v >= 0.97 && !sotmHasAnimatedIn.current) {
        sotmHasAnimatedIn.current = true
        setSotmAnimationKey(k => k + 1)
        setSotmVisible(true)
      } else if (v < 0.97 && sotmHasAnimatedIn.current) {
        sotmHasAnimatedIn.current = false
        setSotmVisible(false)
      }
    })
    return () => unsubscribe()
  }, [scrollProgress, marqueeLeftTarget, marqueeRightTarget])



  // Pointer events - only enable when section is visible
  const musicPointerEvents = useTransform(scrollProgress, (v) => (v >= 0.45 && v <= 0.75) ? 'auto' : 'none')
  const notecorePointerEvents = useTransform(scrollProgress, (v) => (v >= 0.7 && v <= 0.95) ? 'auto' : 'none')
  const sotmPointerEvents = useTransform(scrollProgress, (v) => (v >= 0.92) ? 'auto' : 'none')

  // Progress indicator
  const progressWidth = useTransform(scrollProgress, [0, 1], ['0%', '100%'])

  // Cursor invert circle - only appears when hovering interactive elements
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
    <div onMouseMove={handleMouseMove}>
      {/* Inverted cursor circle - only visible when hovering interactive elements */}
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

      {/* Scroll sections */}
      <div className="h-[500vh]" />

      {/* Progress bar */}
      <motion.div
        style={{ width: progressWidth }}
        className="fixed top-0 left-0 h-[2px] bg-[#f5f5f5] z-50"
      />


      {/* ===== PHASE 1: HERO ===== */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <motion.img
          src="/WYDlogo-2.png"
          alt="WYDROB"
          initial={false}
          style={{ y: wY, opacity: wOpacity }}
          className="h-[20vw] max-h-[300px] invert"
        />
      </div>

      {/* ===== PHASE 2: CONNECT ===== */}
      <motion.div
        style={{ pointerEvents: connectPointerEventsValue }}
        className="fixed inset-0"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[8.5vw] leading-none tracking-tighter flex">
          <motion.span initial={false} style={{ y: cY, opacity: cOpacity }} className="inline-block">C</motion.span>
          <motion.span initial={false} style={{ y: oConnectY, opacity: oConnectOpacity }} className="inline-block">O</motion.span>
          <motion.span initial={false} style={{ y: nY, opacity: nOpacity }} className="inline-block">N</motion.span>
          <motion.span initial={false} style={{ y: n2Y, opacity: n2Opacity }} className="inline-block">N</motion.span>
          <motion.span initial={false} style={{ y: eConnectY, opacity: eConnectOpacity }} className="inline-block">E</motion.span>
          <motion.span initial={false} style={{ y: cConnect2Y, opacity: cConnect2Opacity }} className="inline-block">C</motion.span>
          <motion.span initial={false} style={{ y: tY, opacity: tOpacity }} className="inline-block">T</motion.span>
        </div>

        <motion.div
          style={{ opacity: tOpacity }}
          className="absolute top-[calc(50%+6vw)] left-1/2 -translate-x-1/2 flex gap-10"
        >
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="text-[#f5f5f5]/40 hover:text-[#f5f5f5] transition-colors text-sm tracking-widest uppercase"
            >
              {social.name}
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* ===== PHASE 3: MUSIC ===== */}
      <motion.div
        style={{ opacity: musicOpacity, scale: musicScale, pointerEvents: musicPointerEvents }}
        className="fixed inset-0 flex items-center justify-center"
      >
        <div className="w-full max-w-3xl px-8">
          <div className="grid grid-cols-2 gap-4">
            {platforms.map((platform, i) => (
              <motion.a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ opacity: platformOpacities[i], y: platformYs[i] }}
                className="group relative border border-[#f5f5f5]/10 p-6 hover:bg-[#f5f5f5] hover:border-[#f5f5f5] transition-all duration-300 rounded-sm"
              >
                <span className="font-display text-2xl group-hover:text-black transition-colors">{platform.name}</span>
                <span className="absolute top-6 right-6 text-[#f5f5f5]/20 group-hover:text-black/40 transition-colors text-sm hidden sm:block">↗</span>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ===== PHASE 4: NOTECORE ===== */}
      <motion.div
        style={{ opacity: notecoreOpacity, scale: notecoreScale, y: notecoreY, pointerEvents: notecorePointerEvents }}
        className="fixed inset-0 overflow-hidden"
      >
        {/* Animated background text with embedded links */}
        <div className="absolute inset-0 flex flex-col justify-center items-center gap-0 -top-[10vh] -bottom-[10vh]">
          {[...Array(17)].map((_, rowIndex) => {
            // Define which row gets which link and repeat interval
            // Row 4: INSTAGRAM every 6 starting from pos 30 (right side only)
            // Row 7: SPOTIFY every 7 up to pos 30 (left side only)
            // Row 12: SOUNDCLOUD every 6 starting from pos 30 (right side only)
            const linkConfig = rowIndex === 4 ? { interval: 6, startPos: 29, direction: 'right', name: 'INSTAGRAM', url: 'https://instagram.com/notecoresounds' }
              : rowIndex === 7 ? { interval: 6, startPos: 31, direction: 'left', name: 'SPOTIFY', url: 'https://open.spotify.com/playlist/3X2cyEGXzQIW5GvpqvRfzN' }
              : rowIndex === 12 ? { interval: 6, startPos: 29, direction: 'right', name: 'SOUNDCLOUD', url: 'https://soundcloud.com/notecore' }
              : null

            return (
              <motion.div
                key={rowIndex}
                style={{ x: rowIndex % 2 === 0 ? marqueeLeftX : marqueeRightX }}
                className="font-display text-[19vw] sm:text-[5.4vw] leading-[0.75] whitespace-nowrap text-center"
              >
                <span
                  className="inline-block"
                  style={{
                    animation: `${rowIndex % 2 === 0 ? 'marqueeLeft' : 'marqueeRight'} ${250 + (rowIndex * 40)}s linear forwards`,
                    animationPlayState: notecoreVisible ? 'running' : 'paused'
                  }}
                >
                  {Array(60).fill(null).map((_, wordIndex) => {
                    if (linkConfig) {
                      const isInRange = linkConfig.direction === 'right'
                        ? wordIndex >= linkConfig.startPos
                        : wordIndex <= linkConfig.startPos
                      const relativePos = linkConfig.direction === 'right'
                        ? wordIndex - linkConfig.startPos
                        : linkConfig.startPos - wordIndex
                      if (isInRange && relativePos % linkConfig.interval === 0) {
                        return (
                          <a
                            key={wordIndex}
                            href={linkConfig.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            className="opacity-30 hover:opacity-60 transition-opacity pointer-events-auto"
                          >
                            {linkConfig.name}
                          </a>
                        )
                      }
                    }
                    return <span key={wordIndex} className="opacity-[0.04] pointer-events-none">#NOTECORE</span>
                  })}
                </span>
              </motion.div>
            )
          })}
        </div>

        {/* NOTECORE letters and logo animation */}
        {notecoreVisible && (
          <div key={animationKey} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="flex items-center gap-0.5 sm:gap-2 w-[90vw] sm:w-auto justify-center">
              {/* Logo - note and plus separated */}
              <div className="relative h-[8vw] sm:h-[10vw] max-h-[125px]" style={{ aspectRatio: '238/268' }}>
                {/* Note part */}
                <motion.img
                  src="/notecore-icon-note.png"
                  alt="NOTECORE Note"
                  initial={{ opacity: 0, scale: 0.5, x: 100 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full w-full"
                />
                {/* Plus part - positioned in top left of note, spins in after note */}
                <motion.img
                  src="/notecore-icon-plus.png"
                  alt="NOTECORE Plus"
                  initial={{ opacity: 0, rotate: -1080, scale: 0, scaleX: -1 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1, scaleX: -1 }}
                  transition={{
                    opacity: { duration: 0.3, delay: 1.7 },
                    scale: { duration: 0.3, delay: 1.7 },
                    scaleX: { duration: 0 },
                    rotate: { duration: 3.2, delay: 1.7, ease: [0.2, 0, 0.2, 1] }
                  }}
                  className="absolute top-[13%] left-[5%] h-[calc(35%-3px)]"
                  style={{ transformOrigin: 'center center' }}
                />
              </div>

              {/* Letters fade in one by one */}
              <div className="flex items-center">
                {notecoreLetters.map((letter, i) => (
                  <motion.img
                    key={i}
                    src={letter.src}
                    alt={letter.alt}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.08,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="h-[8vw] sm:h-[10vw] max-h-[125px]"
                  />
                ))}
              </div>
            </div>

            {/* Mobile-only social links below NOTECORE logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="flex gap-8 mt-6 sm:hidden"
            >
              <a
                href="https://open.spotify.com/playlist/3X2cyEGXzQIW5GvpqvRfzN"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="text-[#f5f5f5]/40 hover:text-[#f5f5f5] transition-colors text-sm tracking-widest uppercase"
              >
                Spotify
              </a>
              <a
                href="https://instagram.com/notecoresounds"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="text-[#f5f5f5]/40 hover:text-[#f5f5f5] transition-colors text-sm tracking-widest uppercase"
              >
                IG
              </a>
              <a
                href="https://soundcloud.com/notecore"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="text-[#f5f5f5]/40 hover:text-[#f5f5f5] transition-colors text-sm tracking-widest uppercase"
              >
                SoundCloud
              </a>
            </motion.div>
          </div>
        )}

      </motion.div>

      {/* ===== PHASE 5: SOTM ===== */}
      <motion.div
        style={{ opacity: sotmOpacity, scale: sotmScale, y: sotmY, pointerEvents: sotmPointerEvents }}
        className="fixed inset-0 overflow-hidden"
      >
        {/* Dark background - SOTM world */}
        <div className="absolute inset-0 bg-[#141410]" />

        {/* Ambient floating orbs */}
        <div
          className="absolute w-[300px] h-[300px] rounded-full blur-[80px] opacity-[0.12]"
          style={{
            background: 'radial-gradient(circle, #8b8b3c 0%, transparent 70%)',
            top: '20%',
            left: '15%',
            animation: 'sotmDrift 18s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[240px] h-[240px] rounded-full blur-[70px] opacity-[0.08]"
          style={{
            background: 'radial-gradient(circle, #6b6b2c 0%, transparent 70%)',
            bottom: '15%',
            right: '20%',
            animation: 'sotmDrift 22s ease-in-out infinite reverse',
          }}
        />
        <div
          className="absolute w-[150px] h-[150px] rounded-full blur-[50px]"
          style={{
            background: 'radial-gradient(circle, #8b8b3c 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'sotmBreathe 5s ease-in-out infinite',
          }}
        />

        {/* Slow rotating ring */}
        <div
          className="absolute border border-[#8b8b3c]/[0.06] rounded-full pointer-events-none"
          style={{
            width: '42vmin',
            height: '42vmin',
            top: '50%',
            left: '50%',
            animation: 'sotmRotate 40s linear infinite',
          }}
        />
        <div
          className="absolute border border-[#8b8b3c]/[0.04] rounded-full pointer-events-none"
          style={{
            width: '54vmin',
            height: '54vmin',
            top: '50%',
            left: '50%',
            animation: 'sotmRotate 60s linear infinite reverse',
          }}
        />

        {/* Center content — the billboard */}
        {sotmVisible && (
          <a
            key={sotmAnimationKey}
            href="https://songofthemonth.org"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer group"
          >
            {/* "sotm" — PP Fragment Glare ExtraBold */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="sotm-shimmer-text text-[12vw] sm:text-[8.4vw] leading-[0.85] tracking-[-0.02em] select-none"
              style={{ fontFamily: "'PP Fragment Glare', 'Playfair Display', Georgia, serif", fontWeight: 800 }}
            >
              sotm
            </motion.h1>

            {/* Subtle "enter" hint */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-[#8b8b3c] text-[8px] sm:text-[10px] tracking-[0.3em] uppercase mt-4 group-hover:opacity-60 transition-opacity duration-500"
              style={{ fontFamily: "'PP Fragment Glare', 'Playfair Display', Georgia, serif" }}
            >
              songofthemonth.org
            </motion.span>
          </a>
        )}

        <footer className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 text-[8px] sm:text-[10px] text-[#8b8b3c]/15 tracking-widest uppercase z-10">
          WYDROB © 2026
        </footer>
      </motion.div>

      {/* Side Menu */}
      {/* <SideMenu /> */}

    </div>
  )
}
