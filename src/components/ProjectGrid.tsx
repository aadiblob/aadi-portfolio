import { Reveal } from "./Reveal";
import { SuperchargerVisual } from "./SuperchargerVisual";
import { WheelVisual } from "./WheelVisual";

const secondaryProjects = [
  {
    number: "03",
    title: "Active Aero System",
    category: "Mechatronics · Arduino · Mechanism design",
    copy: "A sensor-driven wing concept developed to connect vehicle state, actuation, and mechanical response.",
    visual: "AERO / MOTION STUDY",
  },
  {
    number: "04",
    title: "Crashout",
    category: "Product design · Web application",
    copy: "A multi-touch party game built as a fast, mobile-first product experiment and deployed on Cloudflare.",
    visual: "INTERACTION / PRODUCT",
  },
];

export function ProjectGrid() {
  return (
    <section className="section-shell work-section" id="work">
      <Reveal className="section-heading">
        <div>
          <span className="section-number">01 / Selected work</span>
          <h2>Systems developed through iteration.</h2>
        </div>
        <p>
          Each case study will connect the design decision to the simulation,
          test result, and final engineering outcome.
        </p>
      </Reveal>

      <article className="feature-project">
        <Reveal className="project-copy">
          <span className="project-number">01</span>
          <p className="project-kicker">Structural design · ANSYS Mechanical</p>
          <h3>Wheel FEA and mass optimization</h3>
          <p className="project-description">
            Two wheel iterations compared through geometry refinement, mesh
            quality, stress concentration mitigation, and mass reduction.
          </p>
          <dl className="project-metrics">
            <div>
              <dt>Original mass</dt>
              <dd>22.87 lb</dd>
            </div>
            <div>
              <dt>Revised mass</dt>
              <dd>19.82 lb</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Spoke junction</dd>
            </div>
          </dl>
          <a className="text-link muted-link" href="#contact">
            Case study coming next <span aria-hidden="true">↗</span>
          </a>
        </Reveal>

        <Reveal className="project-visual" delay={0.08}>
          <WheelVisual />
        </Reveal>
      </article>

      <article className="feature-project reverse">
        <Reveal className="project-copy">
          <span className="project-number">02</span>
          <p className="project-kicker">CAD · CFD · Mechanical assembly</p>
          <h3>Roots supercharger concept</h3>
          <p className="project-description">
            A compact roots-style supercharger developed from shell geometry to
            a complete rotating assembly, followed by internal-flow simulation.
          </p>
          <dl className="project-metrics">
            <div>
              <dt>Assembly mass</dt>
              <dd>3.65 lb</dd>
            </div>
            <div>
              <dt>Mass flow</dt>
              <dd>0.0289 kg/s</dd>
            </div>
            <div>
              <dt>Tools</dt>
              <dd>Onshape · Fluent</dd>
            </div>
          </dl>
          <a className="text-link muted-link" href="#contact">
            Case study coming next <span aria-hidden="true">↗</span>
          </a>
        </Reveal>

        <Reveal className="project-visual" delay={0.08}>
          <SuperchargerVisual />
        </Reveal>
      </article>

      <div className="secondary-grid">
        {secondaryProjects.map((project, index) => (
          <Reveal className="secondary-card" key={project.number} delay={index * 0.08}>
            <div className="secondary-visual" aria-hidden="true">
              <span>{project.visual}</span>
              <div className="scan-line" />
            </div>
            <div className="secondary-copy">
              <span className="project-number">{project.number}</span>
              <p className="project-kicker">{project.category}</p>
              <h3>{project.title}</h3>
              <p>{project.copy}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
