"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
//import { SectionTransition } from "@/components/ui/SectionTransition";
//import { Button } from "@/components/ui/button";
//import { HiArrowTopRightOnSquare, HiSparkles, HiBolt } from "react-icons/hi2";

// const ease = [0.22, 1, 0.36, 1] as const;

// const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type EventItem = {
  id: string;
  title: string;
  description: string;
  duration: string;
  image: string;
  url: string;
  gradient: string;
};

// Dummy data — replace with real events when ready. Events are distributed on random March 2026 dates.
const ALL_EVENTS: EventItem[] = [
  {
    id: "dummy-1",
    title: "Workshop: Content Strategy & Brand Fit",
    description:
      "A live session on how to align your content with brand briefs and increase your acceptance rate. Tips from top creators and brand managers.",
    duration: "2h · 4:00 PM EST",
    image: "",
    url: "#",
    gradient: "from-elevn-violet to-elevn-magenta",
  },
  {
    id: "dummy-2",
    title: "Masterclass: UGC Scripting & Performance",
    description:
      "Step-by-step techniques for UGC that converts. Learn scripting frameworks, hooks, and what platforms are prioritizing right now.",
    duration: "1h 30m · 11:00 AM EST",
    image: "",
    url: "#",
    gradient: "from-elevn-magenta to-elevn-primary",
  },
  {
    id: "dummy-3",
    title: "Live Q&A: Algorithm Updates & Monetization",
    description:
      "Join our experts for a real-time Q&A on the latest algorithm changes and monetization opportunities. Bring your questions.",
    duration: "1h · 3:00 PM EST",
    image: "",
    url: "#",
    gradient: "from-elevn-cyan to-elevn-violet",
  },
  {
    id: "dummy-4",
    title: "Live Q&A: Algorithm Updates & Monetization",
    description:
      "Join our experts for a real-time Q&A on the latest algorithm changes and monetization opportunities. Bring your questions.",
    duration: "1h · 3:00 PM EST",
    image: "",
    url: "#",
    gradient: "from-elevn-cyan to-elevn-violet",
  },
];

// Special opportunities — only in week 3 of March (15–21)
const GYRE_OPPORTUNITY_URL = "https://laneta-portal.netlify.app/opportunities/gyre";
const AIR_OPPORTUNITY_URL = "https://laneta-portal.netlify.app/opportunities/air";

const GYRE_EVENT: EventItem = {
  id: "special-gyre",
  title: "Opportunity: Gyre",
  description:
    "Exclusive collaboration with Gyre. Create authentic content that aligns with their brand vision. Selected creators get long-term partnership and premium rates.",
  duration: "Application window · Week 3",
  image: "public/assets/images/gyre.png",
  url: GYRE_OPPORTUNITY_URL,
  gradient: "from-elevn-violet to-elevn-magenta",
};

const AIR_EVENT: EventItem = {
  id: "special-air",
  title: "Opportunity: Air",
  description:
    "Partner with Air for their next campaign. UGC and short-form content for global reach. Open to creators in lifestyle, travel, and tech.",
  duration: "Application window · Week 3",
  image: "public/assets/images/air.png",
  url: AIR_OPPORTUNITY_URL,
  gradient: "from-elevn-cyan to-elevn-violet",
};

const WEEK_3_MARCH_2026 = [15, 16, 17, 18, 19, 20, 21]; // March 15–21
const GYRE_DAY = WEEK_3_MARCH_2026[1]; // 16
const AIR_DAY = WEEK_3_MARCH_2026[4];   // 19

/** Picks n distinct random days in 1..max (inclusive). */
function pickRandomDays(n: number, max: number): number[] {
  const arr = Array.from({ length: max }, (_, i) => i + 1);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, n);
}

const EVENT_DAYS = pickRandomDays(ALL_EVENTS.length, 31);
const EVENTS_BY_DATE: Record<string, EventItem[]> = {};
ALL_EVENTS.forEach((event, i) => {
  const day = EVENT_DAYS[i];
  const key = `2026-03-${day.toString().padStart(2, "0")}`;
  if (!EVENTS_BY_DATE[key]) EVENTS_BY_DATE[key] = [];
  EVENTS_BY_DATE[key].push(event);
});

// Add special Gyre & Air events only in week 3 of March
const gyreKey = `2026-03-${String(GYRE_DAY).padStart(2, "0")}`;
const airKey = `2026-03-${String(AIR_DAY).padStart(2, "0")}`;
if (!EVENTS_BY_DATE[gyreKey]) EVENTS_BY_DATE[gyreKey] = [];
EVENTS_BY_DATE[gyreKey].push(GYRE_EVENT);
if (!EVENTS_BY_DATE[airKey]) EVENTS_BY_DATE[airKey] = [];
EVENTS_BY_DATE[airKey].push(AIR_EVENT);

