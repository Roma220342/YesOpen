import { HomeDesktop, HomeMobile, type HomeState } from "@/components/home/home";
import type { Task } from "@/components/home/task";
import { REPLY_TO_MARCO, REPLY_TO_TWO, STATE_10A, THANKSGIVING } from "./10a";

// 10d Home · slower week — Figma mobile 257:2029, desktop 331:2604. Directions down, Lucali moved above you.

const ADD_PHOTOS: Task = {
  title: "Add new photos",
  why: "Lucali added 40 photos and passed you.",
  fields: [{ label: "Photos that work", value: "Your best pizza, up close\nThe room when it’s busy\nYour team at the oven" }],
  action: "Add photos",
  impact: 5,
};

const STATE_10D: HomeState = {
  ...STATE_10A,
  greeting: ["A slower week", "4 things need you"],
  tasks: [ADD_PHOTOS, REPLY_TO_MARCO, REPLY_TO_TWO, THANKSGIVING],
  week: {
    total: "151",
    label: "people asked for directions",
    period: "Last 7 days",
    trend: "Down 18% from last week",
    trendTone: "down",
    // Values reproduce Figma bar heights on both mobile (64px max) and desktop (141px max).
    days: [
      { label: "M", value: 17 },
      { label: "T", value: 17.8 },
      { label: "W", value: 19.8 },
      { label: "T", value: 20.9 },
      { label: "F", value: 24.2 },
      { label: "S", value: 31 },
      { label: "S", value: 19.8 },
    ],
    average: 26,
    averageLabel: "Last week: 26 a day",
    stats: [
      { value: "1,105", label: "Saw profile" },
      { value: "82", label: "Web visits" },
    ],
  },
  nearby: {
    headline: "#7 of 14 pizzerias nearby",
    sub: "For “pizza near me” · down 1 this week",
    rows: [
      { rank: 5, name: "Di Fara Pizza", rating: "4.5" },
      { rank: 6, name: "Lucali", rating: "4.7" },
      { rank: 7, name: "You", rating: "4.4", you: true },
    ],
  },
  score: {
    score: 88,
    trend: "Down 4 this week",
    trendTone: "down",
    groups: [
      { tone: "good", count: 7, label: "7 good" },
      { tone: "fix", count: 1, label: "1 to fix" },
    ],
    why: "A complete, up-to-date profile shows up in more searches.",
    marker: "square",
  },
  reviews: {
    rating: "4.4",
    count: "212 reviews",
    fresh: "2 new this week",
    replied: 282 / 313,
    repliedLabel: "210 of 212 have a reply",
    drafts: { label: "3 replies to approve" },
  },
};

export function Mobile() {
  return <HomeMobile state={STATE_10D} />;
}

export function Desktop() {
  return <HomeDesktop state={STATE_10D} />;
}
