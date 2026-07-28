"use client";

import { motion } from "motion/react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "/resume/Aaditya-Patil-Resume.pdf", label: "Résumé" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  return (
    <motion.header
      className="site-nav"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <a className="nav-name" href="#top" aria-label="Aaditya Patil home">
        Aaditya Patil
      </a>

      <nav aria-label="Primary navigation">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}
