import { useState } from "react";
import Icon from "@/components/ui/icon";

const seasons = [
  {
    id: "winter",
    label: "Зима",
    emoji: "❄️",
    cover: "https://cdn.poehali.dev/projects/9eb2ccf4-962b-4b8a-acfa-a0018106fe6c/files/6b75e6d5-71e6-40c2-b6ea-3734f4d57af6.jpg",
    bg: "from-blue-200/80 to-blue-400/60",
    photos: [
      { src: "https://cdn.poehali.dev/projects/9eb2ccf4-962b-4b8a-acfa-a0018106fe6c/files/6b75e6d5-71e6-40c2-b6ea-3734f4d57af6.jpg", caption: "Деревня под снегом" },
      { src: "https://cdn.poehali.dev/projects/9eb2ccf4-962b-4b8a-acfa-a0018106fe6c/files/ea2406f1-e54d-429e-a7f8-55df7d80bdf1.jpg", caption: "Зимний пейзаж" },
      { src: "https://cdn.poehali.dev/projects/9eb2ccf4-962b-4b8a-acfa-a0018106fe6c/files/6b75e6d5-71e6-40c2-b6ea-3734f4d57af6.jpg", caption: "Морозное утро" },
    ],
  },
  {
    id: "spring",
    label: "Весна",
    emoji: "🌸",
    cover: "https://cdn.poehali.dev/projects/9eb2ccf4-962b-4b8a-acfa-a0018106fe6c/files/5cc24f3f-f046-44f1-8dfe-e60bc1080279.jpg",
    bg: "from-pink-200/80 to-green-300/60",
    photos: [
      { src: "https://cdn.poehali.dev/projects/9eb2ccf4-962b-4b8a-acfa-a0018106fe6c/files/5cc24f3f-f046-44f1-8dfe-e60bc1080279.jpg", caption: "Цветущие сады" },
      { src: "https://cdn.poehali.dev/projects/9eb2ccf4-962b-4b8a-acfa-a0018106fe6c/files/ea2406f1-e54d-429e-a7f8-55df7d80bdf1.jpg", caption: "Первая зелень" },
      { src: "https://cdn.poehali.dev/projects/9eb2ccf4-962b-4b8a-acfa-a0018106fe6c/files/5cc24f3f-f046-44f1-8dfe-e60bc1080279.jpg", caption: "Весенняя дорога" },
    ],
  },
  {
    id: "summer",
    label: "Лето",
    emoji: "☀️",
    cover: "https://cdn.poehali.dev/projects/9eb2ccf4-962b-4b8a-acfa-a0018106fe6c/files/092a3f10-146e-4745-8dc9-e54c55d1d86a.jpg",
    bg: "from-yellow-200/80 to-green-400/60",
    photos: [
      { src: "https://cdn.poehali.dev/projects/9eb2ccf4-962b-4b8a-acfa-a0018106fe6c/files/092a3f10-146e-4745-8dc9-e54c55d1d86a.jpg", caption: "Летние поля" },
      { src: "https://cdn.poehali.dev/projects/9eb2ccf4-962b-4b8a-acfa-a0018106fe6c/files/ea2406f1-e54d-429e-a7f8-55df7d80bdf1.jpg", caption: "Огороды в деревне" },
      { src: "https://cdn.poehali.dev/projects/9eb2ccf4-962b-4b8a-acfa-a0018106fe6c/files/092a3f10-146e-4745-8dc9-e54c55d1d86a.jpg", caption: "Жаркий полдень" },
    ],
  },
  {
    id: "autumn",
    label: "Осень",
    emoji: "🍂",
    cover: "https://cdn.poehali.dev/projects/9eb2ccf4-962b-4b8a-acfa-a0018106fe6c/files/0b423cd7-ffec-4ff9-8c62-46fb32ead483.jpg",
    bg: "from-amber-300/80 to-orange-400/60",
    photos: [
      { src: "https://cdn.poehali.dev/projects/9eb2ccf4-962b-4b8a-acfa-a0018106fe6c/files/0b423cd7-ffec-4ff9-8c62-46fb32ead483.jpg", caption: "Золотая осень" },
      { src: "https://cdn.poehali.dev/projects/9eb2ccf4-962b-4b8a-acfa-a0018106fe6c/files/ea2406f1-e54d-429e-a7f8-55df7d80bdf1.jpg", caption: "Листопад" },
      { src: "https://cdn.poehali.dev/projects/9eb2ccf4-962b-4b8a-acfa-a0018106fe6c/files/0b423cd7-ffec-4ff9-8c62-46fb32ead483.jpg", caption: "Осенний туман" },
    ],
  },
];

