"use client";

import { motion, useReducedMotion } from "motion/react";

const projects = [
  { number: "01", title: "Wheel Structural Optimization", meta: "ANSYS · Onshape · FEA" },
  { number: "02", title: "Roots Supercharger", meta: "CAD · Assembly · CFD" },
  { number: "03", title: "Subsonic Aircraft CFD", meta: "Fluent · Aerodynamics · MATLAB" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.14,
      staggerChildren: 0.13,
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 42 },
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
  const reduceMotion = useReducedMotion();

  return (
    <section className="selected-work section-shell" id="work">
      <motion.div
        className="selected-work-header"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.55 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <span>Selected work</span>
        <span>2024—2026</span>
      </motion.div>

      <motion.div
        className="project-index"
        variants={reduceMotion ? undefined : containerVariants}
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.28 }}
      >
        {projects.map((project, index) => (
          <motion.a
            key={project.number}
            className="project-index-row"
            href={index === 0 ? "#wheel" : "#contact"}
            variants={reduceMotion ? undefined : rowVariants}
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
