"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap, { ScrollTrigger } from "../../lib/gsap";
import Image from "next/image";

// ── Word data ─────────────────────────────────────────────────────────────────
const wordsData = [
  { text: "We", rotate: -4, big: false, serif: false },
  { text: "Make", rotate: 5, big: false, serif: false },
  { text: "Eye-Catchy", rotate: -2, big: true, serif: false },
  { text: "Creative", rotate: 4, big: false, serif: true },
  { text: "Visuals.", rotate: -3, big: true, serif: false },
];

// ─────────────────────────────────────────────────────────────────────────────
export default function ScatteredText() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const sticker1Ref = useRef<HTMLDivElement>(null);   // Thumbs Up     (top-right)
  const sticker2Ref = useRef<HTMLDivElement>(null);   // Camera        (bottom-left)
  const sticker3Ref = useRef<HTMLDivElement>(null);   // Korean Heart  (top-left)
  const sticker4Ref = useRef<HTMLDivElement>(null);   // Smiley        (bottom-right)

  const descRef = useRef<HTMLParagraphElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    ScrollTrigger.normalizeScroll(false);

    let ctx: gsap.Context | null = null;

    const raf = requestAnimationFrame(() => {
      const mobile = window.innerWidth <= 768;

      ctx = gsap.context(() => {
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
            end: mobile ? "+=200%" : "+=400%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        const wordTimings = [0, 1, 2, 3, 4];

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

        // Thumbs Up — appears with "Eye-Catchy"
        tl.to(sticker2Ref.current, {
          scale: 1,
          opacity: 1,
          rotation: 15,
          duration: 0.8,
          ease: "back.out(1.7)",
        }, 1.5);

        // Phone Notif/Camera — appears with "Creative"
        tl.to(sticker3Ref.current, {
          scale: 1,
          opacity: 1,
          rotation: -8,
          duration: 0.8,
          ease: "back.out(1.7)",
        }, 2.5);

        // Smiley — appears with "Visuals."
        tl.to(sticker4Ref.current, {
          scale: 1,
          opacity: 1,
          rotation: 12,
          duration: 0.8,
          ease: "back.out(1.7)",
        }, 3.5);

        // ── 6. Description paragraph ────────────────────────────────────────
        tl.to(descRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        }, 4.2);

        // ── 7. Hold briefly at end before unpin ─────────────────────────────
        tl.to({}, { duration: 1.5 }, 5.5);

        ScrollTrigger.refresh();
      }, sectionRef);
    });

    return () => {
      cancelAnimationFrame(raf);
      ScrollTrigger.getAll().forEach(t => t.kill());
      if (ctx) ctx.revert();
    };
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
          gap: isMobile ? "10px 14px" : "20px 28px",
          padding: isMobile ? "0 20px" : "0 60px",
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
        drives purchases. We build both static and video at AI speed.
      </p>

      {/* ── Sticker 1: Korean Heart (top-left) ── */}
      <div
        ref={sticker3Ref}
        style={{
          position: "absolute",
          zIndex: 20,
          pointerEvents: "none",
          top: isMobile ? "5%" : "12%",
          left: isMobile ? "2%" : "5%",
        }}
      >
        <Image
          src="/scr/stickers/korean-heart.png"
          alt="korean heart"
          width={isMobile ? 120 : 190}
          height={isMobile ? 120 : 190}
          unoptimized
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* ── Sticker 2: Thumbs Up (top-right) ── */}
      <div
        ref={sticker1Ref}
        style={{
          position: "absolute",
          zIndex: 20,
          pointerEvents: "none",
          top: isMobile ? "16%" : "22%",
          right: isMobile ? "2%" : "3%",
        }}
      >
        <Image
          src="/scr/stickers/thumbs-up.png"
          alt="thumbs up"
          width={isMobile ? 115 : 180}
          height={isMobile ? 115 : 180}
          unoptimized
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* ── Sticker 3: Camera (bottom-left) ── */}
      <div
        ref={sticker2Ref}
        style={{
          position: "absolute",
          zIndex: 20,
          pointerEvents: "none",
          bottom: isMobile ? "6%" : "18%",
          left: isMobile ? "2%" : "4%",
        }}
      >
        <Image
          src="/scr/stickers/camera.png"
          alt="camera"
          width={isMobile ? 130 : 200}
          height={isMobile ? 130 : 200}
          unoptimized
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* ── Sticker 4: Smiley (bottom-right) ── */}
      <div
        ref={sticker4Ref}
        style={{
          position: "absolute",
          zIndex: 20,
          pointerEvents: "none",
          bottom: isMobile ? "6%" : "28%",
          right: isMobile ? "2%" : "8%",
        }}
      >
        <Image
          src="/scr/stickers/smiley.png"
          alt="smiley"
          width={isMobile ? 110 : 160}
          height={isMobile ? 110 : 160}
          unoptimized
          style={{ objectFit: "contain" }}
        />
      </div>


    </section>
  );
}