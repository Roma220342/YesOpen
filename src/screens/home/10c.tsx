import { HomeDesktop, HomeMobile, type HomeState } from "@/components/home/home";
import type { Task } from "@/components/home/task";
import { NEW_PHOTOS, REPLY_TO_MARCO, STATE_10A, SUNDAY_HOURS, THANKSGIVING } from "./10a";

// 10c Home · trial skipped — Figma mobile 257:1798, desktop 331:2332.
// Every approve leads to the trial; desktop rows are locked; no edit hints, nothing done yet.

const TRIAL = { action: "Start 14 days free", desktopAction: "Start 14 days free", hint: undefined, locked: true };

const REPLY: Task = {
  ...REPLY_TO_MARCO,
  fields: [
    { label: "Marco wrote", value: REPLY_TO_MARCO.fields![0].value },
    { label: "Your reply", value: REPLY_TO_MARCO.fields![1].value },
  ],
};

const STATE_10C: HomeState = {
  ...STATE_10A,
  greeting: ["You look closed", "on Sundays."],
  tasks: [SUNDAY_HOURS, REPLY, THANKSGIVING, NEW_PHOTOS].map((t) => ({ ...t, ...TRIAL })),
  cardHeight: 423,
  week: {
    total: "142",
    label: "people asked for directions",
    period: "Last 7 days",
    trend: "0 on Sunday · Google shows you as closed",
    trendTone: "alert",
    // Values reproduce Figma bar heights on both mobile (64px max) and desktop (141px max).
    days: [
      { label: "M", value: 16 },
      { label: "T", value: 18.9 },
      { label: "W", value: 17.2 },
      { label: "T", value: 21.8 },
      { label: "F", value: 30.2 },
      { label: "S", value: 38 },
      { label: "S", value: 2.4, closed: true },
    ],
    stats: [
      { value: "1,020", label: "saw your profile" },
      { value: "71", label: "visited your website" },
    ],
  },
  nearby: {
    headline: "#6 of 14 pizzerias nearby",
    sub: "For “pizza near me” · first check today",
    rows: STATE_10A.nearby.rows,
  },
  score: {
    score: 58,
    groups: [
      { tone: "good", count: 3, label: "3 good" },
      { tone: "waiting", count: 1, label: "1 waiting for Google" },
      { tone: "fix", count: 4, label: "4 to fix" },
    ],
    why: "A complete, up-to-date profile shows up in more searches.",
    marker: "square",
  },
  reviews: {
    rating: "4.4",
    count: "212 reviews",
    fresh: "12 unanswered",
    replied: 269 / 313,
    repliedLabel: "200 of 212 have a reply",
  },
  thisWeek: {
    done: [],
    next: [
      { ...STATE_10A.thisWeek.next[0], locked: true },
      STATE_10A.thisWeek.next[1],
    ],
  },
  desktopLayout: { topRowHeight: 485, bottomRowHeight: "auto", wideHeadGap: true },
};

export function Mobile() {
  return <HomeMobile state={STATE_10C} />;
}

export function Desktop() {
  return <HomeDesktop state={STATE_10C} />;
}
