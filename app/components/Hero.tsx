"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Sticker, { SmileySticker, SparkleSticker } from "./Sticker";
import gsap from "../../lib/gsap";

const Hero: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.12], [1, 0.96]);
  const heroY = useTransform(scrollYProgress, [0, 0.12], [0, -40]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const stickerRef = useRef<HTMLDivElement>(null);
  const clickAreaRef = useRef<HTMLButtonElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // GSAP quickTo refs
  const xToRef = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const yToRef = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  // Detect touch device
  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  // Autoplay the video on mount
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay blocked — stay muted and retry
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  }, []);

  // Video file size check — warn if over 10MB
  useEffect(() => {
    fetch("/scr/LANDING_VIDEO.mp4", { method: "HEAD" })
      .then((res) => {
        const size = res.headers.get("content-length");
        if (size && parseInt(size, 10) > 10 * 1024 * 1024) {
          console.warn(
            `[Mobisa] Hero video is ${(parseInt(size, 10) / (1024 * 1024)).toFixed(1)}MB — consider compressing to under 10MB for better performance.`
          );
        }
      })
      .catch(() => {
        // HEAD request failed — skip size check
      });
  }, []);

  // IntersectionObserver — pause video when hero is off-screen
  useEffect(() => {
    const video = videoRef.current;
    const hero = heroRef.current;
    if (!video || !hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // Setup GSAP quickTo for smooth cursor following + spinning animation
  // Skip on touch devices
  useEffect(() => {
    const sticker = stickerRef.current;
    const hero = heroRef.current;
    if (!sticker || !hero) return;

    if (isTouchDevice) {
      // On mobile: no cursor following, sticker is positioned via CSS
      gsap.set(sticker, { clearProps: "x,y" });
    } else {
      // Set initial parked position (center, bottom third)
      const heroRect = hero.getBoundingClientRect();
      const parkedX = heroRect.width / 2 - 40;
      const parkedY = heroRect.height * 0.65;
      gsap.set(sticker, { x: parkedX, y: parkedY });

      // Create quickTo tweens for smooth following
      xToRef.current = gsap.quickTo(sticker, "x", {
        duration: 0.4,
        ease: "power2.out",
      });
      yToRef.current = gsap.quickTo(sticker, "y", {
        duration: 0.4,
        ease: "power2.out",
      });
    }

    // Infinite rotation animation on the inner starburst
    gsap.to(".mute-sticker-inner", {
      rotation: 360,
      duration: 8,
      ease: "none",
      repeat: -1,
    });

    return () => {
      gsap.killTweensOf(sticker);
      gsap.killTweensOf(".mute-sticker-inner");
    };
  }, [isTouchDevice]);

  // Mouse move handler — skip on touch devices
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouchDevice) return;
      const hero = heroRef.current;
      if (!hero || !xToRef.current || !yToRef.current) return;
      const heroRect = hero.getBoundingClientRect();
      // Position relative to hero, offset by half sticker size (40px)
      const x = e.clientX - heroRect.left - 40;
      const y = e.clientY - heroRect.top - 40;
      xToRef.current(x);
      yToRef.current(y);
    },
    [isTouchDevice]
  );

  // Mouse leave — park sticker back to center bottom-third
  const handleMouseLeave = useCallback(() => {
    if (isTouchDevice) return;
    const hero = heroRef.current;
    if (!hero || !xToRef.current || !yToRef.current) return;
    const heroRect = hero.getBoundingClientRect();
    const parkedX = heroRect.width / 2 - 40;
    const parkedY = heroRect.height * 0.65;
    xToRef.current(parkedX);
    yToRef.current(parkedY);
  }, [isTouchDevice]);

  const toggleMute = () => {
    const video = videoRef.current;
    const sticker = stickerRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
    // Scale pulse animation
    if (sticker) {
      gsap.fromTo(
        sticker,
        { scale: 1 },
        {
          scale: 1.3,
          duration: 0.15,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
        }
      );
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <motion.section
      className="hero"
      id="hero"
      style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
      ref={heroRef as React.Ref<HTMLElement>}
      onMouseMove={handleMouseMove as unknown as React.MouseEventHandler<HTMLElement>}
      onMouseLeave={handleMouseLeave}
    >
      {/* Fullscreen background video */}
      <div className="hero-video-bg">
        <video
          ref={videoRef}
          className="hero-bg-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/scr/LANDING_VIDEO_poster.jpg"
          // @ts-expect-error fetchpriority is a valid HTML attribute
          fetchpriority="high"
        >
          <source
            media="(max-width: 768px)"
            src="/scr/LANDING_VIDEO_mobile.mp4"
            type="video/mp4"
          />
          <source src="/scr/LANDING_VIDEO.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for readability */}
        <div className="hero-video-overlay" />
      </div>

      <div className="hero-content">
        {/* Smiley floating above the text */}
        <Sticker x="42%" y={-60} delay={0.5} className="hero-smiley-sticker">
          <SmileySticker size={85} />
        </Sticker>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.9, ease: "easeOut" }}
        >
          <span>we make </span>
          <span className="hero-title-italic">cinematic </span>
          <span className="hero-title-bold">ads,</span>
          <br />
          <span>powered by </span>
          <span className="hero-mainstream">
            AI.
            {/* Hand-drawn oval around "AI." */}
            <motion.svg
              className="mainstream-oval"
              viewBox="0 0 300 80"
              preserveAspectRatio="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
              <motion.ellipse
                cx="150"
                cy="40"
                rx="145"
                ry="35"
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1.2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1.5,
                  delay: 2.5,
                  ease: "easeInOut",
                }}
              />
            </motion.svg>
          </span>
          <motion.span
            className="hero-sparkle"
            animate={{ rotate: [0, 180, 360], scale: [1, 1.3, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <SparkleSticker size={40} color="#c8b4ff" />
          </motion.span>
        </motion.h1>
      </div>

      {/* ── Cursor-following Mute Sticker ── */}
      <div
        className={`mute-sticker-wrapper ${isTouchDevice ? "mute-sticker-mobile" : ""}`}
        ref={stickerRef}
      >
        <div className="mute-sticker-inner">
          {/* Spiky starburst SVG */}
          <svg
            className="starburst-svg"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50 2 L58 20 L76 8 L70 28 L90 24 L78 40 L98 44 L80 52 L94 66 L74 62 L80 82 L62 72 L58 92 L50 74 L42 92 L38 72 L20 82 L26 62 L6 66 L20 52 L2 44 L22 40 L10 24 L30 28 L24 8 L42 20 Z"
              fill="#DDFF00"
            />
          </svg>

          {/* Speaker icon */}
          <svg
            className="speaker-icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Speaker body — always visible */}
            <path d="M11 5L6 9H2v6h4l5 4V5z" fill="#111" />
            {isMuted ? (
              /* Muted: X slash */
              <>
                <line
                  x1="18"
                  y1="9"
                  x2="22"
                  y2="15"
                  stroke="#111"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="22"
                  y1="9"
                  x2="18"
                  y2="15"
                  stroke="#111"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </>
            ) : (
              /* Unmuted: sound waves */
              <>
                <path
                  d="M15.54 8.46a5 5 0 010 7.07"
                  stroke="#111"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M18.07 5.93a9 9 0 010 12.73"
                  stroke="#111"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </>
            )}
          </svg>
        </div>

        {/* Transparent click area on top */}
        <button
          ref={clickAreaRef}
          className="mute-sticker-click-area"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        />
      </div>

      {/* ── Pause / Play button — bottom-left, always visible ── */}
      <button
        className="hero-playpause-btn"
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        {isPlaying ? (
          /* Pause icon — two vertical bars */
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="4" width="4" height="16" rx="1" fill="white" />
            <rect x="14" y="4" width="4" height="16" rx="1" fill="white" />
          </svg>
        ) : (
          /* Play icon — triangle */
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5v14l11-7L8 5z" fill="white" />
          </svg>
        )}
      </button>
    </motion.section>
  );
};

export default Hero;
