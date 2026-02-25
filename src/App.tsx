import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { HeroSection } from "@/components/sections/HeroSection";
import { ElevnIsYourSpaceSection } from "@/components/sections/ElevnIsYourSpaceSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ForCreatorsSection } from "@/components/sections/ForCreatorsSection";
import { BenefitsSectionV2 } from "@/components/sections/BenefitsSectionV2";
// Legacy: import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { ElevnStudioSection } from "@/components/sections/ElevnStudioSection";
import { EventsCalendarSection } from "@/components/sections/EventsCalendarSection";
// Legacy: import { HowElevnWorksSection } from "@/components/sections/HowElevnWorksSection";
import { ActiveOpportunitiesSection } from "@/components/sections/ActiveOpportunitiesSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { Footer } from "@/components/ui/Footer";
import { Header } from "@/components/ui/Header";
import { JoinForm } from "@/components/join/JoinForm";
import { ScrollNav } from "@/components/ui/ScrollNav";
import { ThemeSwitch } from "@/components/ui/ThemeSwitch";

function App() {
  const [showJoinForm, setShowJoinForm] = useState(false);

  return (
    <main className="min-h-screen">
      <ScrollNav />
      <ThemeSwitch />
      <Header onOpenJoinForm={() => setShowJoinForm(true)} />
      <HeroSection onOpenJoinForm={() => setShowJoinForm(true)} />
      <ElevnIsYourSpaceSection />
      <AboutSection />
      <ForCreatorsSection onOpenJoinForm={() => setShowJoinForm(true)} />
      {/* Benefits: V2 = bullets + CTA above fold, detail below. Legacy: <BenefitsSection /> */}
      <BenefitsSectionV2 onOpenJoinForm={() => setShowJoinForm(true)} />
      <ActiveOpportunitiesSection onOpenJoinForm={() => setShowJoinForm(true)} />
      {/* Learning hub: Elevn Studio. Legacy: <HowElevnWorksSection /> */}
      <ElevnStudioSection onOpenJoinForm={() => setShowJoinForm(true)} />
      <EventsCalendarSection onOpenJoinForm={() => setShowJoinForm(true)} />
      <FinalCTASection onOpenJoinForm={() => setShowJoinForm(true)} />
      <Footer />
      <AnimatePresence>
        {showJoinForm && (
          <JoinForm key="join-form" onClose={() => setShowJoinForm(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
