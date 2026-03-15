const stats = [
  { number: "5", label: "лет работаем вместе" },
  { number: "15", label: "центров из 8 регионов России" },
  { number: "5 500+", label: "учеников в школах ассоциации ежегодно" },
  { number: "350", label: "детей побывали в совместных программах" },
];

const StatsSection = () => {
  return (
    <section className="px-4">
      <div className="container mx-auto">
        <div className="bg-primary rounded-2xl p-10 md:p-14">
          <h2 className="text-2xl md:text-3xl text-primary-foreground mb-8">
            Ассоциация сегодня
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label} className="p-4">
                <p className="text-4xl md:text-5xl font-black text-primary-foreground mb-2">
                  {s.number}
                </p>
                <p className="text-sm text-primary-foreground/80 font-normal normal-case">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
