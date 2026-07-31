"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import styles from "./HeroProfile.module.css";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function HeroProfile() {
  const reduceMotion = useReducedMotion();

  return (
    <section className={`${styles.hero} section-shell`} id="top">
      <div className={styles.construction} aria-hidden="true">
        <motion.span
          className={styles.horizontalLine}
          initial={reduceMotion ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.35, delay: 0.2, ease }}
        />
        <motion.span
          className={styles.verticalLine}
          initial={reduceMotion ? false : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.35, delay: 0.34, ease }}
        />
      </div>

      <motion.p
        className={styles.role}
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.08, ease }}
      >
        Mechanical Engineering · The Ohio State University
      </motion.p>

      <div className={styles.heroVisual}>
        <h1 className={styles.name} aria-label="Aaditya Patil">
          <span>
            <motion.span
              initial={reduceMotion ? false : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.16, ease }}
            >
              Aaditya
            </motion.span>
          </span>
          <span>
            <motion.span
              initial={reduceMotion ? false : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.24, ease }}
            >
              Patil
            </motion.span>
          </span>
        </h1>

        <motion.figure
          className={styles.photo}
          initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1.05, delay: 0.4, ease }}
        >
          <Image
            src="/images/angels-landing.webp"
            alt="Aaditya sitting on the Angels Landing ridge in Zion National Park"
            fill
            priority
            unoptimized
            sizes="(max-width: 760px) 100vw, 72vw"
          />
          <figcaption>
            <span>Angels Landing · Zion National Park</span>
            <span>2026</span>
          </figcaption>
        </motion.figure>
      </div>

      <motion.div
        className={styles.personal}
        id="about"
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.8, ease }}
      >
        <span className={styles.label}>Outside engineering</span>
        <p>
          I try to keep my life broad outside engineering. I train consistently, spend as much
          time outdoors as I can, and am working toward visiting every U.S. national park. I have
          also been learning music production and vocal mixing.
        </p>
      </motion.div>
    </section>
  );
}
