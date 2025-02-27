"use client";

import { motion } from "framer-motion";

const WavyLines = () => {
  return (
    <div className="relative flex items-center justify-center h-32 w-full bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      {/* First Wavy Line - Neon Blue */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute top-10 w-full h-20 opacity-90"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 5,
          ease: "easeInOut",
        }}
      >
        <defs>
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0051ff" />
            <stop offset="100%" stopColor="#00f5ff" />
          </linearGradient>
        </defs>
        <path
          fill="none"
          stroke="url(#waveGradient1)"
          strokeWidth="6"
          strokeLinecap="round"
          d="M0,160 C120,240 240,80 360,200 C480,320 600,40 720,200 C840,320 960,80 1080,200 C1200,320 1320,80 1440,200"
        />
      </motion.svg>

      {/* Second Wavy Line - Neon Pink */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute top-20 w-full h-20 opacity-90"
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 6,
          ease: "easeInOut",
        }}
      >
        <defs>
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff0051" />
            <stop offset="100%" stopColor="#ff00ff" />
          </linearGradient>
        </defs>
        <path
          fill="none"
          stroke="url(#waveGradient2)"
          strokeWidth="6"
          strokeLinecap="round"
          d="M0,160 C120,80 240,260 360,140 C480,20 600,280 720,140 C840,20 960,260 1080,140 C1200,20 1320,260 1440,140"
        />
      </motion.svg>

      {/* Third Wavy Line - Cyan-Green Glow (Fixed Blur Issue) */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute top-16 w-full h-20 opacity-90"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 7,
          ease: "easeInOut",
        }}
      >
        <defs>
          <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ff7f" />
            <stop offset="100%" stopColor="#00ffd5" />
          </linearGradient>
        </defs>
        <path
          fill="none"
          stroke="url(#waveGradient3)"
          strokeWidth="8"
          strokeLinecap="round"
          d="M0,160 C120,180 240,140 360,160 C480,180 600,140 720,160 C840,180 960,140 1080,160 C1200,180 1320,140 1440,160"
        />
      </motion.svg>
    </div>
  );
};

export default WavyLines;
