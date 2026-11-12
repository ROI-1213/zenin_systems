"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  Sparkles,
  Activity,
} from "lucide-react";
import { QuoteModalTrigger } from "@/components/forms/quote-modal";

const LUXURY_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Top viewport scroll progress bar with spring physics
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 right-0 left-0 z-60 h-[3px] origin-left bg-gradient-to-r from-[#1877F2] via-[#00B8D9] to-[#38BDF8] shadow-[0_0_12px_rgba(0,184,217,0.75)]"
      aria-hidden="true"
    />
  );
}

/**
 * Scroll-triggered reveal wrapper supporting fade-up, scale, and directional slide
 */
interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  variant?: "fade-up" | "fade-in" | "scale-up" | "slide-left" | "slide-right";
}

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.7,
  variant = "fade-up",
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const initialMap = {
    "fade-up": { opacity: 0, y: 28 },
    "fade-in": { opacity: 0 },
    "scale-up": { opacity: 0, scale: 0.95, y: 18 },
    "slide-left": { opacity: 0, x: -28 },
    "slide-right": { opacity: 0, x: 28 },
  }[variant];

  return (
    <motion.div
      initial={initialMap}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -40px 0px" }}
      transition={{
        duration,
        delay,
        ease: LUXURY_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Staggered container & item for cinematic card grid cascades
 */
export function StaggerGrid({
  children,
  className,
  staggerDelay = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.05,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08, margin: "0px 0px -30px 0px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 26, scale: 0.975 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.65,
        ease: LUXURY_EASE,
      },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -6, transition: { duration: 0.28, ease: "easeOut" } }}
      whileTap={{ scale: 0.99 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Cinematic Multi-Layer Homepage Hero with Parallax, Slow Zoom & Floating Glassmorphic Telemetry
 */
interface CinematicHeroProps {
  title: string;
  subtitle: string;
  description: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  heroImage: string;
  highlights: string[];
}

export function CinematicHero({
  title,
  subtitle,
  description,
  primaryCtaText,
  primaryCtaHref,
  secondaryCtaText,
  heroImage,
  highlights,
}: CinematicHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.16]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const visualCardY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const floatingBadgeY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-[#060F20] py-12 text-white sm:py-20 lg:py-28"
    >
      {/* LAYER 1: PARALLAX & SLOW KEN-BURNS BACKGROUND IMAGE */}
      <motion.div
        style={
          prefersReducedMotion
            ? undefined
            : { y: bgY, scale: bgScale }
        }
        className="pointer-events-none absolute inset-0 z-0 opacity-22"
        aria-hidden="true"
      >
        <Image
          src={heroImage || "/images/hero/hero-command-center.png"}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* LAYER 2: LUXURY GRADIENT VIGNETTES & AMBIENT VOLUMETRIC GLOWS */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-[#060F20] via-[#0B1730]/92 to-[#0B1730]/80"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-industrial-grid opacity-80"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-32 -left-24 z-0 h-96 w-96 rounded-full bg-[#1877F2]/20 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 bottom-0 z-0 h-96 w-96 rounded-full bg-[#00B8D9]/15 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-24 bg-gradient-to-t from-[#060F20] to-transparent"
        aria-hidden="true"
      />

      {/* LAYER 3: FOREGROUND CONTENT & MULTI-LAYER VISUAL SHOWCASE */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-12">
          {/* LEFT: STAGGERED CINEMATIC TYPOGRAPHY & CTAs */}
          <motion.div
            style={prefersReducedMotion ? undefined : { y: contentY }}
            className="lg:col-span-7"
          >
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: LUXURY_EASE }}
              className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#00B8D9]/40 bg-[#00B8D9]/10 px-3.5 py-1.5 text-[11px] font-semibold tracking-wider text-[#00B8D9] uppercase shadow-[0_0_25px_rgba(0,184,217,0.18)] backdrop-blur-md sm:px-4 sm:text-xs"
            >
              <Cpu className="h-3.5 w-3.5 shrink-0 animate-pulse" />
              <span className="truncate">{subtitle}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease: LUXURY_EASE }}
              className="mt-5 text-2xl font-extrabold tracking-tight text-white sm:mt-6 sm:text-5xl lg:text-[54px] lg:leading-[1.1]"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.16, ease: LUXURY_EASE }}
              className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:mt-6 sm:text-lg"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.24, ease: LUXURY_EASE }}
              className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:flex sm:flex-wrap sm:items-center sm:gap-4"
            >
              <Link
                href={primaryCtaHref}
                className="touch-btn group relative inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-[#1877F2] to-[#0095B0] px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_rgba(24,119,242,0.4)] transition hover:shadow-[0_14px_36px_rgba(0,184,217,0.5)] sm:w-auto sm:text-base"
              >
                <span>{primaryCtaText}</span>
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <QuoteModalTrigger
                buttonText={secondaryCtaText}
                variant="cyan"
                size="lg"
                className="w-full sm:w-auto"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.32, ease: LUXURY_EASE }}
              className="mt-8 grid grid-cols-1 gap-2.5 border-t border-white/10 pt-6 sm:mt-10 sm:grid-cols-2 sm:gap-3 sm:pt-8"
            >
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2 text-xs backdrop-blur-xs sm:text-sm"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#00B8D9]" />
                  <span className="font-medium text-slate-200">{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: LAYERED CINEMATIC VISUAL TELEMETRY PANEL */}
          <motion.div
            style={prefersReducedMotion ? undefined : { y: visualCardY }}
            initial={{ opacity: 0, scale: 0.94, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.18, ease: LUXURY_EASE }}
            className="relative lg:col-span-5"
          >
            {/* Floating Glassmorphic Live Telemetry Pill (Top Left Layer) */}
            <motion.div
              style={prefersReducedMotion ? undefined : { y: floatingBadgeY }}
              className="absolute -top-3 left-3 z-20 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#081424]/85 px-3.5 py-1.5 text-[11px] font-semibold text-white shadow-xl backdrop-blur-md sm:-top-4 sm:left-4"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <Activity className="h-3.5 w-3.5 text-[#00B8D9]" />
              <span className="tracking-wider uppercase">
                AI Vision & Telemetry Active
              </span>
            </motion.div>

            {/* Primary Layered Showcase Frame */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/20 bg-[#142B49]/90 shadow-[0_25px_70px_rgba(0,0,0,0.65)] backdrop-blur-xl">
              <div className="relative aspect-16/10 w-full overflow-hidden sm:aspect-4/3">
                <motion.div
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : { scale: [1, 1.07, 1] }
                  }
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={heroImage || "/images/hero/hero-command-center.png"}
                    alt="Zenin Systems Industrial Surveillance and AI Vision Engineering"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#081424] via-[#0B1730]/25 to-transparent" />

                {/* Secondary Layered Picture-in-Picture AI Vision Card */}
                <div className="absolute right-3 bottom-3 hidden w-44 overflow-hidden rounded-2xl border border-[#00B8D9]/45 bg-[#081424]/90 p-1.5 shadow-2xl backdrop-blur-md sm:block">
                  <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl">
                    <Image
                      src="/images/ai/ppe-detection.png"
                      alt="Real-time AI PPE Detection Layer"
                      fill
                      sizes="180px"
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-1.5 flex items-center justify-between px-1 text-[10px]">
                    <span className="font-bold text-[#00B8D9]">PPE AI NODE</span>
                    <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 font-mono text-[9px] text-emerald-300">
                      99.4%
                    </span>
                  </div>
                </div>
              </div>

              {/* Glassmorphic Telemetry Counter Bar */}
              <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/15 bg-[#081424]/90 p-3.5 text-center backdrop-blur-md sm:p-4">
                <div className="px-1 sm:px-2">
                  <div className="text-[10px] font-bold tracking-wider text-[#00B8D9] uppercase sm:text-xs">
                    Core Pillars
                  </div>
                  <div className="mt-0.5 text-lg font-extrabold text-white sm:text-xl">
                    04
                  </div>
                  <div className="truncate text-[10px] text-slate-400 sm:text-[11px]">
                    Solution Suites
                  </div>
                </div>
                <div className="px-1 sm:px-2">
                  <div className="text-[10px] font-bold tracking-wider text-[#00B8D9] uppercase sm:text-xs">
                    AI Vision
                  </div>
                  <div className="mt-0.5 text-lg font-extrabold text-white sm:text-xl">
                    21
                  </div>
                  <div className="truncate text-[10px] text-slate-400 sm:text-[11px]">
                    AI Applications
                  </div>
                </div>
                <div className="px-1 sm:px-2">
                  <div className="text-[10px] font-bold tracking-wider text-[#00B8D9] uppercase sm:text-xs">
                    Services
                  </div>
                  <div className="mt-0.5 text-lg font-extrabold text-white sm:text-xl">
                    12
                  </div>
                  <div className="truncate text-[10px] text-slate-400 sm:text-[11px]">
                    Eng. Domains
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
