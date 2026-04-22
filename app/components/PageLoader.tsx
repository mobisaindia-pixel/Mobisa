"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PageLoader: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
        >
          <motion.span
            className="loader-text"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 1, 1, 0.4, 1],
              scale: [0.8, 1, 1.02, 0.98, 1],
            }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          >
            truus
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
