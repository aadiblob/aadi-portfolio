"use client";

import { useCallback, useState } from "react";
import { WheelModel, WheelRenderMode } from "./WheelModel";

export type WheelAnalysisMode =
  | "cad-v1"
  | "load-v1"
  | "mesh-v1"
  | "stress-v1"
  | "cad-v3"
  | "stress-v3";

type WheelAnalysisViewerProps = {
  mode: WheelAnalysisMode;
};

type ModeConfig = {
  src: string;
  fallback: string;
  renderMode: WheelRenderMode;
  caption: string;
  iteration: "V1" | "V3";
  stress?: string;
};

const MODES: Record<WheelAnalysisMode, ModeConfig> = {
  "cad-v1": {
    src: "/models/wheel-v1.glb",
    fallback: "/images/wheel-v1-fea-fallback.png",
    renderMode: "cad",
    caption: "Baseline geometry",
    iteration: "V1",
  },
  "load-v1": {
    src: "/models/wheel-v1.glb",
    fallback: "/images/wheel-v1-fea-fallback.png",
    renderMode: "cad",
    caption: "Load case schematic",
    iteration: "V1",
  },
  "mesh-v1": {
    src: "/models/wheel-v1-fea.glb",
    fallback: "/images/wheel-v1-fea-fallback.png",
    renderMode: "mesh",
    caption: "ANSYS surface mesh",
    iteration: "V1",
  },
  "stress-v1": {
    src: "/models/wheel-v1-fea.glb",
    fallback: "/images/wheel-v1-fea-fallback.png",
    renderMode: "stress",
    caption: "Maximum principal stress",
    iteration: "V1",
    stress: "6.454 MPa",
  },
  "cad-v3": {
    src: "/models/wheel-v3.glb",
    fallback: "/images/wheel-v3-fea-fallback.png",
    renderMode: "cad",
    caption: "Revised geometry",
    iteration: "V3",
  },
  "stress-v3": {
    src: "/models/wheel-v3-fea.glb",
    fallback: "/images/wheel-v3-fea-fallback.png",
    renderMode: "stress",
    caption: "Maximum principal stress",
    iteration: "V3",
    stress: "4.758 MPa",
  },
};

export function WheelAnalysisViewer({ mode }: WheelAnalysisViewerProps) {
  const config = MODES[mode];
  const [readyKey, setReadyKey] = useState<string | null>(null);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const modelKey = `${config.src}:${config.renderMode}`;
  const isReady = readyKey === modelKey;
  const hasError = errorKey === modelKey;
  const showLegend = config.renderMode === "stress";
  const showLoad = mode === "load-v1";

  const onReady = useCallback(() => {
    setReadyKey(modelKey);
    setErrorKey(null);
  }, [modelKey]);

  const onError = useCallback(() => {
    setErrorKey(modelKey);
  }, [modelKey]);

  return (
    <div className="analysis-viewer-shell">
      <img
        className={`analysis-static-fallback ${isReady ? "is-hidden" : ""}`}
        src={config.fallback}
        alt=""
        aria-hidden="true"
      />

      <WheelModel
        key={modelKey}
        src={config.src}
        label={`${config.iteration} ${config.caption}`}
        className="analysis-wheel-model"
        autoRotate={false}
        modelScale={0.88}
        renderMode={config.renderMode}
        onReady={onReady}
        onError={onError}
      />

      <div className="analysis-viewer-topline">
        <span>{config.iteration}</span>
        <span>{config.caption}</span>
      </div>

      {hasError && (
        <span className="analysis-status">Static result shown · interactive view unavailable</span>
      )}

      {showLoad && (
        <div className="analysis-load-overlay" aria-hidden="true">
          <span className="analysis-constraint-ring" />
          <span className="analysis-load-arrow" />
        </div>
      )}

      {showLoad && (
        <div className="analysis-load-key" aria-hidden="true">
          <span><i className="constraint-key" /> Hub mounting interface / constrained</span>
          <span><i className="load-key" /> Remote load vector</span>
        </div>
      )}

      {showLegend && (
        <div className="stress-legend" aria-label="Common maximum principal stress legend in megapascals">
          <div className="stress-legend-heading">
            <span>Maximum principal stress</span>
            <span>MPa</span>
          </div>
          <div className="stress-gradient" />
          <div className="stress-ticks">
            <span>−0.76</span>
            <span>1.05</span>
            <span>2.85</span>
            <span>4.65</span>
            <span>6.45</span>
          </div>
          <span className="stress-common-scale">Common scale / V1 + V3</span>
        </div>
      )}

      {config.stress && (
        <div className="analysis-peak">
          <span>Peak</span>
          <strong>{config.stress}</strong>
        </div>
      )}
    </div>
  );
}
