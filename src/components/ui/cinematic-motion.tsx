"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
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
 * Top viewport scroll progress bar with hardware GPU scaleX
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 right-0 left-0 z-60 h-[3px] origin-left bg-gradient-to-r from-[#1877F2] via-[#00B8D9] to-[#38BDF8] shadow-[0_0_8px_rgba(0,184,217,0.6)] will-change-transform"
      aria-hidden="true"
    />
  );
}

/**
 * Lightweight scroll-triggered reveal wrapper with pre-viewport margin to eliminate scroll hitching
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
  duration = 0.5,
  variant = "fade-up",
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const initialMap = {
    "fade-up": { opacity: 0, y: 16 },
    "fade-in": { opacity: 0 },
    "scale-up": { opacity: 0, scale: 0.98, y: 12 },
    "slide-left": { opacity: 0, x: -16 },
    "slide-right": { opacity: 0, x: 16 },
  }[variant];

  return (
    <motion.div
      initial={initialMap}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Lightweight staggered container & items for fluid card grid cascades
 */
export function StaggerGrid({
  children,
  className,
  staggerDelay = 0.04,
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
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
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
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
      whileTap={{ scale: 0.99 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Optimized High-Performance Cinematic Homepage Hero
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
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="w-full px-3 pt-2 pb-6 sm:px-6 sm:pt-3 sm:pb-8 lg:px-8 lg:pb-10">
      <section className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/15 bg-[#060F20] py-12 text-white shadow-2xl sm:rounded-[36px] sm:py-16 lg:rounded-[44px] lg:py-20">
        {/* LAYER 1: HARDWARE-ACCELERATED BACKGROUND IMAGE */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-20 transform-gpu"
          aria-hidden="true"
        >
          <Image
            src={heroImage || "/images/hero/hero-command-center.png"}
            alt=""
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-center"
          />
        </div>

        {/* LAYER 2: GPU-OPTIMIZED RADIAL GLOWS & INDUSTRIAL GRID (ZERO HEAVY BLUR CALCULATION) */}
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-[#060F20] via-[#0B1730]/92 to-[#0B1730]/80"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-industrial-grid opacity-80"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_20%,rgba(24,119,242,0.18),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(0,184,217,0.15),transparent_50%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-24 bg-gradient-to-t from-[#060F20] to-transparent"
          aria-hidden="true"
        />

        {/* LAYER 3: FOREGROUND CONTENT & SHOWCASE */}
        <div className="relative z-10 px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-12">
          {/* LEFT: ENTRANCE TYPOGRAPHY & CTAs */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: LUXURY_EASE }}
              className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#00B8D9]/40 bg-[#00B8D9]/10 px-3.5 py-1.5 text-[11px] font-semibold tracking-wider text-[#00B8D9] uppercase shadow-xs sm:px-4 sm:text-xs"
            >
              <Cpu className="h-3.5 w-3.5 shrink-0 text-[#00B8D9]" />
              <span className="truncate">{subtitle}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.06, ease: LUXURY_EASE }}
              className="mt-5 text-2xl font-extrabold tracking-tight text-white sm:mt-6 sm:text-5xl lg:text-[54px] lg:leading-[1.1]"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12, ease: LUXURY_EASE }}
              className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:mt-6 sm:text-lg"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease: LUXURY_EASE }}
              className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:flex sm:flex-wrap sm:items-center sm:gap-4"
            >
              <Link
                href={primaryCtaHref}
                className="touch-btn group relative inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-[#1877F2] to-[#0095B0] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:shadow-xl sm:w-auto sm:text-base"
              >
                <span>{primaryCtaText}</span>
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <QuoteModalTrigger
                buttonText={secondaryCtaText}
                variant="cyan"
                size="lg"
                className="w-full sm:w-auto"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24, ease: LUXURY_EASE }}
              className="mt-8 grid grid-cols-1 gap-2.5 border-t border-white/10 pt-6 sm:mt-10 sm:grid-cols-2 sm:gap-3 sm:pt-8"
            >
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2 text-xs sm:text-sm"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#00B8D9]" />
                  <span className="font-medium text-slate-200">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: CINEMATIC VISUAL TELEMETRY PANEL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: LUXURY_EASE }}
            className="relative lg:col-span-5"
          >
            {/* Floating Glassmorphic Live Telemetry Pill */}
            <div className="absolute -top-3 left-3 z-20 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#081424]/90 px-3.5 py-1.5 text-[11px] font-semibold text-white shadow-lg sm:-top-4 sm:left-4">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <Activity className="h-3.5 w-3.5 text-[#00B8D9]" />
              <span className="tracking-wider uppercase">
                AI Vision & Telemetry Active
              </span>
            </div>

            {/* Primary Layered Showcase Frame */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/20 bg-[#142B49]/90 shadow-2xl">
              <div className="relative aspect-16/10 w-full overflow-hidden sm:aspect-4/3">
                <Image
                  src={heroImage || "/images/hero/hero-command-center.png"}
                  alt="Zenin Systems Industrial Surveillance and AI Vision Engineering"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081424] via-[#0B1730]/25 to-transparent" />

                {/* Secondary Picture-in-Picture AI Vision Card */}
                <div className="absolute right-3 bottom-3 hidden w-44 overflow-hidden rounded-2xl border border-[#00B8D9]/45 bg-[#081424]/90 p-1.5 shadow-xl sm:block">
                  <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl">
                    <Image
                      src="/images/ai/ppe-detection.png"
                      alt="Real-time AI PPE Detection Layer"
                      fill
                      sizes="180px"
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-1 flex items-center justify-between px-1 py-0.5 text-[10px]">
                    <span className="font-semibold text-[#00B8D9]">PPE Detection</span>
                    <span className="text-emerald-400 font-bold">100% OK</span>
                  </div>
                </div>
              </div>

              {/* Live Telemetry Metric Strip */}
              <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 bg-[#081424]/95 p-3.5 text-center sm:p-4">
                <div className="px-1 sm:px-2">
                  <div className="text-[10px] font-semibold text-[#00B8D9] uppercase sm:text-xs">
                    Pillars
                  </div>
                  <div className="mt-0.5 text-base font-extrabold text-white sm:text-xl">
                    4
                  </div>
                  <div className="truncate text-[10px] text-slate-400 sm:text-[11px]">
                    Solution Suites
                  </div>
                </div>
                <div className="px-1 sm:px-2">
                  <div className="text-[10px] font-semibold text-[#00B8D9] uppercase sm:text-xs">
                    AI Vision
                  </div>
                  <div className="mt-0.5 text-base font-extrabold text-white sm:text-xl">
                    21
                  </div>
                  <div className="truncate text-[10px] text-slate-400 sm:text-[11px]">
                    AI Applications
                  </div>
                </div>
                <div className="px-1 sm:px-2">
                  <div className="text-[10px] font-semibold text-[#00B8D9] uppercase sm:text-xs">
                    Services
                  </div>
                  <div className="mt-0.5 text-base font-extrabold text-white sm:text-xl">
                    12
                  </div>
                  <div className="truncate text-[10px] text-slate-400 sm:text-[11px]">
                    Eng. Verticals
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  </div>
  );
}
