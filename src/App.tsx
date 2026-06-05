import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ElevnIsYourSpaceSection } from "@/components/sections/ElevnIsYourSpaceSection";


import { BenefitsSectionV2 } from "@/components/sections/BenefitsSectionV2";
// Legacy: import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { ElevnStudioSection } from "@/components/sections/ElevnStudioSection";
import { AudienceBusinessSection } from "@/components/sections/AudienceBusinessSection";
import { EventsWebinarsSection } from "@/components/sections/EventsWebinarsSection";

import { ActiveOpportunitiesSection } from "@/components/sections/ActiveOpportunitiesSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { Footer } from "@/components/ui/Footer";
import { Header } from "@/components/ui/Header";
import { JoinForm } from "@/components/join/JoinForm";
import { ScrollNav } from "@/components/ui/ScrollNav";
import { ThemeSwitch } from "@/components/ui/ThemeSwitch";
import { GradientWaveBackground } from "@/components/ui/GradientWaveBackground";

function App() {
  const [showJoinForm, setShowJoinForm] = useState(false);

  return (
    <main className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <GradientWaveBackground />
      </div>
      <ScrollNav />
      <ThemeSwitch />
      <Header onOpenJoinForm={() => setShowJoinForm(true)} />
      {/* Legacy hero: <HeroSection /> */}
      <ElevnIsYourSpaceSection onOpenJoinForm={() => setShowJoinForm(true)} />

      <BenefitsSectionV2 onOpenJoinForm={() => setShowJoinForm(true)} />
      <ActiveOpportunitiesSection onOpenJoinForm={() => setShowJoinForm(true)} />
      <ElevnStudioSection />
      <AudienceBusinessSection />
      <EventsWebinarsSection />
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
