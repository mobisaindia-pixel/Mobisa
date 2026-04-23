"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const services = [
  {
    title: "Creative Posts",
    desc: "Engagement-focused content engineered for algorithmic reach.",
    icon: (
      <svg viewBox="0 0 40 40" width={36} height={36}>
        <rect x="4" y="4" width="32" height="32" rx="8" fill="#E8CCFF" stroke="#222" strokeWidth="2.5" />
        <circle cx="15" cy="16" r="4" fill="#222" />
        <path d="M8 32 Q14 22 20 26 Q26 30 32 22" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Creative Mockups",
    desc: "Photorealistic product imagery that stops the scroll.",
    icon: (
      <svg viewBox="0 0 40 40" width={36} height={36}>
        <rect x="6" y="8" width="28" height="24" rx="4" fill="#FFF5B0" stroke="#222" strokeWidth="2.5" />
        <rect x="12" y="4" width="16" height="8" rx="3" fill="#FFF5B0" stroke="#222" strokeWidth="2" />
        <circle cx="20" cy="22" r="6" fill="white" stroke="#222" strokeWidth="2" />
        <circle cx="20" cy="22" r="3" fill="#222" />
      </svg>
    ),
  },
  {
    title: "UGC Ads",
    desc: "Conversion-structured creator content that builds trust.",
    icon: (
      <svg viewBox="0 0 40 40" width={36} height={36}>
        <circle cx="20" cy="14" r="8" fill="#BFDFFF" stroke="#222" strokeWidth="2.5" />
        <path d="M6 36 Q6 24 20 24 Q34 24 34 36" fill="#BFDFFF" stroke="#222" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    title: "AI Ads",
    desc: "Cinematic, narrative-driven ads produced at AI speed.",
    icon: (
      <svg viewBox="0 0 40 40" width={36} height={36}>
        <path d="M20 4 L24 16 L36 20 L24 24 L20 36 L16 24 L4 20 L16 16 Z" fill="#CCFFCC" stroke="#222" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
    ),
  },
];

import type { Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

const BookingPage: React.FC = () => {
  return (
    <div className="book-page">
      {/* Back to home */}
      <Link href="/" className="book-back">
        ← back to site
      </Link>

      <div className="book-layout">
        {/* LEFT — Value Proposition */}
        <motion.div
          className="book-left"
          initial="hidden"
          animate="visible"
        >
          <motion.div className="book-brand" custom={0} variants={fadeUp}>
            <img src="/Mobisa-Logo.png" alt="Mobisa" className="book-brand-logo" />
          </motion.div>

          <motion.h1 className="book-headline" custom={1} variants={fadeUp}>
            Cinematic AI Production
            <br />
            <em>at Scale.</em>
          </motion.h1>

          <motion.p className="book-subhead" custom={2} variants={fadeUp}>
            High-conversion ads engineered for algorithmic reach.
            <br />
            Book a free strategy call — no commitment.
          </motion.p>

          {/* Service cards */}
          <div className="book-services">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                className="book-service"
                custom={i + 3}
                variants={fadeUp}
              >
                <div className="book-service-icon">{s.icon}</div>
                <div>
                  <h3 className="book-service-title">{s.title}</h3>
                  <p className="book-service-desc">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Value props */}
          <motion.div className="book-values" custom={7} variants={fadeUp}>
            <span className="book-value-pill">🎬 Cinematic Quality</span>
            <span className="book-value-pill">⚡ AI Speed</span>
            <span className="book-value-pill">📈 Conversion Strategy</span>
          </motion.div>

          <motion.p className="book-note" custom={8} variants={fadeUp}>
            Mobisa is a custom-production creative agency — not a SaaS tool
            or marketplace. Every project is crafted specifically for your brand.
          </motion.p>
        </motion.div>

        {/* RIGHT — Calendly Embed */}
        <motion.div
          className="book-right"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="book-calendar-wrap">
            <iframe
              src="https://calendly.com/mobisaindia/30min"
              width="100%"
              height="100%"
              frameBorder="0"
              title="Book a call with Mobisa"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingPage;