// /** Returns a 35-cell grid (5 rows × 7 days) for March 2026. March 1, 2026 = Sunday. */
// function getMarch2026CalendarGrid(): (Date | null)[] {
//   const grid: (Date | null)[] = [];
//   const year = 2026;
//   const month = 2; // 0-indexed: March = 2
//   for (let i = 1; i <= 31; i++) {
//     grid.push(new Date(year, month, i));
//   }
//   while (grid.length < 35) grid.push(null);
//   return grid;
// }

// function dateKey(date: Date): string {
//   const y = date.getFullYear();
//   const m = String(date.getMonth() + 1).padStart(2, "0");
//   const d = String(date.getDate()).padStart(2, "0");
//   return `${y}-${m}-${d}`;
// }

// function getEventsForDay(date: Date): EventItem[] {
//   return EVENTS_BY_DATE[dateKey(date)] ?? [];
// }

// function formatDayNum(d: Date): string {
//   return d.getDate().toString();
// }

// /** Renders event image with gradient fallback when the image fails to load (e.g. missing file). */
// function EventImage({ src, gradient }: { src: string; gradient: string }) {
//   const [failed, setFailed] = useState(false);
//   if (failed) {
//     return (
//       <div
//         className={`h-full w-full bg-gradient-to-br ${gradient} opacity-80`}
//         aria-hidden
//       />
//     );
//   }
//   return (
//     <img
//       src={src}
//       alt=""
//       className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
//       onError={() => setFailed(true)}
//     />
//   );
// }

