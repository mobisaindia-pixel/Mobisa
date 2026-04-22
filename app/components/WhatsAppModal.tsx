"use client";

import React from "react";
import { motion } from "framer-motion";

interface WhatsAppModalProps {
  onClose: () => void;
}

const WhatsAppModal: React.FC<WhatsAppModalProps> = ({ onClose }) => {
  return (
    <motion.div
      className="whatsapp-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="whatsapp-modal-content"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h4>WhatsApp Us</h4>
        <p>Scan the QR code to chat with us via your smartphone.</p>
        <div className="qr-placeholder">QR</div>
        <a href="#" className="chat-link">
          Chat via desktop
        </a>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
      </motion.div>
    </motion.div>
  );
};

export default WhatsAppModal;
