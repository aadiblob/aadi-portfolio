"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { SuperchargerModel } from "./SuperchargerModel";
import styles from "./SuperchargerSpotlight.module.css";

export function SuperchargerSpotlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [exploded, setExploded] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const modelY = useTransform(scrollYProgress, [0, 1], [28, -28]);
  const copyY = useTransform(scrollYProgress, [0, 1], [18, -24]);

  return (
    <section
      className={styles.section}
      data-exploded={exploded ? "true" : "false"}
      id="supercharger"
      ref={sectionRef}
    >
      <div className={`${styles.grid} ${exploded ? styles.gridExploded : ""} section-shell`}>
        <motion.div
          className={`${styles.copy} ${exploded ? styles.copyExploded : ""}`}
          style={reduceMotion || exploded ? undefined : { y: copyY }}
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={exploded ? undefined : { opacity: 1 }}
          animate={{
            x: exploded && !reduceMotion ? "-118%" : 0,
            opacity: exploded ? 0 : 1,
          }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.9, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden={exploded}
        >
          <p className="project-label">02 / Mechanical assembly</p>
          <h2>Roots supercharger</h2>
          <div className={styles.statement}>
            <span>Component-level CAD.</span>
            <span>Interactive assembly.</span>
          </div>
          <p className={styles.summary}>
            A full mechanical assembly developed to study twin-rotor packaging, timing-drive layout,
            bearing support, sealing, and serviceable component architecture.
          </p>
          <div className={styles.meta}>
            <span>Onshape</span>
            <span>Assembly design</span>
            <span>2026</span>
          </div>
        </motion.div>

        <motion.div
          className={`${styles.viewer} ${exploded ? styles.viewerExploded : ""}`}
          style={reduceMotion || exploded ? undefined : { y: modelY }}
          animate={{ scale: exploded && !reduceMotion ? 1.04 : 1 }}
          transition={{ duration: reduceMotion ? 0.01 : 1.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <SuperchargerModel exploded={exploded} modelScale={1.05} />
        </motion.div>
      </div>

      <div className={`${styles.actionBar} section-shell`}>
        <button
          type="button"
          className={`${styles.explodeButton} ${exploded ? styles.explodeButtonActive : ""}`}
          aria-pressed={exploded}
          onClick={() => setExploded((current) => !current)}
        >
          <span>{exploded ? "Assemble" : "Explode"}</span>
          <span className={styles.buttonMark} aria-hidden="true">
            {exploded ? "−" : "+"}
          </span>
        </button>
      </div>
    </section>
  );
}
