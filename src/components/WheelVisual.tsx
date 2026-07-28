"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

const modes = ["CAD", "Mesh", "Stress"] as const;
type Mode = (typeof modes)[number];

export function WheelVisual() {
  const [mode, setMode] = useState<Mode>("CAD");
  const reduceMotion = useReducedMotion();

  return (
    <div className="wheel-stage">
      <div className="viewer-toolbar" aria-label="Wheel viewer modes">
        {modes.map((item) => (
          <button
            key={item}
            type="button"
            className={mode === item ? "is-active" : undefined}
            onClick={() => setMode(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className={`wheel-visual mode-${mode.toLowerCase()}`}>
        <AnimatePresence mode="wait">
          <motion.svg
            key={mode}
            viewBox="0 0 560 560"
            role="img"
            aria-label={`Placeholder wheel ${mode.toLowerCase()} view`}
            initial={reduceMotion ? false : { opacity: 0, rotate: -8, scale: 0.96 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, rotate: 8, scale: 1.02 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <circle cx="280" cy="280" r="204" className="wheel-rim" />
            <circle cx="280" cy="280" r="154" className="wheel-rim inner" />
            <circle cx="280" cy="280" r="48" className="wheel-hub" />

            {Array.from({ length: 10 }).map((_, index) => (
              <g
                key={index}
                transform={`rotate(${index * 36} 280 280)`}
              >
                <path
                  d="M268 239 L247 130 Q280 112 313 130 L292 239 Z"
                  className="wheel-spoke"
                />
              </g>
            ))}

            {Array.from({ length: 5 }).map((_, index) => {
              const angle = (index * 72 * Math.PI) / 180;
              const x = 280 + Math.cos(angle) * 28;
              const y = 280 + Math.sin(angle) * 28;
              return <circle key={index} cx={x} cy={y} r="5" className="lug" />;
            })}

            {mode === "Mesh" && (
              <g className="mesh-lines">
                {Array.from({ length: 24 }).map((_, index) => (
                  <line
                    key={index}
                    x1="76"
                    y1={120 + index * 14}
                    x2="484"
                    y2={120 + index * 14}
                  />
                ))}
              </g>
            )}

            {mode === "Stress" && (
              <>
                <circle cx="366" cy="177" r="58" className="stress-zone" />
                <line x1="402" y1="138" x2="468" y2="88" className="stress-callout" />
                <circle cx="402" cy="138" r="5" className="stress-callout-dot" />
              </>
            )}
          </motion.svg>
        </AnimatePresence>

        <div className="viewer-hint">Drag to rotate · Scroll to zoom</div>

        {mode === "Stress" && (
          <motion.div
            className="stress-label"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span>MAX</span>
            Spoke-to-barrel transition
          </motion.div>
        )}
      </div>
    </div>
  );
}
