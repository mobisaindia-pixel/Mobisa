"use client";

import React, { useRef } from "react";
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

  return (
    <footer className="footer" id="contact" ref={ref}>
      <div className="footer-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="footer-label">looking for a job?</span>
          <p className="footer-text">
            <strong>not hiring right now :(</strong>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="footer-label">office</span>
          <p className="footer-text">
            <strong>
              papaverhof 21
              <br />
              1032 LX amsterdam
            </strong>
          </p>
          <a
            href="https://maps.app.goo.gl/zrsSVetHVjfKcGsG6"
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Maps
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="footer-label">contact</span>
          <p className="footer-text">
            <strong>
              <a href="mailto:hello@truus.co" className="footer-email">
                hello@truus.co
              </a>
              <br />
              send us a whatsapp*
            </strong>
          </p>
          <p className="footer-disclaimer">
            *we&apos;re millennials and gen-z: please do not call us.
          </p>
          <div className="footer-socials">
            {/* LinkedIn */}
            <motion.a
              href="#"
              className="social-icon"
              whileHover={{ scale: 1.1, backgroundColor: "white", color: "#4a6cf7" }}
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" width={22} height={22} fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </motion.a>
            {/* Instagram */}
            <motion.a
              href="#"
              className="social-icon"
              whileHover={{ scale: 1.1, backgroundColor: "white", color: "#4a6cf7" }}
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" width={22} height={22} fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </motion.a>
            {/* TikTok */}
            <motion.a
              href="#"
              className="social-icon"
              whileHover={{ scale: 1.1, backgroundColor: "white", color: "#4a6cf7" }}
              aria-label="TikTok"
            >
              <svg viewBox="0 0 24 24" width={22} height={22} fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
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
          truus
        </motion.span>

        <Sticker x={-20} y="auto" style={{ bottom: 10 }} delay={0.5}>
          <BamSticker size={70} />
        </Sticker>
        <Sticker x="18%" y={-10} delay={0.7}>
          <SmileySticker size={55} color="#d4f57a" />
        </Sticker>
        <Sticker x="40%" y={20} delay={0.9}>
          <HeartSticker size={45} />
        </Sticker>
        <Sticker x="65%" y={-15} delay={1.1}>
          <HundredSticker size={70} />
        </Sticker>
        <Sticker x="48%" y="auto" style={{ bottom: 0 }} delay={1.3}>
          <HandsHeartSticker size={50} />
        </Sticker>
        <Sticker x="82%" y={15} delay={0.8}>
          <CameraSticker size={50} />
        </Sticker>
      </div>

      {/* Credits */}
      <div className="footer-credits">
        <span className="credits-label">credits</span>
        <div className="credits-items">
          <div className="credit-item">
            <span>Design by</span>
            <a href="https://www.jordangilroy.com/" target="_blank" rel="noopener noreferrer">
              Jordan
            </a>
          </div>
          <div className="credit-item">
            <span>code by</span>
            <a href="https://dennissnellenberg.com/" target="_blank" rel="noopener noreferrer">
              Dennis
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
