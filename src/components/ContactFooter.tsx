import { Reveal } from "./Reveal";

export function ContactFooter() {
  return (
    <footer className="section-shell contact-footer" id="contact">
      <Reveal>
        <span className="section-number">03 / Next step</span>
        <h2>Let’s build what recruiters remember.</h2>
        <p>
          Full-time mechanical engineering roles · Simulation · Product development
        </p>
      </Reveal>

      <Reveal className="contact-links" delay={0.08}>
        <a href="mailto:YOUR_EMAIL_HERE">Email</a>
        <a href="https://www.linkedin.com/in/YOUR_LINKEDIN" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href="https://github.com/YOUR_GITHUB" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href="/resume/Aaditya-Patil-Resume.pdf">Résumé</a>
      </Reveal>

      <div className="footer-meta">
        <span>Designed and developed by Aaditya Patil</span>
        <span>Next.js · Motion · Cloudflare</span>
        <span>© 2026</span>
      </div>
    </footer>
  );
}
