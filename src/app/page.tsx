import { AboutStrip } from "@/components/AboutStrip";
import { ContactFooter } from "@/components/ContactFooter";
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SelectedWork } from "@/components/SelectedWork";
import { WheelCaseIntro } from "@/components/WheelCaseIntro";
import { WheelAnalysisSequence } from "@/components/WheelAnalysisSequence";
import { WheelSpotlight } from "@/components/WheelSpotlight";

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Navigation />
      <Hero />
      <AboutStrip />
      <SelectedWork />
      <WheelSpotlight />
      <WheelCaseIntro />
      <WheelAnalysisSequence />
      <ContactFooter />
    </main>
  );
}
