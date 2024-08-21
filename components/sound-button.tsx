'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import useSound from 'use-sound'

export default function SoundButton() {
  const [isClicked, setIsClicked] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('sound-enabled')
      return savedState === 'true'
    }
    return false
  })

  useEffect(() => {
    localStorage.setItem('sound-enabled', isClicked.toString())
  }, [isClicked])

  const tiltAnimation = {
    rotate: [0, 10, -20, 10, -20, 0],
    transition: { duration: 0.5 }
  }

  const [soundOff] = useSound('/sounds/loaded.mp3', { volume: 0.5 })
  const [soundOn] = useSound('/sounds/loading.mp3', { volume: 0.5 })
 
  return (
    <div>
      <button
        aria-label="Sound"
        type="button"
        onClick={() => {
          setIsClicked(!isClicked)
          isClicked ? soundOn() : soundOff()
        }}
        title={isClicked ? 'Enables sound': 'Disable sounds'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-6 text-gray-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
        >
          <motion.polygon
            points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"
            animate={isClicked ? tiltAnimation : {}}
          />
          <motion.g
            initial={{ opacity: isClicked ? 1 : 0 }}
            animate={{ opacity: isClicked ? 0 : 1 }}
            transition={{ duration: isClicked ? 0.4 : 0.7 }}
          >
            <line x1="22" x2="16" y1="9" y2="15"/>
            <line x1="16" x2="22" y1="9" y2="15"/>
          </motion.g>
          <motion.path
            d="M15.54 8.46a5 5 0 0 1 0 7.07"
            initial={{ opacity: 0 }}
            animate={{ opacity: isClicked ? 1 : 0 }}
            transition={{ duration: isClicked ? 0.4 : 0.7 }}
          />
          <motion.path
            d="M19.07 4.93a10 10 0 0 1 0 14.14"
            initial={{ opacity: 0 }}
            animate={{ opacity: isClicked ? 1 : 0 }}
            transition={{ duration: isClicked ? 0.7 : 0.4 }}
          />
        </svg>
      </button>
    </div>
  )
}
