import { Icon } from "@/components/icon";
import { Button, TopBar } from "@/components/ui";
import { DesktopBack, DesktopButton, DesktopHeader } from "./04";

const BACK = "/onboarding/05";
const SKIP = "/home/10a";
const NEXT = "/onboarding/07";
const CTA = "Start 14 days free";

const DAYS = [
  { icon: "lock", title: "Today", text: "Full access. We start on your other 3 fixes." },
  { icon: "bell", title: "Day 12", text: "On November 9 we email you a reminder that your trial ends soon." },
  { icon: "card", title: "Day 14", text: "On November 11 your plan starts at $49 a month. Cancel before then and you won’t pay." },
] as const;

const SUMMARY = [
  ["Plan", "YesOpen, 1 location"],
  ["Today", "$0.00"],
  ["From November 11", "$49 a month"],
  ["Each extra location", "+$15 a month"],
];

function Trial() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h1 className="t-large-title text-secondary-900">How your free trial works</h1>
        <p className="t-body text-secondary-700">You’ll add a card, but pay nothing today. Cancel anytime before day 14.</p>
      </div>
      <ol className="flex flex-col">
        {DAYS.map((d, i) => {
          const last = i === DAYS.length - 1;
          return (
            <li key={d.title} className="flex items-stretch gap-4">
              <div className="flex shrink-0 flex-col items-center" aria-hidden>
                <span className={`h-1 w-0.5 ${i === 0 ? "" : "bg-primary-100"}`} />
                <span className="flex size-9 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                  {d.icon === "bell" ? (
                    <span className="relative size-[22px]">
                      <img src="/assets/onboarding/06/bell.svg" alt="" className="absolute top-[10.42%] left-[11.01%] h-[79.96%] w-[77.98%]" />
                    </span>
                  ) : (
                    <Icon name={d.icon} size={22} />
                  )}
                </span>
                {!last && <span className="w-0.5 flex-1 bg-primary-100" />}
              </div>
              <div className={`flex min-w-0 flex-1 flex-col gap-1 pt-1.5 ${last ? "" : "pb-7"}`}>
                <h2 className="t-title text-secondary-900">{d.title}</h2>
                <p className="t-body text-secondary-700">{d.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function Mobile() {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <TopBar back={BACK} skip={SKIP} />
      <main className="flex flex-1 flex-col justify-between gap-8 px-5 pt-4 pb-6">
        <Trial />
        <div className="flex flex-col gap-1 text-center">
          <p className="t-headline text-secondary-900">14 days free, then $49 a month</p>
          <p className="t-footnote text-secondary-700">+$15 a month for each extra location</p>
        </div>
      </main>
      <div data-edge="bottom" className="sticky bottom-0 z-10 bg-white px-5 pt-4 pb-8">
        <Button href={NEXT}>{CTA}</Button>
      </div>
    </div>
  );
}

export function Desktop() {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <DesktopHeader skip={SKIP} />
      {/* Figma: a centred 1128px block, task column 520px on the left, context column 416px on the right. */}
      <main className="mx-auto flex w-full max-w-[1208px] flex-1 items-start justify-between gap-12 px-10">
        <section className="flex w-full max-w-[520px] min-w-0 flex-col items-start gap-6 pt-12 pb-24">
          <DesktopBack href={BACK} />
          <div className="w-full">
            <Trial />
          </div>
        </section>
        <aside className="w-full max-w-[416px] min-w-0 pt-28 pb-24">
          <div className="flex flex-col gap-4">
            <h2 className="t-headline text-secondary-900">Summary</h2>
            <dl className="contents">
              {SUMMARY.map(([k, v]) => (
                <div key={k} className="t-body flex justify-between whitespace-nowrap">
                  <dt className="text-secondary-600">{k}</dt>
                  <dd className="text-secondary-900">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="pt-2">
              <DesktopButton href={NEXT}>{CTA}</DesktopButton>
            </div>
            <p className="t-small text-secondary-600">Cancel anytime before November 11 and you won’t pay.</p>
          </div>
        </aside>
      </main>
    </div>
  );
}
