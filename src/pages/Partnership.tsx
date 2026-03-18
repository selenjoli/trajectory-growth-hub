import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import AnimatedSection from "@/components/AnimatedSection";

import heroImg from "@/assets/partnership.jpg";
import quoteImg from "@/assets/rost-quote.jpg";
import meetingImg from "@/assets/rost-meeting.jpg";
import collaborationImg from "@/assets/rost-collaboration.jpg";
import turizmImg from "@/assets/rost-turizm.jpg";
import razvitieImg from "@/assets/rost-razvitie.jpg";
import sotrudnichestvoImg from "@/assets/rost-sotrudnichestvo.jpg";
import obrazovanieImg from "@/assets/rost-obrazovanie.jpg";
import russiaMap from "@/assets/russia-map.png";

/* ---- data ---- */

const benefits = [
  {
    image: turizmImg,
    title: "Совместные программы для учеников",
    text: "Ваши дети едут в Китай, на Алтай, на море — в рамках проверенных программ Ассоциации. Вы не организуете логистику с нуля, вы присоединяетесь к готовому. Это то, что ни один центр не потянет в одиночку.",
    link: "/kanikuly",
    linkText: "Смотреть программы",
  },
  {
    image: razvitieImg,
    title: "Развитие педагогов",
    text: "Ваша команда участвует в Teachers Development Course с Hilderstone College и в ProSkill Fest. Мотивированные учителя — это не абстракция, это конкретный результат который видят ученики и родители.",
    link: "/uchitelya",
    linkText: "Программы для педагогов",
  },
  {
    image: sotrudnichestvoImg,
    title: "Живое профессиональное сообщество",
    text: "Конференции, семинары, неформальные встречи. Коллеги которые понимают вас — потому что сами через то же проходят. Это редкость в нашей сфере.",
  },
  {
    image: obrazovanieImg,
    title: "Общий маркетинг",
    text: "Логотип вашего центра на сайте Ассоциации, упоминание в материалах, совместные активности. Вас видят там, куда вы сами не дотянетесь в одиночку.",
  },
  {
    image: meetingImg,
    title: "Обмен опытом без страха",
    text: "Здесь не подсмотрят и не скопируют. Здесь делятся — потому что понимают что сильное сообщество выгоднее чем конкуренция.",
  },
  {
    image: collaborationImg,
    title: "Международные партнёрства",
    text: "Доступ к программам Hilderstone College и другим международным проектам ассоциации — то, что сложно выстроить самостоятельно.",
    link: "/uchitelya/kurs",
    linkText: "Hilderstone College",
  },
];

interface Member {
  name: string;
  school: string;
  city: string;
}

const founders: Member[] = [
  { name: "Виктория Першина", school: "Smart Cookies Club", city: "Москва" },
  { name: "Марина Кокорина", school: "Академия Языков", city: "Москва" },
  { name: "Галина Фаустова", school: "LS Studio", city: "Белгород" },
  { name: "Юлия Алексеева", school: "Liberty School", city: "Московская область" },
  { name: "Татьяна Ермилова", school: "ABC School", city: "Москва" },
  { name: "Светлана Гольцова", school: "HighFlySchool", city: "Москва" },
];

const members: Member[] = [
  { name: "Татьяна Морозова", school: "Lingua Cat", city: "Москва" },
  { name: "Ирина Бондарь", school: "IC School", city: "Москва" },
  { name: "Екатерина Полянская", school: "Космос", city: "Московская область" },
  { name: "Юлия Мирошниченко", school: "ABC Club", city: "Московская область" },
  { name: "Светлана Москаленко", school: "Motion School", city: "Московская область" },
  { name: "Елена Шестакова", school: "Eye Club", city: "Кисловодск" },
  { name: "Александра Филиппова", school: "Язык для успеха", city: "Чебоксары" },
  { name: "Диана Воробьева", school: "Лингва-Плюс", city: "Курск" },
  { name: "Вера Романова", school: "SPU", city: "Тамбов" },
];

const testimonials = [
  { id: 1, image: "https://placehold.co/400x700/1a7a4a/ffffff?text=Отзыв+1", name: "Ирина Бондарь", role: "IC School, Москва" },
  { id: 2, image: "https://placehold.co/400x700/1a7a4a/ffffff?text=Отзыв+2", name: "Вера Романова", role: "SPU, Тамбов" },
  { id: 3, image: "https://placehold.co/400x700/1a7a4a/ffffff?text=Отзыв+3", name: "Светлана Гольцова", role: "HighFlySchool, Москва" },
];

/* ---- gold gradient ---- */
const gold = "bg-gradient-to-r from-amber-300 via-amber-200 via-40% to-amber-500 bg-clip-text text-transparent";

