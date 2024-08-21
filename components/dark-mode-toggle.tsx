'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import useSound from 'use-sound'

export default function DarkMode() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), [])

  const [playOn] = useSound('/sounds/switch-on.mp3', { volume: 0.5 })
  const [playOff] = useSound('/sounds/switch-off.mp3', { volume: 0.5 })

  // darkMode toggle animation
  const trans = {
    type: 'spring',
    damping: 10,
    mass: 0.75,
    stiffness: 100,
  }
  const vRotate = {
    dark: {
      rotate: 40,
    },
    light: {
      rotate: 180,
    },
  }
  const vLine = {
    dark: {
      scale: 0,
      opacity: 0,
    },
    light: {
      scale: 1,
      opacity: 1,
    },
  }
  // maskedCircle
  const vMCircle = {
    dark: {
      cx: 12,
      cy: 4,
    },
    light: {
      cx: 30,
      cy: 0,
    },
  }
  // centerCircle
  const vCCircle = {
    dark: {
      r: 9,
    },
    light: {
      r: 5,
    },
  }

  if (!mounted) return null

  const handleClick = () => {
    // Read sound-enabled from localStorage on each click
    const storedSoundEnabled = localStorage.getItem('sound-enabled') === 'true'

    // Toggle theme
    setTheme(theme === 'dark' ? 'light' : 'dark')

    // Play sound based on the soundEnabled state
    if (storedSoundEnabled) {
      theme === 'dark' ? playOff() : playOn()
    }
  }

  return (
    <motion.div
      initial={theme === 'dark' ? 'dark' : 'light'}
      animate={theme === 'dark' ? 'dark' : 'light'}
    >
      <button
        aria-label="Toggle Dark Mode"
        type="button"
        onClick={handleClick}
        title={theme === 'dark' ? 'Activate light mode' : 'Activate dark mode'}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          variants={vRotate}
          transition={trans}
          style={{ originX: '50%', originY: '50%' }}
          className="size-6 text-gray-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
        >
          <mask id="moon-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <motion.circle
              variants={vMCircle}
              transition={trans}
              cx="12"
              cy="4"
              r="9"
              fill="black"
            />
          </mask>
          <motion.circle
            variants={vCCircle}
            transition={trans}
            cx="12"
            cy="12"
            r="9"
            mask="url(#moon-mask)"
          />

          <motion.g
            variants={vLine}
            // transition={trans}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ originX: '50%', originY: '50%' }}
          >
            <circle cx="12" cy="3" r="0.8" />
            <circle cx="19.5" cy="7.5" r="0.8" />
            <circle cx="19.5" cy="16.5" r="0.8" />
            <circle cx="12" cy="21" r="0.8" />
            <circle cx="4.5" cy="16.5" r="0.8" />
            <circle cx="4.5" cy="7.5" r="0.8" />
          </motion.g>
        </motion.svg>
      </button>
    </motion.div>
  )
}
