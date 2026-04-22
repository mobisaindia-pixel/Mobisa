"use client";

import React, { useRef } from "react";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import Sticker, { CameraSticker, SparkleSticker } from "./Sticker";

interface Project {
  brand: string;
  title: string;
  bgGradient: string;
  tagColor: string;
  overlayText?: string;
  overlayColor?: string;
}

const projects: Project[] = [
  {
    brand: "douwe egberts",
    title: "feestje bouwe?\napp douwe",
    bgGradient: "linear-gradient(180deg, #2d5a3d 0%, #4a8c6b 40%, #1d3d2a 100%)",
    tagColor: "#c9a5e8",
  },
  {
    brand: "hema",
    title: "skibidi school",
    bgGradient: "linear-gradient(180deg, #e84e1b 0%, #ff7b4a 50%, #c73e15 100%)",
    tagColor: "#4caf50",
    overlayText: "BACK\n2\nSCHOOL",
  },
  {
    brand: "hema",
    title: "hema socials",
    bgGradient: "linear-gradient(180deg, #1a5c38 0%, #28a55f 50%, #155a30 100%)",
    tagColor: "#4caf50",
  },
  {
    brand: "kfc",
    title: "kipsalon",
    bgGradient: "linear-gradient(180deg, #c62828 0%, #e53935 50%, #b71c1c 100%)",
    tagColor: "#c62828",
    overlayText: "KFC",
  },
  {
    brand: "netflix",
    title: "squid game",
    bgGradient: "linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f0f1a 100%)",
    tagColor: "#e50914",
    overlayText: "SQUID\nGAME",
    overlayColor: "#e50914",
  },
  {
    brand: "kfc",
    title: "lava wings",
    bgGradient: "linear-gradient(180deg, #bf360c 0%, #e65100 50%, #a62e00 100%)",
    tagColor: "#c62828",
    overlayText: "LAVA\nWINGS",
  },
];

const ProjectCard: React.FC<{ project: Project; index: number; totalCards: number }> = ({
  project,
  index,
  totalCards,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Fan layout: cards spread from center
  const centerIdx = (totalCards - 1) / 2;
  const baseRotation = (index - centerIdx) * 6;
  const zIdx = totalCards - Math.abs(Math.round(index - centerIdx));

  return (
    <motion.div
      ref={cardRef}
      className="project-card-tall"
      style={{
        rotate: baseRotation,
        rotateX,
        rotateY,
        transformPerspective: 1000,
        zIndex: zIdx,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        scale: 1.06,
        rotate: 0,
        zIndex: 30,
        transition: { duration: 0.35, ease: "easeOut" },
      }}
      initial={{ opacity: 0, y: 100, rotate: baseRotation + 15 }}
      whileInView={{ opacity: 1, y: 0, rotate: baseRotation }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
    >
      <div
        className="project-card-image"
        style={{ background: project.bgGradient }}
      >
        {project.overlayText && (
          <div
            className="project-overlay-text"
            style={{
              color: project.overlayColor || "white",
              whiteSpace: "pre-line",
            }}
          >
            {project.overlayText}
          </div>
        )}
      </div>
      <div className="project-card-bottom">
        <span
          className="project-brand-tag"
          style={{ background: project.tagColor }}
        >
          {project.brand}
        </span>
        <h3 className="project-card-title" style={{ whiteSpace: "pre-line" }}>
          {project.title}
        </h3>
        <motion.a
          href="#"
          className="project-link"
          whileHover={{ color: "#E84E1B" }}
        >
          View project
        </motion.a>
      </div>
    </motion.div>
  );
};

const ProjectsCarousel: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="projects-section-dark" id="work" ref={ref}>
      <motion.div
        className="projects-drag-labels"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        <span>Drag</span>
        <span>Click</span>
        <span>to Home</span>
      </motion.div>

      {/* Camera sticker */}
      <Sticker x="28%" y={60} delay={0.3}>
        <CameraSticker size={60} />
      </Sticker>

      {/* Lime shape sticker on right */}
      <Sticker x="78%" y={80} delay={0.5}>
        <svg viewBox="0 0 80 80" width={70} height={70}>
          <path
            d="M20,5 Q45,-5 65,15 Q85,35 70,55 Q55,75 30,70 Q5,65 5,40 Q5,15 20,5Z"
            fill="#d4f57a"
            opacity={0.8}
          />
        </svg>
      </Sticker>

      <motion.div
        className="projects-carousel-container"
        drag="x"
        dragConstraints={{ left: -800, right: 200 }}
        dragElastic={0.08}
        dragTransition={{ bounceStiffness: 200, bounceDamping: 30 }}
        style={{ cursor: "grab" }}
        whileTap={{ cursor: "grabbing" }}
      >
        <div className="projects-carousel-row">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} totalCards={projects.length} />
          ))}
        </div>
      </motion.div>

      {/* Active project info */}
      <motion.div
        className="projects-active-info"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8 }}
      >
        <span className="active-brand-tag" style={{ background: "#c9a5e8" }}>
          douwe egberts
        </span>
        <h3 className="active-project-title">
          feestje bouwe?
          <br />
          app douwe
        </h3>
        <motion.a
          href="#"
          className="active-project-link"
          whileHover={{ color: "#E84E1B" }}
        >
          View project
          <motion.svg
            className="wavy-underline"
            viewBox="0 0 120 8"
            preserveAspectRatio="none"
          >
            <path
              d="M0 4 Q15 0 30 4 Q45 8 60 4 Q75 0 90 4 Q105 8 120 4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </motion.svg>
        </motion.a>
      </motion.div>
    </section>
  );
};

export default ProjectsCarousel;
