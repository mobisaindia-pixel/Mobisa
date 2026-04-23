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

// ===== SITEWIDE STICKER SVGs — hand-drawn, white-backed, thick outlines =====

const SHADOW = "drop-shadow(0 4px 12px rgba(0,0,0,0.2))";

export const SmileySticker: React.FC<{ size?: number; color?: string }> = ({
  size = 90,
  color,
}) => (
  <svg viewBox="0 0 100 100" width={size} height={size} style={{ filter: SHADOW }}>
    {/* White sticker backing */}
    <circle cx="50" cy="50" r="46" fill="white" />
    {/* Blue filled circle */}
    <circle cx="50" cy="50" r="40" fill={color || "#BFDFFF"} />
    <circle cx="50" cy="50" r="40" fill="none" stroke="#222" strokeWidth="3" />
    {/* Eyes */}
    <circle cx="38" cy="42" r="5" fill="white" />
    <circle cx="62" cy="42" r="5" fill="white" />
    <circle cx="38" cy="42" r="2.5" fill="#222" />
    <circle cx="62" cy="42" r="2.5" fill="#222" />
    {/* Big smile */}
    <path d="M32 58 Q50 74 68 58" fill="none" stroke="#222" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

export const ThumbsUpSticker: React.FC<{ size?: number }> = ({ size = 90 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} style={{ filter: SHADOW }}>
    {/* White sticker backing */}
    <circle cx="50" cy="50" r="46" fill="white" />
    {/* Yellow-green circle */}
    <circle cx="50" cy="50" r="40" fill="#D4F57A" />
    <circle cx="50" cy="50" r="40" fill="none" stroke="#222" strokeWidth="3" />
    {/* Hand-drawn thumb */}
    <g stroke="#222" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Thumb up part */}
      <path d="M42 62 L42 46 L38 46 Q34 38 40 30 Q44 26 48 30 L48 38 L64 38 Q68 38 68 42 L66 56 Q65 62 60 62 Z" fill="#FFF5B0" />
      {/* Thumb knuckle */}
      <line x1="48" y1="38" x2="48" y2="48" />
    </g>
  </svg>
);

// Hand-drawn camera sticker (white-backed)
export const CameraSticker: React.FC<{ size?: number }> = ({ size = 90 }) => (
  <svg viewBox="0 0 110 100" width={size} height={size * 0.91} style={{ filter: SHADOW }}>
    {/* White sticker base */}
    <rect x="6" y="10" width="98" height="82" rx="16" fill="white" />
    {/* Camera body */}
    <g transform="translate(16, 22)">
      <rect x="4" y="20" width="72" height="46" rx="8" fill="#FFF5B0" stroke="#222" strokeWidth="3.5" />
      {/* Flash bump */}
      <rect x="24" y="8" width="30" height="16" rx="5" fill="#FFF5B0" stroke="#222" strokeWidth="3" />
      {/* Lens outer */}
      <circle cx="40" cy="44" r="16" fill="#FFF5B0" stroke="#222" strokeWidth="3.5" />
      {/* Lens inner */}
      <circle cx="40" cy="44" r="9" fill="white" stroke="#222" strokeWidth="2.5" />
      {/* Lens center */}
      <circle cx="40" cy="44" r="4" fill="#222" />
      {/* Flash dot */}
      <circle cx="60" cy="30" r="3.5" fill="#222" />
      {/* Film strip detail */}
      <line x1="8" y1="58" x2="72" y2="58" stroke="#222" strokeWidth="2" opacity="0.3" />
      <rect x="12" y="60" width="10" height="4" rx="1" fill="#222" opacity="0.25" />
      <rect x="26" y="60" width="10" height="4" rx="1" fill="#222" opacity="0.25" />
      <rect x="40" y="60" width="10" height="4" rx="1" fill="#222" opacity="0.25" />
      <rect x="54" y="60" width="10" height="4" rx="1" fill="#222" opacity="0.25" />
    </g>
  </svg>
);

