import { HomeDesktop, HomeMobile, type HomeState } from "@/components/home/home";
import { STATE_10A2 } from "./10a2";

// 10e Home · editing reply — Figma mobile 447:946, desktop 447:1987. 10a2 with Marco's reply open for editing:
// the edit sheet over the dimmed Home on mobile, the open "Reply to Marco" item on desktop.

const STATE_10E: HomeState = { ...STATE_10A2, startEditing: true };

export function Mobile() {
  return <HomeMobile state={STATE_10E} />;
}

export function Desktop() {
  return <HomeDesktop state={STATE_10E} />;
}
