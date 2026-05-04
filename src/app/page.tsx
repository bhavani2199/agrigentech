import Hero from "@/features/logistics/components/Hero";
import StatsSection from "@/features/logistics/components/StatsSection";
import ProduceGrid from "@/features/logistics/components/ProduceGrid";
import WholesaleCTA from "@/features/logistics/components/WholesaleCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <ProduceGrid />
      <WholesaleCTA />
    </>
  );
}
