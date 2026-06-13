"use client";

import React, { useRef, useEffect } from "react";
import gsap, { ScrollTrigger } from "../../lib/gsap";

// ── Die-cut Sticker: Korean Finger Heart ─────────────────────────────────────
const KoreanHeartSticker: React.FC<{ size?: number }> = ({ size = 110 }) => (
  <svg viewBox="0 0 120 130" width={size} height={size * (130 / 120)} style={{ filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.2))" }}>
    {/* White die-cut border */}
    <path d="M60 8 C95 4, 114 30, 110 65 C106 95, 85 122, 60 126 C35 122, 14 95, 10 65 C6 30, 25 4, 60 8Z" fill="white" stroke="#eee" strokeWidth="1" />
    {/* Index finger */}
    <path d="M48 95 L48 55 Q48 42 56 42 Q64 42 64 55 L64 68" fill="#FDBCB4" stroke="#8B0000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    {/* Thumb crossing over */}
    <path d="M64 68 L76 52 Q82 44 88 52 Q92 60 84 66 L72 80" fill="#FDBCB4" stroke="#8B0000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    {/* Heart shape at fingertips */}
    <path d="M48 55 Q48 38 56 34 Q64 38 64 55" fill="#FF4D6D" stroke="#8B0000" strokeWidth="2.5" strokeLinecap="round" />
    {/* Floating mini heart */}
    <path d="M62 22 Q58 16 54 22 Q50 28 58 34 Q66 28 62 22Z" fill="#FF4D6D" stroke="#8B0000" strokeWidth="2" />
    {/* Sparkle */}
    <circle cx="78" cy="24" r="2.5" fill="#FF4D6D" />
    <circle cx="40" cy="30" r="1.5" fill="#FF4D6D" opacity="0.6" />
  </svg>
);

// ── Die-cut Sticker: Thumbs Up ───────────────────────────────────────────────
const ThumbsUpDieCut: React.FC<{ size?: number }> = ({ size = 110 }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} style={{ filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.2))" }}>
    {/* White die-cut border */}
    <circle cx="60" cy="60" r="56" fill="white" stroke="#eee" strokeWidth="1" />
    {/* Thumb hand */}
    <g stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M48 88 L48 62 L42 62 Q34 50 42 36 Q48 28 54 36 L54 48 L76 48 Q82 48 82 56 L78 76 Q76 88 68 88 Z" fill="#FDBCB4" />
      <line x1="54" y1="48" x2="54" y2="62" />
      <line x1="62" y1="48" x2="62" y2="56" opacity="0.4" />
      <line x1="70" y1="48" x2="70" y2="56" opacity="0.4" />
    </g>
    {/* Sparkle */}
    <path d="M82 26 L84 32 L90 34 L84 36 L82 42 L80 36 L74 34 L80 32 Z" fill="#FFD700" stroke="#1a1a1a" strokeWidth="1.5" />
    <circle cx="72" cy="24" r="2" fill="#1a1a1a" opacity="0.3" />
    <circle cx="92" cy="30" r="1.5" fill="#1a1a1a" opacity="0.2" />
  </svg>
);

// ── Die-cut Sticker: Phone with Notification ─────────────────────────────────
const PhoneNotifSticker: React.FC<{ size?: number }> = ({ size = 100 }) => (
  <svg viewBox="0 0 110 130" width={size} height={size * (130 / 110)} style={{ filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.2))" }}>
    {/* White die-cut border */}
    <rect x="6" y="6" width="98" height="118" rx="20" fill="white" stroke="#eee" strokeWidth="1" />
    {/* Phone body */}
    <rect x="28" y="22" width="54" height="90" rx="10" fill="#2D2D2D" stroke="#1a1a1a" strokeWidth="2.5" />
    {/* Screen */}
    <rect x="34" y="34" width="42" height="64" rx="4" fill="#4A6CF7" stroke="#1a1a1a" strokeWidth="1.5" />
    {/* Screen content — play icon */}
    <polygon points="50,54 50,74 66,64" fill="white" stroke="#1a1a1a" strokeWidth="1.5" strokeLinejoin="round" />
    {/* Speaker notch */}
    <rect x="45" y="26" width="20" height="4" rx="2" fill="#444" />
    {/* Home indicator */}
    <rect x="45" y="106" width="20" height="3" rx="1.5" fill="#555" />
    {/* Notification ping lines */}
    <line x1="76" y1="18" x2="86" y2="10" stroke="#FFD700" strokeWidth="3" strokeLinecap="round" />
    <line x1="82" y1="24" x2="94" y2="20" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="80" y1="34" x2="92" y2="34" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
    {/* Notification dot */}
    <circle cx="78" cy="30" r="6" fill="#FF4D6D" stroke="#1a1a1a" strokeWidth="1.5" />
    <text x="78" y="33" textAnchor="middle" fill="white" fontSize="8" fontWeight="900">1</text>
  </svg>
);

