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
    href: "/programs",
  },
  {
    image: ctaTeachers,
    imageAlt: "Учитель на фестивале",
    title: "Вы преподаватель и хотите развиваться?",
    text: "Онлайн-курс с британскими педагогами и ProSkill Fest.",
    link: "Для учителей →",
    href: "/teachers",
  },
  {
    image: ctaPartnership,
    imageAlt: "Встреча руководителей центров",
    title: "Руководите образовательным центром?",
    text: "Узнайте как работает партнёрство в ассоциации.",
    link: "О партнёрстве →",
    href: "/partnership",
  },
];

const CTASection = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl text-foreground mb-10">
          Куда дальше?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {doors.map((d) => (
            <div
              key={d.title}
              className="rounded-2xl overflow-hidden bg-card border border-border hover:shadow-lg transition-shadow"
            >
              <img
                src={d.image}
                alt={d.imageAlt}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg text-foreground mb-3">{d.title}</h3>
                <p className="text-[15px] text-muted-foreground mb-6 normal-case font-normal">
                  {d.text}
                </p>
                <a
                  href={d.href}
                  className="inline-block bg-action text-action-foreground font-bold uppercase px-5 py-3 rounded-xl text-sm hover:brightness-110 transition-all tracking-wide"
                >
                  {d.link}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
