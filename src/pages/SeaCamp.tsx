import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import AnimatedSection from "@/components/AnimatedSection";

import heroBg from "@/assets/sea-hero.jpg";
import seaEnglish from "@/assets/sea-english.jpg";
import seaDance from "@/assets/sea-dance.jpg";
import seaProjects from "@/assets/sea-projects.jpg";
import seaPsychology from "@/assets/sea-psychology.jpg";
import seaResort from "@/assets/sea-resort.jpg";
import seaMap from "@/assets/sea-map.png";
import facilityRooms from "@/assets/facility-rooms.jpg";
import facilityDining from "@/assets/facility-dining.jpg";
import facilityBeach from "@/assets/facility-beach.jpg";
import facilityForest from "@/assets/facility-forest.jpg";
import facilityMedical from "@/assets/facility-medical.jpg";
import facilityGuide from "@/assets/facility-guide.jpg";
import illustUae from "@/assets/illust-uae.svg";
import illustChina from "@/assets/illust-china.png";
import illustAltai from "@/assets/illust-altai.png";
import illustHilderstone from "@/assets/illust-hilderstone-uk.png";

/* ─── data ─── */

const projects = [
{
  emoji: "🌍",
  name: "Клуб путешественников",
  subtitle: "английский без учебников",
  image: seaEnglish,
  text: "60+ часов живого языка за смену. Каждый день — новая страна: культура, традиции, задания на английском. Не урок, а путешествие вокруг света — не уезжая с берега Чёрного моря.",
  fit: "Подойдёт детям, которым хочется говорить, а не зубрить."
},
{
  emoji: "💃",
  name: "Шаг вперёд",
  subtitle: "современные танцы",
  image: seaDance,
  text: "Авторские постановки, репетиции, финальный спектакль на сцене у моря. Танец здесь — способ рассказать о себе.",
  fit: "Подойдёт детям, которые выражают себя через движение."
},
{
  emoji: "🎨",
  name: "Искусство прогресса",
  subtitle: "арт-проект",
  image: seaProjects,
  text: "Инсталляции, коллажи, цифровые и рукотворные работы о том, каким будет мир. В конце смены — настоящая выставка.",
  fit: "Подойдёт детям с творческим взглядом на мир."
},
{
  emoji: "🧠",
  name: "Развитие личности",
  subtitle: "психология",
  image: seaPsychology,
  text: "В безопасной среде с профессиональным психологом — про эмоции, границы, уверенность и умение быть собой. Живой разговор о важном, не групповая терапия.",
  fit: "Подойдёт детям, которым интересно понимать себя и других."
}];


const facilities = [
{ image: facilityRooms, text: "Новые корпуса с видом на море" },
{ image: facilityDining, text: "5-разовое питание, шведский стол" },
{ image: facilityBeach, text: "Собственный песчаный пляж 145 метров" },
{ image: facilityForest, text: "Охраняемая территория в субтропическом лесу" },
{ image: facilityMedical, text: "Круглосуточный медпункт" },
{ image: facilityGuide, text: "Сопровождающий от ассоциации 24/7" }];


const testimonials = [
{ id: 1, image: "https://placehold.co/400x700/00BBC5/ffffff?text=Отзыв+1", name: "Оксана, Москва", role: "мама Вики (11 лет)" },
{ id: 2, image: "https://placehold.co/400x700/00BBC5/ffffff?text=Отзыв+2", name: "Соня, 12 лет", role: "Участница лагеря" },
{ id: 3, image: "https://placehold.co/400x700/00BBC5/ffffff?text=Отзыв+3", name: "Марина, Белгород", role: "Родитель" },
{ id: 4, image: "https://placehold.co/400x700/00BBC5/ffffff?text=Отзыв+4", name: "Дима, 13 лет", role: "Участник лагеря" },
{ id: 5, image: "https://placehold.co/400x700/00BBC5/ffffff?text=Отзыв+5", name: "Елена, Курск", role: "Родитель" }];


const otherPrograms = [
{ title: "Дубай", illustration: illustUae, illustClass: "h-24 w-auto", dates: "даты уточняются", price: "от 145 000 ₽", href: "/kanikuly/uae" },
{ title: "Китай", illustration: illustChina, illustClass: "h-24 w-auto", dates: "3–12 июня", price: "от 165 000 ₽", href: "/kanikuly/china" },
{ title: "Алтай", illustration: illustAltai, illustClass: "h-24 w-auto", dates: "10–25 июля", price: "от 95 000 ₽", href: "/kanikuly/altai" }];


/* ─── page ─── */

