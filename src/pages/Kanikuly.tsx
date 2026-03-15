import { motion } from "framer-motion";
import Header from "@/components/Header";
import AnimatedSection from "@/components/AnimatedSection";
import heroBg from "@/assets/kanikuly-hero.jpg";

/* ─── data ─── */

const faq = [
  {
    q: "Это безопасно?",
    a: "С каждой группой едут опытные педагоги-сопровождающие, все локации и отели проверены лично. Родители получают фото и сообщения каждый день.",
  },
  {
    q: "Это даст результат?",
    a: "Дети возвращаются с реальным прогрессом в английском, новым пониманием мира и уверенностью в себе — это замечают все родители, не только мы.",
  },
  {
    q: "Сколько это стоит?",
    a: "Программы от 28 500 ₽ — языковая онлайн-практика с британским колледжем. Туры и лагеря от 95 000 ₽. Для большинства программ доступна рассрочка, первый взнос 30%.",
  },
];

const stats = [
  { number: "5", label: "лет проводим программы" },
  { number: "15", label: "центров в ассоциации" },
  { number: "5 500+", label: "учеников в наших школах ежегодно" },
  { number: "350", label: "детей в совместных программах" },
];

interface ProgramCard {
  flag: string;
  color: string;
  colorBorder: string;
  dates: string;
  title: string;
  text: string;
  link: string;
  href: string;
  notice?: string;
  tag?: string;
  dimmed?: boolean;
}

const programs: ProgramCard[] = [
  {
    flag: "🇨🇳",
    color: "bg-program-china/10",
    colorBorder: "border-program-china/40 hover:border-program-china",
    dates: "3 — 12 июня · 10 дней · от 165 000 ₽",
    title: "Путешествие в Китай",
    text: "Пять городов за десять дней — Пекин, Нанкин, Сучжоу, Шанхай, Ханчжоу. Великая стена, каллиграфия в университете, скоростные поезда. Для детей и семей.",
    link: "Подробнее о программе →",
    href: "/kanikuly/china",
  },
  {
    flag: "🌊",
    color: "bg-program-sea/10",
    colorBorder: "border-program-sea/40 hover:border-program-sea",
    dates: "23 июня — 15 июля · 21 день · от 134 000 ₽",
    title: "Лагерь на Чёрном море",
    text: "На базе «Морская звезда», собственный пляж 145 м. Ребёнок выбирает творческий проект — английский, танцы, арт или психология — и три недели работает над ним всерьёз. Для детей 8–14 лет.",
    link: "Подробнее о программе →",
    href: "/kanikuly/more",
  },
  {
    flag: "🏔️",
    color: "bg-program-altai/10",
    colorBorder: "border-program-altai/40 hover:border-program-altai",
    dates: "10 — 25 июля · 15 дней · от 95 000 ₽",
    title: "Языковой лагерь на Алтае",
    text: "Горы, водопады и английский без учебников — в квестах, у костра, в разговорах с новыми друзьями. Для подростков 10–17 лет.",
    link: "Подробнее о программе →",
    href: "/kanikuly/altai",
  },
  {
    flag: "🇬🇧",
    color: "bg-program-online/10",
    colorBorder: "border-program-online/40 hover:border-program-online",
    tag: "Смена 1",
    dates: "1 — 12 июня · 10 занятий · 28 500 ₽",
    title: "Языковая практика с Hilderstone College",
    text: "Дипломированный преподаватель из Британского колледжа, группа до 12 человек, 90 минут каждый день. По окончании — официальный сертификат колледжа. Для детей от 11 лет.",
    link: "Подробнее о программе →",
    href: "/kanikuly/online",
  },
  {
    flag: "🇬🇧",
    color: "bg-program-online/10",
    colorBorder: "border-program-online/40 hover:border-program-online",
    tag: "Смена 2",
    dates: "15 — 26 июня · 10 занятий · 28 500 ₽",
    title: "Языковая практика с Hilderstone College",
    text: "Те же условия, другие даты — для тех кому первая смена не подходит по расписанию.",
    link: "Подробнее о программе →",
    href: "/kanikuly/online",
  },
  {
    flag: "🇦🇪",
    color: "bg-program-uae/10",
    colorBorder: "border-program-uae/40 hover:border-program-uae",
    dimmed: true,
    notice: "Даты уточняются",
    title: "Дубай",
    dates: "",
    text: "Международный кампус, английский с носителями, знакомство с реальным бизнесом. Программа временно приостановлена — следим за обстановкой и планируем возобновить при первой возможности.",
    link: "Узнать подробнее →",
    href: "/kanikuly/uae",
  },
];

