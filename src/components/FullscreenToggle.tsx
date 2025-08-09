'use client'

import { motion } from 'framer-motion'

interface FullscreenToggleProps {
  isFullscreen: boolean
  setIsFullscreen: (value: boolean) => void
}

export default function FullscreenToggle({ isFullscreen, setIsFullscreen }: FullscreenToggleProps) {
  return (
    <motion.button
      onClick={() => setIsFullscreen(!isFullscreen)}
      className="p-3 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-full text-gray-800 dark:text-white hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isFullscreen ? (
        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.5 3.5M15 9h4.5M15 9V4.5M15 9l5.5-5.5M9 15v4.5M9 15H4.5M9 15l-5.5 5.5M15 15h4.5M15 15v4.5m0-4.5l5.5 5.5" />
        </svg>
      ) : (
        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4m-4 0l5.657 5.657M20 8V4m0 0h-4m4 0l-5.657 5.657M4 16v4m0 0h4m-4 0l5.657-5.657M20 16v4m0 0h-4m4 0l-5.657-5.657" />
        </svg>
      )}
    </motion.button>
  )
}
