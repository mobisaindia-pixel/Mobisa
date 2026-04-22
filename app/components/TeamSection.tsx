"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

const TeamSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, 48, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (value) => setCount(Math.round(value)),
      });
      return () => controls.stop();
    }
  }, [isInView]);

  return (
    <section className="team-section" id="team" ref={ref}>
      <div className="team-content">
        <motion.h2
          className="team-title"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          we are a{" "}
          <span className="team-young">
            <em>young,</em>
            <motion.svg
              className="circle-annotation"
              viewBox="0 0 120 60"
              preserveAspectRatio="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            >
              <motion.ellipse
                cx="60"
                cy="30"
                rx="55"
                ry="25"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.5 }}
              />
            </motion.svg>
          </span>{" "}
          future-proof
          <br />
          team of{" "}
          <span ref={counterRef} style={{ fontVariantNumeric: "tabular-nums" }}>
            {count}
          </span>{" "}
          digitally native
          <br />
          <span className="team-wunderkinder">
            <em>wunderkinder.</em>
            <motion.svg
              className="underline-annotation"
              viewBox="0 0 200 20"
              preserveAspectRatio="none"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.6 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.path
                d="M5 15 Q50 5 100 12 Q150 18 195 8"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </motion.svg>
          </span>{" "}
          not to brag!
        </motion.h2>
      </div>

      {/* Animated blob */}
      <motion.div
        className="team-blob"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 200 200" width={120} height={120}>
          <motion.path
            d="M40,80 Q60,20 120,40 Q180,60 160,120 Q140,180 80,160 Q20,140 40,80Z"
            fill="#2a9d8f"
            opacity={0.7}
            animate={{
              d: [
                "M40,80 Q60,20 120,40 Q180,60 160,120 Q140,180 80,160 Q20,140 40,80Z",
                "M50,70 Q70,30 130,50 Q170,70 150,130 Q130,170 70,150 Q30,130 50,70Z",
                "M40,80 Q60,20 120,40 Q180,60 160,120 Q140,180 80,160 Q20,140 40,80Z",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
    </section>
  );
};

export default TeamSection;
