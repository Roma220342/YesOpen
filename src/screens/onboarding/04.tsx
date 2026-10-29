import Link from "next/link";
import { Icon, type IconName } from "@/components/icon";
import { Button, TopBar } from "@/components/ui";

const BACK = "/onboarding/03a";
const NEXT = "/onboarding/05";

// ---- Desktop chrome shared by 04–06 (Figma header 369:1712, back link 369:1764) ----

export function DesktopHeader({ step, skip }: { step?: number; skip?: string }) {
  return (
    <header className="sticky top-0 z-20 flex h-[72px] w-full shrink-0 items-center justify-between border-b border-secondary-200 bg-white px-10">
      <div className="flex w-60 items-center">
        <img src="/brand/logo.svg" alt="YesOpen" width={84} height={24} />
      </div>
      {step ? (
        <div className="flex items-center gap-4">
          <div className="flex gap-1" aria-hidden>
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i} className={`h-1 w-8 rounded-sm ${i < step ? "bg-secondary-900" : "bg-secondary-200"}`} />
            ))}
          </div>
          <p className="t-footnote leading-4 whitespace-nowrap text-secondary-700">Step {step} of 6</p>
        </div>
      ) : null}
      <div className="flex h-[38px] w-60 items-center justify-end">
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

// Desktop primary button: 48px tall, radius 24.
export function DesktopButton({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <Link
      href={href}
      className="t-headline flex h-12 w-full items-center justify-center rounded-3xl bg-primary-600 px-6 text-white transition-colors hover:bg-primary-700"
    >
      {children}
    </Link>
  );
}

// ---- Screen 04 ----

const PERMISSIONS: { icon: IconName | "trending"; title: string; text: string }[] = [
  { icon: "store", title: "See your business profile", text: "Hours, photos, reviews and posts" },
  { icon: "edit", title: "Suggest fixes to it", text: "You see before and after, then approve" },
  { icon: "chat", title: "Reply to your reviews", text: "Drafted in your tone" },
  { icon: "campaign", title: "Publish posts", text: "Ready-made, on a schedule you choose" },
  { icon: "trending", title: "Weekly check and position", text: "New problems and where you rank nearby" },
];

function Content({ desktop }: { desktop: boolean }) {
  const small = desktop ? "t-small" : "t-footnote";
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h1 className="t-large-title text-secondary-900">Connect Google so we can make changes</h1>
        <p className="t-body text-secondary-700">Google will ask you to allow access. YesOpen will be able to:</p>
      </div>
      <div className="flex flex-col gap-6">
        <ul className="flex flex-col gap-5">
          {PERMISSIONS.map((p) => (
            <li key={p.title} className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary-75 text-secondary-900">
                {p.icon === "trending" ? (
                  <img src="/assets/onboarding/04/trending.svg" alt="" width={20} height={20} />
                ) : (
                  <Icon name={p.icon} size={20} />
                )}
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="t-headline text-secondary-900">{p.title}</span>
                <span className={`${small} text-secondary-700`}>{p.text}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className={`${small} text-secondary-700`}>
          Nothing goes live unless you approve it. YesOpen can’t access your Gmail, Google Ads, or payment information.
        </p>
      </div>
    </div>
  );
}

export function Mobile() {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <TopBar step={5} back={BACK} />
      <main className="flex-1 px-5 pt-4 pb-6">
        <Content desktop={false} />
      </main>
      <div data-edge="bottom" className="sticky bottom-0 z-10 bg-white px-5 pt-4 pb-8">
        <Button href={NEXT}>Continue with Google</Button>
      </div>
    </div>
  );
}

export function Desktop() {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <DesktopHeader step={5} />
      <main className="flex flex-1 justify-center px-10 pt-[50px] pb-20">
        <div className="flex flex-col items-start gap-6">
          <DesktopBack href={BACK} />
          <div className="w-[520px]">
            <Content desktop />
            <div className="pt-8">
              <DesktopButton href={NEXT}>Continue with Google</DesktopButton>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
