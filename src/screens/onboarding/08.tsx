import { Button, TopBar } from "@/components/ui";
import { DesktopButton, DesktopHeader } from "./_payment";

const NEXT = "/home/10a";

const ROWS: [string, string][] = [
  ["Today", "$0.00"],
  ["From November 11", "$49 a month"],
  ["Payment method", "Visa •••• 4242"],
];

function Content({ desktop }: { desktop: boolean }) {
  const small = desktop ? "t-small" : "t-footnote";
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex w-full flex-col gap-3">
        <h1 className="t-large-title text-secondary-900">Your free trial has started</h1>
        <p className="t-body text-secondary-700">
          Nothing was charged today. We emailed the details to example@gmail.com.
        </p>
      </div>

      <div className="flex w-full items-start gap-3 rounded-2xl bg-success-50 p-4">
        <span className="relative size-[22px] shrink-0">
          <img
            src="/assets/onboarding/07/lock-open.svg"
            alt=""
            className="absolute left-[18.75%] top-[8.33%] h-[17.875px] w-[13.75px]"
          />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <p className="t-headline text-secondary-900">Full access is on</p>
          <p className={`${small} text-secondary-700`}>Your other 3 fixes are unlocked.</p>
        </div>
      </div>

      <div className="t-body flex w-full flex-col whitespace-nowrap rounded-2xl bg-secondary-50 px-4 py-1.5">
        {ROWS.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between py-3">
            <span className="text-secondary-700">{k}</span>
            <span className="text-right text-secondary-900">{v}</span>
          </div>
        ))}
      </div>

      <p className={`${small} text-secondary-700`}>Cancel in Settings before November 11 and you won’t pay.</p>
    </div>
  );
}

export function Mobile() {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <TopBar />
      <main className="flex flex-1 flex-col px-5 pt-4 pb-6">
        <Content desktop={false} />
      </main>
      <div data-edge="bottom" className="sticky bottom-0 z-10 bg-white px-5 pt-4 pb-8">
        <Button href={NEXT}>Fix opening hours</Button>
      </div>
    </div>
  );
}

export function Desktop() {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <DesktopHeader />
      {/* Centred in the space under the header, so the button is in view on laptop-height windows too. */}
      <div className="flex flex-1 flex-col items-center justify-center px-10 py-12">
        <div className="flex w-full max-w-[520px] flex-col">
          <Content desktop />
          <div className="pt-8">
            <DesktopButton href={NEXT}>Fix opening hours</DesktopButton>
          </div>
        </div>
      </div>
    </div>
  );
}
