'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { name: 'Releases', path: '/releases', desc: 'Full discography', icon: '◈', color: '#ff6b6b' },
  { name: 'About', path: '/about', desc: 'The story', icon: '◎', color: '#4ecdc4' },
  { name: 'Shop', path: '/shop', desc: 'Merch drops', icon: '◇', color: '#ffe66d' },
  { name: 'Contact', path: '/contact', desc: 'Get in touch', icon: '◉', color: '#95e1d3' },
]

// Discography - names and years only
const discography = [
  { title: 'FLANK', year: '2025', type: 'Single' },
  { title: 'ILY', year: '2025', type: 'Single' },
  { title: 'MISFIRE', year: '2025', type: 'Single' },
  { title: 'RIPTIDE', year: '2025', type: 'EP' },
  { title: 'ROOTS', year: '2025', type: 'Single' },
  { title: 'STARLIGHTS', year: '2025', type: 'Single' },
  { title: 'SHOUTOUT', year: '2025', type: 'Single' },
  { title: 'EGO!', year: '2025', type: 'Single' },
  { title: 'TAKE UR CIGARETTE', year: '2024', type: 'Single' },
  { title: 'TAMAGOTCHI', year: '2024', type: 'Single' },
  { title: 'OTHER HALF', year: '2024', type: 'Single' },
  { title: 'WHOAMI?', year: '2024', type: 'Single' },
  { title: 'HAYWIRE!', year: '2024', type: 'Single' },
  { title: 'REMEDY', year: '2024', type: 'Single' },
  { title: 'HELLA', year: '2024', type: 'Single' },
  { title: 'APPARENTLY', year: '2024', type: 'Single' },
  { title: 'NO TELLIN!', year: '2023', type: 'Single' },
  { title: 'POWER UP!', year: '2023', type: 'Single' },
  { title: '911!', year: '2023', type: 'Single' },
  { title: 'GLAZ', year: '2023', type: 'Single' },
]

// Placeholder fanart
const fanart = [
  { id: 1, placeholder: true },
  { id: 2, placeholder: true },
  { id: 3, placeholder: true },
  { id: 4, placeholder: true },
  { id: 5, placeholder: true },
  { id: 6, placeholder: true },
]

