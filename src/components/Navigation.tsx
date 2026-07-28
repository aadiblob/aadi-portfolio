"use client";

import { motion } from "motion/react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  return (
    <motion.header
      className="site-nav"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <a className="brand" href="#top" aria-label="Aaditya Patil home">
        <span className="brand-mark" aria-hidden="true">
          AP
        </span>
        <span>Aaditya Patil</span>
      </a>

      <nav aria-label="Primary navigation">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <a className="nav-cta" href="/resume/Aaditya-Patil-Resume.pdf">
        Résumé
        <span aria-hidden="true">↗</span>
      </a>
    </motion.header>
  );
}
