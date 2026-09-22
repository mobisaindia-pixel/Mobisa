"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useInView } from "framer-motion";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const subscribeToReducedMotion = (onChange: () => void) => {
  const query = window.matchMedia(reducedMotionQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const getReducedMotion = () => window.matchMedia(reducedMotionQuery).matches;
// Keep server and first client render identical; wait for the preference before autoplay.
const getServerReducedMotion = () => null;

type ShowcaseVideo = "ugc" | "ai" | "property" | "dome";

const propertyVideos = [
  { id: "property", src: "/scr/property/property-walkthrough.mp4", label: "property walkthrough" },
  { id: "dome", src: "/scr/property/dome-walkthrough.mp4", label: "dome walkthrough" },
] as const;

const ShowcaseSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const ugcRef = useRef<HTMLVideoElement>(null);
  const aiRef = useRef<HTMLVideoElement>(null);
  const propertyRef = useRef<HTMLDivElement>(null);
  const propertyVideoRefs = useRef<Partial<Record<ShowcaseVideo, HTMLVideoElement>>>({});
  const loadPropertyVideos = useInView(propertyRef, { once: true, margin: "200px" });
  const propertyVisible = useInView(propertyRef, { amount: 0.1 });
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );
  const [propertyPlaying, setPropertyPlaying] = useState<Partial<Record<ShowcaseVideo, boolean>>>({});
  const manuallyPaused = useRef<Partial<Record<ShowcaseVideo, boolean>>>({});

  useEffect(() => {
    Object.values(propertyVideoRefs.current).forEach((video) => {
      const id = video.dataset.showcaseId as ShowcaseVideo;
      if (propertyVisible && loadPropertyVideos && reducedMotion === false && !manuallyPaused.current[id]) {
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [propertyVisible, loadPropertyVideos, reducedMotion]);

  // Track which video is unmuted (null = both muted)
  const [activeAudio, setActiveAudio] = useState<ShowcaseVideo | null>(null);

  const handleClick = (which: ShowcaseVideo) => {
    const nextAudio = activeAudio === which ? null : which;
    const videos = { ugc: ugcRef.current, ai: aiRef.current, ...propertyVideoRefs.current };
    Object.entries(videos).forEach(([id, video]) => {
      if (video) video.muted = id !== nextAudio;
    });
    setActiveAudio(nextAudio);
  };

  const togglePropertyPlayback = (id: ShowcaseVideo) => {
    const video = propertyVideoRefs.current[id];
    if (!video) return;
    if (video.paused) {
      manuallyPaused.current[id] = false;
      void video.play().catch(() => {});
    } else {
      manuallyPaused.current[id] = true;
      video.pause();
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
                src="/scr/ugc_elaria.mp4"
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

        <div className="property-showcase" id="property-walkthroughs" ref={propertyRef}>
          <motion.h2
            className="showcase-title"
            initial={reducedMotion ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            property <em>walkthroughs.</em>
          </motion.h2>

          <div className="showcase-grid">
            {propertyVideos.map(({ id, src, label }, index) => (
              <motion.div
                key={id}
                className="showcase-card showcase-card-vertical"
                initial={reducedMotion ? false : { opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
              >
                <div className={`showcase-video-wrap ${activeAudio === id ? "showcase-active" : ""}`}>
                  <video
                    ref={(video) => {
                      if (video) propertyVideoRefs.current[id] = video;
                      else delete propertyVideoRefs.current[id];
                    }}
                    data-showcase-id={id}
                    src={loadPropertyVideos ? src : undefined}
                    preload="none"
                    muted
                    loop
                    playsInline
                    className="showcase-video"
                    aria-label={label}
                    onPlay={() => setPropertyPlaying((current) => ({ ...current, [id]: true }))}
                    onPause={() => setPropertyPlaying((current) => ({ ...current, [id]: false }))}
                  />
                  <button
                    type="button"
                    className="showcase-sound-icon property-video-control property-play-control"
                    onClick={() => togglePropertyPlayback(id)}
                    aria-label={`${propertyPlaying[id] ? "Pause" : "Play"} ${label}`}
                  >
                    <svg viewBox="0 0 24 24" width={20} height={20} fill="white" aria-hidden="true">
                      {propertyPlaying[id] ? <path d="M6 4h4v16H6zm8 0h4v16h-4z" /> : <path d="M8 5v14l11-7z" />}
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="showcase-sound-icon property-video-control"
                    onClick={() => handleClick(id)}
                    aria-label={`${activeAudio === id ? "Mute" : "Unmute"} ${label}`}
                  >
                    <svg viewBox="0 0 24 24" width={20} height={20} fill="white" aria-hidden="true">
                      {activeAudio === id ? (
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 8.5v7a4.49 4.49 0 002.5-3.5zM14 3.23v2.06a6.51 6.51 0 010 13.42v2.06A8.51 8.51 0 0014 3.23z" />
                      ) : (
                        <path d="M16.5 12A4.5 4.5 0 0014 8.5v2.09l2.41 2.41c.06-.31.09-.65.09-1zm2.5 0a6.5 6.5 0 01-.78 3.09l1.56 1.56A8.43 8.43 0 0021 12a8.51 8.51 0 00-7-8.77v2.06A6.51 6.51 0 0119 12zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.46 8.46 0 003.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                      )}
                    </svg>
                  </button>
                </div>
                <p className="showcase-label">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
