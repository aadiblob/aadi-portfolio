"use client";

import { motion, useReducedMotion } from "motion/react";
import styles from "./AboutStrip.module.css";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export function AboutStrip() {
  const reduceMotion = useReducedMotion();

  return (
    <section className={`${styles.about} section-shell`} id="about">
      <motion.div
        className={styles.header}
        initial={reduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={reveal}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span>About</span>
        <span>Profile / 2026</span>
      </motion.div>

      <div className={styles.grid}>
        <motion.article
          className={styles.block}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.45 }}
          variants={reveal}
          transition={{ duration: 0.8, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.label}>Outside engineering</span>
          <p className={styles.primaryCopy}>
            I try to keep my life broad outside engineering. I train consistently, spend as much
            time outdoors as possible, and am working toward visiting every U.S. national park. I
            have also been learning music production and vocal mixing.
          </p>
        </motion.article>

        <motion.article
          className={styles.block}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.45 }}
          variants={reveal}
          transition={{ duration: 0.8, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.label}>Design practice</span>
          <p className={styles.secondaryCopy}>
            CAD is where most of my ideas become tangible. I use Onshape as my primary modeling
            tool and have additional experience in SolidWorks and Autodesk AutoCAD. Across
            personal, academic, and internship work, I pair CAD with FEA, CFD, testing, and
            prototyping to understand how a design performs—not just how it looks.
          </p>
        </motion.article>
      </div>

      <motion.div
        className={styles.meta}
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.7, delay: 0.22 }}
      >
        <span>CAD · FEA · CFD · Prototyping</span>
        <span>Mechanical Engineering · Class of 2027</span>
      </motion.div>
    </section>
  );
}
