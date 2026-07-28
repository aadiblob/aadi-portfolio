import { ContactFooter } from "@/components/ContactFooter";
import { CopelandSection } from "@/components/CopelandSection";
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ScrollProgress } from "@/components/ScrollProgress";

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Navigation />
      <Hero />
      <ProjectGrid />
      <CopelandSection />
      <ContactFooter />
    </main>
  );
}
