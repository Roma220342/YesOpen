import Link from "next/link";
import { Button, TopBar } from "@/components/ui";
import { DesktopBack, DesktopHeader, Intro } from "./01a";

// Figma 165:762 (mobile), 320:2364 (desktop)

export const INTRO = {
  title: "Add delivery to your description",
  text: "5 of 8 pizzerias nearby mention delivery. Yours doesn’t.",
};
export const CURRENT = "Family-run pizzeria in Brooklyn since 2009. Wood-fired pizza and fresh pasta.";
export const SUGGESTION_BASE = "Family-run pizzeria in Brooklyn since 2009. Wood-fired pizza and fresh pasta, ";
export const SUGGESTION_ADDED = "with delivery across Williamsburg and Greenpoint.";

const NEXT = "/onboarding/04";
const EDIT = "/onboarding/03b";

function Content({ desktop }: { desktop?: boolean }) {
  const label = desktop ? "t-small-bold" : "t-caption";
  const hint = desktop ? "t-small" : "t-footnote";
  return (
    <div className="flex flex-col gap-6">
      <Intro {...INTRO} />
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <p className={`${label} text-secondary-700`}>Now</p>
          <p className="t-body rounded-2xl bg-secondary-50 p-4 text-secondary-900">{CURRENT}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className={`${label} text-secondary-700`}>New description</p>
          <Link href={EDIT} className="t-body block rounded-2xl bg-secondary-50 p-4 text-secondary-900">
            {SUGGESTION_BASE}
            <strong className="font-bold">{SUGGESTION_ADDED}</strong>
          </Link>
          <p className={`${hint} text-secondary-700`}>Tap the text to change it.</p>
        </div>
      </div>
      <p className="t-small text-secondary-700">
        Written by AI, so check it. Next, Google asks you to allow the change.
      </p>
    </div>
  );
}

export function Mobile() {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <TopBar step={4} back="/onboarding/02b" skip="/home/10c" />
      <main className="flex flex-1 flex-col px-5 pt-4 pb-6">
        <Content />
      </main>
      <div data-edge="bottom" className="sticky bottom-0 z-10 bg-white px-5 pt-4 pb-[env(safe-area-inset-bottom)]">
        <Button href={NEXT}>Send to Google</Button>
      </div>
    </div>
  );
}

export function Desktop() {
  return (
    <div className="flex min-h-dvh flex-col items-center bg-white">
      <DesktopHeader step={4} skip="/home/10c" />
      <main className="flex w-full flex-1 justify-center px-10 pt-[50px] pb-20 short:pt-8 short:pb-12">
        <div className="flex w-full max-w-[520px] flex-col gap-6">
          <DesktopBack href="/onboarding/02b" />
          <div className="flex flex-col">
            <Content desktop />
            <div className="pt-8">
              <Button href={NEXT}>
                Send to Google
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