export function EventsCalendarSection({ /* onOpenJoinForm */ }: { onOpenJoinForm?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  useInView(sectionRef, { once: true, amount: 0.05 });
  // const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  // const calendarGrid = useMemo(() => getMarch2026CalendarGrid(), []);

  // const selectedEvents = selectedDay ? getEventsForDay(selectedDay) : [];
  // const hasEvents = selectedEvents.length > 0;

  return (
    <section
      id="events-calendar"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-elevn-dark"
      aria-labelledby="events-calendar-heading"
    >
      <div className="absolute inset-0 bg-elevn-mesh-light opacity-30 dark:bg-elevn-mesh dark:opacity-20" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-elevn-primary/5 to-transparent dark:via-elevn-cyan/5"
        aria-hidden
      />
      {/*<SectionTransition inView={sectionInView} className="mb-0" />*/}

      <div className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-24 lg:px-12 lg:py-28">
        {/* Calendar heading — COMMENTED OUT
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 20 }}
          transition={{ duration: 0.35, ease }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-elevn-cyan sm:text-sm">
            Calendar
          </p>
          <h2
            id="events-calendar-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl md:text-5xl dark:text-elevn-ice"
          >
            March 2026
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base font-semibold text-slate-600 dark:text-elevn-ice/85">
            Click a day to see events. New opportunities every week.
          </p>
        </motion.div>
        */}

        {/* Full month grid: 7 columns (Sun–Sat) + 5 rows — COMMENTED OUT
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 24 }}
          transition={{ duration: 0.4, delay: 0.08, ease }}
          className="mt-10 overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-xl dark:border-white/10 dark:bg-elevn-surface/60 sm:mt-12"
        >
          <div className="grid grid-cols-7 border-b border-slate-200 dark:border-white/10">
            {DAY_NAMES.map((name) => (
              <div
                key={name}
                className="py-2 text-center text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-elevn-ice/70 sm:py-3 sm:text-sm"
              >
                {name}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {calendarGrid.map((date, index) => {
              if (date === null) {
                return <div key={`empty-${index}`} className="min-h-[80px] sm:min-h-[96px]" />;
              }
              const events = getEventsForDay(date);
              const isSelected = selectedDay?.toDateString() === date.toDateString();

              return (
                <motion.button
                  key={date.toISOString()}
                  type="button"
                  onClick={() => setSelectedDay((prev) => (prev?.toDateString() === date.toDateString() ? null : date))}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: sectionInView ? 1 : 0 }}
                  transition={{ duration: 0.25, delay: 0.05 + index * 0.01, ease }}
                  className={`flex min-h-[80px] flex-col items-start justify-start border-b border-slate-200/80 p-2 transition-all duration-200 dark:border-white/10 sm:min-h-[96px] sm:p-3 ${
                    index % 7 < 6 ? "border-r border-slate-200/80 dark:border-white/10" : ""
                  } ${
                    isSelected
                      ? "bg-elevn-cyan/15 ring-2 ring-inset ring-elevn-cyan dark:bg-elevn-cyan/20"
                      : "hover:bg-slate-50 dark:hover:bg-elevn-surface/80"
                  }`}
                >
                  <span className="text-sm font-bold tabular-nums text-slate-950 dark:text-elevn-ice sm:text-base">
                    {formatDayNum(date)}
                  </span>
                  {events.length > 0 ? (
                    <div className="mt-1.5 flex w-full min-w-0 flex-col gap-0.5">
                      <div className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-elevn-cyan" aria-hidden />
                        <p className="line-clamp-2 min-w-0 flex-1 text-[10px] font-semibold leading-tight text-slate-700 dark:text-elevn-ice/90 sm:text-xs" title={events[0].title}>
                          {events[0].title}
                        </p>
                      </div>
                      <p className="text-[9px] font-medium text-elevn-cyan dark:text-elevn-cyan/90 sm:text-[10px]">
                        {events[0].duration}
                      </p>
                      {events.length > 1 && (
                        <p className="text-[9px] font-medium text-slate-500 dark:text-elevn-ice/60">
                          +{events.length - 1} more
                        </p>
                      )}
                    </div>
                  ) : null}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
        */}

        {/* Expandable detail panel — COMMENTED OUT
        <AnimatePresence mode="wait">
          {selectedDay ? (
            <motion.div
              key={selectedDay.toDateString()}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease }}
              className="mt-8 overflow-hidden"
            >
              {hasEvents ? (
                <div className="space-y-6">
                  {selectedEvents.slice(0, 4).map((event, i) => (
                    <motion.article
                      key={event.id + i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.05 * i, ease }}
                      className="group relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-xl dark:border-white/10 dark:bg-elevn-surface/80 dark:shadow-elevn-neon/20"
                    >
                      <div
                        className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${event.gradient}`}
                        aria-hidden
                      />
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative h-40 w-full shrink-0 overflow-hidden bg-slate-100 sm:h-auto sm:w-56 dark:bg-elevn-surface">
                          {event.image ? (
                            <EventImage src={event.image} gradient={event.gradient} />
                          ) : (
                            <div
                              className={`h-full w-full bg-gradient-to-br ${event.gradient} opacity-80`}
                              aria-hidden
                            />
                          )}
                          <div
                            className={`absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 transition group-hover:opacity-100 dark:from-elevn-dark/60`}
                            aria-hidden
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
                          <h3 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl dark:text-elevn-ice">
                            {event.title}
                          </h3>
                          <p className="mt-1.5 text-sm font-semibold text-elevn-cyan dark:text-elevn-cyan/90">
                            {event.duration}
                          </p>
                          <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600 dark:text-elevn-ice/90 sm:text-base">
                            {event.description}
                          </p>
                          <div className="mt-6 flex flex-wrap items-center gap-3">
                            <Button
                              asChild
                              size="lg"
                              className="w-fit bg-elevn-gradient px-6 py-5 text-sm font-semibold text-white shadow-lg dark:text-elevn-ice"
                            >
                              <a
                                href={event.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <HiArrowTopRightOnSquare className="mr-2 text-lg" aria-hidden />
                                View opportunity
                              </a>
                            </Button>
                            <Button
                              type="button"
                              size="lg"
                              onClick={onOpenJoinForm ?? (() => window.location.assign("#join"))}
                              className="w-fit border-2 border-elevn-cyan bg-transparent px-6 py-5 text-sm font-semibold text-cyan-700 hover:bg-elevn-cyan/15 hover:text-cyan-800 dark:border-elevn-cyan dark:bg-transparent dark:text-elevn-cyan dark:hover:bg-elevn-cyan/20 dark:hover:text-elevn-ice"
                            >
                              <HiBolt className="mr-2 text-lg" aria-hidden />
                              Explore the Community
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease }}
                  className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white/80 px-8 py-14 text-center dark:border-white/20 dark:bg-elevn-surface/60"
                >
                  <HiSparkles className="mb-4 text-4xl text-elevn-cyan" aria-hidden />
                  <p className="text-lg font-bold text-slate-950 dark:text-elevn-ice">
                    Stay connected; new opportunities arise every minute.
                  </p>
                  <p className="mt-2 max-w-md text-sm font-medium text-slate-600 dark:text-elevn-ice/80">
                    No events this day—but the next workshop or collaboration could drop anytime. Register so you don&apos;t miss out.
                  </p>
                  <Button
                    type="button"
                    size="lg"
                    onClick={onOpenJoinForm ?? (() => window.location.assign("#join"))}
                    className="mt-6 bg-elevn-gradient px-8 py-6 text-base font-semibold text-white shadow-lg transition hover:opacity-95 dark:text-elevn-ice"
                  >
                    <HiBolt className="mr-2 text-xl" aria-hidden />
                    Join Our Creator Community
                  </Button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.p
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 text-center text-sm font-semibold text-slate-500 dark:text-elevn-ice/60"
            >
              Click a day above to see events
            </motion.p>
          )}
        </AnimatePresence>
        */}
      </div>
    </section>
  );
}
