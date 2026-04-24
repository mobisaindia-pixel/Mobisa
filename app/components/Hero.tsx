"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Sticker, { SmileySticker, SparkleSticker } from "./Sticker";

const Hero: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.12], [1, 0.96]);
  const heroY = useTransform(scrollYProgress, [0, 0.12], [0, -40]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

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

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Fullscreen background video */}
      <div className="hero-video-bg">
        <video
          ref={videoRef}
          className="hero-bg-video"
          src="/scr/LANDING_VIDEO.mp4"
          muted
          loop
          playsInline
          preload="auto"
        />
        {/* Dark overlay for readability */}
        <div className="hero-video-overlay" />
      </div>

      <div className="hero-content">
        {/* Smiley floating above the text */}
        <Sticker x="42%" y={-60} delay={0.5}>
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

      {/* Floating images in background for collage effect */}
      <motion.div
        className="hero-float-img hero-float-1"
        animate={{ y: [0, -30, 0], rotate: [-3, 3, -3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="hero-float-img hero-float-2"
        animate={{ y: [0, 20, 0], rotate: [2, -4, 2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="hero-float-img hero-float-3"
        animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="hero-float-img hero-float-4"
        animate={{ y: [0, 18, 0], rotate: [-2, 3, -2] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      {/* ── Starburst Mute / Unmute button (appears on hero hover) ── */}
      <button
        className={`hero-mute-btn ${isHovered ? "hero-mute-btn--visible" : ""}`}
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {/* Spiky starburst SVG background */}
        <svg
          className="starburst-svg"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 2 L58 20 L76 8 L70 28 L90 24 L78 40 L98 44 L80 52 L94 66 L74 62 L80 82 L62 72 L58 92 L50 74 L42 92 L38 72 L20 82 L26 62 L6 66 L20 52 L2 44 L22 40 L10 24 L30 28 L24 8 L42 20 Z"
            fill="#CCFF00"
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
          <path
            d="M11 5L6 9H2v6h4l5 4V5z"
            fill="#111"
          />
          {isMuted ? (
            /* Muted: X slash */
            <>
              <line x1="18" y1="9" x2="22" y2="15" stroke="#111" strokeWidth="2" strokeLinecap="round" />
              <line x1="22" y1="9" x2="18" y2="15" stroke="#111" strokeWidth="2" strokeLinecap="round" />
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
      </button>

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
