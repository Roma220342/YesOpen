import Link from "next/link";
import { Icon } from "./icon";

// Desktop onboarding header (Figma 369:1759): Back on the left, the 6-step progress centred, Skip on the right.
// Back lives here, not above the content, so every screen starts its content 48px under the header.
// Steps 06–08 (trial and payment) hide the progress; screens without Skip leave the right side empty.
export function DesktopHeader({ back, step, skip }: { back?: string; step?: number; skip?: string }) {
  return (
    <header className="sticky top-0 z-20 grid h-[72px] w-full shrink-0 grid-cols-[1fr_auto_1fr] items-center border-b border-secondary-200 bg-white px-10">
      <div className="flex items-center">
        {back && (
          <Link href={back} className="t-body -ml-1 flex items-center gap-1.5 rounded-lg py-2 pr-2 pl-1 text-secondary-700">
            <Icon name="back" size={20} />
            Back
          </Link>
        )}
      </div>
      <div className="flex gap-1" aria-hidden={!step}>
        {step
          ? Array.from({ length: 6 }, (_, i) => (
              <span key={i} className={`h-1 w-8 rounded-sm ${i < step ? "bg-secondary-900" : "bg-secondary-100"}`} />
            ))
          : null}
        {step ? <span className="sr-only">Step {step} of 6</span> : null}
      </div>
      <div className="flex items-center justify-end">
        {skip && (
          <Link href={skip} className="t-body rounded-lg px-3 py-2 text-secondary-700">
            Skip
          </Link>
        )}
      </div>
    </header>
  );
}
