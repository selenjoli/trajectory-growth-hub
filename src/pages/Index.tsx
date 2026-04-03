import { useState } from "react";
import Header from "@/components/Header";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import HistorySection from "@/components/HistorySection";
import StatsSection from "@/components/StatsSection";
import MembersSection from "@/components/MembersSection";
import CTASection from "@/components/CTASection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactFormModal from "@/components/ContactFormModal";

const Index = () => {
  const [formOpen, setFormOpen] = useState(false);

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
      <section className="section-padding" id="forma">
        <div className="fluid-container text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-foreground mb-4">
            Остались вопросы?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 font-normal normal-case max-w-xl mx-auto">
            Оставьте заявку — менеджер свяжется и поможет выбрать подходящую программу.
          </p>
          <button
            onClick={() => setFormOpen(true)}
            className="inline-block btn-gold px-10 py-4 rounded-2xl text-sm tracking-widest"
          >
            Оставить заявку
          </button>
        </div>
      </section>
      <Footer />
      <FloatingButtons />
      <ContactFormModal open={formOpen} onClose={() => setFormOpen(false)} page="Index" />
    </main>
  );
};

export default Index;
