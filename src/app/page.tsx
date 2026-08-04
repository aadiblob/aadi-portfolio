import { AircraftCFDSection } from "@/components/AircraftCFDSection";
import { ContactFooter } from "@/components/ContactFooter";
import { DesignPractice } from "@/components/DesignPractice";
import { HeroProfile } from "@/components/HeroProfile";
import { Navigation } from "@/components/Navigation";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SuperchargerSpotlight } from "@/components/SuperchargerSpotlight";
import { SelectedWork } from "@/components/SelectedWork";
import { WheelSpotlight } from "@/components/WheelSpotlight";
import { WheelUnifiedViewer } from "@/components/WheelUnifiedViewer";

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Navigation />
      <HeroProfile />
      <DesignPractice />
      <SelectedWork />
      <WheelSpotlight />
      <WheelUnifiedViewer />
      <SuperchargerSpotlight />
      <AircraftCFDSection />
      <ContactFooter />
    </main>
  );
}