type Tab = "schedule" | "news" | "contacts";

const VILLAGE_IMG = "https://cdn.poehali.dev/projects/9eb2ccf4-962b-4b8a-acfa-a0018106fe6c/files/ea2406f1-e54d-429e-a7f8-55df7d80bdf1.jpg";

const schedule = {
  "Ключи → Фомино": [
    { dep: "07:10", arr: "07:25", days: "пн–пт" },
    { dep: "09:40", arr: "09:55", days: "ежедневно" },
    { dep: "13:15", arr: "13:30", days: "ежедневно" },
    { dep: "16:50", arr: "17:05", days: "ежедневно" },
    { dep: "19:20", arr: "19:35", days: "пн–пт" },
  ],
  "Фомино → Ключи": [
    { dep: "07:30", arr: "07:45", days: "пн–пт" },
    { dep: "10:05", arr: "10:20", days: "ежедневно" },
    { dep: "13:40", arr: "13:55", days: "ежедневно" },
    { dep: "17:15", arr: "17:30", days: "ежедневно" },
    { dep: "19:45", arr: "20:00", days: "пн–пт" },
  ],
  "До Сысерти": [
    { dep: "06:30", arr: "07:05", days: "пн–пт", via: "через Ключи" },
    { dep: "08:00", arr: "08:35", days: "ежедневно", via: "через Фомино" },
    { dep: "12:00", arr: "12:35", days: "ежедневно", via: "через Ключи" },
    { dep: "15:30", arr: "16:05", days: "пн–пт", via: "через Фомино" },
    { dep: "18:00", arr: "18:35", days: "ежедневно", via: "через Ключи" },
  ],
} as const;

type Direction = keyof typeof schedule;

const news = [
  {
    id: 1,
    date: "12 апр",
    tag: "⚠️ Важно",
    tagColor: "bg-amber-100 text-amber-800",
    title: "Отключение воды 15 апреля",
    body: "В связи с плановыми ремонтными работами 15 апреля с 09:00 до 17:00 будет отключена холодная вода в д. Ключи (ул. Лесная, Полевая). Запаситесь водой заранее.",
  },
  {
    id: 2,
    date: "10 апр",
    tag: "📢 Объявление",
    tagColor: "bg-blue-100 text-blue-800",
    title: "Субботник 19 апреля",
    body: "Приглашаем всех жителей на общий субботник. Встречаемся у магазина в 10:00. Берите перчатки и мусорные мешки. Организатор — совет ветеранов.",
  },
  {
    id: 3,
    date: "7 апр",
    tag: "🌿 Новость",
    tagColor: "bg-green-100 text-green-800",
    title: "Дорогу до Фомино отремонтируют",
    body: "Администрация Сысертского МО подтвердила: участок дороги Ключи–Фомино протяжённостью 2,4 км включён в план ремонта на лето 2026 года.",
  },
  {
    id: 4,
    date: "3 апр",
    tag: "📌 Объявление",
    tagColor: "bg-stone-100 text-stone-600",
    title: "Продаётся картофель",
    body: "Продаю картофель — 15 руб/кг, мешками. Самовывоз. Д. Ключи, ул. Советская, 14. Звонить с 9 до 19: 8-912-XXX-XX-XX.",
  },
];

