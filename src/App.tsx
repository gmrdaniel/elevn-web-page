import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ForCreatorsSection } from "@/components/sections/ForCreatorsSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { HowElevnWorksSection } from "@/components/sections/HowElevnWorksSection";
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
      <AboutSection />
      <ForCreatorsSection />
      <BenefitsSection />
      <HowElevnWorksSection />
      <ActiveOpportunitiesSection />
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
