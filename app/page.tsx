import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import HowIWork from "@/components/sections/HowIWork";
import Testimonials from "@/components/sections/Testimonials";
import Creative from "@/components/sections/Creative";
import Faq from "@/components/sections/Faq";
import Footer from "@/components/sections/Footer";
import { BriefProvider } from "@/components/ProjectBrief";

export default function Home() {
  return (
    <BriefProvider>
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <HowIWork />
        <Testimonials />
        <Creative />
        <Faq />
        <Footer />
      </main>
    </BriefProvider>
  );
}
