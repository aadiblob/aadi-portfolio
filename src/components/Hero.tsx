"use client";

import { motion, useReducedMotion } from "motion/react";
import { HeroMechanism } from "./HeroMechanism";

const words = ["Engineering,", "made visible."];

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero section-shell" id="top">
      <div className="hero-grid">
        <div className="hero-copy">
          <motion.p
            className="eyebrow"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            Mechanical systems · Simulation · Product development
          </motion.p>

          <h1>
            {words.map((word, index) => (
              <span className="hero-line" key={word}>
                <motion.span
                  initial={reduceMotion ? false : { y: "115%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1,
                    delay: 0.2 + index * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            className="hero-bottom"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
          >
            <p>
              I turn mechanical ideas into testable systems through CAD, FEA,
              CFD, and clear technical storytelling.
            </p>
            <a className="text-link" href="#work">
              Explore selected work <span aria-hidden="true">↓</span>
            </a>
          </motion.div>
        </div>

        <HeroMechanism />
      </div>

      <div className="hero-index" aria-hidden="true">
        <span>Portfolio / 2026</span>
        <span>Columbus, Ohio</span>
        <span>Available for full-time roles</span>
      </div>
    </section>
  );
}
