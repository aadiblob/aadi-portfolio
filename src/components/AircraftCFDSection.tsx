"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import styles from "./AircraftCFDSection.module.css";

type StageId = "overview" | "preprocessing" | "inviscid" | "viscous";
type ResultId = "pressure" | "velocity" | "streamlines";

const stages: { id: StageId; number: string; label: string }[] = [
  { id: "overview", number: "01", label: "Overview" },
  { id: "preprocessing", number: "02", label: "Preprocessing" },
  { id: "inviscid", number: "03", label: "Inviscid Results" },
  { id: "viscous", number: "04", label: "Viscous Results" },
];

const overviewFacts = [
  ["Airfoil", "NACA 23012"], ["Aircraft", "Midsize private business jet"],
  ["Capacity", "6–8 passengers"], ["Propulsion", "Dual turbofan"],
  ["Cruise velocity", "200.6 m/s"], ["Takeoff mass estimate", "6000 kg"],
  ["CFD cases", "0°, 6°, 10°, 14°, 18°"], ["Models", "Inviscid and viscous"],
  ["Viscous model", "SST k-omega"], ["Software", "ANSYS Workbench and Fluent"],
];

const prepSteps = [
  { title: "Aircraft assumptions", text: "A 6–8 passenger, dual-turbofan business-jet envelope established the design basis.", visual: "facts" },
  { title: "NACA 23012 selection", text: "Airfoil research led the team to use the five-digit NACA 23012 section as the two-dimensional reference profile.", visual: "airfoil" },
  { title: "Geometry preparation", text: "The coordinate-based profile was recreated and aligned in ANSYS DesignModeler before the external flow domain was defined.", visual: "/images/aircraft/airfoil-geometry.webp" },
  { title: "Mesh and inflation", text: "An unstructured triangular mesh used local refinement and boundary-layer inflation near the airfoil surface.", visual: "/images/aircraft/mesh-detail-wide.webp" },
];

const coefficients = {
  inviscid: { cd: ["0.00333", "0.006946", "0.01697", "0.051029", "0.11479"], cl: ["0.1936", "0.8453", "1.1972", "1.1648", "1.1818"] },
  viscous: { cd: ["0.010266", "0.014824", "0.027327", "0.10892", "0.21103"], cl: ["0.1664", "0.7827", "1.1056", "0.8749", "0.7662"] },
};
const angles = ["0°", "6°", "10°", "14°", "18°"];

const takeaways: Record<StageId, string> = {
  overview: "", preprocessing: "",
  inviscid: "The inviscid model predicts increasing pressure differential and aerodynamic loading as angle of attack rises, while excluding viscous boundary-layer and skin-friction effects.",
  viscous: "The viscous model shows a pronounced wake and separated-flow region at 18°. Lift peaks at 10° and then decreases at 14° and 18°, while drag rises sharply, indicating the onset of stall-related behavior.",
};