const contacts = [
  {
    group: "Экстренные службы",
    items: [
      { icon: "Phone",     label: "Скорая помощь",            value: "103",              sub: "или 8-800-350-30-03",   color: "text-red-600",    bg: "bg-red-50" },
      { icon: "Flame",     label: "Пожарная служба",          value: "101",              sub: "МЧС Сысерть",           color: "text-orange-600", bg: "bg-orange-50" },
      { icon: "Shield",    label: "Полиция",                  value: "102",              sub: "Участковый Сысерть",    color: "text-blue-700",   bg: "bg-blue-50" },
    ],
  },
  {
    group: "Администрация",
    items: [
      { icon: "Building2", label: "Адм. Сысертского МО",      value: "8 (34374) 6-08-01", sub: "пн–пт, 9:00–17:00",  color: "text-green-800",  bg: "bg-green-50" },
      { icon: "Users",     label: "Сельский совет",           value: "8 (34374) X-XX-XX", sub: "по вопросам ЖКХ",     color: "text-green-800",  bg: "bg-green-50" },
    ],
  },
  {
    group: "Коммунальные службы",
    items: [
      { icon: "Zap",       label: "Авария — электричество",   value: "8 (34374) 6-XX-XX", sub: "ЕЭСК, круглосуточно", color: "text-yellow-700", bg: "bg-yellow-50" },
      { icon: "Droplets",  label: "Авария — водоснабжение",   value: "8 (34374) X-XX-XX", sub: "круглосуточно",       color: "text-sky-700",    bg: "bg-sky-50" },
      { icon: "Bus",       label: "Справочная автовокзал",    value: "8 (34374) 6-XX-XX", sub: "г. Сысерть",         color: "text-amber-800",  bg: "bg-amber-50" },
    ],
  },
];