// ── Die-cut Sticker: 4-Point Sparkle Star ────────────────────────────────────
const SparkleStarSticker: React.FC<{ size?: number }> = ({ size = 90 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} style={{ filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.2))" }}>
    {/* White die-cut border (slightly larger star) */}
    <path d="M50 2 L60 36 L98 50 L60 64 L50 98 L40 64 L2 50 L40 36 Z" fill="white" stroke="#eee" strokeWidth="1" />
    {/* Inner colored star */}
    <path d="M50 10 L58 38 L90 50 L58 62 L50 90 L42 62 L10 50 L42 38 Z" fill="#FFD700" stroke="#1a1a1a" strokeWidth="2" />
    {/* Inner highlight */}
    <path d="M50 22 L54 42 L74 50 L54 58 L50 78 L46 58 L26 50 L46 42 Z" fill="#FFEA70" opacity="0.5" />
    {/* Sparkle dots */}
    <circle cx="30" cy="24" r="3" fill="#FFD700" stroke="#1a1a1a" strokeWidth="1" />
    <circle cx="76" cy="28" r="2" fill="#FFD700" stroke="#1a1a1a" strokeWidth="1" />
    <circle cx="72" cy="78" r="2.5" fill="#FFD700" stroke="#1a1a1a" strokeWidth="1" />
    <circle cx="26" cy="74" r="2" fill="#FFD700" stroke="#1a1a1a" strokeWidth="1" />
  </svg>
);

// ── Word data ─────────────────────────────────────────────────────────────────
const wordsData = [
  { text: "We", rotate: -4, big: false, serif: false },
  { text: "Make", rotate: 5, big: false, serif: false },
  { text: "Ads", rotate: -6, big: true, serif: false },
  { text: "That", rotate: 3, big: false, serif: false },
  { text: "Actually", rotate: -5, big: false, serif: false },
  { text: "Convert.", rotate: 2, big: false, serif: true },
];

