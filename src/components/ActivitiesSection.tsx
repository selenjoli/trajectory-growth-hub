import { Briefcase, BookOpen, Handshake } from "lucide-react";

const cards = [
  {
    icon: Briefcase,
    title: "Программы для детей и подростков",
    text: "Образовательные туры в Китай, ОАЭ, на Алтай и Чёрное море — и языковая практика онлайн с британскими преподавателями Hilderstone College. Для детей от 8 до 17 лет.",
    link: "Смотреть программы 2026 →",
    href: "/programs",
  },
  {
    icon: BookOpen,
    title: "Программы для педагогов",
    text: "Онлайн-курс повышения квалификации с преподавателями Hilderstone College и ежегодный ProSkill Fest — фестиваль для учителей, который вдохновляет.",
    link: "Программы для педагогов →",
    href: "/teachers",
  },
  {
    icon: Handshake,
    title: "Партнёрство для центров",
    text: "Ассоциация объединяет 15 центров из 8 городов России. Совместные программы, обмен опытом, профессиональное сообщество — для тех, кто строит дополнительное образование всерьёз.",
    link: "О партнёрстве →",
    href: "/partnership",
  },
];

const ActivitiesSection = () => {
  return (
    <section id="activities" className="section-padding">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10">
          Чем мы занимаемся
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="border border-border rounded-lg p-8 hover:shadow-lg transition-shadow bg-card"
            >
              <card.icon className="w-8 h-8 text-primary mb-5" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-foreground mb-3">{card.title}</h3>
              <p className="text-muted-foreground font-body text-[15px] leading-relaxed mb-5">
                {card.text}
              </p>
              <a
                href={card.href}
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                {card.link}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
