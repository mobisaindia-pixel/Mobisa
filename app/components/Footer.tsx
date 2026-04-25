"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Sticker, {
  BamSticker,
  SmileySticker,
  HeartSticker,
  HundredSticker,
  HandsHeartSticker,
  CameraSticker,
} from "./Sticker";

const Footer: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <footer className="footer" id="contact" ref={ref}>
      {/* Stickers — scattered across footer, repositioned on mobile */}
      {isMobile ? (
        <>
          {/* BAM — top-left */}
          <Sticker x={16} y={12} delay={0.5} rotate={-12} className="footer-sticker footer-sticker-bam">
            <BamSticker size={52} />
          </Sticker>
          {/* 100 — top-right */}
          <Sticker x="auto" y={16} delay={1.1} rotate={8} className="footer-sticker footer-sticker-hundred" style={{ right: 20, left: "auto" }}>
            <HundredSticker size={48} />
          </Sticker>
          {/* Smiley — right side of contact column */}
          <Sticker x="auto" y={180} delay={0.7} rotate={-6} className="footer-sticker footer-sticker-smiley" style={{ right: 20, left: "auto" }}>
            <SmileySticker size={44} />
          </Sticker>
          {/* Camera — bottom-right above watermark */}
          <Sticker x="auto" y="auto" delay={0.8} rotate={10} className="footer-sticker footer-sticker-camera" style={{ right: 16, left: "auto", bottom: 120, top: "auto" }}>
            <CameraSticker size={48} />
          </Sticker>
          {/* Heart — left side between columns */}
          <Sticker x={16} y={320} delay={0.9} rotate={-8} className="footer-sticker footer-sticker-heart">
            <HeartSticker size={40} />
          </Sticker>
          {/* Hands heart — right side of brand column */}
          <Sticker x="auto" y={380} delay={1.3} rotate={5} className="footer-sticker footer-sticker-hands" style={{ right: 20, left: "auto" }}>
            <HandsHeartSticker size={40} />
          </Sticker>
        </>
      ) : (
        <>
          {/* Desktop: stickers inside footer-logo area */}
        </>
      )}

      <div className="footer-content">
        <motion.div
          className="footer-col footer-col-brand"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="footer-label">working on a brand?</span>
          <p className="footer-text">
            <strong>let&apos;s build something →</strong>
          </p>
        </motion.div>

        <motion.div
          className="footer-col footer-col-location"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="footer-label">based in</span>
          <p className="footer-text">
            <strong>
              Jaipur, Rajasthan
              <br />
              India · Global
            </strong>
          </p>
        </motion.div>

        <motion.div
          className="footer-col footer-col-contact"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="footer-label">contact</span>
          <p className="footer-text">
            <strong>
              <a href="mailto:hello@mobisa.in" className="footer-email">
                hello@mobisa.in
              </a>
              <br />
              send us a mail*
            </strong>
          </p>
          {/*<p className="footer-disclaimer"> 
            *we move fast. no unnecessary calls.
          </p>*/}
          <div className="footer-socials">
            {/* Instagram */}
            <motion.a
              href="https://www.instagram.com/mobisa.in/"
              className="social-icon"
              whileHover={{ scale: 1.1, backgroundColor: "white", color: "#4a6cf7" }}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" width={22} height={22} fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </motion.a>
            {/* X / Twitter */}
            <motion.a
              href="https://x.com/Mobisaindia"
              className="social-icon"
              whileHover={{ scale: 1.1, backgroundColor: "white", color: "#4a6cf7" }}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
            >
              <svg viewBox="0 0 24 24" width={22} height={22} fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </motion.a>
            {/* LinkedIn */}
            <motion.a
              href="https://www.linkedin.com/company/mobisaindia/posts/?feedView=all"
              className="social-icon"
              whileHover={{ scale: 1.1, backgroundColor: "white", color: "#4a6cf7" }}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" width={22} height={22} fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Giant Logo with Stickers */}
      <div className="footer-logo">
        <motion.span
          className="footer-logo-text"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          mobisa
        </motion.span>

        {/* Desktop stickers — inside footer-logo area */}
        {!isMobile && (
          <>
            <Sticker x={-10} y="auto" style={{ bottom: 20 }} delay={0.5}>
              <BamSticker size={95} />
            </Sticker>
            <Sticker x="20%" y={-20} delay={0.7}>
              <SmileySticker size={80} />
            </Sticker>
            <Sticker x="40%" y={30} delay={0.9}>
              <HeartSticker size={70} />
            </Sticker>
            <Sticker x="55%" y="auto" style={{ bottom: 10 }} delay={1.3}>
              <HandsHeartSticker size={75} />
            </Sticker>
            <Sticker x="68%" y={-10} delay={1.1}>
              <HundredSticker size={85} />
            </Sticker>
            <Sticker x="84%" y={10} delay={0.8}>
              <CameraSticker size={85} />
            </Sticker>
          </>
        )}
      </div>


    </footer>
  );
};

export default Footer;
