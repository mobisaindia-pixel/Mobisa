"use client";

import React from "react";
import { motion } from "framer-motion";

const Sticker: React.FC<{
  children: React.ReactNode;
  x?: number | string;
  y?: number | string;
  rotate?: number;
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
}> = ({ children, x = 0, y = 0, rotate = 0, delay = 0, style, className }) => {
  return (
    <motion.div
      className={className}
      style={{
        position: "absolute",
        left: x,
        top: y,
        zIndex: 5,
        ...style,
      }}
      initial={{ scale: 0, rotate: rotate - 20 }}
      animate={{
        scale: 1,
        rotate,
        y: [0, -10, 0],
      }}
      transition={{
        scale: { duration: 0.5, delay, ease: "backOut" },
        rotate: { duration: 0.5, delay },
        y: {
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      }}
    >
      {children}
    </motion.div>
  );
};

// ===== STICKER SVGs MATCHING ORIGINAL =====

export const SmileySticker: React.FC<{ size?: number; color?: string }> = ({
  size = 55,
  color = "#7eb8f0",
}) => (
  <svg viewBox="0 0 70 70" width={size} height={size}>
    <circle cx="35" cy="35" r="30" fill="none" stroke={color} strokeWidth="2.5" />
    <circle cx="26" cy="28" r="3.5" fill={color} />
    <circle cx="44" cy="28" r="3.5" fill={color} />
    <path
      d="M20 42 Q35 56 50 42"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

export const ThumbsUpSticker: React.FC<{ size?: number }> = ({ size = 60 }) => (
  <svg viewBox="0 0 60 60" width={size} height={size}>
    <circle cx="30" cy="30" r="28" fill="#d4f57a" opacity="0.7" />
    <text x="30" y="38" textAnchor="middle" fontSize="28">
      👍
    </text>
  </svg>
);

// Hand-drawn camera for service card
export const CameraSticker: React.FC<{ size?: number }> = ({ size = 55 }) => (
  <svg viewBox="0 0 60 50" width={size} height={size * 0.83}>
    <g stroke="#333" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="18" width="36" height="24" rx="4" />
      <circle cx="26" cy="30" r="8" />
      <circle cx="26" cy="30" r="3" fill="#333" />
      <rect x="18" y="12" width="16" height="7" rx="2" />
      <line x1="2" y1="14" x2="10" y2="20" />
      <line x1="42" y1="14" x2="50" y2="8" />
      <line x1="50" y1="8" x2="52" y2="12" />
    </g>
  </svg>
);

// Hand-drawn phone sticker
export const PhoneSticker: React.FC<{ size?: number }> = ({ size = 50 }) => (
  <svg viewBox="0 0 55 55" width={size} height={size}>
    <g stroke="#333" strokeWidth="2.5" fill="none" strokeLinecap="round">
      <path d="M12 38 Q18 18 26 22 Q34 26 30 12 Q42 16 36 32 Q30 44 16 40Z" />
      <line x1="12" y1="38" x2="6" y2="44" />
      <circle cx="36" cy="16" r="4" fill="#ff4081" stroke="none" />
      <path d="M38 10 Q42 8 44 12" />
      <path d="M40 6 Q46 4 48 10" />
    </g>
  </svg>
);

// Smiley with outline for activations - matching original blue circle smiley
export const BigSmileySticker: React.FC<{ size?: number }> = ({ size = 65 }) => (
  <svg viewBox="0 0 80 80" width={size} height={size}>
    <circle cx="40" cy="40" r="34" fill="none" stroke="#7eb8f0" strokeWidth="3" opacity="0.7" />
    <circle cx="40" cy="40" r="30" fill="none" stroke="#7eb8f0" strokeWidth="2" opacity="0.4" />
    <circle cx="32" cy="34" r="3" fill="#7eb8f0" />
    <circle cx="48" cy="34" r="3" fill="#7eb8f0" />
    <path d="M26 48 Q40 60 54 48" fill="none" stroke="#7eb8f0" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// Frog/dinosaur face sticker (matches the original green monster)
export const MonsterSticker: React.FC<{ size?: number }> = ({ size = 60 }) => (
  <svg viewBox="0 0 70 60" width={size} height={size * 0.86}>
    <circle cx="35" cy="35" r="26" fill="#d4f57a" opacity="0.8" />
    <circle cx="24" cy="26" r="8" fill="#d4f57a" stroke="#333" strokeWidth="1.5" />
    <circle cx="46" cy="26" r="8" fill="#d4f57a" stroke="#333" strokeWidth="1.5" />
    <circle cx="24" cy="24" r="4" fill="#333" />
    <circle cx="46" cy="24" r="4" fill="#333" />
    <path d="M20 42 Q35 52 50 42" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" />
    <line x1="20" y1="42" x2="16" y2="38" stroke="#333" strokeWidth="1.5" />
    <line x1="50" y1="42" x2="54" y2="38" stroke="#333" strokeWidth="1.5" />
  </svg>
);

// Heart with sparkle for "with partners"
export const HeartSparkleSticker: React.FC<{ size?: number }> = ({ size = 55 }) => (
  <svg viewBox="0 0 60 60" width={size} height={size}>
    <g>
      <path
        d="M30 50 L12 32 Q4 20 16 16 Q28 12 30 26 Q32 12 44 16 Q56 20 48 32 Z"
        fill="#8b3a62"
        stroke="white"
        strokeWidth="2"
      />
      <path
        d="M42 8 L44 14 L50 16 L44 18 L42 24 L40 18 L34 16 L40 14 Z"
        fill="white"
        opacity="0.9"
      />
    </g>
  </svg>
);

export const HeartSticker: React.FC<{ size?: number }> = ({ size = 45 }) => (
  <svg viewBox="0 0 50 50" width={size} height={size}>
    <path
      d="M25 40 L10 25 Q5 15 15 12 Q25 9 25 20 Q25 9 35 12 Q45 15 40 25 Z"
      fill="#8b3a62"
      stroke="white"
      strokeWidth="1.5"
    />
    <path d="M18 18 L14 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const BamSticker: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <svg viewBox="0 0 90 70" width={size} height={size * 0.78}>
    <polygon
      points="45,0 55,18 78,10 62,28 75,50 52,40 35,58 35,38 12,35 28,22 18,5 40,14"
      fill="#E84E1B"
    />
    <text
      x="42"
      y="33"
      textAnchor="middle"
      fontSize="14"
      fill="white"
      fontWeight="900"
      fontFamily="Inter, sans-serif"
    >
      BAM
    </text>
  </svg>
);

export const HundredSticker: React.FC<{ size?: number }> = ({ size = 75 }) => (
  <svg viewBox="0 0 90 50" width={size} height={size * 0.56}>
    <rect x="5" y="5" width="80" height="40" rx="20" fill="#ff8a9e" />
    <text
      x="45"
      y="33"
      textAnchor="middle"
      fontSize="22"
      fill="white"
      fontWeight="900"
      fontFamily="Inter, sans-serif"
      fontStyle="italic"
    >
      100
    </text>
  </svg>
);

export const HandsHeartSticker: React.FC<{ size?: number }> = ({ size = 50 }) => (
  <svg viewBox="0 0 60 60" width={size} height={size}>
    <circle cx="30" cy="30" r="22" fill="#2d7a5f" opacity="0.8" />
    <text x="30" y="38" textAnchor="middle" fontSize="26">
      🫶
    </text>
  </svg>
);

export const SparkleSticker: React.FC<{ size?: number; color?: string }> = ({
  size = 28,
  color = "#c8b4ff",
}) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path
      d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z"
      fill={color}
    />
  </svg>
);

export const KoreanHeartSticker: React.FC<{ size?: number }> = ({ size = 50 }) => (
  <svg viewBox="0 0 50 50" width={size} height={size}>
    <circle cx="25" cy="25" r="20" fill="#ffb6c1" opacity="0.7" />
    <text x="25" y="32" textAnchor="middle" fontSize="22">
      🤞
    </text>
  </svg>
);

// Video/film sticker for production card
export const VideoSticker: React.FC<{ size?: number }> = ({ size = 50 }) => (
  <svg viewBox="0 0 60 60" width={size} height={size}>
    <g stroke="#333" strokeWidth="2.5" fill="none" strokeLinecap="round">
      <rect x="8" y="16" width="28" height="28" rx="4" />
      <polygon points="40,22 54,30 40,38" />
      <circle cx="22" cy="30" r="2.5" fill="#333" />
    </g>
  </svg>
);

export const StarHeartSticker: React.FC<{ size?: number }> = ({ size = 45 }) => (
  <svg viewBox="0 0 50 50" width={size} height={size}>
    <path
      d="M25 10 L30 20 L40 22 L32 30 L34 40 L25 35 L16 40 L18 30 L10 22 L20 20Z"
      fill="#8b3a62"
      stroke="white"
      strokeWidth="1.5"
    />
  </svg>
);

// Money/film camera sticker for footer
export const FilmCameraSticker: React.FC<{ size?: number }> = ({ size = 50 }) => (
  <svg viewBox="0 0 60 55" width={size} height={size * 0.92}>
    <g stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round">
      <rect x="10" y="20" width="32" height="22" rx="3" />
      <circle cx="26" cy="31" r="7" />
      <circle cx="26" cy="31" r="3" fill="#333" />
      <rect x="20" y="14" width="12" height="7" rx="2" />
      <path d="M44 24 L52 20 L52 38 L44 34" />
    </g>
  </svg>
);

export default Sticker;
