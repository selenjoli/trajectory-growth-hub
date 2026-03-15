const doors = [
  {
    title: "Ищете программу для ребёнка?",
    text: "Туры, лагеря и онлайн языковая практика для детей от 8 до 17 лет.",
    link: "Программы 2026 →",
    href: "/programs",
  },
  {
    title: "Вы преподаватель и хотите развиваться?",
    text: "Онлайн-курс с британскими педагогами и ProSkill Fest.",
    link: "Для учителей →",
    href: "/teachers",
  },
  {
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
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10">
          Куда дальше?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {doors.map((d) => (
            <div
              key={d.title}
              className="border border-border rounded-lg p-8 bg-card hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-bold text-foreground mb-3">{d.title}</h3>
              <p className="text-[15px] text-muted-foreground font-body mb-6">{d.text}</p>
              <a
                href={d.href}
                className="inline-block bg-action text-action-foreground font-display font-semibold px-5 py-3 rounded-lg text-sm hover:brightness-110 transition-all"
              >
                {d.link}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
