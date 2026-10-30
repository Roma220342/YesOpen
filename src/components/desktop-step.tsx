import { DesktopHeader } from "./desktop-header";

// Desktop onboarding frame. Every step uses it, so the main button is always in the same place.
// Left: what the person reads (scrolls). Right: the action panel, pinned under the header at a fixed height,
// with the button on its bottom edge. Whatever the panel holds above it, the button never moves.
// Secondary actions go in `action` above the primary one, which keeps the bottom spot.
export function DesktopStep({
  back,
  step,
  skip,
  aside,
  action,
  children,
}: {
  back?: string;
  step?: number;
  skip?: string;
  aside?: React.ReactNode;
  action: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <DesktopHeader back={back} step={step} skip={skip} />
      <main className="mx-auto grid w-full max-w-[1144px] flex-1 grid-cols-[minmax(0,600px)_minmax(0,400px)] content-start items-start justify-between gap-x-16 px-10 pt-desk pb-desk">
        <section className="min-w-0">{children}</section>
        <aside className="sticky top-desk flex min-h-[380px] min-w-0 flex-col rounded-3xl border border-secondary-100 p-6">
          <div className="flex min-h-0 flex-1 flex-col gap-4">{aside}</div>
          <div className="flex flex-col gap-3 pt-6">{action}</div>
        </aside>
      </main>
    </div>
  );
}

export function AsideTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="t-headline text-secondary-900">{children}</h2>;
}
