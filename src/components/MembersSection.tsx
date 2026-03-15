import AnimatedSection from "./AnimatedSection";

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

const MemberCard = ({ member, index }: { member: Member; index: number }) => {
  const initials = member.name
    .split(" ")
    .map((w) => w[0])
    .join("");

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

const MembersSection = () => {
  return (
    <section className="px-3">
      <div className="section-alt rounded-[2rem] py-20 px-6 md:px-16">
        <div className="container mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl text-foreground mb-4">
              Кто входит
              <br />
              в ассоциацию
            </h2>
            <p className="text-muted-foreground mb-14 max-w-2xl text-lg font-normal normal-case">
              15 школ и центров дополнительного образования — Москва, Подмосковье, Белгород, Курск, Воронеж, Чебоксары, Тамбов, Кисловодск.
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
  );
};

export default MembersSection;
