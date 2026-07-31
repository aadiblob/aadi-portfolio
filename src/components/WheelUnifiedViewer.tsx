"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CSSProperties, useMemo, useState } from "react";
import { WheelModel, WheelRenderMode } from "./WheelModel";
import styles from "./WheelUnifiedViewer.module.css";

type Iteration = "V1" | "V3";
type ViewMode = "CAD" | "LOAD" | "MESH" | "STRESS";

const VIEWS: Array<{ key: ViewMode; label: string }> = [
  { key: "CAD", label: "CAD" },
  { key: "LOAD", label: "Bearing load" },
  { key: "MESH", label: "Mesh" },
  { key: "STRESS", label: "Principal stress" },
];

const ITERATIONS = {
  V1: {
    label: "Original",
    cad: "/models/wheel-v1.glb",
    fea: "/models/wheel-v1-fea.glb",
    stress: "6.454",
    mass: "10.37 kg",
    deformation: "0.0438 mm",
    nodes: "31,114",
  },
  V3: {
    label: "Revised",
    cad: "/models/wheel-v3.glb",
    fea: "/models/wheel-v3-fea.glb",
    stress: "4.758",
    mass: "9.700 kg",
    deformation: "0.0524 mm",
    nodes: "71,153",
  },
} as const;

const DESCRIPTIONS: Record<Iteration, Record<ViewMode, string>> = {
  V1: {
    CAD: "V1 began as a clean-sheet Onshape model: a simple six-spoke wheel sized to 19 × 9.5 in, a common sports-car envelope. At 22.87 lb, the baseline landed close to the roughly 21.2 lb Volk TE37 reference, giving the optimization a realistic starting point while preserving the proportions and silhouette I wanted.",
    LOAD: "The rear mounting face is fixed while a 1000 N bearing load acts on the inner cylindrical barrel in the model's Y direction. The same boundary conditions are used for V1 and V3.",
    MESH: "The spokes and refined geometry around the hub use an element size of 5, while the barrel uses an element size of 100.",
    STRESS: "Maximum principal stress is shown from the exported ANSYS vertex-color field.",
  },
  V3: {
    CAD: "Inspect the revised six-spoke geometry after the mass-removal and fillet changes, without simulation overlays.",
    LOAD: "The rear mounting face is fixed while a 1000 N bearing load acts on the inner cylindrical barrel in the model's Y direction. The same boundary conditions are used for V1 and V3.",
    MESH: "The spokes and refined geometry around the hub use an element size of 5, while the barrel uses an element size of 100.",
    STRESS: "Maximum principal stress is shown from the exported ANSYS vertex-color field.",
  },
};

function getRenderMode(view: ViewMode): WheelRenderMode {
  if (view === "MESH") return "mesh";
  if (view === "STRESS") return "stress";
  return "cad";
}

export function WheelUnifiedViewer() {
  const [iteration, setIteration] = useState<Iteration>("V1");
  const [viewIndex, setViewIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const view = VIEWS[viewIndex].key;
  const active = ITERATIONS[iteration];
  const renderMode = getRenderMode(view);
  const src = view === "MESH" || view === "STRESS" ? active.fea : active.cad;

  const sliderStyle = useMemo(
    () => ({ "--viewer-progress": `${(viewIndex / (VIEWS.length - 1)) * 100}%` }) as CSSProperties,
    [viewIndex],
  );

  return (
    <section className={`${styles.section} section-shell`} id="wheel-viewer">
      <div className={styles.heading}>
        <span>Wheel study / interactive analysis</span>
        <span>V1 ↔ V3</span>
      </div>

      <div className={styles.controls}>
        <div className={styles.iterationControl} aria-label="Select wheel iteration">
          <span className={styles.controlLabel}>Iteration</span>
          <div className={styles.iterationButtons}>
            {(Object.keys(ITERATIONS) as Iteration[]).map((item) => (
              <button
                key={item}
                type="button"
                className={iteration === item ? styles.activeIteration : ""}
                aria-pressed={iteration === item}
                onClick={() => setIteration(item)}
              >
                <strong>{item}</strong>
                <span>{ITERATIONS[item].label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.viewControl} style={sliderStyle}>
          <div className={styles.viewHeader}>
            <label className={styles.controlLabel} htmlFor="wheel-view-slider">View mode</label>
            <span className={styles.controlHint}>Drag the slider or select a stage</span>
          </div>
          <input
            id="wheel-view-slider"
            className={styles.slider}
            type="range"
            min="0"
            max={VIEWS.length - 1}
            step="1"
            value={viewIndex}
            onChange={(event) => setViewIndex(Number(event.target.value))}
            aria-valuetext={VIEWS[viewIndex].label}
          />
          <div className={styles.viewLabels}>
            {VIEWS.map((item, index) => (
              <button
                type="button"
                key={item.key}
                className={viewIndex === index ? styles.activeView : ""}
                onClick={() => setViewIndex(index)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.viewerGrid}>
        <div className={styles.stage}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${iteration}-${view}`}
              className={styles.modelLayer}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 1.015 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <WheelModel
                src={src}
                label={`${iteration} wheel — ${VIEWS[viewIndex].label}`}
                autoRotate={view === "CAD"}
                modelScale={0.68}
                renderMode={renderMode}
              />
            </motion.div>
          </AnimatePresence>

          <div className={styles.topline}>
            <span>{iteration} / {active.label}</span>
            <span>{VIEWS[viewIndex].label}</span>
          </div>

          {view === "LOAD" && (
            <div className={styles.loadOverlay} aria-hidden="true">
              <span className={styles.constraintRing} />
              <span className={styles.loadArrow} />
              <span className={styles.loadText}>1000 N bearing load · Y · barrel</span>
              <span className={styles.constraintText}>Fixed support · mounting face</span>
            </div>
          )}

          {view === "MESH" && (
            <div className={styles.meshNote} aria-hidden="true">
              <span>Spokes + hub refinement</span><strong>5</strong>
              <span>Barrel</span><strong>100</strong>
            </div>
          )}

          {view === "STRESS" && (
            <div className={styles.legend} aria-label="Maximum principal stress legend in megapascals">
              <div><span>Maximum principal stress</span><span>MPa</span></div>
              <i />
              <div><span>−0.76</span><span>6.45</span></div>
            </div>
          )}
        </div>

        <aside className={styles.data}>
          <div className={styles.modeCopy}>
            <span>{VIEWS[viewIndex].label}</span>
            <p>{DESCRIPTIONS[iteration][view]}</p>
          </div>

          <div className={styles.primaryMetric}>
            <span>Maximum principal stress</span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.strong
                key={active.stress}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                {active.stress}<small> MPa</small>
              </motion.strong>
            </AnimatePresence>
          </div>

          <dl className={styles.specs}>
            <div><dt>Mass</dt><dd>{active.mass}</dd></div>
            <div><dt>Max deformation</dt><dd>{active.deformation}</dd></div>
            <div><dt>FEA nodes</dt><dd>{active.nodes}</dd></div>
            <div><dt>Envelope</dt><dd>19 × 9.5 in</dd></div>
          </dl>

          <div className={styles.delta}>
            <strong>−26.3%</strong>
            <span>V1 → V3 peak principal stress</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
