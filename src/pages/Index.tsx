import HeroSection from "@/components/HeroSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import HistorySection from "@/components/HistorySection";
import StatsSection from "@/components/StatsSection";
import MembersSection from "@/components/MembersSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <main className="space-y-4">
      <HeroSection />
      <ActivitiesSection />
      <HistorySection />
      <StatsSection />
      <MembersSection />
      <CTASection />
    </main>
  );
};

export default Index;
