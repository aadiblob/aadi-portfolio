"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import styles from "./AircraftCFDSection.module.css";

type StageId = "research" | "profile" | "geometry" | "mesh";

type Stage = {
  id: StageId;
  number: string;
  label: string;
  title: string;
  description: string;
  tag: string;
};

const stages: Stage[] = [
  {
    id: "research",
    number: "01",
    label: "Aircraft assumptions",
    title: "First-order sizing",
    description:
      "The study began with a realistic business-jet envelope: 6–8 passengers, dual turbofan propulsion, a 390-knot cruise target, and a 35,000–43,000 ft operating altitude. These assumptions established the aerodynamic and propulsion requirements used later in the design.",
    tag: "Research basis",
  },
  {
    id: "profile",
    number: "02",
    label: "Airfoil selection",
    title: "NACA 23012 reference",
    description:
      "A NACA 23012 profile was selected as the two-dimensional section used for the preprocessing study. The normalized chord definition provided a controlled geometry for comparing the theoretical profile with the imported analysis model.",
    tag: "12% thickness",
  },
  {
    id: "geometry",
    number: "03",
    label: "Geometry preparation",
    title: "DesignModeler import",
    description:
      "The coordinate-based airfoil was recreated in ANSYS DesignModeler and aligned to the analysis coordinate system. This stage established a clean, closed profile before the external flow domain and boundary definitions were created.",
    tag: "2D profile",
  },
  {
    id: "mesh",
    number: "04",
    label: "Mesh development",
    title: "Near-wall refinement",
    description:
      "An unstructured triangular domain was refined progressively toward the airfoil. The near-field mesh concentrates elements around the leading edge, trailing edge, and surface boundary so pressure and velocity gradients can be resolved more effectively in Fluent.",
    tag: "Local refinement",
  },
];

const assumptions = [
  ["Passengers", "6–8"],
  ["Propulsion", "Dual turbofan"],
  ["Liftoff velocity", "107 kt / 55.05 m/s"],
  ["Cruise velocity", "390 kt / 200.6 m/s"],
  ["Cruise altitude", "35,000–43,000 ft"],
  ["Takeoff mass", "≈ 6,000 kg"],
  ["Fuselage length", "42 ft / 12.8 m"],
];

const airfoilFacts = [
  ["Profile", "NACA 23012"],
  ["Series", "Five-digit NACA"],
  ["Maximum thickness", "12% chord"],
  ["Geometry basis", "Normalized coordinates"],
  ["Analysis model", "2D external flow"],
];

