import Link from "next/link";
import { Icon } from "@/components/icon";
import { Button, TopBar } from "@/components/ui";
import { DesktopSearch } from "./_search";

// Figma 89:970 (mobile), 320:2056 (desktop)

const STEPS = [
  { title: "Find your business", text: "Type its name or address below" },
  {
    title: "We check 8 parts",
    text: "About a minute: hours, photos, reviews, description, services, contacts, website and completeness",
  },
  { title: "You see what to fix", text: "In plain words. Nothing changes on your profile" },
];

function StepNumber({ n }: { n: number }) {
  return (
    <span className="t-caption flex size-[22px] shrink-0 items-center justify-center rounded-xl bg-secondary-100 text-secondary-900">
      {n}
    </span>
  );
}

/** Mobile "How it works" list. 01a groups the steps 16px apart; 01c keeps them 32px apart. */
export function MobileSteps({ className = "flex flex-col gap-4" }: { className?: string }) {
  return (
    <ol className={className}>
      {STEPS.map((s, i) => (
        <li key={s.title} className="flex items-start gap-3">
          <StepNumber n={i + 1} />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <p className="t-headline text-secondary-900">{s.title}</p>
            <p className="t-small text-secondary-700">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function DesktopSteps() {
  return (
    <ol className="flex w-full items-start gap-8 pt-8">
      {STEPS.map((s, i) => (
        <li key={s.title} className="flex min-w-0 flex-1 flex-col items-start gap-3">
          <StepNumber n={i + 1} />
          <div className="flex w-full flex-col gap-1">
            <p className="t-headline text-secondary-900">{s.title}</p>
            <p className="t-small text-secondary-700">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Desktop onboarding header (Figma 369:1765): logo, 6-step progress, optional Skip. */
export function DesktopHeader({ step, skip }: { step: number; skip?: string }) {
  return (
    <header className="sticky top-0 z-20 flex h-[72px] w-full shrink-0 items-center justify-between border-b border-secondary-200 bg-white px-10">
      <div className="flex w-60 items-center">
        <img src="/brand/logo.svg" alt="YesOpen" width={84} height={24} />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex gap-1" aria-hidden>
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i} className={`h-1 w-8 rounded-sm ${i < step ? "bg-secondary-900" : "bg-secondary-100"}`} />
          ))}
        </div>
        <p className="t-footnote leading-4 whitespace-nowrap text-secondary-700">Step {step} of 6</p>
      </div>
      <div className="flex w-60 items-center justify-end">
        {skip && (
          <Link href={skip} className="t-body rounded-lg px-3 py-2 text-secondary-700">
            Skip
          </Link>
        )}
      </div>
    </header>
  );
}

export function DesktopBack({ href }: { href: string }) {
  return (
    <Link href={href} className="t-body flex items-center gap-1.5 py-2 pr-1 text-secondary-700">
      <Icon name="back" size={20} />
      Back
    </Link>
  );
}

export function Intro({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex w-full flex-col gap-3">
      <h1 className="t-large-title text-secondary-900">{title}</h1>
      <p className="t-body text-secondary-700">{text}</p>
    </div>
  );
}

function SearchField({ placeholderClass }: { placeholderClass: string }) {
  return (
    <Link
      href="/onboarding/01b"
      className="flex w-full min-w-0 items-center rounded-full bg-secondary-50 p-1"
    >
      <span className="flex size-12 shrink-0 items-center justify-center text-secondary-900">
        <Icon name="search" />
      </span>
      <span className={`t-body ${placeholderClass}`}>Business name or address</span>
    </Link>
  );
}

const INTRO = {
  title: "How your business looks on Google",
  text: "Free, and no sign-in needed to see the result.",
};

export function Mobile() {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <TopBar step={1} back="/" />
      <main className="flex flex-1 flex-col justify-between gap-12 px-5 pt-4 pb-6">
        <div className="flex flex-col gap-8">
          <Intro {...INTRO} />
          <MobileSteps />
        </div>
        <SearchField placeholderClass="text-secondary-600" />
      </main>
      <div data-edge="bottom" className="sticky bottom-0 z-10 bg-white px-5 pt-4 pb-[max(12px,env(safe-area-inset-bottom))]">
        <Button variant="disabled">Check my business</Button>
      </div>
    </div>
  );
}

export function Desktop() {
  return (
    <div className="flex min-h-dvh flex-col items-center bg-white">
      <DesktopHeader step={1} />
      <main className="flex w-full flex-1 flex-col items-center px-10 pt-[50px] pb-20 short:pt-8 short:pb-12">
        <div className="flex w-full max-w-[720px] flex-col gap-6">
          <DesktopBack href="/" />
          <div className="flex w-full flex-col gap-10">
            <Intro {...INTRO} />
            <div className="flex w-full items-center gap-3">
              <DesktopSearch />
              <div className="w-60 shrink-0">
                <Button variant="disabled">Check my business</Button>
              </div>
            </div>
            <DesktopSteps />
          </div>
        </div>
      </main>
    </div>
  );
}
