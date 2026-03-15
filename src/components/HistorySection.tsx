import meetingsImg from "@/assets/meetings.jpg";
import russiaMap from "@/assets/russia-map.jpg";
import rostRazvitie from "@/assets/rost-razvitie.jpg";
import rostObrazovanie from "@/assets/rost-obrazovanie.jpg";
import rostSotrudnichestvo from "@/assets/rost-sotrudnichestvo.jpg";
import rostTurizm from "@/assets/rost-turizm.jpg";

const rostItems = [
  {
    letter: "Р",
    word: "Развитие",
    text: "Каждая программа строится вокруг роста — личного, профессионального, интеллектуального.",
    image: rostRazvitie,
  },
  {
    letter: "О",
    word: "Образование",
    text: "Знания, которые получены через живой опыт, остаются надолго.",
    image: rostObrazovanie,
  },
  {
    letter: "С",
    word: "Сотрудничество",
    text: "Центры-участники не конкурируют между собой — они работают вместе.",
    image: rostSotrudnichestvo,
  },
  {
    letter: "Т",
    word: "Туризм",
    text: "Путешествие открывает то, что никакой учебник не покажет.",
    image: rostTurizm,
  },
];

const HistorySection = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto space-y-8">
        <h2 className="text-3xl md:text-4xl text-foreground">
          Как это начиналось
        </h2>

        {/* Two story blocks side by side */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Block 1 — meetings */}
          <div className="rounded-2xl overflow-hidden bg-card border border-border">
            <img
              src={meetingsImg}
              alt="Встреча руководителей на конференции"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <p className="text-muted-foreground leading-relaxed font-normal normal-case text-[15px]">
                В 2021 году руководители нескольких языковых школ начали регулярно встречаться на профессиональных конференциях. Постепенно деловое общение переросло в дружбу, а дружба — в желание делать что-то вместе. Оказалось, что у всех похожие вопросы, похожие задачи и одинаковое понимание того, каким должно быть современное дополнительное образование.
              </p>
            </div>
          </div>

          {/* Block 2 — geography */}
          <div className="rounded-2xl overflow-hidden bg-card border border-border">
            <img
              src={russiaMap}
              alt="Карта России с отмеченными городами ассоциации"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <p className="text-muted-foreground leading-relaxed font-normal normal-case text-[15px]">
                Сегодня в ассоциации 15 центров из Москвы, Подмосковья, Белгорода, Курска, Воронежа, Чебоксар, Тамбова и Кисловодска. За четыре года мы провели совместные туры для детей в нескольких странах, организовали профессиональный фестиваль для учителей и продолжаем расти.
              </p>
            </div>
          </div>
        </div>

        {/* РОСТ section */}
        <div>
          <h2 className="text-2xl md:text-3xl text-foreground mb-6">
            Траектория Роста — это:
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {rostItems.map((item) => (
              <div
                key={item.letter}
                className="rounded-2xl overflow-hidden bg-card border border-border"
              >
                <img
                  src={item.image}
                  alt={item.word}
                  className="w-full h-40 object-cover"
                />
                <div className="p-5">
                  <span className="text-4xl font-black text-primary/15 block leading-none">
                    {item.letter}
                  </span>
                  <p className="text-xs uppercase tracking-widest text-accent font-bold mt-1 mb-2">
                    {item.word}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed font-normal normal-case">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
