"use client";

import { motion, useReducedMotion } from "motion/react";

const projects = [
  { number: "01", title: "Wheel Structural Optimization", meta: "ANSYS · Onshape · FEA" },
  { number: "02", title: "Roots Supercharger", meta: "CAD · Assembly · CFD" },
  { number: "03", title: "Subsonic Aircraft CFD", meta: "Fluent · Aerodynamics · MATLAB" },
];

export function SelectedWork() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="selected-work section-shell" id="work">
      <motion.div
        className="selected-work-header"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <span>Selected work</span>
        <span>2024—2026</span>
      </motion.div>

      <div className="project-index">
        {projects.map((project, index) => (
          <motion.a
            key={project.number}
            className="project-index-row"
            href={index === 0 ? "#wheel" : "#contact"}
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.65 }}
            transition={{ duration: 0.65, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="project-index-number">{project.number}</span>
            <span className="project-index-title">{project.title}</span>
            <span className="project-index-meta">{project.meta}</span>
            <span className="project-index-arrow" aria-hidden="true">↘</span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
