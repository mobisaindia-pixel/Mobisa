"use client";

import React, { useRef, useEffect, useCallback, useState } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";

/* ═══════════════════════════════════════════
   STICKER SVGs — large, white-bordered, hand-drawn style
   ═══════════════════════════════════════════ */

// Card 1 — Film Clapperboard (light blue fill #BFDFFF)
const ClapperboardSticker: React.FC<{ size?: number }> = ({ size = 95 }) => (
  <svg
    viewBox="0 0 100 95"
    width={size}
    height={size * 0.95}
    style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.25))" }}
  >
    {/* White sticker border */}
    <rect x="4" y="4" width="92" height="87" rx="14" fill="white" />
    <g transform="translate(15, 10)">
      {/* Clapper top */}
      <polygon
        points="0,30 12,8 60,8 70,30"
        fill="#BFDFFF"
        stroke="#222"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Clapper stripes */}
      <line x1="18" y1="10" x2="26" y2="28" stroke="#222" strokeWidth="2.5" />
      <line x1="34" y1="10" x2="42" y2="28" stroke="#222" strokeWidth="2.5" />
      <line x1="50" y1="10" x2="58" y2="28" stroke="#222" strokeWidth="2.5" />
      {/* Board body */}
      <rect
        x="0"
        y="30"
        width="70"
        height="40"
        rx="4"
        fill="#BFDFFF"
        stroke="#222"
        strokeWidth="3"
      />
      {/* Lens circle on board */}
      <circle cx="35" cy="50" r="8" fill="white" stroke="#222" strokeWidth="2" />
      <circle cx="35" cy="50" r="3" fill="#222" />
    </g>
  </svg>
);

// Card 2 — Camera (light yellow fill #FFF5B0)
const CameraSticker: React.FC<{ size?: number }> = ({ size = 95 }) => (
  <svg
    viewBox="0 0 100 95"
    width={size}
    height={size * 0.95}
    style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.25))" }}
  >
    {/* White sticker border */}
    <rect x="4" y="4" width="92" height="87" rx="14" fill="white" />
    <g transform="translate(14, 14)">
      {/* Camera body */}
      <rect
        x="2"
        y="18"
        width="68"
        height="48"
        rx="8"
        fill="#FFF5B0"
        stroke="#222"
        strokeWidth="3"
      />
      {/* Flash bump */}
      <rect
        x="20"
        y="8"
        width="22"
        height="14"
        rx="4"
        fill="#FFF5B0"
        stroke="#222"
        strokeWidth="2.5"
      />
      {/* Lens outer */}
      <circle cx="36" cy="42" r="16" fill="#FFF5B0" stroke="#222" strokeWidth="3" />
      {/* Lens inner */}
      <circle cx="36" cy="42" r="9" fill="white" stroke="#222" strokeWidth="2" />
      {/* Lens center */}
      <circle cx="36" cy="42" r="4" fill="#222" />
      {/* Flash dot */}
      <circle cx="56" cy="28" r="3" fill="#222" />
    </g>
  </svg>
);

// Card 3 — Phone with Play Button (light purple fill #E8CCFF)
const PhonePlaySticker: React.FC<{ size?: number }> = ({ size = 95 }) => (
  <svg
    viewBox="0 0 100 95"
    width={size}
    height={size * 0.95}
    style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.25))" }}
  >
    {/* White sticker border */}
    <rect x="4" y="4" width="92" height="87" rx="14" fill="white" />
    <g transform="translate(22, 8)">
      {/* Phone body */}
      <rect
        x="4"
        y="4"
        width="48"
        height="78"
        rx="8"
        fill="#E8CCFF"
        stroke="#222"
        strokeWidth="3"
      />
      {/* Screen */}
      <rect
        x="10"
        y="16"
        width="36"
        height="50"
        rx="3"
        fill="white"
        stroke="#222"
        strokeWidth="1.5"
      />
      {/* Play triangle */}
      <polygon
        points="22,30 22,52 40,41"
        fill="#222"
        stroke="#222"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Speaker notch */}
      <line x1="22" y1="10" x2="34" y2="10" stroke="#222" strokeWidth="2" strokeLinecap="round" />
      {/* Home indicator */}
      <line x1="22" y1="76" x2="34" y2="76" stroke="#222" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);

