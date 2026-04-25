"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import gsap, { Draggable } from "@/lib/gsap";
import Sticker from "./Sticker";

/* helper: detect mobile breakpoint */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

/* ═══════════════════════════════════════════
   CARD DATA
   ═══════════════════════════════════════════ */

interface CardData {
  label: string;
  labelColor: string;
  title: string;
  gradientFrom: string;
  gradientTo: string;
}

const cards: CardData[] = [
  {
    label: "social posts",
    labelColor: "#F5A623",
    title: "scroll-stopping hooks",
    gradientFrom: "#0D3D2B",
    gradientTo: "#1A6B4A",
  },
  {
    label: "ai ads",
    labelColor: "#8B5CF6",
    title: "cinematic AI ads",
    gradientFrom: "#1A0533",
    gradientTo: "#4A0E8F",
  },
  {
    label: "mockups",
    labelColor: "#14B8A6",
    title: "zero photoshoot needed",
    gradientFrom: "#0A2E2B",
    gradientTo: "#0D6B5E",
  },
  {
    label: "ugc ads",
    labelColor: "#F97316",
    title: "creator-style. converts.",
    gradientFrom: "#3D1A00",
    gradientTo: "#8B3A00",
  },
  {
    label: "social posts",
    labelColor: "#F5A623",
    title: "built for the feed",
    gradientFrom: "#0A0A2E",
    gradientTo: "#1A1A6B",
  },
  {
    label: "ai ads",
    labelColor: "#8B5CF6",
    title: "6s ads that stop thumbs",
    gradientFrom: "#1A0533",
    gradientTo: "#4A0E8F",
  },
  {
    label: "mockups",
    labelColor: "#14B8A6",
    title: "product shots. no studio.",
    gradientFrom: "#0D3D2B",
    gradientTo: "#1A6B4A",
  },
  {
    label: "ugc ads",
    labelColor: "#F97316",
    title: "faceless. still converts.",
    gradientFrom: "#3D1A00",
    gradientTo: "#8B3A00",
  },
  {
    label: "social posts",
    labelColor: "#F5A623",
    title: "hooks that hold attention",
    gradientFrom: "#0A2E2B",
    gradientTo: "#0D6B5E",
  },
  {
    label: "ai ads",
    labelColor: "#8B5CF6",
    title: "AI. cinematic. fast.",
    gradientFrom: "#0A0A2E",
    gradientTo: "#1A1A6B",
  },
];

const TOTAL = cards.length;

/* ═══════════════════════════════════════════
   POSITION CONFIG — 5 visible slots
   All positions relative to center of deck
   ═══════════════════════════════════════════ */

interface SlotConfig {
  x: number;
  y: number;
  scale: number;
  rotateY: number;
  zIndex: number;
  opacity: number;
}

const SLOTS: Record<number, SlotConfig> = {
  [-2]: { x: -440, y: 60, scale: 0.7, rotateY: 25, zIndex: 6, opacity: 0.6 },
  [-1]: { x: -260, y: 30, scale: 0.85, rotateY: 15, zIndex: 8, opacity: 0.9 },
  0: { x: 0, y: 0, scale: 1.0, rotateY: 0, zIndex: 10, opacity: 1 },
  1: { x: 260, y: 30, scale: 0.85, rotateY: -15, zIndex: 8, opacity: 0.9 },
  2: { x: 440, y: 60, scale: 0.7, rotateY: -25, zIndex: 6, opacity: 0.6 },
};

/* Mobile slots — only 3 visible (±1), ±2 hidden */
const MOBILE_SLOTS: Record<number, SlotConfig> = {
  [-1]: { x: -140, y: 15, scale: 0.82, rotateY: 12, zIndex: 8, opacity: 0.85 },
  0: { x: 0, y: 0, scale: 1.0, rotateY: 0, zIndex: 10, opacity: 1 },
  1: { x: 140, y: 15, scale: 0.82, rotateY: -12, zIndex: 8, opacity: 0.85 },
};