/* ---- member card ---- */
const MemberCard = ({ member, index }: { member: Member; index: number }) => {
  const initials = member.name.split(" ").map((w) => w[0]).join("");
  return (
    <AnimatedSection delay={index * 0.05}>
      <div className="rounded-[1.5rem] border border-border p-6 bg-card hover:border-primary/30 transition-all duration-300 group h-full">
        <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-sm mb-4 group-hover:scale-110 transition-transform duration-300">
          {initials}
        </div>
        <p className="font-semibold text-foreground normal-case">{member.name}</p>
        <p className="text-sm text-muted-foreground normal-case">{member.school}</p>
        <p className="text-xs text-muted-foreground/60 normal-case mt-1">{member.city}</p>
      </div>
    </AnimatedSection>
  );
};

/* ---- page ---- */

const Partnership = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [zoomed, setZoomed] = useState<number | null>(null);

  /* gallery for pain block */
  const [gallerySlide, setGallerySlide] = useState(0);
  const [galleryPaused, setGalleryPaused] = useState(false);
  const galleryPhotos = [heroImg, meetingImg, collaborationImg, sotrudnichestvoImg];

  const nextSlide = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused || zoomed !== null) return;
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, [isPaused, zoomed, nextSlide]);

  useEffect(() => {
    if (galleryPaused) return;
    const interval = setInterval(() => {
      setGallerySlide((prev) => (prev + 1) % galleryPhotos.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [galleryPaused, galleryPhotos.length]);

  return (
    <main className="space-y-4">
      <Header />

      {/* ── HERO ── */}
      <section className="px-3 md:px-6 xl:px-10">
        <div className="relative min-h-[90vh] flex items-end rounded-[2rem] overflow-hidden">
          <img
            src={heroImg}
            alt="Команда руководителей Ассоциации Траектория Роста"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/50" />
          <div className="relative z-10 w-full px-6 md:px-16 pb-12 md:pb-20">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs uppercase tracking-[0.2em] text-primary-foreground/60 mb-6"
            >
              Для руководителей образовательных центров
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-[0.95] mb-4 max-w-4xl"
            >
              Вы&nbsp;строите центр.
              <br />
              Мы&nbsp;знаем как это <span className="text-accent">бывает.</span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16"
            >
              <p className="text-base md:text-lg text-primary-foreground/85 max-w-lg font-normal normal-case leading-relaxed">
                Ассоциация «Траектория Роста» объединяет 15&nbsp;центров из&nbsp;8&nbsp;городов России. Не&nbsp;для того чтобы конкурировать — а&nbsp;чтобы вместе делать то, что в&nbsp;одиночку невозможно.
              </p>
              <a href="#about" className="inline-block btn-gold px-8 py-4 rounded-2xl transition-all text-sm tracking-widest shrink-0">
                Узнать об&nbsp;ассоциации ↓
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PAIN — "Это знакомо?" ── */}
      <section id="about" className="section-padding">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl text-foreground mb-10">
              Это <span className="text-accent">знакомо?</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="w-full lg:w-1/2 space-y-6">
                <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                  Строить образовательный центр — значит каждый день решать задачи, для которых нет готовых ответов. Как удержать сильных педагогов. Как объяснить родителям ценность того, что вы делаете. Как расти, когда рядом конкуренты которые демпингуют. Как не выгореть самому.
                </p>
                <p className="text-muted-foreground text-base md:text-lg font-normal normal-case leading-relaxed">
                  Большинство руководителей проходят через это в одиночку. Потому что не с кем поговорить — те кто рядом либо конкуренты, либо не понимают специфики.
                </p>
                <p className="text-foreground text-base md:text-lg font-medium normal-case leading-relaxed">
                  Ассоциация появилась именно из&nbsp;этого ощущения. В&nbsp;2021&nbsp;году несколько руководителей языковых школ начали встречаться и&nbsp;разговаривать — и&nbsp;обнаружили, что у&nbsp;всех одни и&nbsp;те&nbsp;же вопросы. И&nbsp;что многое можно решить вместе.
                </p>
              </div>

              {/* Stacked photo carousel */}
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                <div
                  className="relative w-full h-[460px]"
                  onMouseEnter={() => setGalleryPaused(true)}
                  onMouseLeave={() => setGalleryPaused(false)}
                >
                  <AnimatePresence>
                    {galleryPhotos.map((photo, i) => {
                      const offset = (i - gallerySlide + galleryPhotos.length) % galleryPhotos.length;
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
                            zIndex: galleryPhotos.length - offset,
                            rotateZ: offset * -2,
                          }}
                          exit={{ opacity: 0, scale: 0.9, y: -20 }}
                          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute inset-0"
                        >
                          <div className="w-full h-full rounded-[1.2rem] overflow-hidden shadow-2xl">
                            <img src={photo} alt="Ассоциация" className="w-full h-full object-cover" />
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── BENEFITS — "Что это значит на практике" ── */}
      <section className="px-3 md:px-6 xl:px-10">
        <div className="section-alt rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-4xl md:text-6xl text-foreground mb-4">
                Что это значит <span className="text-accent">на&nbsp;практике</span>
              </h2>
              <p className="text-muted-foreground mb-14 text-lg font-normal normal-case">
                Шесть конкретных вещей, которые получает каждый центр в&nbsp;составе ассоциации.
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.08}>
                  <div className="rounded-2xl overflow-hidden border border-border h-full bg-card">
                    <img src={item.image} alt={item.title} className="w-full h-44 object-cover" />
                    <div className="p-6">
                      <h3 className="text-lg mb-3">{item.title}</h3>
                      <p className="text-muted-foreground text-sm normal-case leading-relaxed">{item.text}</p>
                      {item.link && (
                        <Link to={item.link} className="text-accent text-sm font-semibold inline-flex items-center gap-1 mt-4 hover:underline">
                          {item.linkText} <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MEMBERS — "Кто уже внутри" ── */}
      <section className="px-3 md:px-6 xl:px-10">
        <div className="section-alt rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-4xl md:text-6xl text-foreground mb-4">
                <span className={gold}>15&nbsp;центров,</span> которые уже сделали этот&nbsp;шаг
              </h2>
              <p className="text-muted-foreground mb-14 max-w-2xl text-lg font-normal normal-case">
                Москва, Подмосковье, Белгород, Курск, Воронеж, Чебоксары, Тамбов, Кисловодск.
              </p>
            </AnimatedSection>

            <div className="mb-12">
              <p className="text-xs uppercase tracking-[0.15em] text-primary font-bold mb-6">
                Учредители
              </p>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {founders.map((m, i) => (
                  <MemberCard key={m.name} member={m} index={i} />
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-primary font-bold mb-6">
                Участники
              </p>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {members.map((m, i) => (
                  <MemberCard key={m.name} member={m} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUOTE — "Почему это работает" ── */}
      <section className="section-padding">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl text-foreground mb-12">
              Почему это <span className="text-accent">работает</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="flex flex-col md:flex-row gap-10 items-start">
              <div className="w-full md:w-1/3 shrink-0">
                <img
                  src={quoteImg}
                  alt="Виктория Першина"
                  className="w-full rounded-2xl object-cover aspect-[3/4]"
                />
              </div>
              <div className="w-full md:w-2/3">
                <blockquote className="border-l-4 border-accent pl-6 md:pl-8">
                  <p className="text-foreground text-lg md:text-xl font-normal normal-case leading-relaxed italic mb-6">
                    «В&nbsp;начале было Слово. Для меня эти строки звучат особенно, когда я&nbsp;думаю о&nbsp;нашем сообществе. Всё действительно началось с&nbsp;живого, тёплого общения. Но&nbsp;слово, сказанное с&nbsp;верой и&nbsp;поддержкой, обретает силу. Сегодня наши совместные проекты объединяют десятки школ и&nbsp;сотни участников. Мы&nbsp;создаём то, что получает искренние отклики и&nbsp;благодарность. Почему? Потому что у&nbsp;нас есть принцип, который не&nbsp;обсуждается: качество и&nbsp;польза. И&nbsp;пока это правило работает — наше слово превращается в&nbsp;дело, которому можно доверять.»
                  </p>
                  <footer className="text-foreground font-bold normal-case">
                    Виктория Першина
                  </footer>
                  <p className="text-muted-foreground text-sm normal-case">
                    Руководитель Smart Cookies Club, Москва
                  </p>
                </blockquote>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── TESTIMONIALS — green bg, stacked carousel ── */}
      <section className="px-3 md:px-6 xl:px-10">
        <div className="bg-accent rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-4xl md:text-6xl text-accent-foreground mb-4">
                <span className={gold}>Что говорят</span> участники ассоциации
              </h2>
              <p className="text-accent-foreground/70 text-lg mb-12 max-w-xl font-normal normal-case">
                Руководители центров — о&nbsp;том, что изменилось после вступления.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div
                className="relative mx-auto w-[280px] md:w-[340px] h-[560px] md:h-[640px]"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => { setIsPaused(false); setZoomed(null); }}
              >
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
                          rotateZ: isZoomed ? 0 : offset * -2,
                        }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 cursor-pointer"
                        onClick={() => offset === 0 && setZoomed(isZoomed ? null : item.id)}
                      >
                        <div className="w-full h-full flex flex-col">
                          <div className="flex-1 rounded-[1.2rem] overflow-hidden shadow-2xl bg-background">
                            <img src={item.image} alt={`Отзыв от ${item.name}`} className="w-full h-full object-cover" />
                          </div>
                          <motion.div
                            className="mt-4 text-center"
                            animate={{ opacity: offset === 0 ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <p className="text-accent-foreground font-bold text-base">{item.name}</p>
                            <p className="text-accent-foreground/60 text-sm">{item.role}</p>
                          </motion.div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── JOIN — "Как это работает" ── */}
      <section id="join" className="section-padding">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl text-foreground mb-4">
              Как это <span className="text-accent">работает</span>
            </h2>
            <p className="text-muted-foreground mb-12 max-w-2xl text-lg font-normal normal-case leading-relaxed">
              Никакого сложного процесса. Напишите нам — познакомимся, расскажем как устроена ассоциация изнутри и ответим на все вопросы. Никаких обязательств до разговора.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection delay={0.1}>
              <div className="bg-card border border-border rounded-2xl p-8 h-full flex flex-col">
                <h3 className="text-xl mb-6">Обсудить партнёрство</h3>
                <p className="text-muted-foreground text-sm normal-case leading-relaxed mb-8">
                  Расскажите о&nbsp;себе и&nbsp;своём центре — мы&nbsp;свяжемся в&nbsp;течение дня.
                </p>

                <a
                  href="mailto:rost-traektoria@yandex.ru?subject=Партнёрство — запрос"
                  className="block w-full text-center btn-gold px-8 py-4 rounded-2xl text-sm tracking-widest mb-6"
                >
                  Написать нам
                </a>

                <div className="space-y-2 text-sm text-muted-foreground normal-case mt-auto">
                  <p>📧 rost-traektoria@yandex.ru</p>
                </div>

                <p className="text-xs text-muted-foreground/50 normal-case mt-6">
                  Нажимая кнопку, вы соглашаетесь на&nbsp;обработку персональных данных в&nbsp;соответствии со&nbsp;ст.&nbsp;9&nbsp;ФЗ-152.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="rounded-2xl overflow-hidden h-full">
                <img
                  src={russiaMap}
                  alt="География ассоциации"
                  className="w-full h-full object-cover min-h-[300px]"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── CROSS-LINKS — "Посмотрите ещё" ── */}
      <section className="px-3 md:px-6 xl:px-10 mb-4">
        <div className="bg-primary rounded-[2rem] py-20 px-6 md:px-16">
          <div className="fluid-container">
            <AnimatedSection>
              <h2 className="text-4xl md:text-6xl text-primary-foreground mb-14">
                Посмотрите <span className="text-accent">ещё</span>
              </h2>
            </AnimatedSection>

            <div className="space-y-8">
              <AnimatedSection delay={0.05}>
                <div className="grid md:grid-cols-[1fr_auto] gap-10 md:gap-20 items-start">
                  <div>
                    <p className="text-primary-foreground/70 text-sm normal-case mb-3">
                      Хотите сначала понять как устроена вся ассоциация?
                    </p>
                    <Link
                      to="/"
                      className="text-accent text-sm font-semibold inline-flex items-center gap-1 hover:underline"
                    >
                      Об ассоциации <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>

              <hr className="border-primary-foreground/20" />

              <AnimatedSection delay={0.1}>
                <div>
                   <p className="text-primary-foreground/70 text-sm normal-case mb-4">
                    Хотите показать педагогам что у нас есть для них?
                  </p>
                    <div className="grid md:grid-cols-2 gap-4">
                    <Link
                      to="/uchitelya/kurs"
                      className="block bg-primary-foreground/10 border border-primary-foreground/20 rounded-2xl p-6 hover:bg-primary-foreground/15 transition-colors"
                    >
                      <span className="text-xs text-accent uppercase tracking-wider">Hilderstone College</span>
                      <h3 className="text-lg mt-2 mb-2 text-primary-foreground">Teachers Development Course</h3>
                      <p className="text-primary-foreground/70 text-sm normal-case leading-relaxed mb-3">
                        Онлайн-интенсив с&nbsp;британскими тьюторами · июль 2026
                      </p>
                      <span className="text-accent text-sm font-semibold inline-flex items-center gap-1">
                        Подробнее <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>

                    <Link
                      to="/uchitelya/fest"
                      className="block bg-primary-foreground/10 border border-primary-foreground/20 rounded-2xl p-6 hover:bg-primary-foreground/15 transition-colors"
                    >
                      <span className="text-xs text-accent uppercase tracking-wider">ProSkill Fest</span>
                      <h3 className="text-lg mt-2 mb-2 text-primary-foreground">Фестиваль для педагогов</h3>
                      <p className="text-primary-foreground/70 text-sm normal-case leading-relaxed mb-3">
                        7&nbsp;ноября 2026 · Москва
                      </p>
                      <span className="text-accent text-sm font-semibold inline-flex items-center gap-1">
                        Подробнее <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Partnership;