// Card 4 — Sparkle/Star Burst (light green fill #CCFFCC)
const SparkleSticker: React.FC<{ size?: number }> = ({ size = 95 }) => (
  <svg
    viewBox="0 0 100 95"
    width={size}
    height={size * 0.95}
    style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.25))" }}
  >
    {/* White sticker border */}
    <rect x="4" y="4" width="92" height="87" rx="14" fill="white" />
    <g transform="translate(12, 10)">
      {/* Main 4-point star */}
      <path
        d="M38,4 L44,28 L68,22 L48,38 L72,48 L48,48 L56,72 L38,52 L20,72 L28,48 L4,48 L28,38 L8,22 L32,28 Z"
        fill="#CCFFCC"
        stroke="#222"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Inner circle */}
      <circle cx="38" cy="40" r="8" fill="white" stroke="#222" strokeWidth="2" />
      {/* Tiny sparkle dots */}
      <circle cx="16" cy="12" r="3" fill="#CCFFCC" stroke="#222" strokeWidth="1.5" />
      <circle cx="62" cy="8" r="2.5" fill="#CCFFCC" stroke="#222" strokeWidth="1.5" />
      <circle cx="66" cy="64" r="2" fill="#CCFFCC" stroke="#222" strokeWidth="1.5" />
    </g>
  </svg>
);

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

interface ServiceCardData {
  title: string;
  color: string;
  items: string[];
}

const services: ServiceCardData[] = [
  {
    title: "social posts",
    color: "#3DAE6F",
    items: [
      "Scroll-stopping hooks",
      "Hook-first copywriting",
      "Platform-native formats",
      "Brand-aligned design",
      "Instagram / LinkedIn / X",
    ],
  },
  {
    title: "mockups",
    color: "#A855F7",
    items: [
      "Scene conceptualization",
      "AI image generation",
      "Realistic lighting & shadow",
      "Multi-format exports",
      "Revision rounds",
    ],
  },
  {
    title: "ugc ads",
    color: "#F97316",
    items: [
      "UGC scripting",
      "Storyboard direction",
      "Faceless or talent-led",
      "Captions + sound design",
      "Reels / TikTok / Shorts",
    ],
  },
  {
    title: "ai ads ★",
    color: "#4F46E5",
    items: [
      "Full creative brief",
      "AI storyboard",
      "Kling / Veo / Seedance",
      "Voiceover + sound design",
      "6s · 15s · 30s · 60s cuts",
    ],
  },
];

// Sticker per card — large, with unique rotation
const stickerComponents = [
  { Component: ClapperboardSticker, size: 95, rotate: -8 },
  { Component: CameraSticker, size: 95, rotate: 6 },
  { Component: PhonePlaySticker, size: 90, rotate: -5 },
  { Component: SparkleSticker, size: 95, rotate: 10 },
];

/* ═══════════════════════════════════════════
   FAN LAYOUT CONSTANTS
   ═══════════════════════════════════════════ */
const CARD_W = 340;
const ROTATIONS = [-18, -7, 6, 15];
// Full-width spread with overlap: adjacent cards overlap ~70-80px
const X_OFFSETS = [-390, -130, 130, 390];
const Y_OFFSETS = [60, 20, -20, 40]; // vertical stagger for wave rhythm
const Z_INDICES = [1, 3, 4, 2]; // middle cards on top, outer cards behind
const SPREAD_AMOUNT = 250; // how far non-hovered cards push away on hover

