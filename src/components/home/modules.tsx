import Link from "next/link";
import { Icon, type IconName } from "@/components/icon";
import { ModuleCard, Star, TrendChip, type TrendTone } from "./module-card";

type HeadLinkData = { label: string; href?: string };

/* ------------------------------------------------------------------ Your week on Google */

export type WeekData = {
  title?: string;
  link?: HeadLinkData;
  total: string; // "184"
  label: string; // "people asked for directions"
  period: string; // "Last 7 days"
  trend: string; // "Up 23% from last week"
  /** Chip colour: green up (default), red down, or red alert without arrow (10c). */
  trendTone?: TrendTone;
  /** `closed` draws the day as a short red-tint bar (10c: Google shows you as closed). */
  days: { label: string; value: number; closed?: boolean }[];
  /** Last week's daily average, drawn as the dashed line. Omit to hide line and legend. */
  average?: number;
  averageLabel?: string; // "Last week: 21 a day"
  stats: { value: string; label: string }[];
};

const DAY_LABEL_SPACE = 23; // 17px label + 6px gap under each bar

// Directions hero, trend chip, 7 bars (best day highlighted with its value), dashed last-week average, legend, stat tiles.
// `barMax` is the best day's bar height: 64 on mobile, 141 on desktop.
export function WeekChart({ data, barMax, className }: { data: WeekData; barMax: number; className?: string }) {
  const max = Math.max(...data.days.map((d) => d.value));
  const best = data.days.findIndex((d) => d.value === max);
  const h = (v: number) => Math.round((v * barMax) / max);

  return (
    <ModuleCard title={data.title ?? "Your week on Google"} link={data.link ?? { label: "Details" }} className={className}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <p className="t-large-title text-secondary-900">{data.total}</p>
          <div className="flex min-w-0 flex-1 flex-col">
            <p className="t-headline text-secondary-900">{data.label}</p>
            <p className="t-footnote text-secondary-700">{data.period}</p>
          </div>
        </div>
        <TrendChip tone={data.trendTone}>{data.trend}</TrendChip>
      </div>

      <div className="relative flex items-end gap-2">
        {data.days.map((d, i) => (
          <div key={i} className="flex min-w-0 flex-1 flex-col items-center justify-end gap-1.5">
            {i === best && <p className="t-caption text-primary-600">{d.value}</p>}
            <div
              className={`w-full rounded-md ${d.closed ? "bg-error-50" : i === best ? "bg-primary-500" : "bg-primary-100"}`}
              style={{ height: h(d.value) }}
            />
            <p className="t-footnote text-secondary-700">{d.label}</p>
          </div>
        ))}
        {data.average !== undefined && (
          <svg
            className="pointer-events-none absolute inset-x-0 h-[1.5px] w-full overflow-visible text-secondary-500"
            style={{ bottom: DAY_LABEL_SPACE + (data.average * barMax) / max - 0.75 }}
            aria-hidden
          >
            <line x1="0.75" y1="0.75" x2="100%" y2="0.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 4" />
          </svg>
        )}
      </div>

      {data.averageLabel && (
        <div className="flex items-center gap-1.5">
          <svg width="16" height="1.5" viewBox="0 0 16 1.5" fill="none" className="shrink-0 overflow-visible text-secondary-500" aria-hidden>
            <path d="M0.75 0.75H2.5625M15.25 0.75H13.4375M6.1875 0.75H9.8125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <p className="t-footnote text-secondary-700">{data.averageLabel}</p>
        </div>
      )}

      <div className="flex gap-2">
        {data.stats.map((s) => (
          <div key={s.label} className="flex h-[82px] min-w-0 flex-1 flex-col gap-0.5 rounded-2xl bg-secondary-50 p-4">
            <p className="t-title text-secondary-900">{s.value}</p>
            <p className="t-footnote text-secondary-700">{s.label}</p>
          </div>
        ))}
      </div>
    </ModuleCard>
  );
}

/* ------------------------------------------------------------------ Your place nearby */

export type NearbyData = {
  title?: string;
  link?: HeadLinkData;
  headline: string; // "#6 of 14 pizzerias nearby"
  sub: string; // "For “pizza near me” · up 2 this week"
  rows: { rank: number; name: string; rating: string; you?: boolean }[];
};

export function PlaceNearby({ data, className }: { data: NearbyData; className?: string }) {
  return (
    <ModuleCard title={data.title ?? "Your place nearby"} link={data.link ?? { label: "Map" }} className={className}>
      <div className="flex flex-col gap-0.5">
        <p className="t-headline text-secondary-900">{data.headline}</p>
        <p className="t-footnote text-secondary-700">{data.sub}</p>
      </div>
      <ol className="flex flex-col gap-0.5">
        {data.rows.map((r) => (
          <li key={r.rank} className={`flex h-9 items-center gap-2.5 rounded-[10px] px-2.5 ${r.you ? "bg-primary-50" : ""}`}>
            <span className={`w-7 shrink-0 ${r.you ? "t-headline text-primary-600" : "t-body text-secondary-700"}`}>#{r.rank}</span>
            <span className={`min-w-0 flex-1 ${r.you ? "t-headline text-primary-600" : "t-body text-secondary-900"}`}>{r.name}</span>
            <span className="t-body flex items-center gap-1 text-secondary-900">
              <Star />
              {r.rating}
            </span>
          </li>
        ))}
      </ol>
    </ModuleCard>
  );
}

/* ------------------------------------------------------------------ Profile score */

export type ScoreTone = "good" | "waiting" | "fix";

