"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";

// Sticker SVG components — hand-drawn, white-backed
const SHADOW = "drop-shadow(0 4px 12px rgba(0,0,0,0.2))";

const ClapperboardSticker: React.FC<{ size?: number }> = ({ size = 85 }) => (
  <svg viewBox="0 0 100 95" width={size} height={size * 0.95} style={{ filter: SHADOW }}>
    <rect x="4" y="2" width="92" height="90" rx="14" fill="white" />
    <g stroke="#222" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x="14" y="36" width="72" height="44" rx="6" fill="#BFDFFF" />
      <polygon points="14,36 26,12 86,12 86,36" fill="#BFDFFF" stroke="#222" />
      <line x1="28" y1="12" x2="36" y2="36" />
      <line x1="46" y1="12" x2="54" y2="36" />
      <line x1="64" y1="12" x2="72" y2="36" />
    </g>
  </svg>
);

const SparkleStarSticker: React.FC<{ size?: number }> = ({ size = 85 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} style={{ filter: SHADOW }}>
    <circle cx="50" cy="50" r="46" fill="white" />
    <path
      d="M50 8 L56 38 L88 50 L56 62 L50 92 L44 62 L12 50 L44 38 Z"
      fill="#CCFFCC"
      stroke="#222"
      strokeWidth="3"
      strokeLinejoin="round"
    />
  </svg>
);

// Card data — scattered positions
const photos = [
  { left: "8%", top: "15%", w: 280, h: 340, rotate: -8, z: 2, bg: "linear-gradient(135deg, #0D3B2E, #1A6B4A)", parallax: 0.04, img: "/scr/mockup_mons.png", alt: "Mockup showcase" },
  { left: "28%", top: "5%", w: 300, h: 370, rotate: -3, z: 4, bg: "linear-gradient(135deg, #8B3A00, #D4621A)", parallax: 0.06, img: "/scr/ugc ads.png", alt: "UGC ad showcase" },
  { left: "50%", top: "8%", w: 290, h: 360, rotate: 5, z: 3, bg: "linear-gradient(135deg, #0A1628, #1A3A6B)", parallax: 0.05, img: "/scr/c post.png", alt: "Creative post showcase" },
  { left: "72%", top: "12%", w: 270, h: 330, rotate: 10, z: 2, bg: "linear-gradient(135deg, #2D0A4E, #6B2D9E)", parallax: 0.03, img: "/scr/Ai ads.png", alt: "AI ad showcase" },
];

// Floating pill labels
const pills = [
  { text: "hooks that convert", bg: "#F5A623", color: "white", left: "35%", top: "55%", rotate: -4, parallax: 0.09 },
  { text: "ai-generated. real results.", bg: "#E8350A", color: "white", left: "52%", top: "72%", rotate: 2, parallax: 0.11 },
  { text: "cinematic quality", bg: "#0D0D0D", color: "white", left: "78%", top: "48%", rotate: -6, parallax: 0.08 },
];

const AgencySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // GSAP mouse parallax refs
  const blobRef = useRef<SVGSVGElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stickerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Store quickTo functions
  const quickTos = useRef<{ xTo: (v: number) => void; yTo: (v: number) => void }[]>([]);

  useEffect(() => {
    if (!collageRef.current) return;

    // Gather all parallax-able elements with their multipliers
    const elements: { el: Element; mult: number }[] = [];

    // Blob (0.02)
    if (blobRef.current) elements.push({ el: blobRef.current, mult: 0.02 });

    // Cards
    cardRefs.current.forEach((el, i) => {
      if (el) elements.push({ el, mult: photos[i].parallax });
    });

    // Pills
    pillRefs.current.forEach((el, i) => {
      if (el) elements.push({ el, mult: pills[i].parallax });
    });

    // Stickers (0.12)
    stickerRefs.current.forEach((el) => {
      if (el) elements.push({ el, mult: 0.12 });
    });

    // Create quickTo pairs
    quickTos.current = elements.map(({ el }) => ({
      xTo: gsap.quickTo(el, "x", { duration: 0.6, ease: "power2.out" }),
      yTo: gsap.quickTo(el, "y", { duration: 0.6, ease: "power2.out" }),
    }));

    const collage = collageRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = collage.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      elements.forEach(({ mult }, i) => {
        quickTos.current[i]?.xTo(deltaX * mult);
        quickTos.current[i]?.yTo(deltaY * mult);
      });
    };

    const handleMouseLeave = () => {
      elements.forEach(({ el }) => {
        gsap.to(el, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.5)" });
      });
    };

    collage.addEventListener("mousemove", handleMouseMove);
    collage.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      collage.removeEventListener("mousemove", handleMouseMove);
      collage.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const setCardRef = useCallback((i: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[i] = el;
  }, []);

  const setPillRef = useCallback((i: number) => (el: HTMLDivElement | null) => {
    pillRefs.current[i] = el;
  }, []);

  const setStickerRef = useCallback((i: number) => (el: HTMLDivElement | null) => {
    stickerRefs.current[i] = el;
  }, []);

  return (
    <section className="agency-section" id="agency" ref={sectionRef}>
      <div className="agency-container">
        <motion.h2
          className="agency-title"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          an AI-powered creative agency.
          <br />
          <em>built for D2C brands.</em>
          <motion.svg
            className="agency-underline-svg"
            viewBox="0 0 300 15"
            preserveAspectRatio="none"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <motion.path
              d="M5 8 Q75 2 150 10 Q225 16 295 5"
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

        {/* Scattered photo collage with mouse parallax */}
        <div className="agency-collage" ref={collageRef}>
          {/* Organic blob — LEFT side, behind everything */}
          <motion.svg
            ref={blobRef}
            className="collage-blob"
            viewBox="0 0 500 600"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1 }}
          >
            <motion.path
              d="M200,60 C260,10 340,30 370,100 C400,170 420,160 430,220 C440,280 450,350 400,400 C350,450 370,500 320,540 C270,580 220,560 180,520 C140,480 100,500 70,450 C40,400 20,340 50,280 C80,220 30,190 60,140 C90,90 140,110 170,70 C185,50 195,45 200,60Z"
              fill="#4A0E8F"
              opacity={0.6}
              animate={{
                d: [
                  "M200,60 C260,10 340,30 370,100 C400,170 420,160 430,220 C440,280 450,350 400,400 C350,450 370,500 320,540 C270,580 220,560 180,520 C140,480 100,500 70,450 C40,400 20,340 50,280 C80,220 30,190 60,140 C90,90 140,110 170,70 C185,50 195,45 200,60Z",
                  "M205,55 C265,5 345,25 375,95 C405,165 425,155 435,215 C445,275 455,345 405,395 C355,445 375,495 325,535 C275,575 225,555 185,515 C145,475 105,495 75,445 C45,395 25,335 55,275 C85,215 35,185 65,135 C95,85 145,105 175,65 C190,45 200,40 205,55Z",
                  "M200,60 C260,10 340,30 370,100 C400,170 420,160 430,220 C440,280 450,350 400,400 C350,450 370,500 320,540 C270,580 220,560 180,520 C140,480 100,500 70,450 C40,400 20,340 50,280 C80,220 30,190 60,140 C90,90 140,110 170,70 C185,50 195,45 200,60Z",
                ],
              }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.svg>

          {/* Hand-drawn scribble decoration */}
          <motion.svg
            className="collage-scribble"
            viewBox="0 0 60 30"
            width={50}
            height={25}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.6 } : {}}
            transition={{ delay: 1.2 }}
          >
            <path d="M5 15 Q15 5, 25 15 Q35 25, 45 15 Q55 5, 55 15" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 20 Q18 10, 28 20 Q38 28, 48 18" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
          </motion.svg>

          {/* Sticker — top-left, clapperboard */}
          <div
            ref={setStickerRef(0)}
            className="collage-sticker collage-sticker-1"
          >
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={isInView ? { scale: 1, rotate: -10 } : {}}
              transition={{ duration: 0.5, delay: 0.5, ease: "backOut" }}
            >
              <ClapperboardSticker size={85} />
            </motion.div>
          </div>

          {/* Sticker — top-right, sparkle */}
          <div
            ref={setStickerRef(1)}
            className="collage-sticker collage-sticker-2"
          >
            <motion.div
              initial={{ scale: 0, rotate: 20 }}
              animate={isInView ? { scale: 1, rotate: 12 } : {}}
              transition={{ duration: 0.5, delay: 0.7, ease: "backOut" }}
            >
              <SparkleStarSticker size={85} />
            </motion.div>
          </div>

          {/* Scattered photo cards — absolutely positioned */}
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              ref={setCardRef(i)}
              className="collage-photo"
              style={{
                position: "absolute",
                left: photo.left,
                top: photo.top,
                width: photo.w,
                height: photo.h,
                background: photo.bg,
                zIndex: photo.z,
                borderRadius: 12,
                boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
              }}
              initial={{ opacity: 0, y: 80, rotate: photo.rotate + 20 }}
              animate={isInView ? { opacity: 1, y: 0, rotate: photo.rotate } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.06, rotate: 0, zIndex: 10, transition: { duration: 0.3 } }}
            >
              <img
                src={photo.img}
                alt={photo.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 12,
                  display: "block",
                }}
              />
            </motion.div>
          ))}

          {/* Floating pill labels — absolutely positioned */}
          {pills.map((pill, i) => (
            <motion.div
              key={i}
              ref={setPillRef(i)}
              className="collage-pill"
              style={{
                left: pill.left,
                top: pill.top,
                background: pill.bg,
                color: pill.color,
                transform: `rotate(${pill.rotate}deg)`,
              }}
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.9 + i * 0.15 }}
            >
              {pill.text}
            </motion.div>
          ))}
        </div>

        <motion.p
          className="agency-description"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          We combine AI production speed with cinematic visual quality and
          conversion-focused strategy. All three. Every project.
        </motion.p>
      </div>
    </section>
  );
};

export default AgencySection;