const SeaCamp = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [zoomed, setZoomed] = useState<number | null>(null);
  const [whySlide, setWhySlide] = useState(0);
  const [whyPaused, setWhyPaused] = useState(false);

  const whyPhotos = [seaEnglish, seaDance, seaProjects, seaPsychology, seaResort];

  const nextSlide = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused || zoomed !== null) return;
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, [isPaused, zoomed, nextSlide]);


  useEffect(() => {
    if (whyPaused) return;
    const interval = setInterval(() => {
      setWhySlide((prev) => (prev + 1) % whyPhotos.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [whyPaused, whyPhotos.length]);

  return (
    <main className="bg-program-sea">
      <Header variant="light" />

      {/* ── HERO ── */}
      <section className="px-3 md:px-6 xl:px-10 pt-20 lg:pt-0">
        <div className="relative min-h-[90vh] flex items-end rounded-[2rem] overflow-hidden">
          <img src={heroBg} alt="Дети на пляже Чёрного моря" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 w-full px-6 md:px-16 pb-12 md:pb-20">
            <div className="w-fit">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap items-center justify-between gap-3 mb-6">
                
                <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm md:text-base font-semibold uppercase tracking-wider px-5 py-2 rounded-full">
                  Летний лагерь · Чёрное море
                </span>
                <span className="inline-block bg-program-sea text-white text-sm md:text-base font-bold uppercase tracking-wider px-5 py-2 rounded-full">
                  23 июня — 15 июля 2026
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[0.95] mb-4">
                
                21 день, которые ребёнок
                <br />
                будет <span className="text-program-sea">вспоминать</span> всю жизнь
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base md:text-lg text-white/85 max-w-2xl font-normal normal-case leading-relaxed mb-8">
              
              На базе лагеря «Морская звезда» на берегу Чёрного моря — собственный пляж, творческие проекты и три недели настоящего лета. 
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap items-center gap-3 mb-8">
              
              {["21 день", "Для детей 8–14 лет"].map((chip) =>
              <span key={chip} className="bg-white/15 backdrop-blur-sm text-white text-xs font-medium px-4 py-2 rounded-full">
                  {chip}
                </span>
              )}
            </motion.div>
            <motion.a
              href="#forma"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="inline-block btn-gold px-8 py-4 rounded-2xl text-sm tracking-widest">
              
              Записаться — от 134 000 ₽
            </motion.a>
          </div>
        </div>
      </section>

      {/* ── Hook — neutral block ── */}
      <section className="px-3 md:px-6 xl:px-10 mt-4">
        <div className="bg-background rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-4xl md:text-6xl text-foreground mb-6">
                Лагерь — это <span className="text-program-sea">не «сдать ребёнка на лето»</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="flex flex-col lg:flex-row gap-10 items-center">
                <div className="w-full lg:w-1/2 space-y-6">
                  <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                    Многие родители слышат слово «лагерь» и представляют одно и то же: скучные мероприятия по расписанию, безликие корпуса, тихий час. Мы понимаем это ощущение.
                  </p>
                  <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                    Здесь всё устроено иначе. С первого дня каждый ребёнок выбирает творческий проект — и дальше три недели работает над ним всерьёз: с педагогом, с группой, с результатом в конце смены. Плюс море, пляж, костры и друзья, с которыми потом переписываются годами.
                  </p>
                </div>

                {/* Stacked photo carousel */}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                  <div
                    className="relative w-full h-[460px]"
                    onMouseEnter={() => setWhyPaused(true)}
                    onMouseLeave={() => setWhyPaused(false)}>
                    
                    <AnimatePresence>
                      {whyPhotos.map((photo, i) => {
                        const offset = (i - whySlide + whyPhotos.length) % whyPhotos.length;
                        if (offset > 3) return null;
                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{
                              opacity: offset === 0 ? 1 : 0.55 - offset * 0.12,
                              scale: 1 - offset * 0.05,
                              y: offset * 16,
                              x: offset * 8,
                              zIndex: whyPhotos.length - offset,
                              rotateZ: offset * -2
                            }}
                            exit={{ opacity: 0, scale: 0.9, y: -20 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0">
                            
                            <div className="w-full h-full rounded-[1.2rem] overflow-hidden shadow-2xl">
                              <img src={photo} alt="Лагерь" className="w-full h-full object-cover" />
                            </div>
                          </motion.div>);

                      })}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Projects — 4 static cards on teal bg ── */}
      <section className="section-padding overflow-hidden">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl text-white mb-4">
              Выбери <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">своё</span> лето
            </h2>
            <p className="text-white/70 text-base md:text-lg mb-14 max-w-2xl font-normal normal-case">
              В начале смены каждый ребёнок выбирает один проект. Занятия, дружба и финальный день выстраиваются вокруг этого выбора.
            </p>
          </AnimatedSection>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {projects.map((p, i) =>
          <AnimatedSection key={p.name} delay={i * 0.1}>
              <div className="bg-white rounded-[1.5rem] overflow-hidden h-full flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <span className="bg-gradient-to-br from-amber-400 to-amber-600 bg-clip-text text-transparent font-black text-lg">{i + 1}</span>
                  </div>
                </div>
                <div className="p-5 md:p-6 flex flex-col flex-1">
                  <p className="text-foreground/50 text-xs uppercase tracking-widest mb-2">
                    {p.subtitle}
                  </p>
                  <h3 className="text-lg md:text-xl text-foreground mb-3">{p.name}</h3>
                  <p className="text-base text-foreground/80 font-normal normal-case leading-relaxed mb-3 flex-1">{p.text}</p>
                  <p className="text-sm text-foreground/60 italic font-normal normal-case">{p.fit}</p>
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* ── Facilities — neutral block with map ── */}
      <section className="px-3 md:px-6 xl:px-10">
        <div className="bg-background rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-4xl md:text-6xl text-foreground mb-6">
                Где и как <span className="text-program-sea">живут дети</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="grid lg:grid-cols-2 gap-10 items-center mb-10">
                <div>
                  <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                    «Морская звезда» получила звание лучшей детской здравницы на Чёрном море — и это чувствуется в деталях: новые корпуса, большая охраняемая территория, собственный пляж в субтропическом лесу.
                  </p>
                </div>
                <div>
                  <div className="rounded-[1.5rem] overflow-hidden aspect-[16/10]">
                    <img src={seaResort} alt="База лагеря" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {facilities.map((f, i) =>
                <div key={i} className="rounded-xl overflow-hidden relative aspect-square">
                    <img src={f.image} alt={f.text} className="w-full h-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 bg-program-sea/75 backdrop-blur-sm px-4 py-3 h-[4.5rem] md:h-[4.5rem] flex items-center">
                      <p className="text-white text-sm md:text-base font-bold uppercase tracking-wide leading-snug">{f.text}</p>
                    </div>
                  </div>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Price — receipt style with side photos ── */}
      <section className="py-20 px-3 md:px-6 xl:px-10">
        <div className="fluid-container">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-6">
              <div className="hidden lg:block">
                <div className="rounded-[1.5rem] overflow-hidden aspect-[3/4]">
                  <img src={seaDance} alt="Фото из лагеря" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="bg-white rounded-[1.5rem] w-full px-8 py-10 shadow-2xl">
                <div className="text-center border-b-2 border-dashed border-foreground/20 pb-6 mb-6">
                  <h2 className="text-2xl md:text-3xl text-foreground mb-1">Стоимость смены</h2>
                  <p className="text-sm text-muted-foreground font-normal normal-case">Лагерь  на море · 23 июня — 15 июля 2026</p>
                </div>
                <div className="space-y-4 mb-8">
                  {[
                  "Проживание в новых корпусах",
                  "5-разовое питание (шведский стол)",
                  "Творческий проект на выбор",
                  "Экскурсии и мероприятия",
                  "Купание и пляж ежедневно",
                  "Сопровождающий от ассоциации 24/7"].
                  map((item, i) =>
                  <div key={i} className="flex items-start gap-3">
                      <span className="mt-1 w-5 h-5 rounded-full border-2 border-program-sea bg-program-sea/10 flex items-center justify-center shrink-0">
                        <span className="w-2 h-2 rounded-full bg-program-sea" />
                      </span>
                      <p className="text-foreground text-base font-normal normal-case leading-snug">{item}</p>
                    </div>
                  )}
                </div>
                <div className="border-t-2 border-dashed border-foreground/20 pt-6">
                  <div className="flex items-end justify-between">
                    <span className="text-muted-foreground text-sm font-normal normal-case">Стоимость</span>
                    <span className="text-3xl md:text-4xl font-bold text-foreground">от 134 000 ₽</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-xs mt-4 font-normal normal-case leading-relaxed mb-6">
                  Трансфер до лагеря оплачивается отдельно. Возможна рассрочка.
                </p>
                <a
                  href="#forma"
                  className="block w-full text-center btn-gold px-6 py-4 rounded-2xl text-sm tracking-widest">
                  
                  Записаться
                </a>
              </div>

              <div className="hidden lg:block">
                <div className="rounded-[1.5rem] overflow-hidden aspect-[3/4]">
                  <img src={seaPsychology} alt="Фото из лагеря" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="px-3 md:px-6 xl:px-10">
        <div className="rounded-[2rem] bg-white/10 backdrop-blur-sm border border-white/15 py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-4xl md:text-6xl text-white mb-4">
                Что говорят <span className="bg-gradient-to-r from-amber-300 via-amber-200 via-40% to-amber-500 bg-clip-text text-transparent">участники</span>
              </h2>
              <p className="text-white/60 text-base md:text-lg mb-12 max-w-xl font-normal normal-case">
                Отзывы родителей и детей о наших сменах.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div
                className="relative mx-auto w-[280px] md:w-[340px] h-[560px] md:h-[640px]"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => {setIsPaused(false);setZoomed(null);}}>
                
                <AnimatePresence>
                  {testimonials.map((item, i) => {
                    const offset = (i - currentTestimonial + testimonials.length) % testimonials.length;
                    if (offset > 4) return null;
                    const isZoomed = zoomed === item.id;
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{
                          opacity: isZoomed ? 1 : offset === 0 ? 1 : 0.55 - offset * 0.1,
                          scale: isZoomed ? 1.08 : 1 - offset * 0.045,
                          y: isZoomed ? -8 : offset * 18,
                          x: isZoomed ? 0 : offset * 10,
                          zIndex: isZoomed ? 100 : testimonials.length - offset,
                          rotateZ: isZoomed ? 0 : offset * -2
                        }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 cursor-pointer"
                        onClick={() => offset === 0 && setZoomed(isZoomed ? null : item.id)}>
                        
                        <div className="w-full h-full flex flex-col">
                          <div className="flex-1 rounded-[1.2rem] overflow-hidden shadow-2xl bg-background">
                            <img src={item.image} alt={`Отзыв от ${item.name}`} className="w-full h-full object-cover" />
                          </div>
                          <motion.div
                            className="mt-4 text-center"
                            animate={{ opacity: offset === 0 ? 1 : 0 }}
                            transition={{ duration: 0.3 }}>
                            
                            <p className="text-foreground font-bold text-base">{item.name}</p>
                            <p className="text-foreground/60 text-sm">{item.role}</p>
                          </motion.div>
                        </div>
                      </motion.div>);

                  })}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Other programs — neutral block ── */}
      <section className="px-3 md:px-6 xl:px-10 mt-4 mb-4">
        <div className="bg-background rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-4xl md:text-6xl text-foreground mb-14">
                Посмотрите <span className="text-program-sea">ещё</span>
              </h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-5 mb-8">
              {otherPrograms.map((p, i) =>
              <AnimatedSection key={p.title} delay={i * 0.08}>
                  <a
                  href={p.href}
                  className="group block rounded-[1.5rem] border border-border hover:border-program-sea/30 p-8 transition-all duration-500 hover:shadow-lg bg-card h-full text-center">
                  
                    <img src={p.illustration} alt={p.title} className={`${p.illustClass} mx-auto mb-4 object-contain`} />
                    <h3 className="text-lg md:text-xl text-foreground mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground font-normal normal-case mb-2">{p.dates}</p>
                    <p className="text-base font-bold text-foreground mb-4">{p.price}</p>
                    <span className="inline-block btn-gold px-5 py-2.5 rounded-xl text-xs tracking-widest">
                      Подробнее →
                    </span>
                  </a>
                </AnimatedSection>
              )}
            </div>

            <AnimatedSection delay={0.3}>
              <a
                href="/kanikuly/online"
                className="group block rounded-[1.5rem] border border-border hover:border-program-sea/30 p-8 transition-all duration-500 hover:shadow-lg bg-card">
                
                <div className="flex items-center gap-6">
                  <img src={illustHilderstone} alt="Hilderstone College" className="h-28 w-auto object-contain shrink-0" />
                  <div>
                    <h3 className="text-lg md:text-xl text-foreground mb-2">
                      Онлайн языковая практика с Hilderstone College
                    </h3>
                    <p className="text-sm text-muted-foreground font-normal normal-case leading-relaxed mb-4">
                      Ребёнок остаётся дома этим летом или хочет продолжить практику после лагеря? Британский преподаватель, группа до 12 человек, сертификат. Вторая смена — с 15 июня, первая — с 1 июня.
                    </p>
                    <span className="inline-block btn-gold px-5 py-2.5 rounded-xl text-xs tracking-widest">
                      Узнать подробнее →
                    </span>
                  </div>
                </div>
              </a>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>);

};

export default SeaCamp;