"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const values = [
  { text: "girls just wanna have fun!", color: "#c9a5e8" },
  { text: "mainstream is not a dirty word", color: "#E84E1B" },
  { text: "arrogance = old fashioned", color: "#111" },
];

const photos = [
  { rotate: -5, x: -40, y: 0, bg: "linear-gradient(135deg, #d4a373, #c8956e)" },
  { rotate: 3, x: 0, y: 20, bg: "linear-gradient(135deg, #5b7bf5, #7eb8f0)" },
  { rotate: -2, x: 40, y: -10, bg: "linear-gradient(135deg, #8b6132, #a4803a)" },
  { rotate: 6, x: 80, y: 30, bg: "linear-gradient(135deg, #f5d020, #f0c929)" },
];

const AgencySection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="agency-section" id="agency" ref={ref}>
      <div className="agency-container">
        <motion.h2
          className="agency-title"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          an agency built for the future.
          <br />
          <em>from TV to TikTok.</em>
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

        {/* Photo collage with value stickers */}
        <div className="agency-collage">
          {/* Blue organic blob behind photos */}
          <motion.svg
            className="collage-blob"
            viewBox="0 0 400 400"
            width={500}
            height={500}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1 }}
          >
            <motion.path
              d="M80,160 Q100,40 240,80 Q380,120 320,240 Q260,360 120,320 Q-20,280 80,160Z"
              fill="#5b7bf5"
              opacity={0.5}
              animate={{
                d: [
                  "M80,160 Q100,40 240,80 Q380,120 320,240 Q260,360 120,320 Q-20,280 80,160Z",
                  "M90,150 Q110,50 250,90 Q370,130 310,250 Q250,350 110,310 Q-10,270 90,150Z",
                  "M80,160 Q100,40 240,80 Q380,120 320,240 Q260,360 120,320 Q-20,280 80,160Z",
                ],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.svg>

          {/* Photo cards */}
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              className="collage-photo"
              style={{
                background: photo.bg,
                transform: `rotate(${photo.rotate}deg)`,
              }}
              initial={{ opacity: 0, y: 60, rotate: photo.rotate + 15 }}
              animate={isInView ? { opacity: 1, y: 0, rotate: photo.rotate } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.12 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
            />
          ))}

          {/* Value tags overlaid on the collage */}
          {values.map((val, i) => (
            <motion.div
              key={i}
              className="agency-value-tag"
              style={{
                background: val.color,
                color: val.color === "#111" ? "white" : "black",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.15 }}
            >
              {val.text}
            </motion.div>
          ))}
        </div>

        <motion.p
          className="agency-description"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          To reach the new generation you need to know where they are. We are a
          true 360° agency, working the whole spectrum from TikTok content to TVC
          and from influencer collabs to out of home spectaculars.
        </motion.p>
      </div>
    </section>
  );
};

export default AgencySection;
