"use client";

import React, { useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Sticker, {
  CameraSticker,
  PhoneSticker,
  BigSmileySticker,
  MonsterSticker,
  HeartSparkleSticker,
} from "./Sticker";

interface ServiceCardData {
  title: string;
  color: string;
  rotation: number;
  items: string[];
  StickerIcon: React.FC<{ size?: number }>;
  stickerSize: number;
}

const services: ServiceCardData[] = [
  {
    title: "brand",
    color: "#2d7a5f",
    rotation: -10,
    items: [
      "Brand Strategy",
      "360° Creative",
      "Art Direction",
      "Copywriting",
      "Editing",
      "Motion Graphics",
      "DTP",
    ],
    StickerIcon: CameraSticker,
    stickerSize: 60,
  },
  {
    title: "social",
    color: "#5b7bf5",
    rotation: -5,
    items: [
      "Social Media Strategy",
      "Social Media Creative",
      "TikTok/Social Shoots",
      "Influencer Campaigns",
      "Scheduling Support",
      "Community Management",
      "Social Listening",
    ],
    StickerIcon: PhoneSticker,
    stickerSize: 55,
  },
  {
    title: "activations",
    color: "#e84e1b",
    rotation: 0,
    items: [
      "Activation Strategy",
      "Event Planning",
      "Art Direction",
      "Production",
    ],
    StickerIcon: BigSmileySticker,
    stickerSize: 65,
  },
  {
    title: "video\nproduction",
    color: "#8b3a62",
    rotation: 5,
    items: [
      "Campaign video",
      "Branded content",
      "Social content",
      "Marketing materials",
    ],
    StickerIcon: MonsterSticker,
    stickerSize: 60,
  },
  {
    title: "with\npartners",
    color: "#c9a5e8",
    rotation: 10,
    items: ["PR/Journalism", "3D / VFX", "food styling", "Photography"],
    StickerIcon: HeartSparkleSticker,
    stickerSize: 55,
  },
];

const ServiceCard: React.FC<{
  service: ServiceCardData;
  index: number;
}> = ({ service, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
  const tiltY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);

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

  return (
    <motion.div
      ref={cardRef}
      className="service-card"
      style={{
        background: service.color,
        marginLeft: index > 0 ? -25 : 0,
        rotateX: tiltX,
        rotateY: tiltY,
        transformPerspective: 900,
      }}
      initial={{ opacity: 0, y: 120, rotate: service.rotation + 20 }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotate: service.rotation,
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{
        rotate: 0,
        y: -35,
        scale: 1.06,
        zIndex: 25,
        transition: { duration: 0.35, ease: "easeOut" },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Sticker x="auto" y={-35} style={{ right: 18, left: "auto" }} delay={0.5 + index * 0.1}>
        <service.StickerIcon size={service.stickerSize} />
      </Sticker>

      <h3 className="card-title" style={{ whiteSpace: "pre-line" }}>
        {service.title}
      </h3>
      <div className="card-divider" />
      <ul className="card-list">
        {service.items.map((item, i) => (
          <li key={i}>✦ {item}</li>
        ))}
      </ul>
    </motion.div>
  );
};

const ServicesSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="services-section" id="services" ref={ref}>
      <motion.h2
        className="services-title"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        call us if you <em>need:</em>
        {/* Underline swish */}
        <motion.svg
          className="services-underline-svg"
          viewBox="0 0 120 12"
          preserveAspectRatio="none"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <motion.path
            d="M5 6 Q30 2 60 8 Q90 12 115 4"
            fill="none"
            stroke="#111"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </motion.svg>
      </motion.h2>

      <div className="services-cards">
        {services.map((service, i) => (
          <ServiceCard key={i} service={service} index={i} />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
