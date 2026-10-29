import Link from "next/link";
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
      className={`t-caption flex w-fit shrink-0 items-center gap-1 rounded-full whitespace-nowrap py-1 pr-2.5 pl-2 ${
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

// Rating star (warning-500), drawn at 14px in ranking rows and reviews, 22px in the Reviews summary.
// Empty stars of a rating pass a grey colour class.
export function Star({ size = 14, className = "text-warning-500" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" className={`shrink-0 ${className}`} aria-hidden>
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
  href,
}: {
  children: React.ReactNode;
  size?: "m" | "l";
  className?: string;
  /** Approved state: green with a check, no longer clickable. */
  done?: boolean;
  onClick?: () => void;
  /** Renders a link instead of a button. */
  href?: string;
}) {
  const look = `t-headline flex items-center justify-center gap-2 rounded-[28px] px-6 text-white transition-[background-color,transform] duration-200 active:scale-[0.98] ${
    done ? "pointer-events-none bg-success-600" : "bg-primary-600 hover:bg-primary-700"
  } ${size === "m" ? "h-12" : "h-14"} ${className}`;
  if (href && !done) return <Link href={href} className={look}>{children}</Link>;
  return (
    <button type="button" onClick={done ? undefined : onClick} className={look}>
      {done && <Icon name="check" size={20} className="animate-pop-in" />}
      {children}
    </button>
  );
}

// Secondary answer under or beside the main button: no fill, blue label, same height.
export function TextButton({
  children,
  size = "m",
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  size?: "m" | "l";
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`t-headline flex items-center justify-center rounded-[28px] px-2 whitespace-nowrap text-primary-600 transition-colors hover:bg-primary-50 ${
        size === "m" ? "h-12" : "h-14"
      } ${className}`}
    >
      {children}
    </button>
  );
}

export type Locked = { title: string; sub: string; href: string };

// What YesOpen does, shown as a closed row on a home without a plan (10c). Opens the trial.
export function LockedRow({ title, sub, href, className = "" }: Locked & { className?: string }) {
  return (
    <Link href={href} className={`flex items-center gap-3 rounded-2xl bg-secondary-50 p-4 transition-colors hover:bg-secondary-75 ${className}`}>
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-secondary-900">
        <Icon name="lock" size={20} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="t-headline text-secondary-900">{title}</span>
        <span className="t-small text-secondary-700">{sub}</span>
      </span>
      <Icon name="chevron" size={22} rotate={-90} className="shrink-0 text-secondary-700" />
    </Link>
  );
}

// Last row of To approve on a home without a plan: the other tasks are counted, not shown.
export function LockedMore({ count, href, className }: { count: number; href: string; className?: string }) {
  return <LockedRow title={`${count} more fixes are ready`} sub="Start your free trial to see and approve them" href={href} className={className} />;
}
