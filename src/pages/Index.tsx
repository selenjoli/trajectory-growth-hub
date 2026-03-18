import Header from "@/components/Header";
import FloatingButtons from "@/components/FloatingButtons";
import HeroSection from "@/components/HeroSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import HistorySection from "@/components/HistorySection";
import StatsSection from "@/components/StatsSection";
import MembersSection from "@/components/MembersSection";
import CTASection from "@/components/CTASection";
import TestimonialsSection from "@/components/TestimonialsSection";

const Index = () => {
  return (
    <main className="space-y-4">
      <Header />
      <HeroSection />
      <ActivitiesSection />
      <HistorySection />
      <StatsSection />
      <MembersSection />
      <TestimonialsSection />
      <CTASection />
      <FloatingButtons />
    </main>
  );
};

export default Index;
