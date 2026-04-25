"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, MotionValue } from "framer-motion";
import Sticker, { ThumbsUpSticker } from "./Sticker";

const words = [
  { text: "We", rotate: -3, y: 0 },
  { text: "Make", rotate: 2, y: 10 },
  { text: "Ads", rotate: -1, y: -8, big: true },
  { text: "That", rotate: 3, y: 15 },
  { text: "Actually", rotate: -4, y: 0 },
  { text: "Convert.", rotate: 1, y: 5, serif: true },
];

const ScatteredWord: React.FC<{
  word: (typeof words)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
  isInView: boolean;
}> = ({ word, index, scrollYProgress, isInView }) => {
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
        delay: index * 0.08,
        ease: "easeOut",
      }}
    >
      {word.text}
    </motion.span>
  );
};

const ScatteredText: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section className="scattered-section" id="scattered" ref={sectionRef}>
      <div className="scattered-container">
        {/* Thumbs up sticker — repositioned on mobile to top-right */}
        <Sticker
          x={isMobile ? "auto" : "65%"}
          y={isMobile ? 0 : -30}
          delay={0.3}
          className="scattered-thumbsup-sticker"
          style={isMobile ? { right: 8, left: "auto" } : undefined}
          rotate={isMobile ? 12 : 0}
        >
          <ThumbsUpSticker size={isMobile ? 44 : 90} />
        </Sticker>

        <div className="scattered-text-row">
          {words.map((word, i) => (
            <ScatteredWord
              key={i}
              word={word}
              index={i}
              scrollYProgress={scrollYProgress}
              isInView={isInView}
            />
          ))}
        </div>

        <motion.p
          className="scattered-description"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          D2C brands need content that stops the scroll, builds trust
          <em> and</em> drives purchases. We build all three — at AI speed.
        </motion.p>
      </div>
    </section>
  );
};

export default ScatteredText;
