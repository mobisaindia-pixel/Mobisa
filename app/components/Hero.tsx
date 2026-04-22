"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Sticker, { SmileySticker, SparkleSticker } from "./Sticker";

const Hero: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.12], [1, 0.96]);
  const heroY = useTransform(scrollYProgress, [0, 0.12], [0, -40]);

  return (
    <motion.section
      className="hero"
      id="hero"
      style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
    >
      {/* Animated gradient background mimicking video energy */}
      <div className="hero-video-bg">
        <div className="hero-animated-bg" />
        <div className="hero-gradient-overlay" />
      </div>

      <div className="hero-content">
        {/* Smiley floating above the text */}
        <Sticker x="42%" y={-60} delay={0.5}>
          <SmileySticker size={55} color="rgba(180, 180, 240, 0.7)" />
        </Sticker>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.9, ease: "easeOut" }}
        >
          <span>we make </span>
          <span className="hero-title-italic">advertising </span>
          <span className="hero-title-bold">for</span>
          <br />
          <span>the new </span>
          <span className="hero-mainstream">
            mainstream
            {/* Hand-drawn oval around "mainstream" */}
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
            <SparkleSticker size={30} color="#c8b4ff" />
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
    </motion.section>
  );
};

export default Hero;