export default function Index() {
  const [tab, setTab] = useState<Tab>("schedule");
  const [direction, setDirection] = useState<Direction>("Ключи → Фомино");
  const [openNews, setOpenNews] = useState<number | null>(null);
  const [openSeason, setOpenSeason] = useState<string | null>(null);
  const [lightboxPhoto, setLightboxPhoto] = useState<{ src: string; caption: string } | null>(null);

  const nowHour = new Date().getHours();
  const greeting = nowHour < 12 ? "Доброе утро" : nowHour < 18 ? "Добрый день" : "Добрый вечер";

  const nowMin = new Date().getHours() * 60 + new Date().getMinutes();
  const parseMin = (t: string) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto">

      {/* ── ШАПКА ── */}
      <header className="relative overflow-hidden" style={{ height: 220 }}>
        <img src={VILLAGE_IMG} alt="Деревня" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-background" />

        <div className="absolute inset-0 flex flex-col justify-between p-5 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/65 text-xs font-sans">{greeting}</p>
              <h1 className="text-white font-serif text-2xl font-bold leading-tight drop-shadow-md mt-0.5">
                Ключи & Фомино
              </h1>
              <p className="text-white/55 text-xs font-sans mt-1">Сысертский муниципальный округ</p>
            </div>
            <div className="bg-white/15 backdrop-blur-md rounded-xl px-3 py-2 text-center border border-white/20">
              <p className="text-white text-lg font-sans font-semibold leading-none">+8°</p>
              <p className="text-white/55 text-xs font-sans mt-0.5">Облачно</p>
            </div>
          </div>

          {/* Навигация */}
          <div className="flex gap-2">
            {([
              { id: "schedule", icon: "Bus",       label: "Расписание" },
              { id: "news",     icon: "Newspaper",  label: "Объявления" },
              { id: "contacts", icon: "Phone",      label: "Контакты" },
            ] as { id: Tab; icon: string; label: string }[]).map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-sans font-medium transition-all ${
                  tab === t.id
                    ? "bg-white text-green-900 shadow-md"
                    : "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                }`}
              >
                <Icon name={t.icon} size={14} />
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── КОНТЕНТ ── */}
      <main className="flex-1 px-4 pt-5 pb-10">

        {/* ══ РАСПИСАНИЕ ══ */}
        {tab === "schedule" && (
          <div className="animate-fade-up">
            <p className="section-label">Выберите направление</p>

            <div className="flex flex-col gap-2 mb-5">
              {(Object.keys(schedule) as Direction[]).map((dir) => (
                <button
                  key={dir}
                  onClick={() => setDirection(dir)}
                  className={`w-full px-4 py-3 rounded-xl text-sm font-sans text-left flex items-center gap-3 transition-all border ${
                    direction === dir
                      ? "bg-forest text-white border-forest shadow"
                      : "bg-card text-foreground border-border hover:bg-muted"
                  }`}
                >
                  <Icon name="Bus" size={16} className={direction === dir ? "text-white/70" : "text-muted-foreground"} />
                  <span className="font-medium">{dir}</span>
                  {direction === dir && <Icon name="Check" size={14} className="ml-auto text-white/60" />}
                </button>
              ))}
            </div>

            {/* Анимация маршрута */}
            <div className="flex items-center gap-2 mb-4 px-1">
              <div className="route-dot" />
              <div className="route-dash" />
              <span className="animate-bus inline-block">
                <Icon name="Bus" size={22} className="text-forest" />
              </span>
              <div className="route-dash" />
              <div className="route-dot" />
            </div>

            {/* Рейсы */}
            <div className="space-y-2">
              {schedule[direction].map((row, i) => {
                const depMin = parseMin(row.dep);
                const isPast = depMin < nowMin;
                const isNext = !isPast && schedule[direction]
                  .slice(0, i)
                  .every(r => parseMin(r.dep) < nowMin);

                return (
                  <div
                    key={i}
                    className="card-wood flex items-center gap-3 px-4 py-3 animate-fade-up"
                    style={{ animationDelay: `${i * 0.06}s`, opacity: isPast ? 0.42 : 1 }}
                  >
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isNext ? "bg-green-500 animate-blink" : "bg-border"}`} />

                    <div className="flex items-baseline gap-1.5 min-w-28">
                      <span className={`font-serif text-xl font-bold ${isPast ? "text-muted-foreground" : "text-foreground"}`}>
                        {row.dep}
                      </span>
                      <Icon name="ArrowRight" size={11} className="text-muted-foreground" />
                      <span className="text-sm font-sans text-muted-foreground">{row.arr}</span>
                    </div>

                    <div className="flex-1 flex flex-wrap items-center gap-1.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-sans ${
                        row.days === "ежедневно" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                      }`}>
                        {row.days}
                      </span>
                      {"via" in row && (
                        <span className="text-xs text-muted-foreground font-sans">{(row as typeof row & { via: string }).via}</span>
                      )}
                    </div>

                    {isNext && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-sans font-medium flex-shrink-0">
                        ближайший
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <p className="mt-4 text-xs text-muted-foreground font-sans text-center leading-relaxed">
              Расписание ориентировочное — уточняйте у водителя<br />или в администрации Сысертского МО.
            </p>
          </div>
        )}

        {/* ══ ОБЪЯВЛЕНИЯ ══ */}
        {tab === "news" && (
          <div className="animate-fade-up">
            <p className="section-label">Последние объявления</p>
            <div className="space-y-3">
              {news.map((n, i) => (
                <div
                  key={n.id}
                  className="card-wood overflow-hidden animate-fade-up cursor-pointer"
                  style={{ animationDelay: `${i * 0.07}s` }}
                  onClick={() => setOpenNews(openNews === n.id ? null : n.id)}
                >
                  <div className="px-4 py-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-sans ${n.tagColor}`}>{n.tag}</span>
                      <span className="text-xs text-muted-foreground font-sans ml-auto">{n.date}</span>
                    </div>
                    <h3 className="font-serif text-[15px] font-bold text-foreground leading-snug">{n.title}</h3>

                    {openNews === n.id && (
                      <p className="mt-2.5 text-sm font-sans text-muted-foreground leading-relaxed animate-slide-down">
                        {n.body}
                      </p>
                    )}

                    <div className="flex justify-end mt-2">
                      <Icon name={openNews === n.id ? "ChevronUp" : "ChevronDown"} size={15} className="text-muted-foreground" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ══ СЕЗОННЫЕ ФОТОРЕПОРТАЖИ ══ */}
            <div className="mt-6">
              <p className="section-label">Сезонные фоторепортажи</p>
              <div className="grid grid-cols-2 gap-2">
                {seasons.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setOpenSeason(openSeason === s.id ? null : s.id)}
                    className="relative overflow-hidden rounded-xl aspect-square animate-fade-up group"
                    style={{ animationDelay: `${i * 0.07}s` }}
                  >
                    <img src={s.cover} alt={s.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${s.bg} opacity-70`} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                      <span className="text-2xl drop-shadow">{s.emoji}</span>
                      <span className="text-white font-serif font-bold text-base drop-shadow-md">{s.label}</span>
                    </div>
                    {openSeason === s.id && (
                      <div className="absolute bottom-2 right-2 w-5 h-5 bg-white/90 rounded-full flex items-center justify-center">
                        <Icon name="ChevronDown" size={12} className="text-foreground" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Галерея выбранного сезона */}
              {openSeason && (() => {
                const s = seasons.find(x => x.id === openSeason)!;
                return (
                  <div className="mt-3 animate-slide-down">
                    <p className="text-xs font-sans text-muted-foreground mb-2 flex items-center gap-1.5">
                      <span>{s.emoji}</span> {s.label} — фоторепортаж
                    </p>
                    <div className="grid grid-cols-3 gap-1.5">
                      {s.photos.map((p, pi) => (
                        <button
                          key={pi}
                          onClick={() => setLightboxPhoto(p)}
                          className="relative overflow-hidden rounded-lg aspect-square animate-fade-up group"
                          style={{ animationDelay: `${pi * 0.05}s` }}
                        >
                          <img src={p.src} alt={p.caption} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-end">
                            <span className="text-white text-xs font-sans px-1.5 pb-1 opacity-0 group-hover:opacity-100 transition-opacity leading-tight">{p.caption}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Лайтбокс */}
            {lightboxPhoto && (
              <div
                className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4 animate-fade-in"
                onClick={() => setLightboxPhoto(null)}
              >
                <button className="absolute top-5 right-5 text-white/70 hover:text-white" onClick={() => setLightboxPhoto(null)}>
                  <Icon name="X" size={24} />
                </button>
                <img
                  src={lightboxPhoto.src}
                  alt={lightboxPhoto.caption}
                  className="max-w-full max-h-[75vh] rounded-xl object-contain shadow-2xl animate-scale-in"
                  onClick={e => e.stopPropagation()}
                />
                <p className="mt-4 text-white/70 text-sm font-sans">{lightboxPhoto.caption}</p>
              </div>
            )}

            <button className="mt-4 w-full card-wood flex items-center gap-3 px-4 py-3.5">
              <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name="PlusCircle" size={18} className="text-forest" />
              </div>
              <div className="text-left">
                <p className="text-sm font-sans font-medium text-foreground">Подать объявление</p>
                <p className="text-xs text-muted-foreground font-sans">Свяжитесь с администрацией сайта</p>
              </div>
              <Icon name="ChevronRight" size={15} className="text-muted-foreground ml-auto" />
            </button>
          </div>
        )}

        {/* ══ КОНТАКТЫ ══ */}
        {tab === "contacts" && (
          <div className="animate-fade-up">
            {contacts.map((group, gi) => (
              <div key={gi} className="mb-6 animate-fade-up" style={{ animationDelay: `${gi * 0.09}s` }}>
                <p className="section-label">{group.group}</p>
                <div className="space-y-2">
                  {group.items.map((item, ii) => (
                    <a
                      key={ii}
                      href={`tel:${item.value.replace(/[\s()–-]/g, "")}`}
                      className="card-wood flex items-center gap-3 px-4 py-3.5 block"
                    >
                      <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Icon name={item.icon} size={18} className={item.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-sans font-medium text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground font-sans">{item.sub}</p>
                      </div>
                      <p className={`text-base font-serif font-bold flex-shrink-0 ${item.color}`}>{item.value}</p>
                    </a>
                  ))}
                </div>
              </div>
            ))}

            <a
              href="https://yandex.ru/maps/?text=деревня+Ключи+Сысертский+район+Свердловская+область"
              target="_blank"
              rel="noopener noreferrer"
              className="card-wood flex items-center gap-3 px-4 py-3.5 block"
            >
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name="MapPin" size={18} className="text-amber-700" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-sans font-medium text-foreground">Открыть на карте</p>
                <p className="text-xs text-muted-foreground font-sans">д. Ключи и с. Фомино на Яндекс.Картах</p>
              </div>
              <Icon name="ExternalLink" size={14} className="text-muted-foreground" />
            </a>
          </div>
        )}
      </main>

      {/* ── ФУТЕР ── */}
      <footer className="border-t border-border px-4 py-3 text-center bg-card">
        <p className="text-xs text-muted-foreground font-sans">
          д. Ключи & с. Фомино · Сысертский МО · Свердловская обл.
        </p>
      </footer>
    </div>
  );
}