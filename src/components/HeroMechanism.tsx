"use client";

import { motion, useReducedMotion } from "motion/react";

export function HeroMechanism() {
  const reduceMotion = useReducedMotion();
  const pathInitial = reduceMotion ? false : { pathLength: 0, opacity: 0 };
  const pathAnimate = { pathLength: 1, opacity: 1 };
  const pathTransition = {
    duration: 1.8,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <div className="hero-mechanism" aria-hidden="true">
      <motion.svg viewBox="0 0 640 640" role="presentation">
        <motion.circle cx="320" cy="320" r="226" className="line-dim" initial={pathInitial} animate={pathAnimate} transition={pathTransition} />
        <motion.circle
          cx="320"
          cy="320"
          r="146"
          className="line-bright"
          initial={pathInitial}
          animate={pathAnimate}
          transition={{ ...pathTransition, delay: 0.15 }}
        />
        <motion.path
          d="M320 174c80 0 146 65 146 146s-66 146-146 146c-51 0-92-41-92-92s41-92 92-92c28 0 51 23 51 51s-23 51-51 51c-11 0-20-9-20-20s9-20 20-20"
          className="line-bright"
          initial={pathInitial}
          animate={pathAnimate}
          transition={{ ...pathTransition, delay: 0.35 }}
        />
        <motion.line x1="78" y1="320" x2="562" y2="320" className="line-dim" initial={pathInitial} animate={pathAnimate} transition={pathTransition} />
        <motion.line x1="320" y1="78" x2="320" y2="562" className="line-dim" initial={pathInitial} animate={pathAnimate} transition={pathTransition} />

        <motion.g
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 26, ease: "linear", repeat: Infinity }}
          style={{ transformOrigin: "320px 320px" }}
        >
          <circle cx="320" cy="94" r="6" className="node" />
          <circle cx="546" cy="320" r="6" className="node" />
          <circle cx="320" cy="546" r="6" className="node" />
          <circle cx="94" cy="320" r="6" className="node" />
        </motion.g>
      </motion.svg>

      <div className="hero-note hero-note-a">
        <span>01</span>
        Design intent
      </div>
      <div className="hero-note hero-note-b">
        <span>02</span>
        Simulate
      </div>
      <div className="hero-note hero-note-c">
        <span>03</span>
        Refine
      </div>
    </div>
  );
}
