"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { ContactModal } from "./ContactModal";

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
];

export function Navigation() {
  const [contactOpen, setContactOpen] = useState(false);
  const contactButtonRef = useRef<HTMLButtonElement>(null);
  const closeContact = useCallback(() => {
    setContactOpen(false);
    window.requestAnimationFrame(() => contactButtonRef.current?.focus());
  }, []);

  return (
    <>
      <motion.header
        className="site-nav"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <a className="nav-name" href="#top" aria-label="Aaditya Patil home">
          <Image
            src="/images/aaditya-signature-white.png"
            alt="Aaditya Patil"
            width={1248}
            height={960}
            priority
          />
        </a>

        <nav aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a
            href="/aaditya-patil-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
          <button ref={contactButtonRef} type="button" onClick={() => setContactOpen(true)}>
            Contact
          </button>
        </nav>
      </motion.header>

      {contactOpen && <ContactModal onClose={closeContact} />}
    </>
  );
}
