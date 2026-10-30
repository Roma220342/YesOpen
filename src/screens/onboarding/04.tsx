import { AsideTitle, DesktopStep } from "@/components/desktop-step";
import { Icon, type IconName } from "@/components/icon";
import { Button, TopBar } from "@/components/ui";

const BACK = "/onboarding/03a";
const NEXT = "/onboarding/05";

const PERMISSIONS: { icon: IconName; title: string; text: string }[] = [
  { icon: "trending", title: "Check your profile every week", text: "New problems and where you rank nearby" },
  { icon: "sparkle", title: "Draft fixes, replies and posts", text: "In your tone, with before and after" },
  { icon: "verified", title: "Publish only what you approve", text: "You can edit or discard anything" },
];

// Figma 04: intro, what YesOpen will do (three rows 16px apart), the promise. Mobile spaces the groups 32px apart and
// keeps the subtitle to its first sentence; desktop keeps the full sentence and 24px groups.
function Content({ desktop = false }: { desktop?: boolean }) {
  return (
    <div className={`flex flex-col ${desktop ? "gap-6" : "gap-8"}`}>
      <div className="flex flex-col gap-3">
        <h1 className="t-large-title text-secondary-900">Connect Google so we can make changes</h1>
        <p className="t-body text-secondary-700">
          {desktop ? "Google will ask you to allow access. YesOpen will be able to:" : "Google will ask you to allow access."}
        </p>
      </div>
      <div className={`flex flex-col ${desktop ? "gap-6" : "gap-8"}`}>
        <ul className="flex flex-col gap-4">
          {PERMISSIONS.map((p) => (
            <li key={p.title} className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary-75 text-secondary-900">
                <Icon name={p.icon} />
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="t-headline text-secondary-900">{p.title}</span>
                <span className="t-small text-secondary-700">{p.text}</span>
              </span>
            </li>
          ))}
        </ul>
        {!desktop && (
          <p className="t-small text-secondary-700">
            Nothing goes live unless you approve it. YesOpen can’t access your Gmail, Google Ads, or payment information.
          </p>
        )}
      </div>
    </div>
  );
}

export function Mobile() {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <TopBar step={5} back={BACK} />
      <main className="flex-1 px-5 pt-2">
        <Content />
      </main>
      <div data-edge="bottom" className="bar-blur sticky bottom-0 z-10 px-5 pb-[max(12px,env(safe-area-inset-bottom))]">
        <Button href={NEXT}>Continue with Google</Button>
      </div>
    </div>
  );
}

export function Desktop() {
  return (
    <DesktopStep
      back={BACK}
      step={5}
      aside={
        <>
          <AsideTitle>You stay in control</AsideTitle>
          <p className="t-body text-secondary-700">
            Nothing goes live unless you approve it. YesOpen can’t access your Gmail, Google Ads, or payment information.
          </p>
        </>
      }
      action={<Button href={NEXT}>Continue with Google</Button>}
    >
      <Content desktop />
    </DesktopStep>
  );
}
