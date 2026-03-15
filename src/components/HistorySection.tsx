import AnimatedSection from "./AnimatedSection";
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
    <section className="px-3">
      <div className="bg-foreground rounded-[2rem] py-20 px-6 md:px-16">
        <div className="container mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl text-primary-foreground mb-6">
              Как это
              <br />
              начиналось
            </h2>
          </AnimatedSection>

          {/* Two story blocks */}
          <div className="grid md:grid-cols-2 gap-4 mb-16">
            <AnimatedSection delay={0.1}>
              <div className="rounded-[1.5rem] overflow-hidden bg-primary-foreground/10 backdrop-blur-sm h-full">
                <img
                  src={meetingsImg}
                  alt="Встреча руководителей на конференции"
                  className="w-full h-64 object-cover"
                />
                <div className="p-7">
                  <p className="text-primary-foreground/80 leading-relaxed font-normal normal-case">
                    В 2021 году руководители нескольких языковых школ начали регулярно встречаться на профессиональных конференциях. Постепенно деловое общение переросло в дружбу, а дружба — в желание делать что-то вместе.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="rounded-[1.5rem] overflow-hidden bg-primary-foreground/10 backdrop-blur-sm h-full">
                <img
                  src={russiaMap}
                  alt="Карта России с отмеченными городами ассоциации"
                  className="w-full h-64 object-cover"
                />
                <div className="p-7">
                  <p className="text-primary-foreground/80 leading-relaxed font-normal normal-case">
                    Сегодня в ассоциации 15 центров из Москвы, Подмосковья, Белгорода, Курска, Воронежа, Чебоксар, Тамбова и Кисловодска. За четыре года мы провели совместные туры для детей в нескольких странах.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* РОСТ */}
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl text-primary-foreground mb-8">
              Траектория Роста —{" "}
              <span className="text-accent">это:</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {rostItems.map((item, i) => (
              <AnimatedSection key={item.letter} delay={i * 0.1}>
                <div className="rounded-[1.5rem] overflow-hidden bg-primary-foreground/10 backdrop-blur-sm group">
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.word}
                      className="w-full h-44 object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-foreground/50" />
                    <span className="absolute bottom-3 left-4 text-5xl font-black text-primary-foreground">
                      {item.letter}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="text-xs uppercase tracking-widest text-accent font-bold mb-2">
                      {item.word}
                    </p>
                    <p className="text-sm text-primary-foreground/70 leading-relaxed font-normal normal-case">
                      {item.text}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
