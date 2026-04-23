"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Sticker, { KoreanHeartSticker } from "./Sticker";

interface ClientCardData {
  name: string;
  bg: string;
  textColor?: string;
  fontStyle?: React.CSSProperties;
}

const clientsCol1: ClientCardData[] = [
  { name: "KFC", bg: "linear-gradient(135deg, #a8c4e0, #d4e4f7)" },
  { name: "OXXIO", bg: "#e84e1b", textColor: "white", fontStyle: { letterSpacing: 2 } },
  { name: "HEMA", bg: "#2d7a5f", textColor: "white" },
  { name: "Jumbo", bg: "linear-gradient(135deg, #ffd54f, #ffb300)" },
  { name: "Cheaptickets", bg: "#e84e1b", textColor: "white" },
];

const clientsCol2: ClientCardData[] = [
  { name: "Swapfiets", bg: "linear-gradient(135deg, #e8d5f0, #f5e6ff)", fontStyle: { fontFamily: "'Caveat', cursive", fontSize: "1.4rem" } },
  { name: "ace &\ntate", bg: "#8b3a62", textColor: "white" },
  { name: "NETFLIX", bg: "#7eb8f0", fontStyle: { letterSpacing: 1 } },
  { name: "Naïf", bg: "linear-gradient(135deg, #81c784, #4caf50)", textColor: "white" },
  { name: "Smoothiebox", bg: "linear-gradient(135deg, #ce93d8, #ab47bc)", textColor: "white" },
];

const brands = [
  "Douwe Egberts", "Hema", "KFC", "Netflix", "Cheaptickets",
  "Jumbo", "Naïf", "Oxxio", "Smoothiebox", "Swapfiets", "ace & tate",
];

const ClientsSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      {/* Brand marquee */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...brands, ...brands].map((brand, i) => (
            <span key={i} className="marquee-item">
              {brand} ✦{" "}
            </span>
          ))}
        </div>
      </div>

      <section className="clients-section" id="clients" ref={ref}>
        <div className="clients-header">
          <div className="clients-blob">
            <motion.svg
              viewBox="0 0 300 300"
              width={220}
              height={220}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            >
              <path
                d="M60,120 Q80,30 180,60 Q280,90 240,180 Q200,270 100,240 Q0,210 60,120Z"
                fill="#5b7bf5"
                opacity={0.5}
              />
            </motion.svg>
            <Sticker x={140} y={120} delay={0.2}>
              <KoreanHeartSticker size={80} />
            </Sticker>
          </div>

          <motion.h2
            className="clients-title"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            proud to have
            <br />
            worked <em>with:</em>
          </motion.h2>

          {/* Arrow SVG */}
          <motion.svg
            viewBox="0 0 100 80"
            width={100}
            height={80}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <path
              d="M10 10 Q30 60 60 40 Q80 25 70 50 L80 45 L72 55 L65 47"
              fill="none"
              stroke="#222"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </motion.svg>
        </div>

        {/* Vertical scrolling ticker columns */}
        <div className="clients-ticker-wrap">
          <div className="clients-ticker-col">
            <div className="clients-ticker-col-inner ticker-up">
              {[...clientsCol1, ...clientsCol1].map((client, i) => (
                <motion.div
                  key={i}
                  className="client-card"
                  style={{ background: client.bg }}
                  whileHover={{ scale: 1.08, rotate: -2 }}
                >
                  <span
                    className="client-name"
                    style={{
                      color: client.textColor || "#111",
                      fontWeight: 800,
                      whiteSpace: "pre-line",
                      ...client.fontStyle,
                    }}
                  >
                    {client.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="clients-ticker-col">
            <div className="clients-ticker-col-inner ticker-down">
              {[...clientsCol2, ...clientsCol2].map((client, i) => (
                <motion.div
                  key={i}
                  className="client-card"
                  style={{ background: client.bg }}
                  whileHover={{ scale: 1.08, rotate: 2 }}
                >
                  <span
                    className="client-name"
                    style={{
                      color: client.textColor || "#111",
                      fontWeight: 800,
                      whiteSpace: "pre-line",
                      ...client.fontStyle,
                    }}
                  >
                    {client.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClientsSection;
