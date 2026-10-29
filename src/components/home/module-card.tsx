import { HeadLink } from "@/components/ui";
import { Icon } from "@/components/icon";

// White Home module (Figma "Your week on Google", "Reviews", ...): radius 24, padding 20, header row + body with 16px gaps.
export function ModuleCard({
  title,
  link,
  className = "",
  children,
}: {
  title: string;
  link?: { label: string; href?: string };
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`flex flex-col gap-4 rounded-3xl bg-white p-5 ${className}`}>
      <div className="flex h-[22px] items-center justify-between">
        <h2 className="t-headline flex-1 text-secondary-900">{title}</h2>
        {link && <HeadLink href={link.href}>{link.label}</HeadLink>}
      </div>
      {children}
    </section>
  );
}

export type TrendTone = "up" | "down" | "alert";

// Trend chip. "up" = green arrow up (default), "down" = red arrow down, "alert" = red, no arrow.
export function TrendChip({ children, tone = "up" }: { children: React.ReactNode; tone?: TrendTone }) {
  return (
    <span
      className={`t-caption flex w-fit items-center gap-1 rounded-full py-1 pr-2.5 pl-2 ${
        tone === "up" ? "bg-success-50 text-success-700" : "bg-error-50 text-error-700"
      }`}
    >
      {tone !== "alert" && (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className={tone === "down" ? "rotate-180" : undefined}>
          <path d="M6 9.5V2.5M9 5.5L6 2.5L3 5.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {children}
    </span>
  );
}

// Rating star (warning-500), drawn at 14px in ranking rows and 22px in the Reviews summary.
export function Star({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" className="shrink-0 text-warning-500" aria-hidden>
      <path
        d="M7 1.45833L8.69167 4.95833L12.5417 5.48333L9.74167 8.16667L10.4417 11.9583L7 10.15L3.55833 11.9583L4.25833 8.16667L1.45833 5.48333L5.30833 4.95833L7 1.45833Z"
        fill="currentColor"
      />
    </svg>
  );
}

// "To approve 4" count pill.
export function CountPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="t-caption flex h-[22px] items-center justify-center rounded-full bg-primary-50 px-[7px] text-primary-600">
      {children}
    </span>
  );
}

// Primary pill button. Size "m" = 48px (task cards), "l" = 56px (desktop accordion).
export function PillButton({
  children,
  size = "m",
  className = "",
  done = false,
  onClick,
}: {
  children: React.ReactNode;
  size?: "m" | "l";
  className?: string;
  /** Approved state: green with a check, no longer clickable. */
  done?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={done ? undefined : onClick}
      className={`t-headline flex items-center justify-center gap-2 rounded-[28px] px-6 text-white transition-[background-color,transform] duration-200 active:scale-[0.98] ${
        done ? "pointer-events-none bg-success-600" : "bg-primary-600 hover:bg-primary-700"
      } ${size === "m" ? "h-12" : "h-14"} ${className}`}
    >
      {done && <Icon name="check" size={20} className="animate-pop-in" />}
      {children}
    </button>
  );
}
