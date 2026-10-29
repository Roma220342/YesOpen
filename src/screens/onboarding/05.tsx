import { Icon } from "@/components/icon";
import { Button, TopBar } from "@/components/ui";
import { DesktopButton, DesktopHeader } from "./04";

const NEXT = "/onboarding/06";
const CTA = "Fix the rest, 14 days free";

const FINDINGS = [
  { title: "Opening hours", text: "No Sunday hours, so you look closed on Sundays" },
  { title: "Photos", text: "Only 3 photos, and the newest is 2 years old" },
  { title: "Reviews", text: "12 reviews without a reply" },
];

function Sent({ desktop }: { desktop: boolean }) {
  const small = desktop ? "t-small" : "t-footnote";
  return (
    <>
      <div className="flex flex-col gap-3">
        <h1 className="t-large-title text-secondary-900">Sent to Google</h1>
        <p className="t-body text-secondary-700">
          Google checks every change before customers see it. Nothing else changed on your profile.
        </p>
      </div>
      <div className="flex items-start gap-3 rounded-2xl bg-primary-50 p-4">
        <Icon name="clock" size={22} className="shrink-0 text-primary-600" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <p className="t-headline text-secondary-900">Waiting for Google’s review</p>
          <p className={`${small} text-secondary-700`}>No need to wait here. We’ll email you when it’s live.</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className={`${desktop ? "t-small-bold" : "t-caption"} text-secondary-700`}>New description</p>
        <p className="t-body rounded-2xl bg-secondary-50 p-4 text-secondary-900">
          Family-run pizzeria in Brooklyn since 2009. Wood-fired pizza and fresh pasta, with delivery across
          Williamsburg and Greenpoint until 11 pm.
        </p>
      </div>
    </>
  );
}

function StillToFix({ desktop }: { desktop: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 pb-1">
        <h2 className="t-headline text-secondary-900">Still to fix</h2>
        <span className="t-caption flex size-[22px] items-center justify-center rounded-full bg-error-50 text-error-600">3</span>
      </div>
      <ul className="flex flex-col gap-1">
        {FINDINGS.map((f) => (
          <li key={f.title} className="flex items-start gap-3 py-2.5">
            <span className="pt-2">
              <span className="block size-2 rounded-md bg-error-500" />
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="t-body text-secondary-900">{f.title}</span>
              <span className={`${desktop ? "t-small" : "t-footnote"} text-secondary-700`}>{f.text}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Mobile() {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <TopBar step={6} />
      <main className="flex flex-1 flex-col gap-6 px-5 pt-4 pb-6">
        <Sent desktop={false} />
        <StillToFix desktop={false} />
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
      <DesktopHeader step={6} />
      {/* Figma: a centred 1128px block, task column 520px on the left, context column 416px on the right. */}
      <main className="mx-auto flex w-full max-w-[1208px] flex-1 items-start justify-between gap-12 px-10">
        <section className="flex w-full max-w-[520px] min-w-0 flex-col gap-6 pt-28 short:pt-14 pb-24 short:pb-12">
          <Sent desktop />
        </section>
        <aside className="w-full max-w-[416px] min-w-0 pt-28 short:pt-14 pb-24 short:pb-12">
          <div className="flex flex-col gap-4">
            <StillToFix desktop />
            <div className="pt-4">
              <DesktopButton href={NEXT}>{CTA}</DesktopButton>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
