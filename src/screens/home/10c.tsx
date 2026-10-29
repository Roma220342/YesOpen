import { HomeDesktop, HomeMobile, type HomeState } from "@/components/home/home";
import { STATE_10A, SUNDAY_HOURS } from "./10a";

// 10c Home · trial skipped — Figma mobile 257:1798, desktop 331:2332.
// Only the biggest fix is shown; approving it opens the trial. The other fixes are counted, not shown,
// so their ready-made answers can't simply be copied into Google Maps by hand. Everything YesOpen does
// (competitors above you, reply drafts, posts) is locked too; the owner's own Google data stays open.

const TRIAL = "/onboarding/06";

const STATE_10C: HomeState = {
  ...STATE_10A,
  greeting: ["Your first week", "4 things need you"],
  tasks: [{ ...SUNDAY_HOURS, hint: undefined, href: TRIAL }],
  lockedMore: { count: 3, href: TRIAL },
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
      { value: "1,020", label: "Saw profile" },
      { value: "71", label: "Web visits" },
    ],
  },
  nearby: {
    headline: "#6 of 14 pizzerias nearby",
    sub: "For “pizza near me” · first check today",
    rows: STATE_10A.nearby.rows,
    locked: { title: "See who’s above you", sub: "Start your free trial to follow them every day", href: TRIAL },
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
    locked: { title: "12 replies are ready", sub: "Start your free trial to approve them", href: TRIAL },
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