/* ═══════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════ */
const ServicesSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Detect mobile/tablet
  useEffect(() => {
    const checkBreakpoint = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };
    checkBreakpoint();
    window.addEventListener("resize", checkBreakpoint);
    return () => window.removeEventListener("resize", checkBreakpoint);
  }, []);

  // After framer-motion entrance finishes, hand control to GSAP
  // Skip on mobile — CSS handles horizontal scroll layout
  useEffect(() => {
    if (!isInView || isMobile) return;
    const timeout = setTimeout(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const rotScale = isTablet ? 0.7 : 1;
        gsap.set(card, {
          x: X_OFFSETS[i],
          rotation: ROTATIONS[i] * rotScale,
          y: Y_OFFSETS[i],
          scale: 1,
          zIndex: Z_INDICES[i],
        });
      });
    }, 900);
    return () => clearTimeout(timeout);
  }, [isInView, isMobile, isTablet]);

  // GSAP hover — spread other cards dramatically (disabled on mobile)
  const handleCardHover = useCallback((hoveredIdx: number) => {
    if (isMobile) return;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      if (i === hoveredIdx) {
        gsap.to(card, {
          x: X_OFFSETS[i],
          y: -40,
          rotation: 0,
          scale: 1.05,
          zIndex: 10,
          duration: 0.4,
          ease: "power2.out",
          overwrite: true,
        });
      } else {
        const direction = i < hoveredIdx ? -1 : 1;
        gsap.to(card, {
          x: X_OFFSETS[i] + direction * SPREAD_AMOUNT,
          y: Y_OFFSETS[i],
          rotation: ROTATIONS[i] + direction * 4,
          scale: 0.96,
          zIndex: Z_INDICES[i],
          duration: 0.4,
          ease: "power2.out",
          overwrite: true,
        });
      }
    });
  }, [isMobile]);

  // GSAP hover leave — return to fan (disabled on mobile)
  const handleCardLeave = useCallback(() => {
    if (isMobile) return;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      gsap.to(card, {
        x: X_OFFSETS[i],
        y: Y_OFFSETS[i],
        rotation: ROTATIONS[i],
        scale: 1,
        zIndex: Z_INDICES[i],
        duration: 0.4,
        ease: "power2.out",
        overwrite: true,
      });
    });
  }, [isMobile]);

  return (
    <section className="services-section" id="services" ref={ref}>
      <motion.h2
        className="services-title"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        call us if you <em>need:</em>
        <motion.svg
          className="services-underline-svg"
          viewBox="0 0 120 12"
          preserveAspectRatio="none"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <motion.path
            d="M5 6 Q30 2 60 8 Q90 12 115 4"
            fill="none"
            stroke="#111"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </motion.svg>
      </motion.h2>

      <div className={`services-fan ${isMobile ? "services-fan-mobile" : ""}`} ref={cardsRef}>
        {services.map((service, i) => {
          const sticker = stickerComponents[i];
          return (
            <motion.div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="svc-card"
              style={{
                background: service.color,
                ...(isMobile
                  ? {}
                  : {
                      position: "absolute" as const,
                      left: "50%",
                      marginLeft: -(CARD_W / 2),
                      zIndex: Z_INDICES[i],
                    }),
              }}
              initial={isMobile ? { opacity: 0, y: 40 } : { opacity: 0, y: 150 + Y_OFFSETS[i], rotate: ROTATIONS[i] + 25 }}
              whileInView={isMobile ? { opacity: 1, y: 0 } : {
                opacity: 1,
                y: Y_OFFSETS[i],
                rotate: ROTATIONS[i],
                x: X_OFFSETS[i],
              }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: "easeOut",
              }}
              onMouseEnter={isMobile ? undefined : () => handleCardHover(i)}
              onMouseLeave={isMobile ? undefined : handleCardLeave}
            >
              {/* Large hand-drawn sticker — overlapping card top */}
              <div
                className="svc-sticker"
                style={{
                  position: "absolute",
                  top: -45,
                  right: 10,
                  transform: `rotate(${sticker.rotate}deg)`,
                  zIndex: 10,
                  pointerEvents: "none",
                }}
              >
                <sticker.Component size={sticker.size} />
              </div>

              <h3 className="svc-card-title">{service.title}</h3>
              <div className="svc-card-divider" />
              <ul className="svc-card-list">
                {service.items.map((item, j) => (
                  <li key={j}>✦ {item}</li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesSection;
