import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="px-4 pt-4">
      <div className="relative min-h-[90vh] flex items-center rounded-3xl overflow-hidden">
        <img
          src={heroBg}
          alt="Образовательный центр — дети за совместной работой"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="relative z-10 container mx-auto px-8 md:px-12">
          <p className="inline-block text-sm uppercase tracking-widest text-primary-foreground/70 mb-4">
            Ассоциация центров дополнительного образования · с 2021 года
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl text-primary-foreground leading-tight mb-6 max-w-3xl">
            Траектория Роста
          </h1>
          <p className="text-lg text-primary-foreground/90 max-w-xl mb-8 font-normal normal-case">
            Мы объединяем образовательные центры из разных городов России, чтобы вместе давать детям, учителям и руководителям то, что в одиночку недостижимо.
          </p>
          <a
            href="#activities"
            className="inline-block bg-action text-action-foreground font-bold uppercase px-7 py-4 rounded-xl hover:brightness-110 transition-all text-sm tracking-wide"
          >
            Узнать больше ↓
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
