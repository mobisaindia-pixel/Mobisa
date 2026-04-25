"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";


const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`} id="main-nav">
      {/* LEFT — Mobisa logo icon */}
      <a href="#" className="nav-brand">
        <img
          src="/Mobisa-Logo.png"
          alt="Mobisa"
          className="nav-brand-logo"
        />
      </a>

      {/* CENTER — "mobisa" wordmark */}
      <a href="#" className="nav-logo nav-center-wordmark">
        mobisa
      </a>

      {/* RIGHT — Book Call button */}
      <motion.a
        className="nav-book-call"
        href="/book"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor" style={{ marginRight: 8 }}>
          <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.58 1 1 0 01-.24 1.01l-2.2 2.2z" />
        </svg>
        Book Call
      </motion.a>
    </nav>
  );
};

export default Navbar;
