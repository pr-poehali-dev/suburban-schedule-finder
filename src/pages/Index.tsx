import { useState } from "react";
import Icon from "@/components/ui/icon";

type Tab = "home" | "schedule" | "map" | "history" | "profile";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/9eb2ccf4-962b-4b8a-acfa-a0018106fe6c/files/48dba0c3-c5a7-4b6e-a923-91a8d422f5ab.jpg";

const routes = [
  { id: 1, from: "Москва", to: "Санкт-Петербург", time: "07:30", arrive: "11:45", duration: "4ч 15м", price: 1890, seats: 12, type: "Экспресс", status: "active" },
  { id: 2, from: "Москва", to: "Казань", time: "09:00", arrive: "15:20", duration: "6ч 20м", price: 2100, seats: 5, type: "Прямой", status: "filling" },
  { id: 3, from: "Москва", to: "Нижний Новгород", time: "10:15", arrive: "14:00", duration: "3ч 45м", price: 980, seats: 28, type: "Экспресс", status: "active" },
  { id: 4, from: "Москва", to: "Владимир", time: "12:00", arrive: "14:10", duration: "2ч 10м", price: 650, seats: 2, type: "Прямой", status: "almost" },
  { id: 5, from: "Москва", to: "Ярославль", time: "14:30", arrive: "17:45", duration: "3ч 15м", price: 1100, seats: 18, type: "Экспресс", status: "active" },
];

const history = [
  { id: 1, from: "Москва", to: "СПб", date: "8 апр", price: 1890, status: "Завершён" },
  { id: 2, from: "Казань", to: "Москва", date: "3 апр", price: 2100, status: "Завершён" },
  { id: 3, from: "Москва", to: "Владимир", date: "28 мар", price: 650, status: "Отменён" },
];

