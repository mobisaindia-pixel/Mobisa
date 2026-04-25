"use client";

import React, { useRef, useEffect, useCallback, useState } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";

/* ═══════════════════════════════════════════
   PREMIUM STICKER SVGs — bold, white-bordered, hand-drawn
   ═══════════════════════════════════════════ */

const STICKER_FILTER = "drop-shadow(0 4px 12px rgba(0,0,0,0.25))";

// Card 1 — Film Clapperboard (light blue #BFDFFF)
const ClapperboardSticker: React.FC<{ size?: number }> = ({ size = 100 }) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    style={{ filter: STICKER_FILTER }}
  >
    {/* White outer border */}
    <rect x="3" y="3" width="94" height="94" rx="16" fill="white" />
    <g transform="translate(14, 8)">
      {/* Clapper top with stripes */}
      <polygon
        points="0,32 14,8 62,8 72,32"
        fill="#BFDFFF"
        stroke="#222"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Diagonal stripes on clapper */}
      <line x1="20" y1="10" x2="28" y2="30" stroke="#222" strokeWidth="3" />
      <line x1="36" y1="10" x2="44" y2="30" stroke="#222" strokeWidth="3" />
      <line x1="52" y1="10" x2="58" y2="30" stroke="#222" strokeWidth="3" />
      {/* Hinge dots */}
      <circle cx="4" cy="30" r="3" fill="#222" />
      <circle cx="4" cy="38" r="3" fill="#222" />
      {/* Board body */}
      <rect
        x="0"
        y="32"
        width="72"
        height="44"
        rx="5"
        fill="#BFDFFF"
        stroke="#222"
        strokeWidth="3"
      />
      {/* ACTION text */}
      <text x="36" y="58" textAnchor="middle" fontSize="11" fontWeight="900" fill="#222" fontFamily="Inter, sans-serif">ACTION</text>
      {/* Lens circle */}
      <circle cx="36" cy="42" r="3" fill="#222" />
    </g>
  </svg>
);

// Card 2 — Retro Camera (light yellow #FFF5B0)
const CameraSticker: React.FC<{ size?: number }> = ({ size = 100 }) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    style={{ filter: STICKER_FILTER }}
  >
    {/* White outer border */}
    <rect x="3" y="6" width="94" height="88" rx="16" fill="white" />
    <g transform="translate(14, 16)">
      {/* Camera body */}
      <rect
        x="2"
        y="18"
        width="68"
        height="46"
        rx="8"
        fill="#FFF5B0"
        stroke="#222"
        strokeWidth="3"
      />
      {/* Viewfinder bump */}
      <rect
        x="20"
        y="6"
        width="26"
        height="16"
        rx="5"
        fill="#FFF5B0"
        stroke="#222"
        strokeWidth="3"
      />
      {/* Shutter button */}
      <circle cx="42" cy="8" r="4" fill="#FF6B6B" stroke="#222" strokeWidth="2" />
      {/* Lens outer ring */}
      <circle cx="36" cy="41" r="16" fill="#FFF5B0" stroke="#222" strokeWidth="3" />
      {/* Lens middle ring */}
      <circle cx="36" cy="41" r="10" fill="white" stroke="#222" strokeWidth="2.5" />
      {/* Lens inner — blue */}
      <circle cx="36" cy="41" r="6" fill="#4A90D9" stroke="#222" strokeWidth="2" />
      {/* Lens center */}
      <circle cx="36" cy="41" r="2.5" fill="#222" />
      {/* White highlight dot */}
      <circle cx="32" cy="37" r="2" fill="white" opacity="0.9" />
      {/* Flash dot */}
      <circle cx="58" cy="26" r="3.5" fill="#222" />
    </g>
  </svg>
);

// Card 3 — Phone with Play Button (light purple #E8CCFF)
const PhonePlaySticker: React.FC<{ size?: number }> = ({ size = 100 }) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    style={{ filter: STICKER_FILTER }}
  >
    {/* White outer border */}
    <rect x="12" y="2" width="76" height="96" rx="16" fill="white" />
    <g transform="translate(20, 6)">
      {/* Phone body */}
      <rect
        x="4"
        y="4"
        width="52"
        height="82"
        rx="10"
        fill="#E8CCFF"
        stroke="#222"
        strokeWidth="3"
      />
      {/* Screen */}
      <rect
        x="10"
        y="18"
        width="40"
        height="52"
        rx="4"
        fill="#1A0533"
        stroke="#222"
        strokeWidth="2"
      />
      {/* Play button triangle — amber */}
      <polygon
        points="24,34 24,54 40,44"
        fill="#F5A623"
        stroke="#222"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Front camera dot */}
      <circle cx="30" cy="11" r="2.5" fill="#222" />
      {/* Speaker line */}
      <line x1="24" y1="11" x2="22" y2="11" stroke="#222" strokeWidth="2" strokeLinecap="round" />
      {/* Home indicator */}
      <line x1="24" y1="80" x2="36" y2="80" stroke="#222" strokeWidth="2.5" strokeLinecap="round" />
    </g>
  </svg>
);

