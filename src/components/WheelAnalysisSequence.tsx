"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { WheelAnalysisMode, WheelAnalysisViewer } from "./WheelAnalysisViewer";

type AnalysisStep = {
  number: string;
  kicker: string;
  title: string;
  body: string;
  mode: WheelAnalysisMode;
  details?: Array<[string, string]>;
  result?: boolean;
};

const STEPS: AnalysisStep[] = [
  {
    number: "01",
    kicker: "Geometry",
    title: "Baseline",
    body: "The original six-spoke wheel establishes the geometry used for the structural comparison. The 19 × 9.5 in envelope is carried into the revision.",
    mode: "cad-v1",
    details: [
      ["Iteration", "V1"],
      ["Architecture", "6-spoke"],
      ["Material", "Aluminum alloy"],
    ],
  },
  {
    number: "02",
    kicker: "Analysis setup",
    title: "Load case",
    body: "The mounting interface is constrained and the wheel is evaluated under the same static structural load case used for both iterations.",
    mode: "load-v1",
    details: [
      ["Support", "Hub mounting interface"],
      ["Load", "Remote load"],
      ["Solver", "ANSYS Mechanical"],
    ],
  },
  {
    number: "03",
    kicker: "Discretization",
    title: "Mesh",
    body: "The ANSYS result surface is shown directly here rather than a decorative web mesh. The baseline nodal export contains 31,114 result nodes.",
    mode: "mesh-v1",
    details: [
      ["Dataset", "V1 FEA result"],
      ["Result nodes", "31,114"],
      ["View", "Surface mesh"],
    ],
  },
  {
    number: "04",
    kicker: "Baseline result",
    title: "6.454 MPa",
    body: "Maximum principal stress from the V1 ANSYS result. The marker identifies the peak reported by the exported result field.",
    mode: "stress-v1",
    details: [
      ["Result", "Maximum principal stress"],
      ["Peak", "6.454 MPa"],
      ["Legend", "Shared comparison scale"],
    ],
  },
  {
    number: "05",
    kicker: "Geometry revision",
    title: "V1 → V3",
    body: "Low-value material is removed while spoke and transition geometry are refined. The overall wheel envelope remains unchanged so the two iterations can be compared directly.",
    mode: "cad-v3",
    details: [
      ["Iteration", "V3"],
      ["Envelope", "19 × 9.5 in"],
      ["Objective", "Reduce mass + peak stress"],
    ],
  },
  {
    number: "06",
    kicker: "Revised result",
    title: "4.758 MPa",
    body: "With both contours displayed on the same legend range, the revised geometry reduces the reported peak maximum principal stress by 26.3%.",
    mode: "stress-v3",
    result: true,
  },
];

export function WheelAnalysisSequence() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const active = STEPS[activeIndex];

  return (
    <section className="analysis-sequence section-shell" id="wheel-analysis">
      <div className="analysis-sequence-rule" />

      <div className="analysis-sequence-heading">
        <span>Analysis sequence</span>
        <span>V1 → V3</span>
      </div>

      <div className="analysis-sequence-grid">
        <div className="analysis-sticky-column">
          <div className="analysis-sticky-viewer">
            <WheelAnalysisViewer mode={active.mode} />
          </div>
        </div>

        <div className="analysis-step-column">
          {STEPS.map((step, index) => (
            <motion.article
              key={step.number}
              className={`analysis-step ${activeIndex === index ? "is-active" : ""}`}
              onViewportEnter={() => setActiveIndex(index)}
              viewport={{ amount: 0.58 }}
              initial={reduceMotion ? false : { opacity: 0.35 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
            >
              <div className="analysis-step-index">
                <span>{step.number}</span>
                <span>{step.kicker}</span>
              </div>

              {step.result ? (
                <div className="analysis-final-result">
                  <div>
                    <span>V1</span>
                    <strong>6.454</strong>
                    <small>MPa</small>
                  </div>
                  <span className="analysis-result-arrow">→</span>
                  <div>
                    <span>V3</span>
                    <strong>4.758</strong>
                    <small>MPa</small>
                  </div>
                  <div className="analysis-result-delta">
                    <strong>−26.3%</strong>
                    <span>peak principal stress</span>
                  </div>
                </div>
              ) : (
                <h3>{step.title}</h3>
              )}

              <p>{step.body}</p>

              {step.details && (
                <dl className="analysis-step-details">
                  {step.details.map(([term, value]) => (
                    <div key={term}>
                      <dt>{term}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </motion.article>
          ))}
        </div>
      </div>

      <div className="analysis-sequence-end">
        <span>Next / design changes + mass reduction</span>
        <span>Wheel study</span>
      </div>
    </section>
  );
}
