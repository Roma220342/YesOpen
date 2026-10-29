import { HomeDesktop, HomeMobile, type HomeState } from "@/components/home/home";
import type { Task } from "@/components/home/task";
import { NEW_PHOTOS, REPLY_TO_MARCO, STATE_10A, THANKSGIVING } from "./10a";

// 10a2 Home · after approve — Figma mobile 281:2104, desktop 331:1780. Sunday hours approved: 3 tasks left, score 85.

const REPLY: Task = {
  ...REPLY_TO_MARCO,
  fields: [
    { label: "Marco wrote", value: REPLY_TO_MARCO.fields![0].value },
    { label: "Your reply", value: REPLY_TO_MARCO.fields![1].value },
  ],
};

const STATE_10A2: HomeState = {
  ...STATE_10A,
  greeting: ["A good week.", "3 things need you."],
  tasks: [REPLY, THANKSGIVING, NEW_PHOTOS],
  cardHeight: 497,
  score: {
    score: 85,
    trend: "Up 27 since you started",
    groups: [
      { tone: "good", count: 5, label: "5 good" },
      { tone: "waiting", count: 2, label: "2 waiting for Google" },
      { tone: "fix", count: 1, label: "1 to fix" },
    ],
    why: "A complete, up-to-date profile shows up in more searches.",
    marker: "square",
  },
  reviews: { ...STATE_10A.reviews, replied: 281 / 313 },
};

export function Mobile() {
  return <HomeMobile state={STATE_10A2} />;
}

export function Desktop() {
  return <HomeDesktop state={STATE_10A2} />;
}
