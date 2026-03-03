import IcalExpander from "ical-expander";

export type CalendarEvent = {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  url?: string;
  imageUrl?: string;
  duration: string;
  startLabel: string;
  endLabel?: string;
  gradient: string;
  isAllDay?: boolean;
};

const GRADIENTS = [
  "from-elevn-primary to-elevn-cyan",
  "from-elevn-cyan to-elevn-violet",
  "from-elevn-violet to-elevn-magenta",
  "from-elevn-magenta to-elevn-primary",
] as const;

function formatDuration(start: Date, end: Date, isAllDay = false): string {
  if (isAllDay) {
    const days = Math.round((end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000)) + 1;
    return days > 1 ? `All day (${days} days)` : "All day";
  }
  const startStr = start.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  const tz = start.toLocaleTimeString("en-US", { timeZoneName: "short" }).split(" ").pop() ?? "EST";
  const hours = Math.round((end.getTime() - start.getTime()) / (60 * 60 * 1000) * 10) / 10;
  if (hours >= 1) return `${hours}h · ${startStr} ${tz}`;
  const mins = Math.round((end.getTime() - start.getTime()) / (60 * 1000));
  return `${mins}m · ${startStr} ${tz}`;
}

function formatStartLabel(start: Date, isAllDay: boolean): string {
  const dateStr = start.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  if (isAllDay) return dateStr;
  const timeStr = start.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  return `${dateStr}, ${timeStr}`;
}

function formatEndLabel(end: Date): string {
  return end.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

type EventLike = {
  getFirstPropertyValue?: (n: string) => string | undefined;
  uid?: string;
  component?:
    | {
        getFirstPropertyValue?(n: string): { getValue?: () => string; getFirstValue?: () => string } | string;
        getAllProperties?(n: string): { getValue?: () => string; getFirstValue?: () => string }[] | string[];
      }
    | null;
};

function getStringProperty(ev: EventLike, name: string): string {
  const tryGet = (n: string): string => {
    try {
      const fromComponent = ev.component?.getFirstPropertyValue?.(n);
      if (fromComponent != null) {
        const value =
          typeof fromComponent === "string"
            ? fromComponent
            : (fromComponent as { getValue?: () => string; getFirstValue?: () => string }).getValue?.() ??
              (fromComponent as { getFirstValue?: () => string }).getFirstValue?.();
        if (typeof value === "string" && value.trim()) return value.trim();
      }
      const fromEvent = ev.getFirstPropertyValue?.(n);
      if (typeof fromEvent === "string" && fromEvent.trim()) return fromEvent.trim();
      const all = ev.component?.getAllProperties?.(n);
      if (Array.isArray(all) && all.length > 0) {
        const first = all[0];
        const v = typeof first === "string" ? first : (first as { getValue?: () => string }).getValue?.();
        if (typeof v === "string" && v.trim()) return v.trim();
      }
    } catch {
      /* ignore */
    }
    return "";
  };
  return tryGet(name) || tryGet(name.toLowerCase()) || tryGet(name.toUpperCase());
}

function sanitizeDescription(html: string): string {
  if (!html?.trim()) return "";
  const noTags = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return noTags.replace(/\\n/g, "\n").replace(/\\,/g, ",").replace(/\\\\/g, "\\").trim();
}

function stripGoogleMeetBlock(text: string): string {
  if (!text?.trim()) return "";
  const markers = [
    "Únase con Google Meet",
    "Join with Google Meet",
    "Join the meeting",
    "O marca:",
    "More numbers",
    "Más números de teléfono",
  ];
  let cut = text.length;
  for (const m of markers) {
    const i = text.indexOf(m);
    if (i !== -1 && i < cut) cut = i;
  }
  return text.slice(0, cut).trim();
}

const URL_REGEX = /https?:\/\/[^\s<>\[\]()]+/gi;
const DRIVE_URL_REGEX = /https?:\/\/drive\.google\.com\/(?:open\?id=|file\/d\/)([a-zA-Z0-9_-]+)/gi;

export function extractFirstUrl(text: string): string | undefined {
  if (!text?.trim()) return undefined;
  const m = text.match(URL_REGEX);
  return m?.[0]?.trim() ?? undefined;
}

function extractFirstDriveImageUrl(text: string): string | undefined {
  if (!text?.trim()) return undefined;
  const m = text.match(DRIVE_URL_REGEX);
  const first = m?.[0]?.trim();
  if (first) return toDirectImageUrl(first);
  return undefined;
}

function safeSummary(ev: EventLike): string {
  const s = getStringProperty(ev, "summary");
  return s || "Event";
}

function safeDescription(ev: EventLike): string {
  const raw = getStringProperty(ev, "description");
  const sanitized = sanitizeDescription(raw);
  return stripGoogleMeetBlock(sanitized);
}

function safeUrl(ev: EventLike): string | undefined {
  const u = getStringProperty(ev, "url");
  return u || undefined;
}

function normalizeUrlFromIcal(value: string): string {
  return value?.replace(/\s+/g, "").trim() || "";
}

export function toDirectImageUrl(url: string): string {
  const trimmed = normalizeUrlFromIcal(url);
  const openMatch = trimmed.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/i);
  if (openMatch) return `https://drive.google.com/thumbnail?id=${openMatch[1]}&sz=w800`;
  const fileMatch = trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/i);
  if (fileMatch) return `https://drive.google.com/thumbnail?id=${fileMatch[1]}&sz=w800`;
  return trimmed;
}

