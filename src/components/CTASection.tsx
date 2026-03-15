import AnimatedSection from "./AnimatedSection";
import ctaKids from "@/assets/cta-kids.jpg";
import ctaTeachers from "@/assets/cta-teachers.jpg";
import ctaPartnership from "@/assets/cta-partnership.jpg";

const doors = [
  {
    image: ctaKids,
    imageAlt: "Дети на каникулах",
    title: "Ищете программу для ребёнка?",
    text: "Туры, лагеря и онлайн языковая практика для детей от 8 до 17 лет.",
    link: "Программы 2026 →",
    href: "/kanikuly",
  },
  {
    image: ctaTeachers,
    imageAlt: "Учитель на фестивале",
    title: "Вы преподаватель?",
    text: "Онлайн-курс с британскими педагогами и ProSkill Fest.",
    link: "Для учителей →",
    href: "/uchitelya",
  },
  {
    image: ctaPartnership,
    imageAlt: "Встреча руководителей центров",
    title: "Руководите центром?",
    text: "Узнайте как работает партнёрство в ассоциации.",
    link: "О партнёрстве →",
    href: "/partnership",
  },
];

const CTASection = () => {
  return (
    <section className="section-padding">
      <div className="fluid-container">
        <AnimatedSection>
          <h2 className="text-4xl md:text-6xl text-foreground mb-14">
            Куда
            <br />
            <span className="text-accent">дальше?</span>
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-4">
          {doors.map((d, i) => (
            <AnimatedSection key={d.title} delay={i * 0.12}>
              <a
                href={d.href}
                className="group block rounded-[1.5rem] overflow-hidden bg-card border border-border hover:border-accent/40 transition-all duration-500 hover:shadow-xl h-full"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={d.image}
                    alt={d.imageAlt}
                    className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
                </div>
                <div className="p-7">
                  <h3 className="text-base text-foreground mb-3">{d.title}</h3>
                  <p className="text-[15px] text-muted-foreground mb-6 normal-case font-normal leading-relaxed">
                    {d.text}
                  </p>
                  <span className="inline-block btn-gold px-6 py-3 rounded-xl text-sm tracking-wide transition-all">
                    {d.link}
                  </span>
                </div>
              </a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
