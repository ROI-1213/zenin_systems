import React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/layout/back-to-top";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { ScrollProgressBar } from "@/components/ui/cinematic-motion";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <ScrollProgressBar />
      <Header />
      <main id="main-content" className="flex-1 w-full max-w-full overflow-x-hidden">
        {children}
      </main>
      <Footer />
      <BackToTop />
      <MobileBottomNav />
    </div>
  );
}