// Card 4 — Magic Sparkle Star (light green #CCFFCC)
const SparkleSticker: React.FC<{ size?: number }> = ({ size = 100 }) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    style={{ filter: STICKER_FILTER }}
  >
    {/* White outer border circle */}
    <circle cx="50" cy="50" r="46" fill="white" />
    <g transform="translate(12, 10)">
      {/* Main 4-pointed star — elegant long points */}
      <path
        d="M38,2 L43,28 L72,20 L50,36 L76,44 L50,48 L60,76 L38,54 L16,76 L26,48 L0,44 L26,36 L4,20 L33,28 Z"
        fill="#CCFFCC"
        stroke="#222"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Center highlight */}
      <circle cx="38" cy="40" r="6" fill="white" stroke="#222" strokeWidth="2" />
      {/* Radiating lines */}
      <line x1="38" y1="8" x2="38" y2="14" stroke="#222" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="38" y1="66" x2="38" y2="72" stroke="#222" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="40" x2="14" y2="40" stroke="#222" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="62" y1="40" x2="68" y2="40" stroke="#222" strokeWidth="1.5" strokeLinecap="round" />
      {/* Tiny sparkle dots */}
      <circle cx="14" cy="14" r="3" fill="#CCFFCC" stroke="#222" strokeWidth="1.5" />
      <circle cx="64" cy="10" r="2.5" fill="#CCFFCC" stroke="#222" strokeWidth="1.5" />
      <circle cx="68" cy="68" r="2" fill="#CCFFCC" stroke="#222" strokeWidth="1.5" />
      <circle cx="10" cy="66" r="2.5" fill="#CCFFCC" stroke="#222" strokeWidth="1.5" />
    </g>
    {/* Secondary mini star — bottom-right */}
    <g transform="translate(60, 62) scale(0.6)">
      <path
        d="M20,0 L23,16 L40,20 L23,24 L20,40 L17,24 L0,20 L17,16 Z"
        fill="white"
        stroke="#222"
        strokeWidth="2"
        strokeLinejoin="round"
      />
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

// Sticker per card — large 100px, unique rotations
const stickerComponents = [
  { Component: ClapperboardSticker, size: 100, rotate: -12 },
  { Component: CameraSticker, size: 100, rotate: 8 },
  { Component: PhonePlaySticker, size: 100, rotate: -6 },
  { Component: SparkleSticker, size: 100, rotate: 14 },
];

/* ═══════════════════════════════════════════
   FAN LAYOUT CONSTANTS — refined asymmetric feel
   ═══════════════════════════════════════════ */
const CARD_W = 340;
const ROTATIONS = [-16, -5, 4, 13];
const X_OFFSETS = [-390, -130, 130, 390];
const Y_OFFSETS = [50, 15, -10, 35];
const Z_INDICES = [1, 3, 4, 2];
const SPREAD_AMOUNT = 220;

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
          y: -45,
          rotation: 0,
          scale: 1.08,
          zIndex: 10,
          duration: 0.45,
          ease: "power3.out",
          overwrite: true,
        });
        // Add hover shadow class
        card.classList.add("svc-card-hovered");
      } else {
        const direction = i < hoveredIdx ? -1 : 1;
        gsap.to(card, {
          x: X_OFFSETS[i] + direction * SPREAD_AMOUNT,
          y: Y_OFFSETS[i],
          rotation: ROTATIONS[i] + direction * 4,
          scale: 0.96,
          zIndex: Z_INDICES[i],
          duration: 0.45,
          ease: "power3.out",
          overwrite: true,
        });
        card.classList.remove("svc-card-hovered");
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
        duration: 0.45,
        ease: "power3.out",
        overwrite: true,
      });
      card.classList.remove("svc-card-hovered");
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
          viewBox="0 0 300 18"
          preserveAspectRatio="none"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <motion.path
            d="M5 10 Q50 3 100 12 Q150 18 200 8 Q250 2 295 10"
            fill="none"
            stroke="#111"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
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
              {/* Gradient sheen overlay */}
              <div className="svc-card-sheen" />

              {/* Large hand-drawn sticker — overlapping card top */}
              <div
                className="svc-sticker"
                style={{
                  position: "absolute",
                  top: -38,
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
                  <li key={j}><span className="svc-bullet">✦</span> {item}</li>
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
