import Link from "next/link";
import { Icon } from "@/components/icon";
import { Button, TopBar } from "@/components/ui";
import { DesktopHeader } from "@/components/desktop-header";
import { DesktopSteps, Intro, MobileSteps } from "./01a";
import { DesktopSelected } from "./_search";

// Figma 89:1048 (mobile), 320:2104 (desktop)

const INTRO = {
  title: "How your business looks on Google",
  text: "Free, and no sign-in needed to see the result.",
};

function SelectedBusiness() {
  return (
    <div className="flex h-[68px] w-full min-w-0 shrink-0 items-center justify-between rounded-3xl bg-secondary-50 px-3 py-2.5">
      <div className="flex min-w-0 items-center gap-3">
        <img src="/assets/business.jpg" alt="" className="size-11 shrink-0 rounded-xl object-cover" />
        <div className="flex w-[230px] min-w-0 flex-col gap-px">
          <p className="t-headline text-secondary-900">Forno Rosso Pizzeria</p>
          <p className="t-footnote text-secondary-700">214 Bedford Ave, Brooklyn</p>
        </div>
      </div>
      <Link href="/onboarding/01a" aria-label="Clear selection" className="shrink-0 text-secondary-900">
        <Icon name="close" />
      </Link>
    </div>
  );
}

export function Mobile() {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <TopBar step={1} back="/onboarding/01a" />
      <main className="flex flex-1 flex-col justify-between gap-12 px-5 pt-2 pb-6">
        <div className="flex flex-col gap-8">
          <Intro {...INTRO} />
          <MobileSteps className="flex flex-col gap-8" />
        </div>
        <SelectedBusiness />
      </main>
      <div data-edge="bottom" className="bar-blur sticky bottom-0 z-10 px-5 pb-[max(12px,env(safe-area-inset-bottom))]">
        <Button href="/onboarding/02a">Check my business</Button>
      </div>
    </div>
  );
}

export function Desktop() {
  return (
    <div className="flex min-h-dvh flex-col items-center bg-white">
      <DesktopHeader back="/onboarding/01a" step={1} />
      <main className="flex w-full flex-1 flex-col items-center px-10 pt-desk pb-desk">
        {/* Figma: intro, the full-width search, how it works, then the button 32px below, all 720px wide. */}
        <div className="flex w-full max-w-[720px] flex-col gap-8">
          <div className="flex w-full flex-col gap-10">
            <Intro {...INTRO} />
            <DesktopSelected />
            <DesktopSteps />
          </div>
          <Button href="/onboarding/02a">Check my business</Button>
        </div>
      </main>
    </div>
  );
}