export type ScoreData = {
  title?: string;
  link?: HeadLinkData;
  score: number;
  outOf?: string; // "out of 100"
  /** "Up 24 since you started". Omit to hide the chip (10c). */
  trend?: string;
  trendTone?: TrendTone;
  /** Groups in bar order; counts add up to the 8 segments. */
  groups: { tone: ScoreTone; count: number; label: string }[];
  why: string;
  /** Legend marker: round dot (10a) or 2px-radius square (10a2). */
  marker?: "dot" | "square";
};

const TONE_BG: Record<ScoreTone, string> = {
  good: "bg-success-500",
  waiting: "bg-warning-400",
  fix: "bg-error-500",
};

export function ProfileScore({ data, className }: { data: ScoreData; className?: string }) {
  const segments = data.groups.flatMap((g) => Array.from({ length: g.count }, () => g.tone));
  return (
    <ModuleCard title={data.title ?? "Profile score"} link={data.link ?? { label: "All fixes" }} className={className}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <p className="t-large-title text-secondary-900">{data.score}</p>
          <p className="t-headline flex-1 text-secondary-900">{data.outOf ?? "out of 100"}</p>
        </div>
        {data.trend && <TrendChip tone={data.trendTone}>{data.trend}</TrendChip>}
      </div>
      <div className="flex gap-1" aria-hidden>
        {segments.map((tone, i) => (
          <span key={i} className={`h-2 min-w-0 flex-1 rounded ${TONE_BG[tone]}`} />
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
        {data.groups.map((g) => (
          <span key={g.tone} className="t-footnote flex items-center gap-1.5 text-secondary-900">
            <span className={`size-2 shrink-0 ${data.marker === "square" ? "rounded-[2px]" : "rounded-full"} ${TONE_BG[g.tone]}`} />
            {g.label}
          </span>
        ))}
      </div>
      <p className="t-footnote text-secondary-700">{data.why}</p>
    </ModuleCard>
  );
}

/* ------------------------------------------------------------------ Reviews */

export type ReviewsData = {
  title?: string;
  link?: HeadLinkData;
  rating: string; // "4.4"
  count: string; // "212 reviews"
  fresh: string; // "5 new this week"
  /** Fill of the reply bar, 0..1 (as drawn in Figma). */
  replied: number;
  repliedLabel: string; // "209 of 212 have a reply"
  /** Reply bar colour: blue (default) or green when every review has a reply (10b). */
  barTone?: "primary" | "success";
  /** "3 replies are waiting for approval" row; omitted when nothing waits. */
  drafts?: { label: string; href?: string };
};

export function Reviews({ data, className }: { data: ReviewsData; className?: string }) {
  return (
    <ModuleCard title={data.title ?? "Reviews"} link={data.link ?? { label: "All reviews" }} className={className}>
      <div className="flex items-center gap-2">
        <Star size={22} />
        <p className="t-title text-secondary-900">{data.rating}</p>
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="t-body text-secondary-900">{data.count}</p>
          <p className="t-footnote text-secondary-600">{data.fresh}</p>
        </div>
      </div>
      <div className="h-1.5 overflow-hidden rounded-[3px] bg-secondary-100">
        <div className={`h-full rounded-[3px] ${data.barTone === "success" ? "bg-success-500" : "bg-primary-500"}`} style={{ width: `${data.replied * 100}%` }} />
      </div>
      <p className="t-footnote text-secondary-700">{data.repliedLabel}</p>
      {data.drafts && (
        <Link href={data.drafts.href ?? "#"} className="t-headline rounded-xl bg-primary-50 px-3 py-2.5 text-primary-600">
          {data.drafts.label}
        </Link>
      )}
    </ModuleCard>
  );
}

/* ------------------------------------------------------------------ This week */

export type ThisWeekData = {
  title?: string;
  link?: HeadLinkData;
  /** "live" = green dot (on Google), "pending" = amber dot (Google is checking). */
  done: { title: string; meta: string; status: "live" | "pending" }[];
  /** `locked` swaps the chevron for a lock (10c: needs the trial). */
  next: { icon: IconName; title: string; meta: string; href?: string; locked?: boolean }[];
};

export function ThisWeek({ data, className }: { data: ThisWeekData; className?: string }) {
  return (
    <ModuleCard title={data.title ?? "This week"} link={data.link ?? { label: "All activity" }} className={className}>
      {data.done.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="t-caption text-secondary-700">Done</p>
          {data.done.map((d) => (
            <div key={d.title} className="flex items-start gap-3">
              <span className={`mt-[7px] size-2 shrink-0 rounded-full ${d.status === "live" ? "bg-success-500" : "bg-warning-500"}`} />
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <p className="t-body text-secondary-900">{d.title}</p>
                <p className="t-footnote text-secondary-700">{d.meta}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {data.next.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="t-caption text-secondary-700">Coming up</p>
          {data.next.map((n) => (
            <Link key={n.title} href={n.href ?? "#"} className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary-75 text-secondary-900">
                <Icon name={n.icon} size={20} />
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="t-headline text-secondary-900">{n.title}</span>
                <span className="t-footnote text-secondary-700">{n.meta}</span>
              </span>
              {n.locked ? (
                <Icon name="lock" size={22} className="shrink-0 text-secondary-700" />
              ) : (
                <Icon name="chevron" size={22} rotate={-90} className="shrink-0 text-secondary-700" />
              )}
            </Link>
          ))}
        </div>
      )}
    </ModuleCard>
  );
}
