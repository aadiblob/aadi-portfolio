"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

const projects = [
  { number: "01", title: "Wheel Structural Optimization", meta: "ANSYS · Onshape · FEA" },
  { number: "02", title: "Roots Supercharger", meta: "CAD · Assembly · CFD" },
  { number: "03", title: "Subsonic Aircraft CFD", meta: "Fluent · Aerodynamics · MATLAB" },
];

const containerVariants = {
  hidden: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
  visible: {
    transition: { delayChildren: 0.1, staggerChildren: 0.15 },
  },
};

const rowVariants = {
  hidden: {
    opacity: 0,
    y: 46,
    transition: { duration: 0.25 },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.78,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(sectionRef, { amount: 0.3, margin: "-8% 0px -8% 0px" });
  const state = reduceMotion ? "visible" : inView ? "visible" : "hidden";

  return (
    <section className="selected-work section-shell" id="work" ref={sectionRef}>
      <motion.div
        className="selected-work-header"
        initial={false}
        animate={state === "visible" ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <span>Selected work</span>
        <span>2024—2026</span>
      </motion.div>

      <motion.div
        className="project-index"
        variants={containerVariants}
        initial={false}
        animate={state}
      >
        {projects.map((project, index) => (
          <motion.a
            key={project.number}
            className="project-index-row"
            href={index === 0 ? "#wheel" : index === 1 ? "#supercharger" : "#aircraft-cfd"}
            variants={rowVariants}
          >
            <span className="project-index-number">{project.number}</span>
            <span className="project-index-title">{project.title}</span>
            <span className="project-index-meta">{project.meta}</span>
            <span className="project-index-arrow" aria-hidden="true">↘</span>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