const whyItems = [
  { icon: "🧠", title: "Уверенность", text: "Новая среда и новые задачи — ребёнок справляется сам. Этот опыт остаётся с ним." },
  { icon: "🌍", title: "Понимание мира", text: "Другие страны, другие люди, другой уклад — горизонт расширяется и уже не сужается обратно." },
  { icon: "🤝", title: "Друзья", text: "Дружба, которая завязывается в поездке, обычно оказывается крепче школьной. Многие ребята общаются годами." },
];

const reviews = [
  { text: "«Я очень переживала отпускать Мишу одного в Китай — ему было 12. Сопровождающие писали каждый день. Вернулся самостоятельнее. Теперь сам спрашивает, куда поедем в следующий раз.»", author: "Ирина, Белгород · тур в Китай" },
  { text: "«Я думал, лагерь — это скучно. На Алтае всё оказалось по-другому. Мы говорили по-английски даже за ужином — потому что было интересно. Хочу снова.»", author: "Артём, 15 лет · лагерь на Алтае" },
  { text: "«После лагеря на море дочь сама записалась на разговорный английский. Говорит, хочет снова попасть в такую среду.»", author: "Елена, Москва · лагерь на море" },
  { text: "«Мы поехали с сыном в Дубай вместе. Он увидел как работает реальный бизнес — теперь только об этом и думает.»", author: "Андрей и Кирилл, Москва · тур в ОАЭ" },
  { text: "«Ребёнок вернулся и сказал: \"Мам, я хочу стать лучше. Давай начнём изучать китайский.\" Вот и всё.»", author: "Наталья, Москва" },
];

const safety = [
  { icon: "👥", title: "Сопровождающие", text: "С каждой группой едут педагоги с опытом работы с детьми в нестандартных ситуациях." },
  { icon: "📱", title: "Связь с родителями", text: "Ежедневные фото и сообщения в родительский чат. Вы всегда знаете где ребёнок и как у него дела." },
  { icon: "🏥", title: "Медицинская поддержка", text: "В лагерях — круглосуточный медпункт. В турах — страховка и чёткий протокол на любой случай." },
  { icon: "🏨", title: "Проверенные места", text: "Все отели, базы и кампусы мы проверяем до того как включить в программу." },
  { icon: "📋", title: "Документы", text: "Визы, страховки, разрешения — помогаем оформить всё. Вам не нужно разбираться в этом самостоятельно." },
];

/* ─── page ─── */

