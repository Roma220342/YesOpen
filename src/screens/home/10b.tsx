import { HomeDesktop, HomeMobile, type HomeState } from "@/components/home/home";
import { STATE_10A } from "./10a";

// 10b Home · all good — Figma mobile 257:1576, desktop 331:2072. Nothing to approve: "You're all caught up" card instead.

const STATE_10B: HomeState = {
  ...STATE_10A,
  greeting: ["A good week.", "Nothing needs you."],
  tasks: [],
  caughtUp: { title: "You’re all caught up", sub: "We’ll email you if something needs you." },
  week: {
    total: "203",
    label: "people asked for directions",
    period: "Last 7 days",
    trend: "Up 10% from last week",
    // Values reproduce Figma bar heights on both mobile (64px max) and desktop (141px max).
    days: [
      { label: "M", value: 22.2 },
      { label: "T", value: 24 },
      { label: "W", value: 20.7 },
      { label: "T", value: 26.8 },
      { label: "F", value: 36.3 },
      { label: "S", value: 43 },
      { label: "S", value: 30.2 },
    ],
    average: 26,
    averageLabel: "Last week: 26 a day",
    stats: [
      { value: "1,310", label: "saw your profile" },
      { value: "104", label: "visited your website" },
    ],
  },
  nearby: {
    headline: "#4 of 14 pizzerias nearby",
    sub: "For “pizza near me” · up 2 this week",
    rows: [
      { rank: 2, name: "Joe’s Pizza", rating: "4.6" },
      { rank: 3, name: "Lucali", rating: "4.7" },
      { rank: 4, name: "You", rating: "4.5", you: true },
    ],
  },
  score: {
    score: 96,
    trend: "Up 38 since you started",
    groups: [{ tone: "good", count: 8, label: "8 good" }],
    why: "A complete, up-to-date profile shows up in more searches.",
    marker: "square",
  },
  reviews: {
    rating: "4.5",
    count: "219 reviews",
    fresh: "7 new this week",
    replied: 285 / 313,
    repliedLabel: "Every review has a reply",
    barTone: "success",
  },
  thisWeekDesktop: { ...STATE_10A.thisWeek, done: [] },
  desktopLayout: { bottomRowHeight: "auto" },
};

export function Mobile() {
  return <HomeMobile state={STATE_10B} />;
}

export function Desktop() {
  return <HomeDesktop state={STATE_10B} />;
}
