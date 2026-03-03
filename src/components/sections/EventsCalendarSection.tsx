"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Button } from "@/components/ui/button";
import { HiSparkles, HiBolt, HiCalendarDays, HiVideoCamera, HiArrowTopRightOnSquare } from "react-icons/hi2";
import { fetchCalendarEvents, dateKey, type CalendarEvent } from "@/lib/calendar";

const ease = [0.22, 1, 0.36, 1] as const;
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const URL_REGEX = /(https?:\/\/[^\s<>\[\]()]+)/gi;

function linkifySegments(text: string): { type: "text" | "url"; value: string }[] {
  return text
    .split(URL_REGEX)
    .filter((value) => value.length > 0)
    .map((value) => ({ type: /^https?:\/\//i.test(value) ? "url" : "text", value }));
}

function getMonthGrid(date: Date): (Date | null)[] {
  const year = date.getFullYear();
  const month = date.getMonth();
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startPad = first.getDay();
  const days = last.getDate();
  const grid: (Date | null)[] = [];
  for (let i = 0; i < startPad; i++) grid.push(null);
  for (let d = 1; d <= days; d++) grid.push(new Date(year, month, d));
  const total = grid.length;
  const remainder = total % 7;
  if (remainder) for (let i = 0; i < 7 - remainder; i++) grid.push(null);
  return grid;
}

function formatMonthYear(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function isGoogleMeetUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.hostname === "meet.google.com";
  } catch {
    return false;
  }
}

function isSameCalendarDay(d1: Date, d2: Date): boolean {
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
}

function isWithinEventTimeRange(event: CalendarEvent): boolean {
  const now = new Date().getTime();
  return now >= event.start.getTime() && now <= event.end.getTime();
}

function isMeetLinkInDescription(url: string): boolean {
  if (isGoogleMeetUrl(url)) return true;
  return /google\s*meet|meet\.google/i.test(url);
}

export function EventsCalendarSection({ onOpenJoinForm }: { onOpenJoinForm?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.05 });
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewDate, setViewDate] = useState(() => new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const rawUrl = typeof import.meta !== "undefined" && import.meta.env?.VITE_CALENDAR_ICS_URL;
  const icsUrl = import.meta.env.DEV
    ? "/api/calendar.ics"
    : (typeof rawUrl === "string" && rawUrl.trim() ? rawUrl.trim() : undefined);

  useEffect(() => {
    const y = viewDate.getFullYear();
    const m = viewDate.getMonth();
    const start = new Date(y, m - 1, 1, 0, 0, 0, 0);
    const end = new Date(y, m + 2, 0, 23, 59, 59, 999);
    setLoading(true);
    fetchCalendarEvents(icsUrl, start, end)
      .then(setEvents)
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, [viewDate, icsUrl]);

  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    events.forEach((ev) => {
      const key = dateKey(ev.start);
      if (!map[key]) map[key] = [];
      map[key].push(ev);
    });
    return map;
  }, [events]);

  const calendarGrid = useMemo(() => getMonthGrid(viewDate), [viewDate]);
  const selectedEvents = selectedDay ? eventsByDate[dateKey(selectedDay)] ?? [] : [];
  const hasEvents = selectedEvents.length > 0;

  return (
    <section
      id="events-calendar"
      ref={sectionRef}
      className="relative overflow-hidden bg-slate-100 dark:bg-elevn-dark"
      aria-labelledby="events-calendar-heading"
    >
      <SectionDivider className="mb-0" />
      <div className="relative mx-auto w-full max-w-7xl px-4 pt-14 pb-20 max-[400px]:px-3 max-[400px]:pt-12 sm:px-6 sm:pt-16 sm:pb-24 md:px-10 md:pt-18 md:pb-28 lg:max-w-[1600px] lg:px-12 lg:pt-20 lg:pb-32 xl:max-w-[1800px] xl:px-16 2xl:max-w-[1920px] 2xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 16 }}
          transition={{ duration: 0.32, ease }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-elevn-cyan sm:text-sm">
            Events
          </p>
          <h2
            id="events-calendar-heading"
            className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl md:text-4xl lg:text-[2.5rem] lg:leading-[1.1] dark:text-elevn-ice"
          >
            <span className="bg-elevn-gradient bg-clip-text text-transparent">Workshops & opportunities</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm font-medium text-slate-600 dark:text-elevn-ice/85 md:text-base">
            Live sessions, masterclasses, and application windows. Pick a day to see what’s on.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 20 }}
          transition={{ duration: 0.35, delay: 0.06, ease }}
          className="mt-10 overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white/95 via-elevn-cyan/5 to-elevn-violet/5 shadow-[0_18px_55px_rgba(15,23,42,0.2)] backdrop-blur-xl dark:border-white/10 dark:bg-gradient-to-br dark:from-elevn-surface/95 dark:via-elevn-cyan/10 dark:to-elevn-violet/15 dark:shadow-elevn-neon/20 sm:mt-12"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/70 bg-white/60 px-4 py-4 dark:border-white/10 dark:bg-elevn-surface/80 sm:px-6">
            <div className="flex items-center gap-2 text-slate-950 dark:text-elevn-ice">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-elevn-cyan/10 text-elevn-cyan shadow-[0_0_18px_rgba(34,211,238,0.5)]">
                <HiCalendarDays className="text-lg" aria-hidden />
              </span>
              <div className="flex flex-col text-left">
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-elevn-ice/60">
                  Creator agenda
                </span>
                <span className="text-lg font-bold tracking-tight">{formatMonthYear(viewDate)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 rounded-full border border-transparent bg-white/70 px-3 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-elevn-cyan/60 hover:bg-white dark:bg-elevn-surface/80 dark:text-elevn-ice/80"
                onClick={() => setViewDate(new Date())}
              >
                Today
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full border-slate-200 bg-white/70 text-slate-700 hover:border-elevn-cyan/70 hover:bg-elevn-cyan/5 dark:border-white/20 dark:bg-elevn-surface/80 dark:text-elevn-ice/80"
                onClick={() => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1))}
              >
                <span className="sr-only">Previous month</span>
                ‹
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full border-slate-200 bg-white/70 text-slate-700 hover:border-elevn-cyan/70 hover:bg-elevn-cyan/5 dark:border-white/20 dark:bg-elevn-surface/80 dark:text-elevn-ice/80"
                onClick={() => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1))}
              >
                <span className="sr-only">Next month</span>
                ›
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 border-b border-slate-200/80 dark:border-white/10">
            {DAY_NAMES.map((name) => (
              <div
                key={name}
                className="py-2 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-elevn-ice/70 sm:text-xs"
              >
                {name}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {calendarGrid.map((date, index) => {
              if (date === null) {
                return <div key={`e-${index}`} className="min-h-[72px] sm:min-h-[80px]" />;
              }
              const dayEvents = eventsByDate[dateKey(date)];
              const isSelected = selectedDay?.toDateString() === date.toDateString();

              return (
                <motion.button
                  key={date.toISOString()}
                  type="button"
                  onClick={() => setSelectedDay((prev) => (prev?.toDateString() === date.toDateString() ? null : date))}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: sectionInView ? 1 : 0 }}
                  transition={{ duration: 0.2, delay: index * 0.008, ease }}
                  className={`relative flex min-h-[72px] flex-col items-start justify-start border-b border-r border-slate-200/80 p-2 transition-all duration-200 dark:border-white/10 sm:min-h-[80px] sm:p-2.5 ${
                    isSelected
                      ? "bg-elevn-cyan/15 ring-2 ring-elevn-cyan/80 shadow-[0_0_0_1px_rgba(34,211,238,0.4),0_0_32px_rgba(34,211,238,0.65)] dark:bg-elevn-cyan/20"
                      : "hover:bg-slate-50/80 hover:shadow-[0_0_0_1px_rgba(148,163,184,0.45)] dark:hover:bg-elevn-surface/80"
                  }`}
                >
                  <span className="text-sm font-bold tabular-nums text-slate-950 dark:text-elevn-ice">
                    {date.getDate()}
                  </span>
                  {dayEvents && dayEvents.length > 0 && (
                    <>
                      <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-elevn-cyan shadow-[0_0_12px_rgba(34,211,238,0.9)]" aria-hidden />
                      <div className="mt-1 flex w-full min-w-0 flex-col gap-0.5">
                        <p className="line-clamp-2 min-w-0 text-[10px] font-semibold leading-tight text-slate-700 dark:text-elevn-ice/90" title={dayEvents[0].title}>
                          {dayEvents[0].title}
                        </p>
                        {dayEvents.length > 1 && (
                          <p className="text-[9px] font-medium text-elevn-cyan dark:text-elevn-cyan/90">
                            +{dayEvents.length - 1} more
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {selectedDay ? (
            <motion.div
              key={selectedDay.toDateString()}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease }}
              className="mt-8 overflow-hidden"
            >
              {loading ? (
                <div className="flex items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 py-16 dark:border-white/10 dark:bg-elevn-surface/60">
                  <p className="text-sm font-semibold text-slate-500 dark:text-elevn-ice/70">Loading events…</p>
                </div>
              ) : hasEvents ? (
                <div className="space-y-6">
                  {selectedEvents.slice(0, 6).map((event, i) => (
                    <motion.article
                      key={event.id + i}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.04 * i, ease }}
                      className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 shadow-[0_14px_40px_rgba(15,23,42,0.1)] dark:border-white/10 dark:bg-elevn-surface/90 dark:shadow-elevn-neon/15"
                    >
                      <div className={`absolute left-0 top-0 bottom-0 z-10 w-1.5 bg-gradient-to-b ${event.gradient} opacity-90`} aria-hidden />
                      <div className="flex flex-col sm:flex-row">
                        <div
                          className={`relative h-40 w-full shrink-0 overflow-hidden bg-gradient-to-br ${event.gradient} sm:h-auto sm:w-80`}
                          aria-hidden
                        >
                          {event.imageUrl ? (
                            <img
                              src={
                                import.meta.env.DEV && event.imageUrl.startsWith("https://drive.google.com/")
                                  ? `/api/image?url=${encodeURIComponent(event.imageUrl)}`
                                  : event.imageUrl
                              }
                              alt=""
                              className="absolute inset-0 h-full w-full object-cover object-center"
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          ) : null}
                        </div>
                        <div className="flex flex-1 flex-col justify-center p-5 sm:p-6">
                          <h3 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl dark:text-elevn-ice">
                            {event.title}
                          </h3>
                          <p className="mt-1 text-xs font-semibold text-elevn-cyan dark:text-elevn-cyan/90">
                            {event.startLabel}{event.endLabel ? ` – ${event.endLabel}` : ""}
                          </p>
                          {event.description && (
                            <p className="mt-3 max-h-[20rem] overflow-y-auto text-sm font-medium leading-relaxed text-slate-600 dark:text-elevn-ice/85 whitespace-pre-line">
                              {linkifySegments(event.description).map((seg, i) => {
                                if (seg.type !== "url") return <span key={i}>{seg.value}</span>;
                                const isMeet = isMeetLinkInDescription(seg.value);
                                const sameDay = isSameCalendarDay(event.start, new Date());
                                const withinTime = isWithinEventTimeRange(event);
                                const meetLinkActive = isMeet && sameDay && withinTime;
                                if (isMeet && !meetLinkActive) {
                                  return (
                                    <span
                                      key={i}
                                      className="break-all font-semibold text-slate-500 dark:text-elevn-ice/60 cursor-default select-all"
                                      title="Meet link is only active on the event day during the scheduled time"
                                    >
                                      {seg.value}
                                    </span>
                                  );
                                }
                                return (
                                  <a
                                    key={i}
                                    href={seg.value}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="break-all font-semibold text-elevn-cyan underline decoration-elevn-cyan/70 underline-offset-2 hover:decoration-elevn-cyan dark:text-elevn-cyan dark:decoration-elevn-cyan/70"
                                  >
                                    {seg.value}
                                  </a>
                                );
                              })}
                            </p>
                          )}
                          {event.url && !isGoogleMeetUrl(event.url) && (
                            <p className="mt-3 text-xs font-semibold text-slate-500 dark:text-elevn-ice/70">
                              Application link (open on your phone for best experience):
                            </p>
                          )}
                          <div className="mt-4 flex flex-wrap items-center gap-3">
                            {event.url && (
                              isGoogleMeetUrl(event.url) ? (
                                isSameCalendarDay(event.start, new Date()) && isWithinEventTimeRange(event) ? (
                                  <Button asChild size="sm" className="bg-elevn-gradient text-white shadow-md dark:text-elevn-ice">
                                    <a href={event.url} target="_blank" rel="noopener noreferrer">
                                      <HiVideoCamera className="mr-2 text-base" aria-hidden />
                                      Join the meeting in a new tab
                                    </a>
                                  </Button>
                                ) : (
                                  <Button size="sm" disabled className="cursor-not-allowed bg-slate-200 text-slate-500 dark:bg-white/10 dark:text-elevn-ice/60">
                                    <HiVideoCamera className="mr-2 text-base" aria-hidden />
                                    Join the meeting in a new tab
                                  </Button>
                                )
                              ) : (
                                <Button asChild size="sm" className="bg-elevn-gradient text-white shadow-md dark:text-elevn-ice">
                                  <a href={event.url} target="_blank" rel="noopener noreferrer">
                                    <HiArrowTopRightOnSquare className="mr-2 text-base" aria-hidden />
                                    Open event link
                                  </a>
                                </Button>
                              )
                            )}
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={onOpenJoinForm ?? (() => window.location.assign("#join"))}
                              className="border-elevn-cyan/60 bg-elevn-cyan/5 text-elevn-cyan hover:bg-elevn-cyan/10 hover:border-elevn-cyan/80 dark:border-elevn-cyan dark:bg-transparent dark:text-elevn-cyan dark:hover:bg-elevn-cyan/10"
                            >
                              <HiBolt className="mr-2 text-base" aria-hidden />
                              Join community
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
                  transition={{ duration: 0.3, ease }}
                  className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200/80 bg-white/80 px-6 py-12 text-center dark:border-white/15 dark:bg-elevn-surface/60"
                >
                  <HiSparkles className="mb-3 text-3xl text-elevn-cyan" aria-hidden />
                  <p className="text-base font-bold text-slate-950 dark:text-elevn-ice">
                    Nothing scheduled this day
                  </p>
                  <p className="mt-2 max-w-sm text-sm font-medium text-slate-600 dark:text-elevn-ice/80">
                    New workshops and opportunities are added regularly. Join so you don’t miss them.
                  </p>
                  <Button
                    type="button"
                    size="lg"
                    onClick={onOpenJoinForm ?? (() => window.location.assign("#join"))}
                    className="mt-6 bg-elevn-gradient px-6 py-5 text-base font-semibold text-white shadow-lg transition hover:opacity-95 dark:text-elevn-ice"
                  >
                    <HiBolt className="mr-2 text-xl" aria-hidden />
                    Join Our Creator Community
                  </Button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 text-center text-sm font-semibold text-slate-500 dark:text-elevn-ice/60"
            >
              Click a day to see events
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
