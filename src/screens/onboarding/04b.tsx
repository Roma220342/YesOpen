import Link from "next/link";
import { Icon, type IconName } from "@/components/icon";
import { Button, TopBar } from "@/components/ui";
import { DesktopBack, DesktopButton, DesktopHeader } from "./04";

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

function Content({ p, desktop }: { p: ConnectErrorProps; desktop: boolean }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h1 className="t-large-title text-secondary-900">{p.title}</h1>
        <p className="t-body text-secondary-700">{p.text}</p>
      </div>
      <div className="flex items-start gap-3 rounded-2xl bg-primary-50 p-4">
        <Icon name={p.icon} size={22} className="shrink-0 text-primary-600" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <p className="t-headline text-secondary-900">Forno Rosso Pizzeria</p>
          <p className={`${desktop ? "t-small" : "t-footnote"} text-secondary-700`}>{p.status}</p>
        </div>
      </div>
    </div>
  );
}

function Secondary({ p }: { p: ConnectErrorProps }) {
  return (
    <Link href={p.secondary.href} className="t-headline flex h-11 w-full items-center justify-center text-primary-600">
      {p.secondary.label}
    </Link>
  );
}

export function ConnectErrorMobile(p: ConnectErrorProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <TopBar step={5} back={BACK} skip={SKIP} />
      <main className="flex flex-1 flex-col justify-between gap-8 px-5 pt-4 pb-6">
        <Content p={p} desktop={false} />
        <Secondary p={p} />
      </main>
      <div data-edge="bottom" className="sticky bottom-0 z-10 bg-white px-5 pt-4 pb-8">
        <Button href={RETRY}>{p.primary}</Button>
      </div>
    </div>
  );
}

export function ConnectErrorDesktop(p: ConnectErrorProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <DesktopHeader step={5} skip={SKIP} />
      <main className="flex flex-1 justify-center px-10 pt-[50px] pb-20">
        <div className="flex flex-col items-start gap-6">
          <DesktopBack href={BACK} />
          <div className="w-[520px]">
            <Content p={p} desktop />
            <Secondary p={p} />
            <div className="pt-8">
              <DesktopButton href={RETRY}>{p.primary}</DesktopButton>
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
