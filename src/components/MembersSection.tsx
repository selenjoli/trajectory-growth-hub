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

const MemberCard = ({ member }: { member: Member }) => {
  const initials = member.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <div className="rounded-2xl border border-border p-5 bg-card">
      <div className="w-14 h-14 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-lg mb-3">
        {initials}
      </div>
      <p className="font-semibold text-[15px] text-foreground normal-case">{member.name}</p>
      <p className="text-sm text-muted-foreground normal-case">{member.school}</p>
      <p className="text-xs text-muted-foreground/70 normal-case">{member.city}</p>
    </div>
  );
};

const MembersSection = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl text-foreground mb-3">
          Кто входит в ассоциацию
        </h2>
        <p className="text-muted-foreground mb-10 max-w-2xl font-normal normal-case">
          15 школ и центров дополнительного образования — Москва, Подмосковье, Белгород, Курск, Воронеж, Чебоксары, Тамбов, Кисловодск.
        </p>

        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-5">
            Учредители
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {founders.map((m) => (
              <MemberCard key={m.name} member={m} />
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-5">
            Участники
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {members.map((m) => (
              <MemberCard key={m.name} member={m} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembersSection;