// Hand-drawn phone sticker (white-backed)
export const PhoneSticker: React.FC<{ size?: number }> = ({ size = 90 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} style={{ filter: SHADOW }}>
    {/* White sticker backing */}
    <rect x="8" y="4" width="84" height="92" rx="16" fill="white" />
    {/* Phone body */}
    <rect x="26" y="14" width="48" height="72" rx="8" fill="#E8CCFF" stroke="#222" strokeWidth="3.5" />
    {/* Screen */}
    <rect x="32" y="24" width="36" height="48" rx="4" fill="white" stroke="#222" strokeWidth="2.5" />
    {/* Play triangle */}
    <polygon points="44,38 44,58 62,48" fill="#F5A623" stroke="#222" strokeWidth="2" strokeLinejoin="round" />
    {/* Home button */}
    <circle cx="50" cy="80" r="3" fill="none" stroke="#222" strokeWidth="2" />
    {/* Speaker */}
    <line x1="44" y1="18" x2="56" y2="18" stroke="#222" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// Big smiley sticker (white-backed)
export const BigSmileySticker: React.FC<{ size?: number }> = ({ size = 90 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} style={{ filter: SHADOW }}>
    {/* White sticker backing */}
    <circle cx="50" cy="50" r="46" fill="white" />
    {/* Blue circle */}
    <circle cx="50" cy="50" r="40" fill="#BFDFFF" />
    <circle cx="50" cy="50" r="40" fill="none" stroke="#222" strokeWidth="3" />
    {/* Eyes — winking style */}
    <circle cx="36" cy="40" r="4" fill="#222" />
    <path d="M56 36 Q62 42 56 46" fill="none" stroke="#222" strokeWidth="3" strokeLinecap="round" />
    {/* Smile */}
    <path d="M30 56 Q50 70 70 56" fill="none" stroke="#222" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

// Frog/monster face sticker (white-backed)
export const MonsterSticker: React.FC<{ size?: number }> = ({ size = 90 }) => (
  <svg viewBox="0 0 100 90" width={size} height={size * 0.9} style={{ filter: SHADOW }}>
    {/* White sticker backing */}
    <ellipse cx="50" cy="50" rx="46" ry="42" fill="white" />
    {/* Green body */}
    <ellipse cx="50" cy="52" rx="38" ry="34" fill="#CCFFCC" stroke="#222" strokeWidth="3" />
    {/* Protruding eyes */}
    <circle cx="34" cy="32" r="12" fill="#CCFFCC" stroke="#222" strokeWidth="3" />
    <circle cx="66" cy="32" r="12" fill="#CCFFCC" stroke="#222" strokeWidth="3" />
    {/* Pupils */}
    <circle cx="34" cy="30" r="5" fill="#222" />
    <circle cx="66" cy="30" r="5" fill="#222" />
    {/* Eye shine */}
    <circle cx="36" cy="28" r="2" fill="white" />
    <circle cx="68" cy="28" r="2" fill="white" />
    {/* Wide mouth */}
    <path d="M30 58 Q50 72 70 58" fill="none" stroke="#222" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

// Heart with sparkle sticker (white-backed)
export const HeartSparkleSticker: React.FC<{ size?: number }> = ({ size = 90 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} style={{ filter: SHADOW }}>
    {/* White sticker backing */}
    <circle cx="50" cy="52" r="46" fill="white" />
    {/* Heart */}
    <path
      d="M50 82 L20 52 Q6 34 24 26 Q42 18 50 40 Q58 18 76 26 Q94 34 80 52 Z"
      fill="#FF9EAE"
      stroke="#222"
      strokeWidth="3"
    />
    {/* Heart shine */}
    <path d="M32 38 Q26 32 32 28" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
    {/* Sparkle */}
    <path
      d="M78 14 L80 22 L88 24 L80 26 L78 34 L76 26 L68 24 L76 22 Z"
      fill="#FFF5B0"
      stroke="#222"
      strokeWidth="1.5"
    />
  </svg>
);

// Heart sticker — dark burgundy (already good, keep)
export const HeartSticker: React.FC<{ size?: number }> = ({ size = 90 }) => (
  <svg viewBox="0 0 80 80" width={size} height={size} style={{ filter: SHADOW }}>
    {/* White backing */}
    <circle cx="40" cy="42" r="38" fill="white" />
    {/* Dark burgundy heart */}
    <path
      d="M40 66 L18 42 Q6 26 22 20 Q38 14 40 34 Q42 14 58 20 Q74 26 62 42 Z"
      fill="#6B1D3A"
      stroke="#4A0E28"
      strokeWidth="2.5"
    />
    {/* Heart shine */}
    <path d="M26 30 Q22 26 26 23" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    {/* Star sparkle */}
    <path d="M64 14 L66 20 L72 22 L66 24 L64 30 L62 24 L56 22 L62 20 Z" fill="white" opacity="0.9" />
    <circle cx="70" cy="12" r="1.5" fill="white" opacity="0.7" />
  </svg>
);

// BAM sticker (already good, keep)
export const BamSticker: React.FC<{ size?: number }> = ({ size = 95 }) => (
  <svg viewBox="0 0 110 90" width={size} height={size * 0.82} style={{ filter: SHADOW }}>
    {/* Outer burst */}
    <polygon
      points="55,2 64,22 88,8 74,30 108,28 80,42 100,62 72,54 64,80 55,56 46,80 38,54 10,62 30,42 2,28 36,30 22,8 46,22"
      fill="#E84E1B"
    />
    {/* Inner burst */}
    <polygon
      points="55,14 60,28 76,20 68,34 88,34 72,42 82,54 66,50 60,66 55,48 50,66 44,50 28,54 38,42 22,34 42,34 34,20 50,28"
      fill="#FF6B3D"
      opacity="0.5"
    />
    {/* Bold BAM text */}
    <text x="55" y="46" textAnchor="middle" fontSize="22" fill="white" fontWeight="900" fontFamily="Inter, sans-serif" letterSpacing="1">BAM</text>
  </svg>
);

// 100 sticker (already good, keep)
export const HundredSticker: React.FC<{ size?: number }> = ({ size = 90 }) => (
  <svg viewBox="0 0 100 65" width={size} height={size * 0.65} style={{ filter: SHADOW }}>
    {/* White backing */}
    <rect x="2" y="2" width="96" height="61" rx="30" fill="white" />
    {/* Pink pill */}
    <rect x="6" y="6" width="88" height="53" rx="26" fill="#FF9EAE" />
    {/* Bold 100 text */}
    <text x="50" y="42" textAnchor="middle" fontSize="30" fill="#C41E3A" fontWeight="900" fontFamily="Inter, sans-serif" fontStyle="italic">100</text>
    <line x1="22" y1="50" x2="78" y2="50" stroke="#C41E3A" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// Hands heart sticker (already good, keep)
export const HandsHeartSticker: React.FC<{ size?: number }> = ({ size = 90 }) => (
  <svg viewBox="0 0 80 80" width={size} height={size} style={{ filter: SHADOW }}>
    {/* White backing */}
    <circle cx="40" cy="40" r="39" fill="white" />
    {/* Dark green circle */}
    <circle cx="40" cy="40" r="36" fill="#1B5E3B" />
    {/* Left hand */}
    <path d="M22 52 C22 52 18 42 20 36 C22 30 26 28 30 32 C34 36 36 40 36 40" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Right hand */}
    <path d="M58 52 C58 52 62 42 60 36 C58 30 54 28 50 32 C46 36 44 40 44 40" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Heart */}
    <path d="M36 40 Q36 30 40 26 Q44 30 44 40 Q44 48 40 54 Q36 48 36 40" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
    {/* Sparkle */}
    <circle cx="40" cy="22" r="2" fill="white" opacity="0.7" />
    <path d="M40 18 L40 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <path d="M36 22 L33 22" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <path d="M44 22 L47 22" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
  </svg>
);

// 4-point sparkle sticker — upgraded with white backing
export const SparkleSticker: React.FC<{ size?: number; color?: string }> = ({
  size = 45,
  color = "#c8b4ff",
}) => (
  <svg viewBox="0 0 40 40" width={size} height={size} style={{ filter: SHADOW }}>
    {/* White backing star */}
    <path d="M20 0L23 15L40 20L23 25L20 40L17 25L0 20L17 15Z" fill="white" />
    {/* Colored star */}
    <path d="M20 3L22.5 15.5L37 20L22.5 24.5L20 37L17.5 24.5L3 20L17.5 15.5Z" fill={color} />
  </svg>
);

// Korean finger heart sticker — hand-drawn (replaces emoji)
export const KoreanHeartSticker: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} style={{ filter: SHADOW }}>
    {/* White backing */}
    <circle cx="50" cy="50" r="46" fill="white" />
    {/* Pink circle */}
    <circle cx="50" cy="50" r="40" fill="#FFD1DC" stroke="#222" strokeWidth="3" />
    {/* Finger heart — thumb and index crossing */}
    <g stroke="#222" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Index finger */}
      <path d="M36 60 L36 34 Q36 28 42 28 Q48 28 48 34 L48 44" fill="#FFDAB9" />
      {/* Thumb */}
      <path d="M48 44 L56 32 Q60 28 64 32 Q66 36 62 40 L54 50" fill="#FFDAB9" />
      {/* Heart formed at tips */}
      <path d="M36 34 Q36 24 42 22 Q48 24 48 34" fill="#FF6B8A" stroke="#222" strokeWidth="2" />
    </g>
  </svg>
);

