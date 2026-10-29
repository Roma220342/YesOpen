import { HomeDesktop, HomeMobile, type HomeState } from "@/components/home/home";
import { STATE_10A } from "./10a";

// 10g Home · skipped — Figma mobile 456:1465, desktop 456:2878. 10a right after "Not now" on Sunday hours:
// the task is gone, 4 left, Profile score unchanged, and the Undo toast is up.

const STATE_10G: HomeState = {
  ...STATE_10A,
  greeting: ["A good week", "4 things need you"],
  startSkipped: true,
};

export function Mobile() {
  return <HomeMobile state={STATE_10G} />;
}

export function Desktop() {
  return <HomeDesktop state={STATE_10G} />;
}
