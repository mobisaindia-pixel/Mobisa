"use client";

import React from "react";
import { motion } from "framer-motion";

interface WorkMenuProps {
  onClose: () => void;
}

const projects = [
  { name: "feestje bouwe?\napp douwe", brand: "douwe egberts", brandColor: "#E84E1B", bg: "linear-gradient(135deg, #2d5a3d, #4a8c6b)" },
  { name: "skibidi school", brand: "hema", brandColor: "#c9a5e8", bg: "linear-gradient(135deg, #e84e1b, #ff7b4a)" },
  { name: "hema socials", brand: "hema", brandColor: "#4caf50", bg: "linear-gradient(135deg, #1a5c38, #28a55f)" },
  { name: "kipsalon", brand: "kfc", brandColor: "#c62828", bg: "linear-gradient(135deg, #c62828, #e53935)" },
  { name: "squid game", brand: "netflix", brandColor: "#e50914", bg: "linear-gradient(135deg, #1a1a2e, #16213e)" },
  { name: "lava wings", brand: "kfc", brandColor: "#c62828", bg: "linear-gradient(135deg, #bf360c, #e65100)" },
];

const sidebarVariants = {
  hidden: { x: "-100%" },
  visible: { x: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { x: "-100%", transition: { duration: 0.4, ease: "easeIn" } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, delay: 0.2 + i * 0.06, ease: "easeOut" },
  }),
};

const WorkMenu: React.FC<WorkMenuProps> = ({ onClose }) => {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="work-menu-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Left sidebar */}
      <motion.div
        className="work-sidebar"
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.button
          className="sidebar-close"
          onClick={onClose}
          whileHover={{ rotate: 90, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ✕
        </motion.button>

        <div className="sidebar-projects">
          {projects.map((project, i) => (
            <motion.a
              key={i}
              href="#"
              className="sidebar-project-item"
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ x: 8 }}
            >
              <div
                className="sidebar-thumb"
                style={{ background: project.bg }}
              />
              <div className="sidebar-project-info">
                <span
                  className="sidebar-brand-tag"
                  style={{ background: project.brandColor }}
                >
                  {project.brand}
                </span>
                <span className="sidebar-project-name">{project.name}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default WorkMenu;
