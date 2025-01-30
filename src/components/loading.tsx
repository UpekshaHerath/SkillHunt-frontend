"use client"

import { motion } from "framer-motion"

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br">
      <div className="relative">
        <motion.div
          className="w-24 h-24 bg-black dark:bg-white rounded-full"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-0 left-0 w-24 h-24 border-4 border-transparent border-t-white dark:border-t-black rounded-full"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>
      <motion.p
        className="mt-8 text-2xl font-semibold text-black dark:text-white"
        animate={{
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        Loading...
      </motion.p>
    </div>
  )
}

