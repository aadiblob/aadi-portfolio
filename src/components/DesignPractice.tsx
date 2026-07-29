"use client";

import { motion, useReducedMotion } from "motion/react";
import styles from "./DesignPractice.module.css";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const details = [
  ["Primary CAD", "Onshape"],
  [
    "Additional software",
    "SolidWorks · Autodesk AutoCAD · ANSYS Workbench · Mechanical · Discovery · DesignModeler · Siemens NX · Simcenter 3D · MATLAB · GT-SUITE",
  ],
  ["Methods", "CAD · FEA · CFD · Testing · Prototyping"],
];

export function DesignPractice() {
  const reduceMotion = useReducedMotion();

  return (
    <section className={`${styles.section} section-shell`}>
      <motion.div
        className={styles.intro}
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.78, delay: 0.04, ease }}
      >
        <span>Approach</span>
        <p>
          CAD is where most of my ideas become tangible. I use Onshape as my primary modeling tool
          and pair geometry development with simulation, testing, and prototyping to understand how
          a design performs, not just how it looks.
        </p>
      </motion.div>

      <motion.dl
        className={styles.details}
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.55 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        {details.map(([term, value]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </motion.dl>
    </section>
  );
}