/* Offscreen position (invisible, scale 0) */
const HIDDEN: SlotConfig = { x: 0, y: 100, scale: 0, rotateY: 0, zIndex: 1, opacity: 0 };

/* Wrap index into [0, TOTAL) */
function wrap(i: number): number {
  return ((i % TOTAL) + TOTAL) % TOTAL;
}

/* Get the shortest-path offset from frontIndex to cardIndex around the ring */
function getSlotOffset(cardIndex: number, frontIndex: number): number {
  let diff = cardIndex - frontIndex;
  if (diff > TOTAL / 2) diff -= TOTAL;
  if (diff < -TOTAL / 2) diff += TOTAL;
  return diff;
}

// Crown sticker — hand-drawn, white-backed
const STICKER_SHADOW = "drop-shadow(0 4px 12px rgba(0,0,0,0.2))";

const CrownSticker: React.FC<{ size?: number }> = ({ size = 90 }) => (
  <svg viewBox="0 0 100 85" width={size} height={size * 0.85} style={{ filter: STICKER_SHADOW }}>
    {/* White sticker backing */}
    <rect x="4" y="2" width="92" height="80" rx="14" fill="white" />
    {/* Crown shape */}
    <path
      d="M14,64 L22,24 L36,44 L50,10 L64,44 L78,24 L86,64 Z"
      fill="#FFF5B0"
      stroke="#222"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Crown base */}
    <line x1="14" y1="68" x2="86" y2="68" stroke="#222" strokeWidth="3.5" strokeLinecap="round" />
    {/* Dot details on points */}
    <circle cx="22" cy="20" r="3" fill="#F5A623" />
    <circle cx="50" cy="6" r="3" fill="#F5A623" />
    <circle cx="78" cy="20" r="3" fill="#F5A623" />
  </svg>
);

// Lime/yellow-green spiky shape sticker — white-backed
const LimeShapeSticker: React.FC<{ size?: number }> = ({ size = 95 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} style={{ filter: STICKER_SHADOW }}>
    {/* White backing circle */}
    <circle cx="50" cy="50" r="46" fill="white" />
    <path
      d="M50,6 L58,30 L84,18 L68,42 L94,50 L68,58 L84,82 L58,70 L50,94 L42,70 L16,82 L32,58 L6,50 L32,42 L16,18 L42,30 Z"
      fill="#D4F57A"
      stroke="#222"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
  </svg>
);

// Squiggle decoration — thicker strokes for visibility
const SquiggleDecoration: React.FC = () => (
  <motion.svg
    viewBox="0 0 60 50"
    width={55}
    height={46}
    className="squiggle-decoration"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 0.8 }}
    viewport={{ once: true }}
  >
    <path d="M8,30 Q16,8 28,22 Q40,36 48,12" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <path d="M12,38 Q20,14 32,28 Q44,42 52,18" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
  </motion.svg>
);

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */

