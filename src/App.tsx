import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ElevnIsYourSpaceSection } from "@/components/sections/ElevnIsYourSpaceSection";


import { BenefitsSectionV2 } from "@/components/sections/BenefitsSectionV2";
// Legacy: import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { ElevnStudioSection } from "@/components/sections/ElevnStudioSection";

import { ActiveOpportunitiesSection } from "@/components/sections/ActiveOpportunitiesSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { Footer } from "@/components/ui/Footer";
import { Header } from "@/components/ui/Header";
import { JoinForm } from "@/components/join/JoinForm";
import { ScrollNav } from "@/components/ui/ScrollNav";
import { ThemeSwitch } from "@/components/ui/ThemeSwitch";

function App() {
  const [showJoinForm, setShowJoinForm] = useState(false);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<"A" | "B">("A");

  useEffect(() => {
    const a = videoARef.current;
    const b = videoBRef.current;
    if (!a || !b) return;

    a.playbackRate = 0.6;
    b.playbackRate = 0.6;

    const CROSSFADE = 2.0;
    let aSwitched = false;
    let bSwitched = false;
    let rafId: number;

    const tick = () => {
      if (!a.paused && a.duration && a.duration - a.currentTime <= CROSSFADE && !aSwitched) {
        aSwitched = true;
        bSwitched = false;
        b.currentTime = 0;
        b.play().catch(() => {});
        setActiveVideo("B");
      }
      if (!b.paused && b.duration && b.duration - b.currentTime <= CROSSFADE && !bSwitched) {
        bSwitched = true;
        aSwitched = false;
        a.currentTime = 0;
        a.play().catch(() => {});
        setActiveVideo("A");
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <main className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <video
          ref={videoARef}
          autoPlay
          muted
          playsInline
          preload="auto"
          className={`absolute inset-0 h-full w-full object-cover blur-md brightness-75 transition-opacity duration-[3000ms] ease-in-out ${activeVideo === "A" ? "opacity-100" : "opacity-0"}`}
          aria-hidden
        >
          <source src="/assets/videos/videofondo.mp4" type="video/mp4" />
        </video>
        <video
          ref={videoBRef}
          muted
          playsInline
          preload="auto"
          className={`absolute inset-0 h-full w-full object-cover blur-md brightness-75 transition-opacity duration-[3000ms] ease-in-out ${activeVideo === "B" ? "opacity-100" : "opacity-0"}`}
          aria-hidden
        >
          <source src="/assets/videos/videofondo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/15" aria-hidden />
      </div>
      <ScrollNav />
      <ThemeSwitch />
      <Header onOpenJoinForm={() => setShowJoinForm(true)} />
      {/* Legacy hero: <HeroSection /> */}
      <ElevnIsYourSpaceSection onOpenJoinForm={() => setShowJoinForm(true)} />

      <BenefitsSectionV2 onOpenJoinForm={() => setShowJoinForm(true)} />
      <ActiveOpportunitiesSection onOpenJoinForm={() => setShowJoinForm(true)} />
      <ElevnStudioSection onOpenJoinForm={() => setShowJoinForm(true)} />
      <FinalCTASection onOpenJoinForm={() => setShowJoinForm(true)} />
      <Footer onOpenJoinForm={() => setShowJoinForm(true)} />
      <AnimatePresence>
        {showJoinForm && (
          <JoinForm key="join-form" onClose={() => setShowJoinForm(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