type Tab = 'discography' | 'fanart' | 'explore'

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('explore')

  return (
    <>
      {/* Toggle Button - vertically centered on right edge */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[60] flex items-center justify-center"
        whileHover={{ x: -4 }}
        transition={{ duration: 0.2 }}
      >
        <div className="bg-[#f5f5f5]/5 backdrop-blur-sm border border-[#f5f5f5]/10 rounded-l-lg px-1.5 py-4 sm:px-2 sm:py-6 flex flex-col items-center gap-1">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#f5f5f5]/60 sm:w-3 sm:h-3">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </motion.div>
        </div>
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[55]"
          />
        )}
      </AnimatePresence>

      {/* Side Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="fixed right-0 top-0 h-full w-[320px] max-w-[85vw] bg-[#0a0a0a]/95 backdrop-blur-md border-l border-[#f5f5f5]/10 z-[60] flex flex-col"
          >
            {/* Header with tabs */}
            <div className="p-6 pb-0">
              <div className="flex gap-1 bg-[#f5f5f5]/5 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('explore')}
                  className={`flex-1 py-2 px-2 text-[10px] tracking-widest uppercase rounded-md transition-all duration-300 ${
                    activeTab === 'explore'
                      ? 'bg-[#f5f5f5] text-black'
                      : 'text-[#f5f5f5]/40 hover:text-[#f5f5f5]/60'
                  }`}
                >
                  Explore
                </button>
                <button
                  onClick={() => setActiveTab('discography')}
                  className={`flex-1 py-2 px-2 text-[10px] tracking-widest uppercase rounded-md transition-all duration-300 ${
                    activeTab === 'discography'
                      ? 'bg-[#f5f5f5] text-black'
                      : 'text-[#f5f5f5]/40 hover:text-[#f5f5f5]/60'
                  }`}
                >
                  Tracks
                </button>
                <button
                  onClick={() => setActiveTab('fanart')}
                  className={`flex-1 py-2 px-2 text-[10px] tracking-widest uppercase rounded-md transition-all duration-300 ${
                    activeTab === 'fanart'
                      ? 'bg-[#f5f5f5] text-black'
                      : 'text-[#f5f5f5]/40 hover:text-[#f5f5f5]/60'
                  }`}
                >
                  Fanart
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                {activeTab === 'explore' && (
                  <motion.div
                    key="explore"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="h-full overflow-y-auto p-6 pt-4"
                  >
                    <div className="space-y-3">
                      {navLinks.map((link, i) => (
                        <motion.div
                          key={link.path}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <Link
                            href={link.path}
                            onClick={() => setIsOpen(false)}
                            className="group relative block p-4 border border-[#f5f5f5]/10 hover:border-[#f5f5f5]/30 transition-all duration-300 rounded-sm overflow-hidden"
                          >
                            {/* Hover background effect */}
                            <motion.div
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              style={{
                                background: `linear-gradient(135deg, ${link.color}10, transparent)`
                              }}
                            />

                            {/* Corner accent */}
                            <div
                              className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-l-[20px] border-l-transparent transition-all duration-300 group-hover:border-t-[25px] group-hover:border-l-[25px]"
                              style={{ borderTopColor: `${link.color}30` }}
                            />

                            <div className="relative flex items-center gap-3">
                              {/* Icon */}
                              <span
                                className="text-lg transition-all duration-300 group-hover:scale-110"
                                style={{ color: link.color }}
                              >
                                {link.icon}
                              </span>

                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-display text-xl group-hover:tracking-wide transition-all duration-300">
                                    {link.name}
                                  </span>
                                  <motion.span
                                    className="text-[#f5f5f5]/20 group-hover:text-[#f5f5f5]/60 transition-all duration-300"
                                    whileHover={{ x: 3 }}
                                  >
                                    →
                                  </motion.span>
                                </div>
                                <p className="text-[10px] text-[#f5f5f5]/30 tracking-widest uppercase mt-1">
                                  {link.desc}
                                </p>
                              </div>
                            </div>

                            {/* Bottom border accent on hover */}
                            <motion.div
                              className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                              style={{ backgroundColor: link.color }}
                            />
                          </Link>
                        </motion.div>
                      ))}
                    </div>

                    {/* Quick stats */}
                    <div className="mt-8 pt-6 border-t border-[#f5f5f5]/5">
                      <div className="text-[10px] text-[#f5f5f5]/30 tracking-widest uppercase mb-4">Quick Stats</div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="font-display text-2xl">20+</div>
                          <div className="text-[10px] text-[#f5f5f5]/30">Releases</div>
                        </div>
                        <div>
                          <div className="font-display text-2xl">500K+</div>
                          <div className="text-[10px] text-[#f5f5f5]/30">Streams</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'discography' && (
                  <motion.div
                    key="discography"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="h-full overflow-y-auto p-6 pt-4"
                  >
                    <div className="space-y-1">
                      {discography.map((track, i) => (
                        <motion.div
                          key={track.title}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.02, duration: 0.2 }}
                          className="flex items-center justify-between py-2 border-b border-[#f5f5f5]/5 last:border-0"
                        >
                          <span className="text-sm text-[#f5f5f5]/80">{track.title}</span>
                          <span className="text-[10px] text-[#f5f5f5]/30">{track.year} · {track.type}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'fanart' && (
                  <motion.div
                    key="fanart"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="h-full overflow-y-auto p-6 pt-4"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      {fanart.map((item, i) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05, duration: 0.3 }}
                          className="aspect-square bg-[#f5f5f5]/[0.02] border border-[#f5f5f5]/5 rounded-lg overflow-hidden"
                        >
                          {item.placeholder ? (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-[#f5f5f5]/10 text-[10px] tracking-widest">COMING SOON</span>
                            </div>
                          ) : (
                            <img
                              src={`/fanart/${item.id}.jpg`}
                              alt={`Fanart ${item.id}`}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </motion.div>
                      ))}
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#f5f5f5]/5">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-3 text-xs text-[#f5f5f5]/30 hover:text-[#f5f5f5]/60 tracking-widest uppercase transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
