const stats = [
  { number: "5", label: "лет работаем вместе" },
  { number: "15", label: "центров из 8 регионов России" },
  { number: "5 500+", label: "учеников в школах ассоциации ежегодно" },
  { number: "350", label: "детей побывали в совместных программах" },
];

const StatsSection = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10">
          Ассоциация сегодня
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label} className="p-6">
              <p className="text-4xl md:text-5xl font-bold text-primary font-display mb-2">
                {s.number}
              </p>
              <p className="text-sm text-muted-foreground font-body">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
