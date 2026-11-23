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
  heroVideo?: string;
  highlights: string[];
}

export function CinematicHero({
  primaryCtaText,
  primaryCtaHref,
  secondaryCtaText,
  heroImage,
  heroVideo = "/videos/hero-banner.mp4?v=2",
}: CinematicHeroProps) {
  return (
    <div className="w-full px-3 pt-2 pb-6 sm:px-6 sm:pt-3 sm:pb-8 lg:px-8 lg:pb-10">
      <section className="relative mx-auto flex min-h-[360px] max-w-7xl items-end overflow-hidden rounded-3xl border border-white/15 bg-[#060F20] py-8 text-white shadow-2xl sm:min-h-[500px] sm:rounded-[36px] sm:py-10 lg:min-h-[600px] lg:rounded-[44px] lg:py-12">
        {/* LAYER 1: 100% ORIGINAL QUALITY UNBLURRED HERO VIDEO */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          aria-hidden="true"
        >
          {heroVideo ? (
            <video
              key={heroVideo}
              src={heroVideo}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="h-full w-full object-cover object-center"
            />
          ) : (
            <Image
              src={heroImage || "/images/hero/hero-command-center.png"}
              alt=""
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center"
            />
          )}
        </div>

        {/* LAYER 2: ACTION BUTTONS ONLY (ALL CIRCLED TEXT & STATS BOXES REMOVED) */}
        <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: LUXURY_EASE }}
            className="grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-4"
          >
            <Link
              href={primaryCtaHref}
              className="touch-btn group relative inline-flex min-h-[50px] w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-[#1877F2] to-[#0095B0] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:shadow-xl sm:w-auto sm:text-base"
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
        </div>
      </section>
    </div>
  );
}
