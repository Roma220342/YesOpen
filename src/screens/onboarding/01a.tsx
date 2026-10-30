import Link from "next/link";
import { DesktopHeader } from "@/components/desktop-header";
import { Icon } from "@/components/icon";
import { Button, TopBar } from "@/components/ui";
import { DesktopSearch } from "./_search";

// Figma 89:970 (mobile), 320:2056 (desktop)

const STEPS: { title: string; text: string; desktopWidth?: string }[] = [
  { title: "Find your business", text: "Type its name or address below" },
  {
    title: "We check 8 parts",
    text: "About a minute: hours, photos, reviews, description, services, contacts, website and completeness",
    // Figma desktop sets this line to 347px so it breaks after "description,".
    desktopWidth: "max-w-[347px]",
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

/** Desktop: the mobile list, steps 32px apart, with Figma's narrower line for step 2. */
export function DesktopSteps() {
  return (
    <ol className="flex flex-col gap-8">
      {STEPS.map((s, i) => (
        <li key={s.title} className="flex items-start gap-3">
          <StepNumber n={i + 1} />
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <p className="t-headline text-secondary-900">{s.title}</p>
            <p className={`t-small text-secondary-700 ${s.desktopWidth ?? ""}`}>{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
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
      <main className="flex flex-1 flex-col justify-between gap-12 px-5 pt-2 pb-6">
        <div className="flex flex-col gap-8">
          <Intro {...INTRO} />
          <MobileSteps />
        </div>
        <SearchField placeholderClass="text-secondary-600" />
      </main>
      <div data-edge="bottom" className="bar-blur sticky bottom-0 z-10 px-5 pb-[max(12px,env(safe-area-inset-bottom))]">
        <Button variant="disabled">Check my business</Button>
      </div>
    </div>
  );
}

export function Desktop() {
  return (
    <div className="flex min-h-dvh flex-col items-center bg-white">
      <DesktopHeader back="/" step={1} />
      <main className="flex w-full flex-1 flex-col items-center px-10 pt-desk pb-desk">
        {/* Same order as mobile: intro, how it works, then the search and the button. 640px like the other centered steps. */}
        <div className="flex w-full max-w-[640px] flex-col gap-8">
          <div className="flex w-full flex-col gap-10">
            <Intro {...INTRO} />
            <DesktopSteps />
            <DesktopSearch />
          </div>
          <Button variant="disabled">Check my business</Button>
        </div>
      </main>
    </div>
  );
}
