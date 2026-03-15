const rostItems = [
  { letter: "Р", word: "Развитие", text: "Каждая программа строится вокруг роста — личного, профессионального, интеллектуального." },
  { letter: "О", word: "Образование", text: "Знания, которые получены через живой опыт, остаются надолго." },
  { letter: "С", word: "Сотрудничество", text: "Центры-участники не конкурируют между собой — они работают вместе, и это меняет то, что каждый из них может предложить своим ученикам." },
  { letter: "Т", word: "Туризм", text: "Путешествие открывает то, что никакой учебник не покажет." },
];

const HistorySection = () => {
  return (
    <section className="section-padding section-alt">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl text-foreground mb-8">
          Как это начиналось
        </h2>
        <div className="max-w-3xl space-y-4 mb-12">
          <p className="text-muted-foreground leading-relaxed font-normal normal-case">
            В 2021 году руководители нескольких языковых школ начали регулярно встречаться на профессиональных конференциях. Постепенно деловое общение переросло в дружбу, а дружба — в желание делать что-то вместе. Оказалось, что у всех похожие вопросы, похожие задачи и одинаковое понимание того, каким должно быть современное дополнительное образование.
          </p>
          <p className="text-muted-foreground leading-relaxed font-normal normal-case">
            Сегодня в ассоциации 15 центров из Москвы, Подмосковья, Белгорода, Курска, Воронежа, Чебоксар, Тамбова и Кисловодска. За четыре года мы провели совместные туры для детей в нескольких странах, организовали профессиональный фестиваль для учителей и продолжаем расти.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {rostItems.map((item) => (
            <div key={item.letter} className="bg-card rounded-lg p-6 border border-border">
              <span className="text-5xl font-black text-primary/15 block leading-none">
                {item.letter}
              </span>
              <p className="text-xs uppercase tracking-widest text-accent font-bold mt-2 mb-3">
                {item.word}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed font-normal normal-case">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