const Kanikuly = () => (
  <main className="space-y-4">
    <Header />

    {/* ── HERO ── */}
    <section className="px-3 md:px-6 xl:px-10">
      <div className="relative min-h-[90vh] flex items-end rounded-[2rem] overflow-hidden">
        <img src={heroBg} alt="Дети в образовательном путешествии" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="relative z-10 w-full px-6 md:px-16 pb-12 md:pb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs uppercase tracking-[0.2em] text-primary-foreground/60 mb-6"
          >
            Программы 2026
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-primary-foreground leading-[0.9] mb-8 max-w-5xl"
          >
            Каникулы,
            <br />
            которые <span className="text-accent">меняют</span> детей
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16"
          >
            <p className="text-lg md:text-xl text-primary-foreground/85 max-w-lg font-normal normal-case leading-relaxed">
              Образовательные туры, языковые лагеря и онлайн-практика для детей и подростков от 8 до 17 лет. Для семей, которым важно чтобы каникулы были не просто отдыхом.
            </p>
            <a href="#programs" className="inline-block btn-gold px-8 py-4 rounded-2xl transition-all text-sm tracking-widest shrink-0">
              Выбрать программу ↓
            </a>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── FAQ columns ── */}
    <section className="section-padding">
      <div className="fluid-container">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {faq.map((item, i) => (
            <AnimatedSection key={item.q} delay={i * 0.1}>
              <h3 className="text-lg text-foreground mb-3">{item.q}</h3>
              <p className="text-muted-foreground font-normal normal-case leading-relaxed text-[15px]">{item.a}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* ── Stats ── */}
    <section className="section-padding section-alt">
      <div className="fluid-container">
        <AnimatedSection>
          <h2 className="text-4xl md:text-6xl text-foreground mb-14">
            Нам <span className="text-accent">доверяют</span>
          </h2>
        </AnimatedSection>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <AnimatedSection key={s.label} delay={i * 0.1}>
              <div className="border-t-2 border-primary pt-6">
                <p className="text-5xl md:text-6xl font-black text-foreground mb-3">{s.number}</p>
                <p className="text-sm text-muted-foreground font-normal normal-case leading-snug">{s.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* ── Program cards ── */}
    <section id="programs" className="section-padding">
      <div className="fluid-container">
        <AnimatedSection>
          <h2 className="text-4xl md:text-6xl text-foreground mb-4">
            Что есть <span className="text-accent">в этом году</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mb-14 font-normal normal-case">
            Шесть программ — выбирайте по возрасту, датам и тому, что откликается вашему ребёнку.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {programs.map((p, i) => (
            <AnimatedSection key={p.title + i} delay={i * 0.08}>
              <a
                href={p.href}
                className={`group block rounded-[1.5rem] overflow-hidden border transition-all duration-500 hover:shadow-xl h-full ${p.colorBorder} ${p.dimmed ? "opacity-70 hover:opacity-100" : ""}`}
              >
                <div className={`p-7 h-full flex flex-col ${p.color}`}>
                  <div className="text-3xl mb-4">{p.flag}</div>
                  {p.tag && (
                    <span className="inline-block self-start text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-foreground/5 text-foreground/60 mb-3">
                      {p.tag}
                    </span>
                  )}
                  {p.notice && (
                    <p className="text-sm font-medium text-destructive mb-2 normal-case">{p.notice}</p>
                  )}
                  {p.dates && (
                    <p className="text-xs text-muted-foreground mb-3 normal-case">{p.dates}</p>
                  )}
                  <h3 className="text-base text-foreground mb-3">{p.title}</h3>
                  <p className="text-[15px] text-muted-foreground leading-relaxed mb-6 normal-case font-normal flex-1">
                    {p.text}
                  </p>
                  <span className="text-sm font-bold uppercase tracking-wide text-foreground/70 group-hover:tracking-widest transition-all duration-300">
                    {p.link}
                  </span>
                </div>
              </a>
            </AnimatedSection>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-8 normal-case font-normal">
          *Авиабилеты и страховка для туров и лагерей оплачиваются отдельно. Для большинства программ доступна рассрочка.
        </p>
      </div>
    </section>

    {/* ── Why it works ── */}
    <section className="px-3 md:px-6 xl:px-10">
      <div className="bg-foreground rounded-[2rem] py-20 px-6 md:px-16">
        <div className="fluid-container">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl text-primary-foreground mb-4">
              Почему это <span className="text-accent">работает</span>
            </h2>
            <p className="text-primary-foreground/70 text-lg max-w-3xl mb-4 font-normal normal-case leading-relaxed">
              Когда подросток впервые решает задачу на английском в реальном разговоре с носителем — не на уроке, а в жизни — что-то меняется. Когда он поднимается на Великую Китайскую стену — мир перестаёт быть страницей в учебнике.
            </p>
            <p className="text-primary-foreground/70 text-lg max-w-3xl mb-14 font-normal normal-case leading-relaxed">
              Дети возвращаются более самостоятельными и открытыми. Это замечают родители, это видно по тому как дети говорят о следующей поездке — сами, без напоминаний.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-10">
            {whyItems.map((w, i) => (
              <AnimatedSection key={w.title} delay={i * 0.1}>
                <div className="text-3xl mb-4">{w.icon}</div>
                <h3 className="text-base text-primary-foreground mb-2">{w.title}</h3>
                <p className="text-primary-foreground/60 text-[15px] font-normal normal-case leading-relaxed">{w.text}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ── Reviews ── */}
    <section className="section-padding">
      <div className="fluid-container">
        <AnimatedSection>
          <h2 className="text-4xl md:text-6xl text-foreground mb-14">
            Что говорят <span className="text-accent">родители</span>
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <div className="rounded-[1.5rem] border border-border p-7 h-full flex flex-col">
                <p className="text-foreground/80 text-[15px] italic leading-relaxed mb-6 flex-1 font-normal normal-case">
                  {r.text}
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{r.author}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* ── Safety ── */}
    <section className="section-padding section-alt">
      <div className="fluid-container">
        <AnimatedSection>
          <h2 className="text-4xl md:text-6xl text-foreground mb-4">
            Как мы <span className="text-accent">заботимся</span> о детях
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mb-14 font-normal normal-case">
            Отпустить ребёнка в другую страну или на три недели в лагерь — это доверие, которое нужно заслужить. Вот как это устроено у нас.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {safety.map((s, i) => (
            <AnimatedSection key={s.title} delay={i * 0.08}>
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="text-sm text-foreground mb-2">{s.title}</h3>
              <p className="text-[13px] text-muted-foreground font-normal normal-case leading-relaxed">{s.text}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* ── About block ── */}
    <section className="section-padding">
      <div className="fluid-container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl text-foreground mb-6">
              Ассоциация <span className="text-accent">«Траектория Роста»</span>
            </h2>
            <p className="text-muted-foreground text-[15px] leading-relaxed mb-4 font-normal normal-case">
              Мы — объединение центров дополнительного образования из разных городов России. В 2021 году несколько руководителей языковых школ начали встречаться на профессиональных конференциях. Деловое общение переросло в дружбу, а дружба — в желание делать что-то вместе.
            </p>
            <p className="text-muted-foreground text-[15px] leading-relaxed mb-8 font-normal normal-case">
              Сегодня в ассоциации 15 центров из Москвы, Подмосковья, Белгорода, Курска, Воронежа, Чебоксар, Тамбова и Кисловодска. Вместе мы организуем программы для детей, которые ни один центр не смог бы сделать в одиночку.
            </p>
            <a href="/" className="text-sm font-bold uppercase tracking-wide text-primary hover:tracking-widest transition-all duration-300">
              Об ассоциации →
            </a>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <div className="rounded-[2rem] overflow-hidden bg-muted aspect-[4/3]">
              <img
                src="https://placehold.co/800x600/f0f0f0/999?text=Ассоциация"
                alt="Команда ассоциации Траектория Роста"
                className="w-full h-full object-cover"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* ── Crosslinks ── */}
    <section className="section-padding section-alt">
      <div className="fluid-container">
        <AnimatedSection>
          <h2 className="text-4xl md:text-6xl text-foreground mb-14">
            Есть ещё <span className="text-accent">кое-что</span>
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-5">
          <AnimatedSection delay={0.05}>
            <a href="/uchitelya" className="group block rounded-[1.5rem] border border-border hover:border-primary/30 p-8 transition-all duration-500 hover:shadow-lg h-full bg-card">
              <h3 className="text-base text-foreground mb-3">Программы для педагогов</h3>
              <p className="text-[15px] text-muted-foreground mb-6 normal-case font-normal leading-relaxed">
                Онлайн-курс с британскими преподавателями Hilderstone College и ProSkill Fest — ежегодный фестиваль для учителей.
              </p>
              <span className="text-sm font-bold uppercase tracking-wide text-primary group-hover:tracking-widest transition-all duration-300">
                Узнать подробнее →
              </span>
            </a>
          </AnimatedSection>
          <AnimatedSection delay={0.12}>
            <a href="/partnerstvo" className="group block rounded-[1.5rem] border border-border hover:border-primary/30 p-8 transition-all duration-500 hover:shadow-lg h-full bg-card">
              <h3 className="text-base text-foreground mb-3">Вы руководите образовательным центром?</h3>
              <p className="text-[15px] text-muted-foreground mb-6 normal-case font-normal leading-relaxed">
                Расскажем как устроено партнёрство в ассоциации и что это даёт на практике.
              </p>
              <span className="text-sm font-bold uppercase tracking-wide text-primary group-hover:tracking-widest transition-all duration-300">
                О партнёрстве →
              </span>
            </a>
          </AnimatedSection>
        </div>
      </div>
    </section>
  </main>
);

export default Kanikuly;
