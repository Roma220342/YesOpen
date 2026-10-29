import { HomeDesktop, HomeMobile, type HomeState } from "@/components/home/home";
import { STATE_10A } from "./10a";

// 10f Home · skip choice — Figma mobile 456:1183, desktop 456:2483. 10a with Skip pressed on the first task:
// the choice sheet over the dimmed Home on mobile, the list under "Skip ▾" on desktop.

const STATE_10F: HomeState = { ...STATE_10A, startSkipChoice: true };

export function Mobile() {
  return <HomeMobile state={STATE_10F} />;
}

export function Desktop() {
  return <HomeDesktop state={STATE_10F} />;
}
