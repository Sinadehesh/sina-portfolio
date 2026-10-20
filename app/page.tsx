import ScrollFX from "@/components/ScrollFX";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import IdentitySection from "@/components/sections/IdentitySection";
import MusicitySection from "@/components/sections/MusicitySection";
import LabSection from "@/components/sections/LabSection";
import MediaSection from "@/components/sections/MediaSection";
import CvTerminal from "@/components/sections/CvTerminal";

export default function Page() {
  return (
    <>
      <ScrollFX />
      <SiteNav />
      <main className="relative">
        <HeroSection />
        {/* Everything below the hero rides on the charcoal ground, lifted
            just enough to read as a separate plane from the WebGL stage. */}
        <div className="relative z-10 bg-charcoal-900">
          <IdentitySection />
          <MusicitySection />
          <LabSection />
          <MediaSection />
          <CvTerminal />
        </div>
      </main>
      <Footer />
    </>
  );
}
