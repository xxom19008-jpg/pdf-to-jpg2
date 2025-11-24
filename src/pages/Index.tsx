import { Hero } from "@/components/Hero";
import { HowToUse } from "@/components/HowToUse";
import { Features } from "@/components/Features";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <HowToUse />
      <Features />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
