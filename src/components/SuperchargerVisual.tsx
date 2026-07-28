"use client";

import { motion, useReducedMotion } from "motion/react";

export function SuperchargerVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="supercharger-stage" aria-label="Roots supercharger line drawing placeholder">
      <motion.svg viewBox="0 0 720 460" role="img">
        <motion.path
          d="M116 102h478c32 0 58 26 58 58v140c0 32-26 58-58 58H116c-32 0-58-26-58-58V160c0-32 26-58 58-58Z"
          className="charger-case"
          initial={reduceMotion ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <rect x="96" y="136" width="528" height="188" rx="46" className="charger-inner" />

        <motion.g
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "284px 230px" }}
        >
          <path
            d="M284 159c26 0 31 35 54 44 23 9 45-16 62 2 17 18-9 39-1 63 8 24 43 29 43 55s-35 31-44 54c-9 23 16 45-2 62-18 17-39-9-63-1-24 8-29 43-55 43s-31-35-54-44c-23-9-45 16-62-2-17-18 9-39 1-63-8-24-43-29-43-55s35-31 44-54c9-23-16-45 2-62 18-17 39 9 63 1 24-8 29-43 55-43Z"
            className="rotor"
            transform="scale(.57) translate(215 174)"
          />
        </motion.g>

        <motion.g
          animate={reduceMotion ? undefined : { rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "436px 230px" }}
        >
          <path
            d="M284 159c26 0 31 35 54 44 23 9 45-16 62 2 17 18-9 39-1 63 8 24 43 29 43 55s-35 31-44 54c-9 23 16 45-2 62-18 17-39-9-63-1-24 8-29 43-55 43s-31-35-54-44c-23-9-45 16-62-2-17-18 9-39 1-63-8-24-43-29-43-55s35-31 44-54c9-23-16-45 2-62 18-17 39 9 63 1 24-8 29-43 55-43Z"
            className="rotor"
            transform="scale(.57) translate(482 174)"
          />
        </motion.g>

        <line x1="58" y1="388" x2="652" y2="388" className="dimension" />
        <line x1="58" y1="374" x2="58" y2="402" className="dimension" />
        <line x1="652" y1="374" x2="652" y2="402" className="dimension" />
        <text x="355" y="424" textAnchor="middle" className="dimension-text">
          ASSEMBLY LENGTH · 10.45 IN
        </text>
      </motion.svg>
      <div className="technical-chip">Interactive exploded assembly planned</div>
    </div>
  );
}
