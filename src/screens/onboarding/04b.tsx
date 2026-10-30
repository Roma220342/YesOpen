import Link from "next/link";
import { Icon, type IconName } from "@/components/icon";
import { Button, TopBar } from "@/components/ui";
import { DesktopHeader } from "@/components/desktop-header";

// Shared layout for the connect error states 04b (wrong account), 04c (no access), 04d (not verified).
export type ConnectErrorProps = {
  title: string;
  text: string;
  icon: IconName;
  status: string;
  secondary: { label: string; href: string };
  primary: string;
};

const BACK = "/onboarding/04";
const SKIP = "/home/10c";
const RETRY = "/onboarding/04";

function Content({ p }: { p: ConnectErrorProps }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h1 className="t-large-title text-secondary-900">{p.title}</h1>
        <p className="t-body text-secondary-700">{p.text}</p>
      </div>
      <div className="flex items-start gap-3 rounded-2xl bg-primary-50 p-4">
        <Icon name={p.icon} className="shrink-0 text-primary-600 in-[[data-desktop]]:size-[22px]" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <p className="t-headline text-secondary-900">Forno Rosso Pizzeria</p>
          <p className="t-small text-secondary-700">{p.status}</p>
        </div>
      </div>
    </div>
  );
}

// The text button above the primary: 56px like it, 12px between them (Figma buttons container), on both views.
function Secondary({ p }: { p: ConnectErrorProps }) {
  return (
    <Link href={p.secondary.href} className="btn-text t-headline flex h-14 w-full items-center justify-center rounded-[28px]">
      {p.secondary.label}
    </Link>
  );
}

export function ConnectErrorMobile(p: ConnectErrorProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <TopBar step={5} back={BACK} skip={SKIP} />
      <main className="flex-1 px-5 pt-2">
        <Content p={p} />
      </main>
      <div data-edge="bottom" className="bar-blur sticky bottom-0 z-10 flex flex-col gap-3 px-5 pb-[max(12px,env(safe-area-inset-bottom))]">
        <Secondary p={p} />
        <Button href={RETRY}>{p.primary}</Button>
      </div>
    </div>
  );
}

export function ConnectErrorDesktop(p: ConnectErrorProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <DesktopHeader back={BACK} step={5} skip={SKIP} />
      <main className="flex flex-1 justify-center px-10 pt-desk pb-desk">
        <div className="flex w-full max-w-[640px] flex-col items-start">
          <div className="w-full">
            <Content p={p} />
            {/* Figma buttons container: 32px above, the 56px text button, 12px, the primary. */}
            <div className="flex flex-col gap-3 pt-8">
              <Secondary p={p} />
              <Button href={RETRY}>{p.primary}</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const PROPS: ConnectErrorProps = {
  title: "Wrong Google account",
  text: "You’re signed in as example@gmail.com. This account doesn’t manage your business on Google.",
  icon: "store",
  status: "Managed by a different Google account",
  secondary: { label: "Get help", href: "#" },
  primary: "Use another account",
};

export function Mobile() {
  return <ConnectErrorMobile {...PROPS} />;
}

export function Desktop() {
  return <ConnectErrorDesktop {...PROPS} />;
}
