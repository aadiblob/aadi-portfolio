"use client";

import { motion, useReducedMotion } from "motion/react";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero section-shell" id="top">
      <div className="hero-construction" aria-hidden="true">
        <motion.span
          className="construction-line construction-line-x"
          initial={reduceMotion ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.span
          className="construction-line construction-line-y"
          initial={reduceMotion ? false : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.span
          className="construction-node"
          initial={reduceMotion ? false : { opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.05 }}
        />
      </div>

      <div className="hero-main">
        <motion.p
          className="hero-role"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
        >
          Mechanical Engineering · The Ohio State University
        </motion.p>

        <h1 aria-label="Aaditya Patil">
          <span className="hero-name-line">
            <motion.span
              initial={reduceMotion ? false : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              Aaditya Patil
            </motion.span>
          </span>
        </h1>
      </div>

      <motion.div
        className="hero-footer hero-footer-minimal"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.72 }}
      >
        <a className="hero-scroll" href="#work">
          Selected work <span aria-hidden="true">↓</span>
        </a>
      </motion.div>
    </section>
  );
}