export function AircraftCFDSection() {
  const [stage, setStage] = useState<StageId>("overview");
  const [result, setResult] = useState<ResultId>("pressure");
  const [prep, setPrep] = useState(0);
  const reduceMotion = useReducedMotion();
  const resultStage = stage === "inviscid" || stage === "viscous";

  return (
    <section className={styles.section} id="aircraft-cfd">
      <div className={`${styles.intro} section-shell`}>
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="project-label">03 / Team aircraft design and CFD study</p>
          <h2>Subsonic aircraft CFD</h2>
          <p className={styles.summary}>A team-based design and analysis study of a conceptual midsize business jet inspired by the Cessna Citation II Bravo. The study combined aircraft sizing, NACA 23012 airfoil selection, aerodynamic estimates, CFD comparisons, and a simplified structural wing analysis.</p>
        </motion.div>
        <aside className={styles.attribution} aria-label="Project attribution">
          <span>My contributions</span>
          <p>Aircraft definition, airfoil research and selection, the initial concept sketch, and the simplified structural wing analysis.</p>
        </aside>
      </div>

      <div className={`${styles.caseStudy} section-shell`}>
        <div className={styles.stageNav} role="tablist" aria-label="Aircraft CFD case study stages">
          {stages.map((item) => <button key={item.id} type="button" role="tab" aria-selected={stage === item.id} aria-controls="aircraft-stage-panel" onClick={() => setStage(item.id)} className={stage === item.id ? styles.active : undefined}><span>{item.number}</span>{item.label}</button>)}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div id="aircraft-stage-panel" role="tabpanel" key={stage} className={styles.panel} initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -8 }} transition={{ duration: reduceMotion ? 0.01 : 0.3 }}>
            {stage === "overview" && <Overview />}
            {stage === "preprocessing" && <Preprocessing active={prep} setActive={setPrep} />}
            {resultStage && <Results model={stage} result={result} setResult={setResult} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function Overview() {
  return <div className={styles.overview}>
    <div><p className={styles.eyebrow}>Study definition</p><h3>From concept definition to comparative flow analysis.</h3><p>The team compared inviscid and viscous simulations across five angles of attack, using the same conceptual aircraft study as the basis for aerodynamic and structural work.</p><div className={styles.actions}><a href="/docs/me3503-aircraft-fluid-study.pdf" target="_blank" rel="noreferrer">View full study <span aria-hidden="true">↗</span></a><a href="/docs/me3503-aircraft-fluid-study.pdf" download>Download PDF <span aria-hidden="true">↓</span></a></div></div>
    <dl className={styles.factGrid}>{overviewFacts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
  </div>;
}

function Preprocessing({ active, setActive }: { active: number; setActive: (index: number) => void }) {
  const item = prepSteps[active];
  return <div className={styles.preprocessing}>
    <div className={styles.prepNav} role="tablist" aria-label="Preprocessing steps">{prepSteps.map((step, index) => <button type="button" role="tab" aria-selected={active === index} key={step.title} onClick={() => setActive(index)}><span>0{index + 1}</span>{step.title}</button>)}</div>
    <div className={styles.prepVisual}>
      {item.visual === "facts" && <dl className={styles.nativeInfo}><div><dt>Capacity</dt><dd>6–8 passengers</dd></div><div><dt>Propulsion</dt><dd>Dual turbofan</dd></div><div><dt>Cruise</dt><dd>200.6 m/s</dd></div><div><dt>Takeoff mass</dt><dd>6000 kg estimate</dd></div></dl>}
      {item.visual === "airfoil" && <div className={styles.airfoil}><span>NACA</span><strong>23012</strong><p>Five-digit series · 12% maximum thickness</p></div>}
      {item.visual.startsWith("/") && <img src={item.visual} alt={active === 2 ? "NACA 23012 geometry prepared in ANSYS DesignModeler" : "Unstructured triangular airfoil mesh with near-wall refinement"} />}
    </div>
    <div className={styles.prepCopy}><p className={styles.eyebrow}>Preprocessing / 0{active + 1}</p><h3>{item.title}</h3><p>{item.text}</p>{active === 3 && <div className={styles.meshPair}><figure><img src="/images/aircraft/mesh-domain.webp" alt="Full triangular CFD domain mesh" /><figcaption>Domain mesh</figcaption></figure><figure><img src="/images/aircraft/mesh-boundary-layer.webp" alt="Boundary-layer inflation near the airfoil" /><figcaption>Boundary-layer inflation</figcaption></figure></div>}</div>
  </div>;
}

function Results({ model, result, setResult }: { model: "inviscid" | "viscous"; result: ResultId; setResult: (id: ResultId) => void }) {
  const data = coefficients[model];
  return <div className={styles.results}>
    <header className={styles.resultsHeader}><div><p className={styles.eyebrow}>{model} simulation</p><h3>{model === "inviscid" ? "Idealized flow response" : "Boundary-layer and wake response"}</h3></div><div className={styles.segmented} role="tablist" aria-label={`${model} result type`}>{(["pressure", "velocity", "streamlines"] as ResultId[]).map(id => <button type="button" role="tab" aria-selected={result === id} onClick={() => setResult(id)} key={id}>{id}</button>)}</div></header>
    <div className={styles.comparison} aria-live="polite"><figure><figcaption>0° angle of attack</figcaption><div className={styles.crop}><img src={`/images/aircraft/results/${model}-${result}.webp`} alt={`${model} ${result} result at 0 degrees angle of attack`} /></div></figure><figure><figcaption>18° angle of attack</figcaption><div className={`${styles.crop} ${styles.cropRight}`}><img src={`/images/aircraft/results/${model}-${result}.webp`} alt={`${model} ${result} result at 18 degrees angle of attack`} /></div></figure></div>
    <p className={styles.takeaway}>{takeaways[model]}</p>
    <div className={styles.coefficients} role="region" aria-label={`${model} aerodynamic coefficients`}><table><thead><tr><th>Angle</th>{angles.map(a => <th key={a}>{a}</th>)}</tr></thead><tbody><tr><th>C<sub>d</sub></th>{data.cd.map((v, i) => <td key={angles[i]}>{v}</td>)}</tr><tr><th>C<sub>l</sub></th>{data.cl.map((v, i) => <td key={angles[i]}>{v}</td>)}</tr></tbody></table></div>
  </div>;
}
