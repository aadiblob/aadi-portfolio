import { Reveal } from "./Reveal";
import { ScrollGraphic } from "./ScrollGraphic";

export function CopelandSection() {
  return (
    <section className="experience-section" id="experience">
      <div className="section-shell experience-grid">
        <Reveal className="experience-copy">
          <span className="section-number">02 / Industry experience</span>
          <p className="experience-company">Copeland · Modeling & Simulation</p>
          <h2>Connecting simulation to measured behavior.</h2>
          <p>
            Supported vibro-acoustic and journal-bearing work using Simcenter 3D,
            ANSYS, and GT-SUITE. The final section will focus on methodology,
            validation, and permitted high-level outcomes rather than proprietary
            geometry.
          </p>

          <div className="experience-list">
            <div>
              <span>01</span>
              Modal correlation
            </div>
            <div>
              <span>02</span>
              Journal-bearing modeling
            </div>
            <div>
              <span>03</span>
              Mesh and parameter studies
            </div>
          </div>
        </Reveal>

        <Reveal className="experience-visual" delay={0.08}>
          <ScrollGraphic />
        </Reveal>
      </div>
    </section>
  );
}
