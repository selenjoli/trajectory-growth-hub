import AnimatedSection from "./AnimatedSection";
import kidsTour from "@/assets/kids-tour.jpg";
import teachersWorkshop from "@/assets/teachers-workshop.jpg";
import partnership from "@/assets/partnership.jpg";

const cards = [
  {
    image: kidsTour,
    imageAlt: "Дети в образовательном туре",
    title: "Программы для детей и подростков",
    text: "Образовательные туры в Китай, ОАЭ, на Алтай и Чёрное море — и языковая практика онлайн с британскими преподавателями Hilderstone College. Для детей от 8 до 17 лет.",
    link: "Смотреть программы 2026 →",
    href: "/kanikuly",
  },
  {
    image: teachersWorkshop,
    imageAlt: "Семинар для педагогов",
    title: "Программы для педагогов",
    text: "Онлайн-курс повышения квалификации с преподавателями Hilderstone College и ежегодный ProSkill Fest — фестиваль для учителей, который вдохновляет.",
    link: "Программы для педагогов →",
    href: "/teachers",
  },
  {
    image: partnership,
    imageAlt: "Партнёрская встреча руководителей центров",
    title: "Партнёрство для центров",
    text: "Ассоциация объединяет 15 центров из 8 городов России. Совместные программы, обмен опытом, профессиональное сообщество — для тех, кто строит дополнительное образование всерьёз.",
    link: "О партнёрстве →",
    href: "/partnership",
  },
];

const ActivitiesSection = () => {
  return (
    <section id="activities" className="section-padding">
      <div className="fluid-container">
        <AnimatedSection>
          <h2 className="text-4xl md:text-6xl text-foreground mb-4">
            Чем мы
            <br />
            занимаемся
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mb-14 font-normal normal-case">
            Три направления — для детей, педагогов и руководителей центров.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <AnimatedSection key={card.title} delay={i * 0.12}>
              <a
                href={card.href}
                className="group block rounded-[1.5rem] overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-xl h-full"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.imageAlt}
                    className="w-full h-60 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-7">
                  <h3 className="text-base text-foreground mb-3">{card.title}</h3>
                  <p className="text-muted-foreground text-[15px] leading-relaxed mb-6 normal-case font-normal">
                    {card.text}
                  </p>
                  <span className="text-sm font-bold uppercase tracking-wide text-primary group-hover:tracking-widest transition-all duration-300">
                    {card.link}
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

export default ActivitiesSection;
