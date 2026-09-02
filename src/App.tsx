import { Suspense, lazy, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { ElevnIsYourSpaceSection } from "@/components/sections/ElevnIsYourSpaceSection";
import { BenefitsSectionV2 } from "@/components/sections/BenefitsSectionV2";
// Legacy: import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { AudienceBusinessSection } from "@/components/sections/AudienceBusinessSection";
import { EventsWebinarsSection } from "@/components/sections/EventsWebinarsSection";

import { CommunitySection } from "@/components/sections/CommunitySection";
import { Footer } from "@/components/ui/Footer";
import { Header } from "@/components/ui/Header";
import { ScrollNav } from "@/components/ui/ScrollNav";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { ThemeSwitch } from "@/components/ui/ThemeSwitch";
import { GradientWaveBackground } from "@/components/ui/GradientWaveBackground";

// Deferred: only needed once the visitor opens the join modal — keeps
// libphonenumber-js and the multi-step form logic out of the initial bundle.
const JoinForm = lazy(() =>
  import("@/components/join/JoinForm").then((m) => ({ default: m.JoinForm }))
);

function App() {
  const [showJoinForm, setShowJoinForm] = useState(false);

  const openJoinForm = () => setShowJoinForm(true);

  return (
    <main className="relative min-h-screen font-poppins">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <GradientWaveBackground />
      </div>

      <ScrollNav />
      <ThemeSwitch />
      <Header onOpenJoinForm={openJoinForm} />

      <ElevnIsYourSpaceSection onOpenJoinForm={openJoinForm} />
      <SectionDivider />
      <BenefitsSectionV2 onOpenJoinForm={openJoinForm} />
      <SectionDivider />
      <CommunitySection onOpenJoinForm={openJoinForm} />
      <SectionDivider />
      <AudienceBusinessSection />
      <SectionDivider />
      <EventsWebinarsSection />
      <Footer onOpenJoinForm={() => setShowJoinForm(true)} />
      <AnimatePresence>
        {showJoinForm && (
          <Suspense fallback={null}>
            <JoinForm key="join-form" onClose={() => setShowJoinForm(false)} />
          </Suspense>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