// ─────────────────────────────────────────────────────────────────────────────
export default function ScatteredText() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const sticker1Ref = useRef<HTMLDivElement>(null);   // Korean Heart  (top-left)
  const sticker2Ref = useRef<HTMLDivElement>(null);   // Thumbs Up     (top-right)
  const sticker3Ref = useRef<HTMLDivElement>(null);   // Phone Notif   (bottom-left)
  const sticker4Ref = useRef<HTMLDivElement>(null);   // Sparkle Star  (bottom-right)

  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    ScrollTrigger.normalizeScroll(false);

    const raf = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        wordsRef.current.forEach((el, i) => {
          if (!el) return;
          gsap.set(el, {
            y: 80,
            opacity: 0,
            scale: 0.85,
            rotation: wordsData[i].rotate + 10,
          });
        });

        [sticker1Ref, sticker2Ref, sticker3Ref, sticker4Ref].forEach((ref) => {
          if (ref.current) gsap.set(ref.current, { scale: 0, opacity: 0 });
        });

        if (descRef.current) {
          gsap.set(descRef.current, { y: 40, opacity: 0 });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=400%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        const wordTimings = [0, 1, 2, 3, 4, 5];

        wordsRef.current.forEach((el, i) => {
          if (!el) return;
          tl.to(
            el,
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotation: wordsData[i].rotate,
              duration: 1.2,
              ease: "power3.out",
            },
            wordTimings[i]
          );
        });

        // ── 4. Stickers ─────────────────────────────────────────────────────
        // Korean Heart — appears with "We"
        tl.to(sticker1Ref.current, {
          scale: 1,
          opacity: 1,
          rotation: -12,
          duration: 0.8,
          ease: "back.out(1.7)",
        }, 0.2);

        // Thumbs Up — appears with "Ads"
        tl.to(sticker2Ref.current, {
          scale: 1,
          opacity: 1,
          rotation: 15,
          duration: 0.8,
          ease: "back.out(1.7)",
        }, 2.2);

        // Phone Notif — appears with "That"
        tl.to(sticker3Ref.current, {
          scale: 1,
          opacity: 1,
          rotation: -8,
          duration: 0.8,
          ease: "back.out(1.7)",
        }, 3.2);

        // Sparkle Star — appears with "Actually"
        tl.to(sticker4Ref.current, {
          scale: 1,
          opacity: 1,
          rotation: 20,
          duration: 0.8,
          ease: "back.out(1.7)",
        }, 4.2);

        // ── 6. Description paragraph ────────────────────────────────────────
        tl.to(descRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        }, 6.2);

        // ── 7. Hold briefly at end before unpin ─────────────────────────────
        tl.to({}, { duration: 1.5 }, 7.5);

        ScrollTrigger.refresh();
      }, sectionRef);

      return () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
        ctx.revert();
      };
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <section
      id="scattered"
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#e6e4dc",
      }}
    >
      {/* ── Word cluster ── */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px 28px",
          padding: "0 60px",
          width: "100%",
          maxWidth: "1100px",
          position: "relative",
          zIndex: 10,
        }}
      >
        {wordsData.map((word, i) => (
          <span
            key={i}
            ref={(el) => { wordsRef.current[i] = el; }}
            style={{
              display: "inline-block",
              fontWeight: 900,
              lineHeight: 1.05,
              color: "#111",
              fontFamily: word.serif
                ? "'Playfair Display', Georgia, serif"
                : "'Inter', 'Helvetica Neue', sans-serif",
              fontStyle: word.serif ? "italic" : "normal",
              fontSize: word.big
                ? "clamp(3rem, 7.5vw, 7rem)"
                : "clamp(2.5rem, 6vw, 5.5rem)",
            }}
          >
            {word.text}
          </span>
        ))}
      </div>

      {/* ── Description ── */}
      <p
        ref={descRef}
        style={{
          textAlign: "center",
          width: "100%",
          maxWidth: "560px",
          margin: "36px auto 0",
          fontSize: "1rem",
          lineHeight: 1.75,
          color: "#555",
          position: "relative",
          zIndex: 10,
        }}
      >
        D2C brands need content that stops the scroll, builds trust{" "}
        <em
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: "italic",
            color: "#111",
            fontWeight: 700,
          }}
        >
          and
        </em>{" "}
        drives purchases. We build all three — at AI speed.
      </p>

      {/* ── Sticker 1: Korean Heart (top-left) ── */}
      <div
        ref={sticker1Ref}
        style={{
          position: "absolute",
          zIndex: 20,
          pointerEvents: "none",
          top: "12%",
          left: "4%",
        }}
      >
        <KoreanHeartSticker size={110} />
      </div>

      {/* ── Sticker 2: Thumbs Up (top-right) ── */}
      <div
        ref={sticker2Ref}
        style={{
          position: "absolute",
          zIndex: 20,
          pointerEvents: "none",
          top: "10%",
          right: "4%",
        }}
      >
        <ThumbsUpDieCut size={110} />
      </div>

      {/* ── Sticker 3: Phone Notif (bottom-left) ── */}
      <div
        ref={sticker3Ref}
        style={{
          position: "absolute",
          zIndex: 20,
          pointerEvents: "none",
          bottom: "18%",
          left: "4%",
        }}
      >
        <PhoneNotifSticker size={100} />
      </div>

      {/* ── Sticker 4: Sparkle Star (bottom-right) ── */}
      <div
        ref={sticker4Ref}
        style={{
          position: "absolute",
          zIndex: 20,
          pointerEvents: "none",
          bottom: "15%",
          right: "5%",
        }}
      >
        <SparkleStarSticker size={90} />
      </div>


    </section>
  );
}