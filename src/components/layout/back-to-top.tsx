"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll back to top"
      className="touch-btn fixed right-4 bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] z-30 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-[#0B1730]/95 text-[#00B8D9] shadow-xl backdrop-blur-md transition hover:bg-[#1877F2] hover:text-white lg:right-6 lg:bottom-6"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
