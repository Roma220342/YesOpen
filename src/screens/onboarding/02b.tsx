import { Button, TopBar } from "@/components/ui";
import { DesktopHeader } from "@/components/desktop-header";
import { Intro } from "./01a";

// Figma 137:761 (mobile), 320:2249 (desktop)

type Kind = "fix" | "unknown" | "good";

const INTRO = {
  title: "Your profile report",
  text: "4 things to fix, 1 we couldn’t check, 3 look good. Nothing has changed on your profile.",
};

const NEEDS_FIX = [
  { title: "Description", text: "Doesn’t mention delivery. 5 of 8 pizzerias nearby do." },
  { title: "Opening hours", text: "No Sunday hours, so you look closed on Sundays" },
  { title: "Photos", text: "Only 3 photos, and the newest is 2 years old" },
  { title: "Reviews", text: "12 reviews without a reply" },
];
const COULDNT_CHECK = [{ title: "Services", text: "Google doesn’t show them publicly. We’ll check after you connect" }];
const LOOKS_GOOD = [{ title: "Website" }, { title: "Contact details" }, { title: "Completeness" }];

const NEXT = "/onboarding/03a";

function Node({ kind }: { kind: Kind }) {
  const look = {
    fix: "bg-error-500",
    unknown: "border-[1.4px] border-secondary-200 bg-white",
    good: "bg-success-500",
  }[kind];
  return (
    <span className="shrink-0 pt-2" aria-hidden>
      <span className={`block size-2 rounded-md ${look}`} />
    </span>
  );
}

function Count({ n, kind }: { n: number; kind: Kind }) {
  const look = {
    fix: "bg-error-50 text-error-700",
    unknown: "bg-secondary-100 text-secondary-700",
    good: "bg-success-50 text-success-700",
  }[kind];
  return <span className={`t-caption flex size-[22px] items-center justify-center rounded-full ${look}`}>{n}</span>;
}

function Group({
  title,
  kind,
  items,
  children,
  className = "",
}: {
  title: string;
  kind: Kind;
  items: { title: string; text?: string }[];
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`flex flex-col gap-1 ${className}`}>
      <h2 className="flex items-center gap-2 pb-1">
        <span className="t-headline text-secondary-900">{title}</span>
        <Count n={items.length} kind={kind} />
      </h2>
      <ul className="flex flex-col gap-1">
        {items.map((it, i) => (
          <li key={it.title} className="flex items-start gap-3 py-2.5">
            <Node kind={kind} />
            <div className={`flex min-w-0 flex-1 flex-col ${i === 0 && children ? "gap-2" : "gap-0.5"}`}>
              <p className="t-body text-secondary-900">{it.title}</p>
              {it.text && <p className="t-small text-secondary-700">{it.text}</p>}
              {i === 0 && children}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function BusinessChip() {
  return (
    <div className="flex items-center gap-2 self-start rounded-full bg-secondary-50 px-3 py-2.5">
      <img src="/assets/business.jpg" alt="" className="size-6 rounded-md object-cover" />
      <p className="t-small text-secondary-900">Forno Rosso Pizzeria, Brooklyn</p>
    </div>
  );
}

function Facts({ desktop }: { desktop?: boolean }) {
  const card = `flex min-w-0 flex-1 flex-col gap-1 rounded-[20px] py-4 ${desktop ? "px-5" : "px-3.5"}`;
  const label = "t-small";
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-stretch gap-2">
        <div className={`${card} bg-secondary-50`}>
          <p className="t-title text-secondary-900">#6</p>
          <p className={`${label} text-secondary-700`}>Search rank</p>
        </div>
        <div className={`${card} bg-secondary-50`}>
          <p className="flex items-center gap-1">
            <span className="t-title text-secondary-900">4.4</span>
            <img src="/assets/onboarding/02b/star.svg" alt="" width={18} height={18} />
          </p>
          <p className={`${label} text-secondary-700`}>212 reviews</p>
        </div>
        <div className={`${card} bg-error-50`}>
          <p className="t-title text-error-700">12</p>
          <p className={`${label} text-error-700`}>Not replied</p>
        </div>
      </div>
      <p className={`${label} text-secondary-700`}>Rank is for “pizza near me” around 214 Bedford Ave today.</p>
    </div>
  );
}

export function Mobile() {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <TopBar step={3} back="/onboarding/02a" skip="/home/10c" />
      <main className="flex flex-1 flex-col gap-6 px-5 pt-2">
        <div className="flex flex-col gap-4">
          <Intro {...INTRO} />
          <BusinessChip />
        </div>
        <Facts />
        <div className="flex flex-col gap-1">
          <Group title="Needs a fix" kind="fix" items={NEEDS_FIX}>
            <div className="flex flex-col gap-1.5 rounded-2xl bg-success-50 px-3.5 py-3">
              <p className="t-caption text-success-700">Free fix — we’ll add to your description</p>
              <p className="t-headline text-secondary-900">“Delivery across Williamsburg and Greenpoint.”</p>
              <p className="t-small text-secondary-700">Next: you review the text before anything changes.</p>
            </div>
          </Group>
          <p className="t-small text-secondary-700">The first fix is free. The other 3 come with the plan.</p>
        </div>
        <Group title="Couldn’t check" kind="unknown" items={COULDNT_CHECK} />
        <Group title="Looks good" kind="good" items={LOOKS_GOOD} />
      </main>
      <div data-edge="bottom" className="bar-blur sticky bottom-0 z-10 px-5 pb-[max(12px,env(safe-area-inset-bottom))]">
        <Button href={NEXT}>Fix description for free</Button>
      </div>
    </div>
  );
}

export function Desktop() {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <DesktopHeader back="/onboarding/02a" step={3} skip="/home/10c" />
      {/* Same frame as 05–07: a centred 1128px block, report 520px on the left, the free fix 416px on the right. */}
      {/* The fix and its button stay in view while the report scrolls past (sticky under the header). */}
      <main className="mx-auto grid w-full max-w-[1208px] flex-1 grid-cols-[minmax(0,520px)_minmax(0,416px)] content-start items-start justify-between gap-x-12 px-10 pt-desk pb-desk">
        <section className="min-w-0">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <Intro {...INTRO} />
                <BusinessChip />
              </div>
              <Facts desktop />
              <Group title="Needs a fix" kind="fix" items={NEEDS_FIX} />
              <div className="flex items-start gap-10">
                <Group title="Couldn’t check" kind="unknown" items={COULDNT_CHECK} className="min-w-0 flex-1" />
                <Group title="Looks good" kind="good" items={LOOKS_GOOD} className="min-w-0 flex-1" />
              </div>
            </div>
          </div>
        </section>
        <aside className="sticky top-[calc(72px+clamp(24px,5.3vh,48px))] min-w-0">
          {/* Figma: the fix card, the note 24px under it, then the button 32px below. */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <h2 className="t-headline text-secondary-900">Your free fix</h2>
                <div className="flex flex-col gap-1.5 rounded-2xl bg-success-50 px-3.5 py-3">
                  <p className="t-small-bold text-success-700">We’ll add this to your description</p>
                  <p className="t-headline text-secondary-900">“Delivery across Williamsburg and Greenpoint.”</p>
                  <p className="t-small text-secondary-700">Next: you review the text before anything changes.</p>
                </div>
              </div>
              <p className="t-small text-secondary-700">The first fix is free. The other 3 come with the plan.</p>
            </div>
            <Button href={NEXT}>Fix description for free</Button>
          </div>
        </aside>
      </main>
    </div>
  );
}
