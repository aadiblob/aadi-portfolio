"use client";

import { useState } from "react";
import { BedFrameModel } from "./BedFrameModel";
import styles from "./BedFrameSection.module.css";

const metrics = ["13 wood members", "9 longitudinal slats", "4 notched supports", "54 × 75 in assembled envelope"];

const rationale = [
  { number: "01", title: "Reduced flex", text: "The longitudinal 2×4 members are oriented on edge. For the same rectangular member, this produces approximately four times the second moment of area about the relevant bending axis compared with laying it flat." },
  { number: "02", title: "Design for disassembly", text: "Notched supports locate the longitudinal members without permanent screws, brackets, or specialized hardware." },
  { number: "03", title: "Flat-pack transportation", text: "The frame separates into straight lumber members that can be stacked into a compact bundle for moving or storage." },
];

export function BedFrameSection() {
  const [packed, setPacked] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  return (
    <section className={styles.section} id="bed-frame">
      <div className={`${styles.header} section-shell`}>
        <p className={styles.eyebrow}>04 / Product design</p>
        <div className={styles.titleRow}>
          <h2>Japanese Joinery<br />Modular Bedframe</h2>
          <p>A fastener-free furniture concept inspired by Japanese joinery and developed for student housing, using standard lumber and notched supports to reduce part count, simplify transportation, and create a straightforward assembly.</p>
        </div>
      </div>

      <div className={`${styles.viewerShell} section-shell`}>
        <div className={styles.viewer}>
          <BedFrameModel packed={packed} onTransitionChange={setTransitioning} />
          <div className={styles.viewerTopline}>
            <span>Japanese Joinery Modular Bedframe</span>
            <span>{packed ? "Packed" : "Assembled"}</span>
          </div>
          <span className={styles.hint}>Drag to inspect</span>
          <button
            type="button"
            className={styles.toggle}
            aria-pressed={packed}
            disabled={transitioning}
            onClick={() => setPacked((value) => !value)}
          >
            <span>{packed ? "EXPAND FRAME" : "PACK FLAT"}</span>
            <span className={styles.buttonMark} aria-hidden="true">{packed ? "−" : "+"}</span>
          </button>
        </div>
      </div>

      <div className={`${styles.details} section-shell`}>
        <div className={styles.metrics} aria-label="Technical metrics">
          {metrics.map((metric, index) => <div key={metric}><span>0{index + 1}</span><strong>{metric}</strong></div>)}
        </div>

        <div className={styles.rationale}>
          <div className={styles.rationaleHeading}><p>Engineering rationale</p><span>Concept development</span></div>
          {rationale.map((item) => (
            <article key={item.number}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <aside className={styles.validation}>
          <span>Validation note</span>
          <p>The CAD establishes the assembly strategy and dimensional layout. Physical prototyping would be required to validate joint fit, squeak resistance, load capacity, wear, and final material cost.</p>
        </aside>
      </div>
    </section>
  );
}
