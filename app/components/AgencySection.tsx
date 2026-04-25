"use client";

import React, { useRef, useEffect, useCallback, useState } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";

// Sticker SVG components — hand-drawn, white-backed
const SHADOW = "drop-shadow(0 6px 16px rgba(0,0,0,0.25))";

const ClapperboardSticker: React.FC<{ size?: number }> = ({ size = 110 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg" style={{ filter: SHADOW }}>
    {/* White border backing */}
    <rect x="3" y="13" width="94" height="74" rx="8" fill="white" stroke="white" strokeWidth="8" />
    {/* Main body */}
    <rect x="8" y="28" width="84" height="60" rx="6" fill="#BFDFFF" stroke="#0D0D0D" strokeWidth="3" />
    {/* Top clapper */}
    <rect x="8" y="14" width="84" height="20" rx="4" fill="#1A1A1A" stroke="#0D0D0D" strokeWidth="3" />
    {/* Clapper stripes white */}
    <rect x="20" y="14" width="10" height="20" fill="white" />
    <rect x="42" y="14" width="10" height="20" fill="white" />
    <rect x="64" y="14" width="10" height="20" fill="white" />
    {/* Hinge line */}
    <line x1="8" y1="34" x2="92" y2="34" stroke="#0D0D0D" strokeWidth="2" />
    {/* Body details - dots */}
    <circle cx="25" cy="48" r="3" fill="#0D0D0D" />
    <circle cx="25" cy="60" r="3" fill="#0D0D0D" />
    <circle cx="25" cy="72" r="3" fill="#0D0D0D" />
    {/* Text line placeholders */}
    <rect x="36" y="44" width="44" height="4" rx="2" fill="#0D0D0D" opacity="0.3" />
    <rect x="36" y="56" width="36" height="4" rx="2" fill="#0D0D0D" opacity="0.3" />
    <rect x="36" y="68" width="40" height="4" rx="2" fill="#0D0D0D" opacity="0.3" />
  </svg>
);

const SparkleStarSticker: React.FC<{ size?: number }> = ({ size = 110 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg" style={{ filter: SHADOW }}>
    {/* White border backing star shape */}
    <path
      d="M50 2 L56 44 L98 50 L56 56 L50 98 L44 56 L2 50 L44 44 Z"
      fill="white" stroke="white" strokeWidth="8" strokeLinejoin="round"
    />
    {/* Main sparkle star */}
    <path
      d="M50 8 L55 45 L92 50 L55 55 L50 92 L45 55 L8 50 L45 45 Z"
      fill="#CCFFCC" stroke="#0D0D0D" strokeWidth="3" strokeLinejoin="round"
    />
    {/* Small dot sparkles around */}
    <circle cx="82" cy="20" r="4" fill="#0D0D0D" />
    <circle cx="20" cy="80" r="3" fill="#0D0D0D" />
    <circle cx="78" cy="78" r="5" fill="#F5A623" stroke="#0D0D0D" strokeWidth="2" />
    {/* Small secondary star */}
    <path
      d="M18 22 L20 16 L22 22 L28 20 L22 24 L20 30 L18 24 L12 20 Z"
      fill="white" stroke="#0D0D0D" strokeWidth="1.5"
    />
  </svg>
);

// Card data — scattered positions (desktop: tightly clustered with overlap)
const photos = [
  { left: "15%", top: "15%", w: 280, h: 340, rotate: -8, z: 2, bg: "linear-gradient(135deg, #0D3B2E, #1A6B4A)", parallax: 0.04, img: "/scr/mockup_mons.png", alt: "Mockup showcase" },
  { left: "30%", top: "5%", w: 300, h: 370, rotate: -3, z: 4, bg: "linear-gradient(135deg, #8B3A00, #D4621A)", parallax: 0.06, img: "/scr/ugc ads.png", alt: "UGC ad showcase" },
  { left: "46%", top: "8%", w: 290, h: 360, rotate: 5, z: 3, bg: "linear-gradient(135deg, #0A1628, #1A3A6B)", parallax: 0.05, img: "/scr/c post.png", alt: "Creative post showcase" },
  { left: "60%", top: "12%", w: 270, h: 330, rotate: 10, z: 2, bg: "linear-gradient(135deg, #2D0A4E, #6B2D9E)", parallax: 0.03, img: "/scr/Ai ads.png", alt: "AI ad showcase" },
];

// Floating pill labels
const pills = [
  { text: "hooks that convert", bg: "#F5A623", color: "white", left: "35%", top: "55%", rotate: -4, parallax: 0.09 },
  { text: "ai-generated. real results.", bg: "#E8350A", color: "white", left: "52%", top: "58%", rotate: 2, parallax: 0.11 },
  { text: "cinematic quality", bg: "#0D0D0D", color: "white", left: "78%", top: "48%", rotate: -6, parallax: 0.08 },
];

const AgencySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // GSAP mouse parallax refs
  // blobRef removed — blob replaced with ambient glows
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stickerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Store quickTo functions
  const quickTos = useRef<{ xTo: (v: number) => void; yTo: (v: number) => void }[]>([]);

  useEffect(() => {
    if (!collageRef.current) return;

    // Skip mouse parallax on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Gather all parallax-able elements with their multipliers
    const elements: { el: Element; mult: number }[] = [];

    // (blob removed — ambient glows are static, no parallax needed)

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
          {/* Ambient glow — left side, warm cinematic */}
          <div
            style={{
              position: "absolute",
              left: "-5%",
              top: "10%",
              width: 500,
              height: 500,
              background: "radial-gradient(ellipse at center, rgba(245,166,35,0.12) 0%, rgba(74,14,143,0.08) 50%, transparent 75%)",
              filter: "blur(60px)",
              borderRadius: "50%",
              zIndex: 0,
              pointerEvents: "none" as const,
            }}
          />

          {/* Ambient glow — right side, cool accent */}
          <div
            style={{
              position: "absolute",
              right: "0%",
              top: "20%",
              width: 300,
              height: 300,
              background: "radial-gradient(ellipse at center, rgba(20,184,166,0.10) 0%, transparent 70%)",
              filter: "blur(50px)",
              borderRadius: "50%",
              zIndex: 0,
              pointerEvents: "none" as const,
            }}
          />

          {/* Sticker — top-left, clapperboard */}
          <div
            ref={setStickerRef(0)}
            className="collage-sticker"
            style={{ position: "absolute", left: "4%", top: 80, zIndex: 10 }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={isInView ? { scale: 1, rotate: -14 } : {}}
              transition={{ duration: 0.5, delay: 0.5, ease: "backOut" }}
            >
              <ClapperboardSticker size={110} />
            </motion.div>
          </div>

          {/* Sticker — top-right, sparkle */}
          <div
            ref={setStickerRef(1)}
            className="collage-sticker"
            style={{ position: "absolute", right: "4%", top: 60, zIndex: 10 }}
          >
            <motion.div
              initial={{ scale: 0, rotate: 20 }}
              animate={isInView ? { scale: 1, rotate: 12 } : {}}
              transition={{ duration: 0.5, delay: 0.7, ease: "backOut" }}
            >
              <SparkleStarSticker size={110} />
            </motion.div>
          </div>

          {/* Scattered photo cards — absolutely positioned */}
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              ref={setCardRef(i)}
              className="collage-photo"
              style={
                isMobile
                  ? {
                      background: photo.bg,
                      borderRadius: 14,
                    }
                  : {
                      position: "absolute",
                      left: photo.left,
                      top: photo.top,
                      width: photo.w,
                      height: photo.h,
                      background: photo.bg,
                      zIndex: photo.z,
                      borderRadius: 12,
                      boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                    }
              }
              initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 80, rotate: photo.rotate + 20 }}
              animate={isInView ? (isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, rotate: photo.rotate }) : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: "easeOut" }}
              whileHover={isMobile ? undefined : { scale: 1.06, rotate: 0, zIndex: 10, transition: { duration: 0.3 } }}
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
              style={
                isMobile
                  ? {
                      background: pill.bg,
                      color: pill.color,
                    }
                  : {
                      left: pill.left,
                      top: pill.top,
                      background: pill.bg,
                      color: pill.color,
                      transform: `rotate(${pill.rotate}deg)`,
                    }
              }
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