function safeImageUrl(ev: EventLike, description: string): string | undefined {
  const attachRaw = getStringProperty(ev, "attach");
  const attach = normalizeUrlFromIcal(attachRaw);
  if (attach && /^https?:\/\//i.test(attach)) return toDirectImageUrl(attach);
  const imageRaw = getStringProperty(ev, "image");
  const image = normalizeUrlFromIcal(imageRaw);
  if (image && /^https?:\/\//i.test(image)) return toDirectImageUrl(image);
  return extractFirstDriveImageUrl(description);
}

type IcalEventLike = EventLike & {
  startDate: { toJSDate(): Date; isDate?: boolean };
  endDate: { toJSDate(): Date; isDate?: boolean };
};

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function isMidnightUTC(d: Date): boolean {
  return d.getUTCHours() === 0 && d.getUTCMinutes() === 0 && d.getUTCSeconds() === 0 && d.getUTCMilliseconds() === 0;
}

function normalizeStartEnd(
  startDate: { toJSDate(): Date; isDate?: boolean },
  endDate: { toJSDate(): Date; isDate?: boolean }
): { start: Date; end: Date; isAllDay: boolean } {
  const s = startDate.toJSDate();
  const e = endDate.toJSDate();
  const explicitAllDay = !!(startDate.isDate ?? endDate.isDate);
  const durationMs = e.getTime() - s.getTime();
  const wholeDays = durationMs > 0 && durationMs % ONE_DAY_MS === 0;
  const looksAllDay = isMidnightUTC(s) && isMidnightUTC(e) && wholeDays;
  const isAllDay = explicitAllDay || looksAllDay;

  if (!isAllDay) return { start: s, end: e, isAllDay: false };
  const start = new Date(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate(), 0, 0, 0, 0);
  const end = new Date(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate() - 1, 23, 59, 59, 999);
  return { start, end, isAllDay: true };
}

export function parseIcsToEvents(icsString: string, rangeStart: Date, rangeEnd: Date): CalendarEvent[] {
  const expander = new IcalExpander({ ics: icsString, maxIterations: 100, skipInvalidDates: true });
  let result = expander.between(rangeStart, rangeEnd);
  const hasVevent = /BEGIN:VEVENT/i.test(icsString);
  if (hasVevent && Array.isArray(result.events) && Array.isArray(result.occurrences) && result.events.length === 0 && result.occurrences.length === 0) {
    const wideStart = new Date(rangeStart.getFullYear() - 1, 0, 1, 0, 0, 0, 0);
    const wideEnd = new Date(rangeEnd.getFullYear() + 1, 11, 31, 23, 59, 59, 999);
    result = expander.between(wideStart, wideEnd);
  }
  const out: CalendarEvent[] = [];
  let idx = 0;
  const rangeStartT = rangeStart.getTime();
  const rangeEndT = rangeEnd.getTime();

  const push = (start: Date, end: Date, ev: EventLike, isAllDay = false) => {
    const id = ev.uid ?? `ev-${rangeStart.getTime()}-${idx++}`;
    const description = safeDescription(ev);
    const url = safeUrl(ev) || extractFirstUrl(description);
    const imageUrl = safeImageUrl(ev, description);
    out.push({
      id: String(id),
      title: safeSummary(ev),
      description,
      start,
      end,
      url,
      imageUrl,
      duration: formatDuration(start, end, isAllDay),
      startLabel: formatStartLabel(start, isAllDay),
      endLabel: isAllDay ? undefined : formatEndLabel(end),
      gradient: GRADIENTS[out.length % GRADIENTS.length],
      isAllDay,
    });
  };

  const events = Array.isArray(result.events) ? result.events : [];
  const occurrences = Array.isArray(result.occurrences) ? result.occurrences : [];

  const addEvent = (start: Date, end: Date, ev: EventLike, isAllDay: boolean) => {
    if (end.getTime() < rangeStartT || start.getTime() > rangeEndT) return;
    push(start, end, ev, isAllDay);
  };

  events.forEach((ev: IcalEventLike) => {
    try {
      const { start, end, isAllDay } = normalizeStartEnd(ev.startDate, ev.endDate);
      addEvent(start, end, ev, isAllDay);
    } catch {
      /* skip invalid dates */
    }
  });
  occurrences.forEach((occ: { startDate: { toJSDate(): Date; isDate?: boolean }; endDate: { toJSDate(): Date; isDate?: boolean }; item?: EventLike }) => {
    try {
      const { start, end, isAllDay } = normalizeStartEnd(occ.startDate, occ.endDate);
      const item: EventLike = occ.item ?? { getFirstPropertyValue: () => undefined, uid: `occ-${start.getTime()}` };
      addEvent(start, end, item, isAllDay);
    } catch {
      /* skip invalid occurrence */
    }
  });

  return out.sort((a, b) => a.start.getTime() - b.start.getTime());
}

const FALLBACK_EVENTS: CalendarEvent[] = [
  {
    id: "fb-1",
    title: "Workshop: Content Strategy & Brand Fit",
    description: "Live session on aligning your content with brand briefs. Tips from top creators and brand managers.",
    start: new Date(2026, 2, 10, 16, 0),
    end: new Date(2026, 2, 10, 18, 0),
    duration: "2h · 4:00 PM EST",
    startLabel: "Mar 10, 2026, 4:00 PM",
    endLabel: "6:00 PM",
    gradient: "from-elevn-violet to-elevn-magenta",
  },
  {
    id: "fb-2",
    title: "Masterclass: UGC Scripting & Performance",
    description: "Step-by-step techniques for UGC that converts. Scripting frameworks and what platforms prioritize now.",
    start: new Date(2026, 2, 15, 11, 0),
    end: new Date(2026, 2, 15, 12, 30),
    duration: "1h 30m · 11:00 AM EST",
    startLabel: "Mar 15, 2026, 11:00 AM",
    endLabel: "12:30 PM",
    gradient: "from-elevn-magenta to-elevn-primary",
  },
  {
    id: "fb-3",
    title: "Live Q&A: Algorithm Updates & Monetization",
    description: "Real-time Q&A on algorithm changes and monetization. Bring your questions.",
    start: new Date(2026, 2, 20, 15, 0),
    end: new Date(2026, 2, 20, 16, 0),
    duration: "1h · 3:00 PM EST",
    startLabel: "Mar 20, 2026, 3:00 PM",
    endLabel: "4:00 PM",
    gradient: "from-elevn-cyan to-elevn-violet",
  },
];

export async function fetchCalendarEvents(icsUrl: string | undefined, rangeStart: Date, rangeEnd: Date): Promise<CalendarEvent[]> {
  if (!icsUrl?.trim()) return FALLBACK_EVENTS;
  try {
    const res = await fetch(icsUrl, { signal: AbortSignal.timeout(12000) });
    if (!res.ok) return FALLBACK_EVENTS;
    const ics = await res.text();
    if (!ics.trim().toUpperCase().startsWith("BEGIN:VCALENDAR")) return [];
    try {
      return parseIcsToEvents(ics, rangeStart, rangeEnd);
    } catch {
      return [];
    }
  } catch {
    return FALLBACK_EVENTS;
  }
}

export function dateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
