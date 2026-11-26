import HeroSection from "@/components/HeroSection";
import FeaturedInsurers from "@/components/FeaturedInsurers";
import QuickCompare from "@/components/QuickCompare";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedInsurers />
      <QuickCompare />
    </div>
  );
};

export default Index;