const prices = [
  { route: "Москва → СПб", economy: 1200, comfort: 1890, business: 3200 },
  { route: "Москва → Казань", economy: 1500, comfort: 2100, business: 3800 },
  { route: "Москва → НН", economy: 700, comfort: 980, business: 2200 },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [fromCity, setFromCity] = useState("Москва");
  const [toCity, setToCity] = useState("");
  const [date, setDate] = useState("2026-04-13");
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);
  const [booked, setBooked] = useState<number | null>(null);
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [selectedSeat, setSelectedSeat] = useState("12А");

  const handleBook = (id: number) => setSelectedRoute(id);

  const confirmBook = () => {
    setBooked(selectedRoute);
    setSelectedRoute(null);
    setTimeout(() => setBooked(null), 3500);
  };

  const statusColor = (s: string) => {
    if (s === "active") return "bg-green-400";
    if (s === "filling") return "bg-amber-400";
    if (s === "almost") return "bg-red-400";
    return "bg-gray-300";
  };

  const statusLabel = (s: string) => {
    if (s === "active") return "Свободно";
    if (s === "filling") return "Заполняется";
    if (s === "almost") return "Мало мест";
    return "";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative">

      {/* ─── HOME ─── */}
      {activeTab === "home" && (
        <div className="flex-1 overflow-y-auto pb-24">
          {/* Hero */}
          <div className="relative h-72 overflow-hidden">
            <img src={HERO_IMAGE} alt="Маршрут" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background" />
            <div className="absolute top-0 left-0 right-0 p-5 flex items-center justify-between">
              <div className="glass-dark px-3 py-1.5 rounded-full">
                <span className="font-display text-white/90 text-lg font-light tracking-wide">Транзит</span>
              </div>
              <button
                onClick={() => setNotificationsOn(!notificationsOn)}
                className="glass-dark w-9 h-9 rounded-full flex items-center justify-center"
              >
                <Icon name={notificationsOn ? "Bell" : "BellOff"} size={16} className="text-white/80" />
              </button>
            </div>
            <div className="absolute bottom-5 left-5 glass px-3 py-1.5 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-dot inline-block" style={{boxShadow: "0 0 0 4px rgba(74,222,128,0.25)"}} />
              <span className="text-xs font-body text-foreground/70">142 рейса сегодня</span>
            </div>
          </div>

          {/* Search block */}
          <div className="px-5 -mt-1 animate-fade-up">
            <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
              <p className="font-display text-2xl font-light text-foreground mb-4 leading-tight">
                Куда<br /><em>едем?</em>
              </p>

              <div className="mb-3">
                <label className="text-xs font-body text-muted-foreground uppercase tracking-wider mb-1 block">Откуда</label>
                <div className="relative">
                  <Icon name="MapPin" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-moss" />
                  <input
                    value={fromCity}
                    onChange={e => setFromCity(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-muted rounded-xl text-sm font-body focus:outline-none focus:ring-2 focus:ring-earth/30 text-foreground"
                    placeholder="Город отправления"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-px bg-border" />
                <button
                  onClick={() => { const t = fromCity; setFromCity(toCity); setToCity(t); }}
                  className="w-8 h-8 rounded-full bg-sand border border-border flex items-center justify-center hover:bg-amber/20 transition-colors"
                >
                  <Icon name="ArrowUpDown" size={14} className="text-earth" />
                </button>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="mb-3">
                <label className="text-xs font-body text-muted-foreground uppercase tracking-wider mb-1 block">Куда</label>
                <div className="relative">
                  <Icon name="Navigation" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-earth" />
                  <input
                    value={toCity}
                    onChange={e => setToCity(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-muted rounded-xl text-sm font-body focus:outline-none focus:ring-2 focus:ring-earth/30 text-foreground"
                    placeholder="Город назначения"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-xs font-body text-muted-foreground uppercase tracking-wider mb-1 block">Дата</label>
                <div className="relative">
                  <Icon name="Calendar" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-muted rounded-xl text-sm font-body focus:outline-none focus:ring-2 focus:ring-earth/30 text-foreground"
                  />
                </div>
              </div>

              <button
                onClick={() => setActiveTab("schedule")}
                className="w-full py-3 bg-earth text-primary-foreground rounded-xl font-body text-sm font-medium flex items-center justify-center gap-2 hover:bg-pine transition-colors"
              >
                <Icon name="Search" size={16} />
                Найти маршрут
              </button>
            </div>
          </div>

          {/* Quick links */}
          <div className="px-5 mt-5 animate-fade-up delay-200">
            <p className="text-xs font-body text-muted-foreground uppercase tracking-wider mb-3">Быстрый доступ</p>
            <div className="grid grid-cols-4 gap-3">
              {[
                { icon: "Clock", label: "Расписание", tab: "schedule" as Tab },
                { icon: "Map", label: "Карта", tab: "map" as Tab },
                { icon: "Receipt", label: "Цены", tab: "history" as Tab },
                { icon: "User", label: "Кабинет", tab: "profile" as Tab },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => setActiveTab(item.tab)}
                  className="flex flex-col items-center gap-2 p-3 bg-card rounded-2xl border border-border card-hover"
                >
                  <div className="w-10 h-10 bg-sand rounded-xl flex items-center justify-center">
                    <Icon name={item.icon} size={18} className="text-earth" />
                  </div>
                  <span className="text-xs font-body text-foreground/70">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Popular routes */}
          <div className="px-5 mt-6 animate-fade-up delay-300">
            <p className="text-xs font-body text-muted-foreground uppercase tracking-wider mb-3">Популярные направления</p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {["СПб", "Казань", "Н. Новгород", "Владимир", "Ярославль"].map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    setToCity(city === "Н. Новгород" ? "Нижний Новгород" : city === "СПб" ? "Санкт-Петербург" : city);
                    setActiveTab("schedule");
                  }}
                  className="flex-shrink-0 px-4 py-2 bg-card border border-border rounded-full text-sm font-body text-foreground/80 hover:bg-sand transition-colors"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── SCHEDULE ─── */}
      {activeTab === "schedule" && (
        <div className="flex-1 overflow-y-auto pb-24">
          <div className="px-5 pt-8 pb-4">
            <div className="flex items-center gap-3 mb-1">
              <button onClick={() => setActiveTab("home")} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <Icon name="ChevronLeft" size={18} className="text-foreground" />
              </button>
              <div>
                <h1 className="font-display text-2xl font-light">Расписание</h1>
                <p className="text-xs text-muted-foreground font-body">
                  {fromCity || "Откуда"} → {toCity || "Куда"} · 13 апреля
                </p>
              </div>
            </div>
          </div>

          <div className="px-5 flex gap-2 mb-4">
            {["Все", "Экспресс", "Прямой"].map((f, i) => (
              <button key={f} className={`px-3 py-1.5 rounded-full text-xs font-body border transition-colors ${i === 0 ? "bg-earth text-primary-foreground border-earth" : "bg-card border-border text-foreground/70 hover:bg-sand"}`}>
                {f}
              </button>
            ))}
          </div>

          <div className="px-5 space-y-3">
            {routes.map((r, idx) => (
              <div
                key={r.id}
                className="bg-card rounded-2xl border border-border p-4 card-hover cursor-pointer animate-fade-up"
                style={{ animationDelay: `${idx * 0.07}s`, opacity: 0 }}
                onClick={() => handleBook(r.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${statusColor(r.status)}`} />
                    <span className="text-xs font-body text-muted-foreground">{statusLabel(r.status)}</span>
                    <span className="text-xs font-body text-muted-foreground">· {r.seats} мест</span>
                  </div>
                  <span className="text-xs px-2 py-0.5 bg-sand rounded-full font-body text-earth">{r.type}</span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="text-center">
                    <p className="font-display text-2xl font-medium text-foreground">{r.time}</p>
                    <p className="text-xs font-body text-muted-foreground">{r.from}</p>
                  </div>
                  <div className="flex-1 flex items-center gap-1">
                    <div className="flex-1 h-px bg-border" />
                    <div className="flex flex-col items-center">
                      <Icon name="ArrowRight" size={14} className="text-muted-foreground" />
                      <span className="text-xs font-body text-muted-foreground mt-0.5">{r.duration}</span>
                    </div>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                  <div className="text-center">
                    <p className="font-display text-2xl font-medium text-foreground">{r.arrive}</p>
                    <p className="text-xs font-body text-muted-foreground">{r.to}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="font-display text-xl font-medium text-earth">
                    {r.price.toLocaleString()} ₽
                  </p>
                  <button
                    className="px-4 py-1.5 bg-earth text-primary-foreground rounded-xl text-xs font-body hover:bg-pine transition-colors"
                    onClick={(e) => { e.stopPropagation(); handleBook(r.id); }}
                  >
                    Забронировать
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── MAP ─── */}
      {activeTab === "map" && (
        <div className="flex-1 flex flex-col pb-24">
          <div className="px-5 pt-8 pb-4">
            <h1 className="font-display text-3xl font-light mb-1">Карта</h1>
            <p className="text-sm text-muted-foreground font-body">Маршруты в реальном времени</p>
          </div>

          <div className="mx-5 rounded-3xl overflow-hidden relative bg-secondary border border-border" style={{minHeight: "280px"}}>
            <img src={HERO_IMAGE} alt="Карта маршрутов" className="w-full h-full object-cover opacity-50 absolute inset-0" style={{height: "280px"}} />
            <div className="absolute inset-0 flex flex-col items-center justify-center" style={{height: "280px"}}>
              <div className="glass px-6 py-4 rounded-2xl text-center">
                <Icon name="Map" size={32} className="text-earth mx-auto mb-2" />
                <p className="font-display text-xl text-foreground">Интерактивная карта</p>
                <p className="text-xs text-muted-foreground font-body mt-1">Подключается в следующей версии</p>
              </div>
            </div>

            {[
              { top: "30%", left: "25%", label: "Москва" },
              { top: "15%", left: "55%", label: "СПб" },
              { top: "50%", left: "70%", label: "Казань" },
              { top: "45%", left: "45%", label: "НН" },
            ].map((m) => (
              <div key={m.label} className="absolute" style={{ top: m.top, left: m.left }}>
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-earth border-2 border-white shadow-md" />
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs font-body text-earth bg-white/80 px-1.5 rounded whitespace-nowrap shadow-sm">
                    {m.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="px-5 mt-5">
            <p className="text-xs font-body text-muted-foreground uppercase tracking-wider mb-3">Активные маршруты</p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {routes.slice(0, 3).map((r) => (
                <div key={r.id} className="flex-shrink-0 bg-card border border-border rounded-2xl px-4 py-3 min-w-40">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`w-2 h-2 rounded-full ${statusColor(r.status)}`} />
                    <span className="text-xs font-body text-muted-foreground">{r.time}</span>
                  </div>
                  <p className="font-body text-sm font-medium text-foreground">{r.from} → {r.to}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── HISTORY + PRICES ─── */}
      {activeTab === "history" && (
        <div className="flex-1 overflow-y-auto pb-24">
          <div className="px-5 pt-8 pb-4">
            <h1 className="font-display text-3xl font-light mb-1">История & Цены</h1>
            <p className="text-sm text-muted-foreground font-body">Ваши поездки и тарифы</p>
          </div>

          <div className="px-5">
            <p className="text-xs font-body text-muted-foreground uppercase tracking-wider mb-3">Мои поездки</p>
            <div className="space-y-2 mb-6">
              {history.map((h, idx) => (
                <div
                  key={h.id}
                  className="bg-card border border-border rounded-2xl px-4 py-3 flex items-center justify-between animate-slide-right"
                  style={{ animationDelay: `${idx * 0.08}s`, opacity: 0 }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${h.status === "Отменён" ? "bg-red-50" : "bg-sand"}`}>
                      <Icon name={h.status === "Отменён" ? "X" : "CheckCircle"} size={16} className={h.status === "Отменён" ? "text-red-400" : "text-moss"} />
                    </div>
                    <div>
                      <p className="text-sm font-body font-medium text-foreground">{h.from} → {h.to}</p>
                      <p className="text-xs text-muted-foreground font-body">{h.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-base font-medium text-earth">{h.price.toLocaleString()} ₽</p>
                    <p className={`text-xs font-body ${h.status === "Отменён" ? "text-red-400" : "text-moss"}`}>{h.status}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs font-body text-muted-foreground uppercase tracking-wider mb-3">Тарифы</p>
            <div className="space-y-3">
              {prices.map((p, idx) => (
                <div
                  key={p.route}
                  className="bg-card border border-border rounded-2xl p-4 animate-fade-up"
                  style={{ animationDelay: `${idx * 0.1}s`, opacity: 0 }}
                >
                  <p className="font-body text-sm font-medium text-foreground mb-3">{p.route}</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Эконом", price: p.economy, color: "bg-muted" },
                      { label: "Комфорт", price: p.comfort, color: "bg-sand" },
                      { label: "Бизнес", price: p.business, color: "bg-earth/10" },
                    ].map((tier) => (
                      <div key={tier.label} className={`${tier.color} rounded-xl p-2.5 text-center`}>
                        <p className="text-xs font-body text-muted-foreground mb-1">{tier.label}</p>
                        <p className="font-display text-base font-medium text-earth">{tier.price.toLocaleString()} ₽</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── PROFILE ─── */}
      {activeTab === "profile" && (
        <div className="flex-1 overflow-y-auto pb-24">
          <div className="relative">
            <div className="h-36 bg-gradient-to-br from-earth to-pine" />
            <div className="px-5 -mt-8 pb-4">
              <div className="flex items-end justify-between mb-4">
                <div className="w-16 h-16 rounded-2xl bg-sand border-4 border-background flex items-center justify-center shadow-lg">
                  <span className="font-display text-2xl text-earth">А</span>
                </div>
                <button className="px-4 py-2 bg-sand border border-border rounded-xl text-xs font-body text-earth hover:bg-amber/20 transition-colors">
                  Изменить
                </button>
              </div>
              <h2 className="font-display text-2xl font-light text-foreground">Алексей Смирнов</h2>
              <p className="text-sm text-muted-foreground font-body">+7 (912) 345-67-89</p>
            </div>
          </div>

          <div className="px-5 mb-6">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Поездок", value: "12" },
                { label: "Маршрутов", value: "5" },
                { label: "Сэкономлено", value: "4 200 ₽" },
              ].map((s) => (
                <div key={s.label} className="bg-card border border-border rounded-2xl p-3 text-center">
                  <p className="font-display text-xl font-medium text-earth">{s.value}</p>
                  <p className="text-xs text-muted-foreground font-body mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="px-5">
            <p className="text-xs font-body text-muted-foreground uppercase tracking-wider mb-3">Настройки</p>
            <div className="space-y-2">
              {[
                { icon: "Bell", label: "Уведомления", value: notificationsOn ? "Включены" : "Выключены", toggle: true },
                { icon: "CreditCard", label: "Способ оплаты", value: "Visa •• 4321", toggle: false },
                { icon: "MapPin", label: "Избранные маршруты", value: "3 маршрута", toggle: false },
                { icon: "Shield", label: "Безопасность", value: "Настроить", toggle: false },
                { icon: "HelpCircle", label: "Поддержка", value: "Написать", toggle: false },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => item.toggle && setNotificationsOn(!notificationsOn)}
                  className="w-full bg-card border border-border rounded-2xl px-4 py-3 flex items-center gap-3 card-hover text-left"
                >
                  <div className="w-9 h-9 bg-sand rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} size={16} className="text-earth" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-body font-medium text-foreground">{item.label}</p>
                  </div>
                  <span className="text-xs font-body text-muted-foreground">{item.value}</span>
                  {!item.toggle && <Icon name="ChevronRight" size={14} className="text-muted-foreground" />}
                </button>
              ))}
            </div>

            <button className="w-full mt-4 py-3 bg-red-50 border border-red-100 rounded-2xl text-sm font-body text-red-500 hover:bg-red-100 transition-colors">
              Выйти из аккаунта
            </button>
          </div>
        </div>
      )}

      {/* ─── BOOKING MODAL ─── */}
      {selectedRoute !== null && (() => {
        const r = routes.find(x => x.id === selectedRoute)!;
        return (
          <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={() => setSelectedRoute(null)}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <div
              className="relative w-full max-w-md bg-card rounded-t-3xl border-t border-border p-6 animate-fade-up"
              onClick={e => e.stopPropagation()}
            >
              <div className="w-10 h-1 bg-border rounded-full mx-auto mb-5" />
              <h2 className="font-display text-2xl font-light text-foreground mb-1">Бронирование</h2>
              <p className="text-sm text-muted-foreground font-body mb-5">{r.from} → {r.to}</p>

              <div className="bg-muted rounded-2xl p-4 mb-4 flex items-center justify-between">
                <div>
                  <p className="font-display text-2xl text-foreground">{r.time} — {r.arrive}</p>
                  <p className="text-xs text-muted-foreground font-body">{r.type} · {r.duration}</p>
                </div>
                <p className="font-display text-2xl font-medium text-earth">{r.price.toLocaleString()} ₽</p>
              </div>

              <div className="mb-5">
                <label className="text-xs font-body text-muted-foreground uppercase tracking-wider mb-2 block">Выберите место</label>
                <div className="flex gap-2">
                  {["12А", "12Б", "13А", "13Б"].map((seat) => (
                    <button
                      key={seat}
                      onClick={() => setSelectedSeat(seat)}
                      className={`flex-1 py-2 rounded-xl border text-sm font-body transition-colors ${selectedSeat === seat ? "bg-earth text-primary-foreground border-earth" : "border-border text-foreground hover:bg-sand hover:border-earth"}`}
                    >
                      {seat}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={confirmBook}
                className="w-full py-3.5 bg-earth text-primary-foreground rounded-2xl font-body font-medium flex items-center justify-center gap-2 hover:bg-pine transition-colors"
              >
                <Icon name="CheckCircle" size={18} />
                Подтвердить — {r.price.toLocaleString()} ₽
              </button>
            </div>
          </div>
        );
      })()}

      {/* ─── SUCCESS TOAST ─── */}
      {booked !== null && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass rounded-2xl px-5 py-3 flex items-center gap-3 shadow-xl animate-fade-up max-w-xs w-full">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="CheckCircle" size={16} className="text-green-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-body font-medium text-foreground">Забронировано!</p>
            <p className="text-xs text-muted-foreground font-body">
              {routes.find(r => r.id === booked)?.from} → {routes.find(r => r.id === booked)?.to} · {selectedSeat}
            </p>
          </div>
          <button onClick={() => setBooked(null)} className="text-muted-foreground hover:text-foreground">
            <Icon name="X" size={14} />
          </button>
        </div>
      )}

      {/* ─── BOTTOM NAV ─── */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md glass border-t border-border px-2 py-2 flex items-center justify-around z-40">
        {[
          { id: "home" as Tab, icon: "Home", label: "Главная" },
          { id: "schedule" as Tab, icon: "Clock", label: "Расписание" },
          { id: "map" as Tab, icon: "Map", label: "Карта" },
          { id: "history" as Tab, icon: "Receipt", label: "История" },
          { id: "profile" as Tab, icon: "User", label: "Кабинет" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all ${
              activeTab === item.id
                ? "bg-sand text-earth"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon name={item.icon} size={20} />
            <span className="text-xs font-body">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
