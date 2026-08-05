"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type ContactModalProps = {
  onClose: () => void;
};

export function ContactModal({ onClose }: ContactModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="contact-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="contact-modal"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        aria-describedby="contact-modal-description"
      >
        <button
          className="contact-modal-close"
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close contact dialog"
        >
          <span aria-hidden="true">Close ×</span>
        </button>

        <div className="contact-modal-headshot">
          <Image
            src="/images/aaditya-patil-headshot.webp"
            alt="Aaditya Patil"
            fill
            sizes="(max-width: 620px) 112px, 148px"
          />
        </div>

        <div className="contact-modal-content">
          <span className="contact-modal-eyebrow">Contact</span>
          <h2 id="contact-modal-title">Aaditya Patil</h2>
          <p id="contact-modal-description">
            Mechanical Engineering · The Ohio State University
          </p>

          <div className="contact-modal-links">
            <a href="mailto:patil.275@osu.edu">patil.275@osu.edu</a>
            <a href="https://github.com/aadiblob" target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/aadipatil1/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </a>
          </div>

          <a
            className="contact-modal-resume"
            href="/aaditya-patil-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Resume ↗
          </a>
        </div>
      </div>
    </div>
  );
}
