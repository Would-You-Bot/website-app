"use client";

import blogStyles from "@/styles/blog.module.css";
import { motion, useScroll, useSpring } from "framer-motion";

export function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div className={blogStyles["progress-bar"]} style={{ scaleX }} />
  );
}
