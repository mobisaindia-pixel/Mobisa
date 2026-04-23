"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const ShowcaseSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const ugcRef = useRef<HTMLVideoElement>(null);
  const aiRef = useRef<HTMLVideoElement>(null);

  // Track which video is unmuted (null = both muted)
  const [activeAudio, setActiveAudio] = useState<"ugc" | "ai" | null>(null);

  const handleClick = (which: "ugc" | "ai") => {
    const ugc = ugcRef.current;
    const ai = aiRef.current;
    if (!ugc || !ai) return;

    if (activeAudio === which) {
      // Clicking the same video — mute it
      ugc.muted = true;
      ai.muted = true;
      setActiveAudio(null);
    } else {
      // Unmute clicked, mute the other
      ugc.muted = which !== "ugc";
      ai.muted = which !== "ai";
      setActiveAudio(which);
    }
  };

  return (
    <section className="showcase-section" id="showcase" ref={ref}>
      <div className="showcase-container">
        <motion.h2
          className="showcase-title"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          see what we <em>built.</em>
        </motion.h2>

        <div className="showcase-grid">
          {/* Card 1 — Colgate UGC Ad (vertical) */}
          <motion.div
            className="showcase-card showcase-card-vertical"
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div
              className={`showcase-video-wrap ${activeAudio === "ugc" ? "showcase-active" : ""}`}
              onClick={() => handleClick("ugc")}
            >
              <video
                ref={ugcRef}
                src="/scr/colgate_ugc.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="showcase-video"
              />
              {/* Mute/unmute indicator */}
              <div className="showcase-sound-icon">
                {activeAudio === "ugc" ? (
                  <svg viewBox="0 0 24 24" width={20} height={20} fill="white">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 8.5v7a4.49 4.49 0 002.5-3.5zM14 3.23v2.06a6.51 6.51 0 010 13.42v2.06A8.51 8.51 0 0014 3.23z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width={20} height={20} fill="white">
                    <path d="M16.5 12A4.5 4.5 0 0014 8.5v2.09l2.41 2.41c.06-.31.09-.65.09-1zm2.5 0a6.5 6.5 0 01-.78 3.09l1.56 1.56A8.43 8.43 0 0021 12a8.51 8.51 0 00-7-8.77v2.06A6.51 6.51 0 0119 12zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.46 8.46 0 003.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                )}
              </div>
            </div>
            <p className="showcase-label">UGC ad</p>
          </motion.div>

          {/* Card 2 — Campbell AI Ad (horizontal) */}
          <motion.div
            className="showcase-card showcase-card-horizontal"
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div
              className={`showcase-video-wrap ${activeAudio === "ai" ? "showcase-active" : ""}`}
              onClick={() => handleClick("ai")}
            >
              <video
                ref={aiRef}
                src="/scr/campbell_ai.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="showcase-video"
              />
              {/* Mute/unmute indicator */}
              <div className="showcase-sound-icon">
                {activeAudio === "ai" ? (
                  <svg viewBox="0 0 24 24" width={20} height={20} fill="white">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 8.5v7a4.49 4.49 0 002.5-3.5zM14 3.23v2.06a6.51 6.51 0 010 13.42v2.06A8.51 8.51 0 0014 3.23z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width={20} height={20} fill="white">
                    <path d="M16.5 12A4.5 4.5 0 0014 8.5v2.09l2.41 2.41c.06-.31.09-.65.09-1zm2.5 0a6.5 6.5 0 01-.78 3.09l1.56 1.56A8.43 8.43 0 0021 12a8.51 8.51 0 00-7-8.77v2.06A6.51 6.51 0 0119 12zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.46 8.46 0 003.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                )}
              </div>
            </div>
            <p className="showcase-label">AI ad</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
