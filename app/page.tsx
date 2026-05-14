import Hero from "@/components/Hero";
import About from "@/components/About";
import Schedule from "@/components/Schedule";
import Activities from "@/components/Activities";
import Results from "@/components/Results";
import Sponsors from "@/components/Sponsors";
import Volunteer from "@/components/Volunteer";
import LocationSection from "@/components/Location";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Activities />
      <Schedule />
      <Results />
      <Sponsors />
      <Volunteer />
      <LocationSection />
      <FAQ />
    </>
  );
}