export function AircraftCFDSection() {
  const [activeId, setActiveId] = useState<StageId>("research");
  const reduceMotion = useReducedMotion();
  const active = stages.find((stage) => stage.id === activeId) ?? stages[0];

  return (
    <section className={styles.section} id="aircraft-cfd">
      <div className={`${styles.intro} section-shell`}>
        <motion.div
          className={styles.copy}
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="project-label">03 / Aerodynamic analysis</p>
          <h2>Subsonic aircraft CFD</h2>
          <div className={styles.statement}>
            <span>Concept sizing.</span>
            <span>Airfoil preprocessing.</span>
          </div>
          <p className={styles.summary}>
            A conceptual midsize business jet inspired by the Cessna Citation II Bravo, developed
            through aerodynamic sizing, drag estimation, propulsion analysis, and structural wing
            loading calculations. The project combines fluid-mechanics theory with real aircraft
            data to establish a realistic first-order design for subsonic cruise.
          </p>
          <div className={styles.meta}>
            <span>ANSYS Fluent</span>
            <span>DesignModeler</span>
            <span>MATLAB</span>
          </div>
        </motion.div>

        <motion.aside
          className={styles.heroData}
          initial={reduceMotion ? false : { opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.9, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Aircraft CFD study overview"
        >
          <div className={styles.heroDataHeader}>
            <span>Study envelope</span>
            <span>Preprocessing</span>
          </div>
          <div className={styles.heroMetric}>
            <span>Aircraft class</span>
            <strong>Midsize business jet</strong>
          </div>
          <div className={styles.heroMetric}>
            <span>Reference section</span>
            <strong>NACA 23012</strong>
          </div>
          <div className={styles.heroMetric}>
            <span>Cruise target</span>
            <strong>390 kt</strong>
          </div>
          <div className={styles.heroMetric}>
            <span>Analysis sequence</span>
            <strong>Sizing → geometry → mesh</strong>
          </div>
          <p className={styles.heroNote}>
            This section documents the preprocessing workflow first. Boundary conditions and Fluent
            results will follow as the solution files are added.
          </p>
        </motion.aside>
      </div>

      <div className={`${styles.sequence} section-shell`}>
        <div className={styles.sequenceHeader}>
          <span>Preprocessing sequence</span>
          <span>{active.number} / 04</span>
        </div>

        <div className={styles.stageNav} role="tablist" aria-label="CFD preprocessing stages">
          {stages.map((stage) => (
            <button
              key={stage.id}
              type="button"
              role="tab"
              aria-selected={activeId === stage.id}
              className={activeId === stage.id ? styles.stageActive : undefined}
              onClick={() => setActiveId(stage.id)}
            >
              <span>{stage.number}</span>
              <span>{stage.label}</span>
            </button>
          ))}
        </div>

        <div className={styles.stagePanel}>
          <div className={styles.visualStage}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                className={styles.visualContent}
                initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.992 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -12, scale: 0.996 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {active.id === "research" ? (
                  <div className={styles.researchTable}>
                    <div className={styles.tableHeading}>
                      <span>Initial design assumptions</span>
                      <span>Business-jet envelope</span>
                    </div>
                    <div className={styles.tableColumns} aria-hidden="true">
                      <span>Parameter</span>
                      <span>Assumption</span>
                    </div>
                    {assumptions.map(([label, value]) => (
                      <div className={styles.tableRow} key={label}>
                        <span>{label}</span>
                        <strong>{value}</strong>
                      </div>
                    ))}
                  </div>
                ) : null}

                {active.id === "profile" ? (
                  <div className={styles.airfoilCard}>
                    <div className={styles.airfoilTitle}>
                      <span>NACA</span>
                      <strong>23012</strong>
                    </div>
                    <div className={styles.airfoilRule} />
                    <dl>
                      {airfoilFacts.map(([label, value]) => (
                        <div key={label}>
                          <dt>{label}</dt>
                          <dd>{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ) : null}

                {active.id === "geometry" ? (
                  <div className={styles.geometryCard}>
                    <div className={styles.geometryFrame}>
                      <img
                        src="/images/aircraft/airfoil-geometry.webp"
                        alt="NACA 23012 airfoil geometry aligned in ANSYS DesignModeler"
                      />
                    </div>
                    <div className={styles.geometryMeta}>
                      <span>Imported coordinate profile</span>
                      <span>DesignModeler</span>
                    </div>
                  </div>
                ) : null}

                {active.id === "mesh" ? (
                  <div className={styles.meshHero}>
                    <img
                      src="/images/aircraft/mesh-detail-wide.webp"
                      alt="Refined triangular mesh around the airfoil and leading-edge region"
                    />
                  </div>
                ) : null}
              </motion.div>
            </AnimatePresence>

            <div className={styles.imageIndex}>
              <span>{active.tag}</span>
              <span>{active.number}</span>
            </div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id}
              className={styles.stageCopy}
              initial={reduceMotion ? false : { opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: -12 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <p>{active.label}</p>
              <h3>{active.title}</h3>
              <p>{active.description}</p>

              {active.id === "research" ? (
                <div className={styles.stageCallout}>
                  The rebuilt table replaces the original presentation slide so the assumptions read
                  as part of the portfolio rather than as an embedded screenshot.
                </div>
              ) : null}

              {active.id === "profile" ? (
                <div className={styles.stageCallout}>
                  The blurry source plot has been removed. The section now emphasizes the selected
                  profile and the geometric definition carried into ANSYS.
                </div>
              ) : null}

              {active.id === "mesh" ? (
                <div className={styles.meshPair}>
                  <figure>
                    <img src="/images/aircraft/mesh-domain.webp" alt="Full triangular CFD domain mesh" />
                    <figcaption>Domain mesh</figcaption>
                  </figure>
                  <figure>
                    <img
                      src="/images/aircraft/mesh-boundary-layer.webp"
                      alt="Close view of refined cells at the airfoil leading edge"
                    />
                    <figcaption>Surface refinement</figcaption>
                  </figure>
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.pendingNote}>
          <span>Next phase</span>
          <span>Boundary conditions · Fluent solution · aerodynamic results</span>
        </div>
      </div>
    </section>
  );
}
