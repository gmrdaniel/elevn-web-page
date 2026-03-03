import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ElevnIsYourSpaceSection } from "@/components/sections/ElevnIsYourSpaceSection";
import { SocialProofBannerSection } from "@/components/sections/SocialProofBannerSection";
import { ForCreatorsSection } from "@/components/sections/ForCreatorsSection";
import { BenefitsSectionV2 } from "@/components/sections/BenefitsSectionV2";
// Legacy: import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { ElevnStudioSection } from "@/components/sections/ElevnStudioSection";
import { EventsCalendarSection } from "@/components/sections/EventsCalendarSection";
import { CommunitySection } from "@/components/sections/CommunitySection";
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
      {/* Legacy hero: <HeroSection /> */}
      <ElevnIsYourSpaceSection onOpenJoinForm={() => setShowJoinForm(true)} />
      <SocialProofBannerSection />
      <ForCreatorsSection onOpenJoinForm={() => setShowJoinForm(true)} />
      <BenefitsSectionV2 onOpenJoinForm={() => setShowJoinForm(true)} />
      <CommunitySection />
      <ActiveOpportunitiesSection onOpenJoinForm={() => setShowJoinForm(true)} />
      <ElevnStudioSection onOpenJoinForm={() => setShowJoinForm(true)} />
      <EventsCalendarSection onOpenJoinForm={() => setShowJoinForm(true)} />
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
