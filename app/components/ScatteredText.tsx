"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Sticker, { ThumbsUpSticker } from "./Sticker";

const words = [
  { text: "We", rotate: -3, y: 0 },
  { text: "wanna", rotate: 2, y: 10 },
  { text: "be", rotate: -1, y: -8, big: true },
  { text: "where", rotate: 3, y: 15 },
  { text: "the", rotate: -4, y: 0 },
  { text: "people", rotate: 1, y: 5 },
  { text: "Are", rotate: 5, y: -12, serif: true },
];

const ScatteredText: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section className="scattered-section" id="scattered" ref={sectionRef}>
      <div className="scattered-container">
        {/* Thumbs up sticker */}
        <Sticker x="65%" y={-30} delay={0.3}>
          <ThumbsUpSticker size={65} />
        </Sticker>

        <div className="scattered-text-row">
          {words.map((word, i) => {
            const parallaxY = useTransform(
              scrollYProgress,
              [0, 1],
              [word.y + 30, word.y - 20]
            );
            const parallaxRotate = useTransform(
              scrollYProgress,
              [0, 0.5, 1],
              [word.rotate - 5, word.rotate, word.rotate + 3]
            );

            return (
              <motion.span
                key={i}
                className={`scattered-word ${word.serif ? "scattered-word-serif" : ""}`}
                style={{
                  y: parallaxY,
                  rotate: parallaxRotate,
                  fontSize: word.big
                    ? "clamp(3.5rem, 9vw, 8rem)"
                    : undefined,
                }}
                initial={{ opacity: 0, y: 60, rotate: word.rotate + 10 }}
                animate={
                  isInView
                    ? { opacity: 1, y: word.y, rotate: word.rotate }
                    : {}
                }
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: "easeOut",
                }}
              >
                {word.text}
              </motion.span>
            );
          })}
        </div>

        <motion.p
          className="scattered-description"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Audiences are more scattered <em>and</em> more reachable than ever.
          We help brands become leaders on the channels of the new mainstream.
        </motion.p>
      </div>
    </section>
  );
};

export default ScatteredText;
