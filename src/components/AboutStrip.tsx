"use client";

import { motion, useReducedMotion } from "motion/react";

export function AboutStrip() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="about-strip section-shell" id="about">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
      >
        <span className="project-label">About</span>
        <p>
          Senior mechanical engineering student at The Ohio State University focused on simulation,
          mechanical design, and product development.
        </p>
      </motion.div>
      <div className="about-strip-meta">
        <span>CAD · FEA · CFD</span>
        <span>Columbus, Ohio</span>
        <span>Full-time / 2027</span>
      </div>
    </section>
  );
}
