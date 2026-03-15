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
    href: "/programs",
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
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl text-foreground mb-10">
          Чем мы занимаемся
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl overflow-hidden bg-card border border-border hover:shadow-lg transition-shadow"
            >
              <img
                src={card.image}
                alt={card.imageAlt}
                className="w-full h-52 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg text-foreground mb-3">{card.title}</h3>
                <p className="text-muted-foreground text-[15px] leading-relaxed mb-5 normal-case font-normal">
                  {card.text}
                </p>
                <a
                  href={card.href}
                  className="text-sm font-bold uppercase tracking-wide text-primary hover:text-primary/80 transition-colors"
                >
                  {card.link}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