const ProjectsCarousel: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const cardElsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
  const isMobile = useIsMobile();

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIdxRef = useRef(0);
  const isAnimating = useRef(false);
  const draggableInstance = useRef<Draggable[] | null>(null);
  const dragStartX = useRef(0);
  const isDragging = useRef(false);

  /* ── Position ALL cards to their correct slots (no exit animation) ── */
  const positionAllCards = useCallback(
    (frontIdx: number, animate: boolean) => {
      const slotsMap = isMobile ? MOBILE_SLOTS : SLOTS;
      for (let i = 0; i < TOTAL; i++) {
        const el = cardElsRef.current[i];
        if (!el) continue;

        const offset = getSlotOffset(i, frontIdx);
        const slot = slotsMap[offset] || HIDDEN;

        if (animate) {
          gsap.to(el, {
            x: slot.x,
            y: slot.y,
            scale: slot.scale,
            rotateY: slot.rotateY,
            zIndex: slot.zIndex,
            opacity: slot.opacity,
            duration: 0.5,
            ease: "power3.out",
          });
        } else {
          gsap.set(el, {
            x: slot.x,
            y: slot.y,
            scale: slot.scale,
            rotateY: slot.rotateY,
            zIndex: slot.zIndex,
            opacity: slot.opacity,
          });
        }
      }
    },
    [isMobile]
  );

  /* ── Advance by direction ── */
  const advance = useCallback(
    (direction: 1 | -1) => {
      if (isAnimating.current) return;
      isAnimating.current = true;

      const oldFront = activeIdxRef.current;
      const newFront = wrap(oldFront + direction);
      activeIdxRef.current = newFront;
      setActiveIndex(newFront);

      const exitCardEl = cardElsRef.current[oldFront];
      const slotsMap = isMobile ? MOBILE_SLOTS : SLOTS;

      // Step 1: Animate the old front card off-screen
      if (exitCardEl) {
        gsap.to(exitCardEl, {
          x: direction === 1 ? -700 : 700,
          opacity: 0,
          scale: 0.5,
          duration: 0.35,
          ease: "power2.in",
          onComplete: () => {
            // Step 2: Instantly teleport exited card to the opposite far slot
            // If we advanced forward (direction=1), the old card goes to the back-right (+2 side)
            // If we advanced backward (direction=-1), the old card goes to the back-left (-2 side)
            const newOffset = getSlotOffset(oldFront, newFront);
            const teleportSlot = slotsMap[newOffset] || HIDDEN;
            gsap.set(exitCardEl, {
              x: teleportSlot.x,
              y: teleportSlot.y,
              scale: teleportSlot.scale,
              rotateY: teleportSlot.rotateY,
              zIndex: teleportSlot.zIndex,
              opacity: teleportSlot.opacity,
            });
          },
        });
      }

      // Step 3: Animate all OTHER cards to their new positions
      for (let i = 0; i < TOTAL; i++) {
        if (i === oldFront) continue; // Skip the exiting card (handled above)

        const el = cardElsRef.current[i];
        if (!el) continue;

        const offset = getSlotOffset(i, newFront);
        const slot = slotsMap[offset] || HIDDEN;

        if (offset >= -2 && offset <= 2) {
          // Visible slot — animate to position
          gsap.to(el, {
            x: slot.x,
            y: slot.y,
            scale: slot.scale,
            rotateY: slot.rotateY,
            zIndex: slot.zIndex,
            opacity: slot.opacity,
            duration: 0.5,
            ease: "power3.out",
          });
        } else {
          // Hidden slot — instantly position (no animation)
          gsap.set(el, {
            x: HIDDEN.x,
            y: HIDDEN.y,
            scale: HIDDEN.scale,
            rotateY: HIDDEN.rotateY,
            zIndex: HIDDEN.zIndex,
            opacity: HIDDEN.opacity,
          });
        }
      }

      // Step 4: Mark animation complete after the longest tween
      gsap.delayedCall(0.55, () => {
        isAnimating.current = false;
      });
    },
    []
  );

  /* ── Click handler for side cards ── */
  const handleCardClick = useCallback(
    (cardIndex: number) => {
      if (isDragging.current) return;
      if (isAnimating.current) return;
      const offset = getSlotOffset(cardIndex, activeIdxRef.current);
      if (offset === 0) return;
      if (offset === -1 || offset === -2) advance(-1);
      if (offset === 1 || offset === 2) advance(1);
    },
    [advance]
  );

  /* ── Initial layout (no animation) ── */
  useEffect(() => {
    if (!isInView) return;
    const raf = requestAnimationFrame(() => {
      positionAllCards(0, false);
    });
    return () => cancelAnimationFrame(raf);
  }, [isInView, positionAllCards]);

  /* ── Setup GSAP Draggable on the wrapper ── */
  useEffect(() => {
    if (!isInView) return;
    if (!wrapperRef.current) return;

    const timer = setTimeout(() => {
      if (draggableInstance.current) {
        draggableInstance.current.forEach((d) => d.kill());
      }

      const wrapper = wrapperRef.current!;

      draggableInstance.current = Draggable.create(wrapper, {
        type: "x",
        inertia: false,
        cursor: "grab",
        activeCursor: "grabbing",
        zIndexBoost: false,
        edgeResistance: 1,
        dragResistance: 0.4,
        onDragStart: function () {
          dragStartX.current = this.x;
          isDragging.current = false;
        },
        onDrag: function () {
          if (Math.abs(this.x - dragStartX.current) > 10) {
            isDragging.current = true;
          }
        },
        onDragEnd: function () {
          const dx = this.endX - dragStartX.current;

          if (Math.abs(dx) > (isMobile ? 50 : 80)) {
            if (dx < 0) {
              advance(1); // drag left → next card
            } else {
              advance(-1); // drag right → prev card
            }
          }

          // Reset wrapper position
          gsap.set(wrapper, { x: 0, y: 0 });

          // Clear dragging flag after a tick
          setTimeout(() => {
            isDragging.current = false;
          }, 50);
        },
      });
    }, 300);

    return () => {
      clearTimeout(timer);
      if (draggableInstance.current) {
        draggableInstance.current.forEach((d) => d.kill());
      }
    };
  }, [isInView, advance]);

  const activeCard = cards[activeIndex];

  return (
    <section className="projects-section-dark" id="work" ref={sectionRef}>
      {/* Drag/Click/Home labels */}
      <motion.div
        className="projects-drag-labels"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        <span>drag</span>
        <span>·</span>
        <span>click</span>
        <span>·</span>
        <span>to home</span>
      </motion.div>

      {/* Squiggle decoration — top left */}
      <div style={{ position: "absolute", left: "8%", top: "15%" }}>
        <SquiggleDecoration />
      </div>

      {/* Crown sticker — top left area */}
      <Sticker x="22%" y={55} delay={0.3} rotate={-10}>
        <CrownSticker size={50} />
      </Sticker>

      {/* Lime spiky shape — right side */}
      <Sticker x="78%" y="55%" delay={0.5} rotate={5}>
        <LimeShapeSticker size={75} />
      </Sticker>

      {/* 3D Deck Container */}
      <div className="deck-perspective-wrapper" ref={wrapperRef}>
        <div className="deck-container" ref={deckRef}>
          {cards.map((card, i) => (
            <div
              key={i}
              ref={(el) => {
                cardElsRef.current[i] = el;
              }}
              className="deck-card"
              onClick={() => handleCardClick(i)}
              style={{ willChange: "transform" }}
            >
              {/* Zone 1 — Gradient area */}
              <div
                className="deck-card-gradient"
                style={{
                  background: `linear-gradient(180deg, ${card.gradientFrom} 0%, ${card.gradientTo} 100%)`,
                }}
              />

              {/* Zone 2 — Pill badge top-right */}
              <span className="deck-card-badge" style={{ color: card.labelColor }}>
                + {card.label}
              </span>

              {/* Zone 3 — White strip */}
              <div className="deck-card-strip">
                <div className="deck-card-strip-top">
                  <span
                    className="deck-card-strip-pill"
                    style={{ backgroundColor: card.labelColor }}
                  >
                    {card.label}
                  </span>
                  <span className="deck-card-strip-title">{card.title}</span>
                </div>
                <span className="deck-card-strip-status">coming soon</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active project info below carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          className="projects-active-info"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <span
            className="active-brand-tag"
            style={{ background: activeCard.labelColor }}
          >
            {activeCard.label}
          </span>
          <h3 className="active-project-title">{activeCard.title}</h3>
          <span className="active-project-status">coming soon</span>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default ProjectsCarousel;
