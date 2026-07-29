"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { WheelModel } from "./WheelModel";

export function WheelSpotlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const modelY = useTransform(scrollYProgress, [0, 1], [34, -34]);
  const copyY = useTransform(scrollYProgress, [0, 1], [20, -30]);

  return (
    <section className="wheel-spotlight" id="wheel" ref={sectionRef}>
      <div className="wheel-spotlight-grid section-shell">
        <motion.div
          className="wheel-spotlight-copy"
          style={reduceMotion ? undefined : { y: copyY }}
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8 }}
        >
          <p className="project-label">01 / Structural optimization</p>
          <h2>Wheel structural optimization</h2>
          <div className="spotlight-statement" aria-label="Lighter geometry. Lower peak stress.">
            <span>Lighter geometry.</span>
            <span>Lower peak stress.</span>
          </div>
          <div className="spotlight-meta">
            <span>ANSYS Mechanical</span>
            <span>Onshape</span>
            <span>2026</span>
          </div>
        </motion.div>

        <motion.div className="wheel-spotlight-model" style={reduceMotion ? undefined : { y: modelY }}>
          <WheelModel
            src="/models/wheel-v3.glb"
            label="Interactive revised six-spoke wheel model"
            modelScale={0.82}
          />
        </motion.div>
      </div>

      <div className="spotlight-baseline section-shell" aria-hidden="true">
        <span>01</span>
        <span>Interactive geometry</span>
      </div>
    </section>
  );
}
