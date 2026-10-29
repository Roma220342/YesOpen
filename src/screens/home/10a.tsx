import { HomeDesktop, HomeMobile, type HomeState } from "@/components/home/home";
import type { Task } from "@/components/home/task";

// 10a Home · needs you — Figma mobile 256:1521, desktop 331:1476.

export const SUNDAY_HOURS: Task = {
  title: "Add Sunday hours",
  why: "Google shows you as closed on Sundays, so people who search then go somewhere else.",
  summary: "Google shows you as closed on Sundays",
  fields: [
    { label: "Now", value: "Sunday · Closed" },
    { label: "New hours", value: "Sunday · 12 pm – 9 pm" },
  ],
  hint: "Tap to change the hours.",
  action: "Approve hours",
  desktopAction: "Approve",
};

export const REPLY_TO_MARCO: Task = {
  title: "Reply to Marco",
  why: "He waited too long on Friday. A kind reply shows others you care.",
  summary: "A 2-star review from Friday",
  fields: [
    { label: "Now", value: "“Waited 40 minutes for a margherita. Pizza was good, though.”" },
    {
      label: "New",
      value: "“Sorry about the wait, Marco. That’s not how we want Friday nights to go. Thanks for telling us, we’d love to see you again.”",
    },
  ],
  hint: "Tap the text to change it.",
  action: "Approve reply",
};

export const THANKSGIVING: Task = {
  title: "Open on Thanksgiving?",
  why: "Thursday, Nov 26. Google will show your usual hours. If you’re closed, people may come to a locked door.",
  summary: "Thursday, Nov 26",
  action: "Approve",
};

export const NEW_PHOTOS: Task = {
  title: "Add new photos",
  why: "Your newest photo is 2 years old.",
  summary: "Your newest photo is 2 years old",
  action: "Add photos",
};

export const STATE_10A: HomeState = {
  business: { name: "Forno Rosso Pizzeria", photo: "/assets/business.jpg" },
  user: { initial: "E", name: "Example", email: "example@gmail.com" },
  greeting: ["A good week.", "4 things need you."],
  tasks: [SUNDAY_HOURS, REPLY_TO_MARCO, THANKSGIVING, NEW_PHOTOS],
  cardHeight: 489,
  week: {
    total: "184",
    label: "people asked for directions",
    period: "Last 7 days",
    trend: "Up 23% from last week",
    days: [
      { label: "M", value: 18 },
      { label: "T", value: 21 },
      { label: "W", value: 19 },
      { label: "T", value: 24 },
      { label: "F", value: 34 },
      { label: "S", value: 41 },
      { label: "S", value: 27 },
    ],
    average: 21,
    averageLabel: "Last week: 21 a day",
    stats: [
      { value: "1,240", label: "saw your profile" },
      { value: "96", label: "visited your website" },
    ],
  },
  nearby: {
    headline: "#6 of 14 pizzerias nearby",
    sub: "For “pizza near me” · up 2 this week",
    rows: [
      { rank: 4, name: "Di Fara Pizza", rating: "4.5" },
      { rank: 5, name: "Roberta’s", rating: "4.5" },
      { rank: 6, name: "You", rating: "4.4", you: true },
    ],
  },
  score: {
    score: 82,
    trend: "Up 24 since you started",
    groups: [
      { tone: "good", count: 5, label: "5 good" },
      { tone: "waiting", count: 1, label: "1 waiting for Google" },
      { tone: "fix", count: 2, label: "2 to fix" },
    ],
    why: "A complete, up-to-date profile shows up in more searches.",
    marker: "dot",
  },
  reviews: {
    rating: "4.4",
    count: "212 reviews",
    fresh: "5 new this week",
    replied: 267 / 313,
    repliedLabel: "209 of 212 have a reply",
    drafts: { label: "3 replies are waiting for approval" },
  },
  thisWeek: {
    done: [
      { title: "Replied to 4 reviews", meta: "Live on Google · Monday", status: "live" },
      { title: "Updated your description", meta: "Google is checking it", status: "pending" },
    ],
    next: [
      { icon: "campaign", title: "Post: Pumpkin pizza is back", meta: "Friday · you’ll see it before it goes out" },
      { icon: "check", title: "Next profile check", meta: "Monday · we look for anything that changed" },
    ],
  },
};

export function Mobile() {
  return <HomeMobile state={STATE_10A} />;
}

export function Desktop() {
  return <HomeDesktop state={STATE_10A} />;
}
