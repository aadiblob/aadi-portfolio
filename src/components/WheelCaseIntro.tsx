"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { WheelModel } from "./WheelModel";

const iterations = {
  V1: {
    src: "/models/wheel-v1.glb",
    stress: "6.454",
    title: "Original",
    description: "Baseline six-spoke geometry",
  },
  V3: {
    src: "/models/wheel-v3.glb",
    stress: "4.758",
    title: "Revised",
    description: "Optimized geometry",
  },
} as const;

type Iteration = keyof typeof iterations;

export function WheelCaseIntro() {
  const [iteration, setIteration] = useState<Iteration>("V1");
  const reduceMotion = useReducedMotion();
  const active = iterations[iteration];

  return (
    <section className="wheel-case section-shell">
      <div className="case-rule" />

      <div className="case-intro-grid">
        <motion.div
          className="case-intro-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.75 }}
        >
          <p className="project-label">Baseline → revision</p>
          <p>
            The project compares two CAD iterations using the same overall wheel envelope. The current
            ANSYS dataset shows a reduction in maximum principal stress from the baseline geometry to
            the revised design.
          </p>
        </motion.div>

        <div className="case-iteration-control" aria-label="Wheel iteration selector">
          <span className="case-iteration-label">View iteration</span>
          {(Object.keys(iterations) as Iteration[]).map((item) => (
            <button
              key={item}
              type="button"
              className={iteration === item ? "is-active" : ""}
              aria-pressed={iteration === item}
              onClick={() => setIteration(item)}
            >
              <span className="iteration-code">{item}</span>
              <span className="iteration-name">{iterations[item].title}</span>
              <small>{iterations[item].description}</small>
            </button>
          ))}
        </div>
      </div>

      <div className="case-viewer-row">
        <div className="case-viewer">
          <AnimatePresence mode="wait">
            <motion.div
              key={iteration}
              className="case-model-wrap"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.35 }}
            >
              <WheelModel
                src={active.src}
                label={`Interactive ${iteration} wheel geometry`}
                autoRotate={false}
                modelScale={0.94}
              />
            </motion.div>
          </AnimatePresence>
          <span className="case-viewer-caption">Geometry / {iteration}</span>
        </div>

        <div className="case-results">
          <div className="case-result">
            <span className="case-result-label">Maximum principal stress</span>
            <AnimatePresence mode="wait">
              <motion.strong
                key={active.stress}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                {active.stress}<small> MPa</small>
              </motion.strong>
            </AnimatePresence>
          </div>

          <div className="case-result case-result-delta">
            <span className="case-result-label">V1 → V3</span>
            <strong>−26.3<small>%</small></strong>
            <span>peak principal stress</span>
          </div>

          <dl className="case-specs">
            <div><dt>Wheel</dt><dd>19 × 9.5 in</dd></div>
            <div><dt>Architecture</dt><dd>6-spoke</dd></div>
            <div><dt>Analysis</dt><dd>Static structural</dd></div>
            <div><dt>Mass</dt><dd>Pending final lock</dd></div>
          </dl>
        </div>
      </div>

      <div className="case-next">
        <span>Next / Load case · mesh · stress field</span>
        <span>Design system preview</span>
      </div>
    </section>
  );
}
