"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function ScrollGraphic() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const orbitX = useTransform(scrollYProgress, [0, 1], [-18, 22]);
  const orbitY = useTransform(scrollYProgress, [0, 1], [18, -22]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-10, 18]);

  return (
    <div className="scroll-graphic" ref={ref}>
      <svg viewBox="0 0 720 720" role="img" aria-label="Stylized scroll compressor cross-section">
        <circle cx="360" cy="360" r="260" className="scroll-boundary" />
        <motion.g
          style={reduceMotion ? undefined : { x: orbitX, y: orbitY, rotate }}
        >
          <path
            d="M360 184c98 0 178 79 178 177s-80 178-178 178c-66 0-120-54-120-120s54-120 120-120c35 0 64 29 64 64s-29 64-64 64c-16 0-29-13-29-29s13-29 29-29"
            className="scroll-orbit"
          />
        </motion.g>
        <path
          d="M360 212c82 0 149 66 149 149s-67 149-149 149c-51 0-92-41-92-92s41-92 92-92c20 0 36 16 36 36s-16 36-36 36"
          className="scroll-fixed"
        />
        <line x1="100" y1="588" x2="620" y2="588" className="dimension" />
        <text x="360" y="624" textAnchor="middle" className="dimension-text">
          ORBITING SCROLL · SCHEMATIC CROSS-SECTION
        </text>
      </svg>
      <div className="flow-label flow-in">Suction</div>
      <div className="flow-label flow-out">Discharge</div>
    </div>
  );
}
