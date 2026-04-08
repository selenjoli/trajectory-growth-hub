import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import PhotoLightbox from "./PhotoLightbox";
const meetingsImg = "/assets/meetings.jpg";
const kidsImg = "/assets/kids-tour.jpg";
const partnershipImg = "/assets/partnership.jpg";
const teachersImg = "/assets/teachers-workshop.jpg";
const russiaMap = "/assets/russia-map.png";
const rostRazvitie = "/assets/rost-razvitie.jpg";
const rostObrazovanie = "/assets/rost-obrazovanie.jpg";
const rostSotrudnichestvo = "/assets/rost-sotrudnichestvo.jpg";
const rostTurizm = "/assets/rost-turizm.jpg";

const carouselImages = [meetingsImg, kidsImg, partnershipImg, teachersImg];

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
  const [currentImg, setCurrentImg] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-3 md:px-6 xl:px-10">
      <div className="bg-foreground rounded-[2rem] py-20 px-6 md:px-16">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-primary-foreground mb-16">
              Как это
              <br />
              начиналось
            </h2>
          </AnimatedSection>

          {/* Block 1: Stacked photos left, text right */}
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mb-20">
              {/* Stacked photo carousel */}
              <div className="relative h-[400px] md:h-[480px]">
                <AnimatePresence>
                  {carouselImages.map((img, i) => {
                    const offset = (i - currentImg + carouselImages.length) % carouselImages.length;
                    if (offset > 3) return null;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{
                          opacity: offset === 0 ? 1 : 0.6 - offset * 0.15,
                          scale: 1 - offset * 0.05,
                          y: offset * 16,
                          x: offset * 8,
                          zIndex: carouselImages.length - offset,
                          rotateZ: offset * -1.5,
                        }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className={`absolute inset-0 ${offset === 0 ? "cursor-pointer" : ""}`}
                        onClick={() => { if (offset === 0) { setLightboxIndex(i); setLightboxOpen(true); } }}
                      >
                        <img
                          src={img}
                          alt="Встречи ассоциации"
                          className="w-full h-full object-cover rounded-[1.5rem] shadow-2xl"
                        />
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                <PhotoLightbox photos={carouselImages} initialIndex={lightboxIndex} open={lightboxOpen} onClose={() => setLightboxOpen(false)} />
              </div>

              {/* Text right */}
              <div>
                <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed font-normal normal-case">
                  В 2021 году руководители нескольких языковых школ начали регулярно встречаться на профессиональных конференциях. Постепенно деловое общение переросло в дружбу, а дружба — в желание делать что-то вместе.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Block 2: Text left, map right */}
          <AnimatedSection delay={0.1}>
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mb-20">
              {/* Text left */}
              <div>
                <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed font-normal normal-case">
                  Сегодня в ассоциации 15 центров из Москвы, Подмосковья, Белгорода, Курска, Воронежа, Чебоксар, Тамбова и Кисловодска. За четыре года мы провели совместные туры для детей в нескольких странах.
                </p>
              </div>

              {/* Map right */}
              <div className="flex justify-center">
                <img
                  src={russiaMap}
                  alt="Карта России с городами ассоциации"
                  className="w-full max-w-lg h-auto object-contain"
                />
              </div>
            </div>
          </AnimatedSection>

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