// Video/film sticker — upgraded with white backing
export const VideoSticker: React.FC<{ size?: number }> = ({ size = 90 }) => (
  <svg viewBox="0 0 100 90" width={size} height={size * 0.9} style={{ filter: SHADOW }}>
    {/* White backing */}
    <rect x="4" y="4" width="92" height="82" rx="16" fill="white" />
    {/* Camera body */}
    <rect x="14" y="24" width="48" height="42" rx="6" fill="#BFDFFF" stroke="#222" strokeWidth="3.5" />
    {/* Lens/viewfinder triangle */}
    <polygon points="66,32 86,44 66,56" fill="#BFDFFF" stroke="#222" strokeWidth="3" strokeLinejoin="round" />
    {/* Record dot */}
    <circle cx="38" cy="45" r="5" fill="#FF4444" stroke="#222" strokeWidth="2" />
    {/* Film reel detail */}
    <circle cx="24" cy="45" r="3" fill="none" stroke="#222" strokeWidth="2" />
  </svg>
);

// Star heart sticker — upgraded with white backing
export const StarHeartSticker: React.FC<{ size?: number }> = ({ size = 90 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} style={{ filter: SHADOW }}>
    {/* White backing */}
    <circle cx="50" cy="50" r="46" fill="white" />
    {/* Star shape */}
    <path
      d="M50 12 L58 38 L86 40 L64 56 L72 82 L50 66 L28 82 L36 56 L14 40 L42 38Z"
      fill="#E8CCFF"
      stroke="#222"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    {/* Heart inside star */}
    <path d="M50 60 L42 50 Q38 44 44 42 Q50 40 50 48 Q50 40 56 42 Q62 44 58 50 Z" fill="#FF6B8A" stroke="#222" strokeWidth="1.5" />
  </svg>
);

// Film camera sticker — upgraded with white backing
export const FilmCameraSticker: React.FC<{ size?: number }> = ({ size = 90 }) => (
  <svg viewBox="0 0 100 90" width={size} height={size * 0.9} style={{ filter: SHADOW }}>
    {/* White backing */}
    <rect x="4" y="4" width="92" height="82" rx="16" fill="white" />
    {/* Camera body */}
    <rect x="14" y="26" width="52" height="38" rx="6" fill="#FFF5B0" stroke="#222" strokeWidth="3.5" />
    {/* Lens */}
    <circle cx="40" cy="45" r="12" fill="white" stroke="#222" strokeWidth="3" />
    <circle cx="40" cy="45" r="6" fill="#222" />
    {/* Viewfinder bump */}
    <rect x="28" y="16" width="24" height="14" rx="4" fill="#FFF5B0" stroke="#222" strokeWidth="2.5" />
    {/* Film triangle */}
    <path d="M68 30 L82 40 L68 50 Z" fill="none" stroke="#222" strokeWidth="2.5" strokeLinejoin="round" />
  </svg>
);

export default Sticker;
