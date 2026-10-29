import Link from "next/link";
import { Icon, type IconName } from "./icon";

// Button component (Figma 42:1710): Primary, Tonal, Disabled, Loading. Height 56, radius 28.
type ButtonVariant = "primary" | "tonal" | "disabled" | "loading";

export function Button({
  children,
  variant = "primary",
  href,
  className = "",
}: {
  children: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
  className?: string;
}) {
  const base = "t-headline flex h-14 w-full items-center justify-center gap-2.5 rounded-[28px] px-6 transition-colors";
  const look = {
    primary: "bg-primary-600 text-white hover:bg-primary-700",
    tonal: "bg-secondary-100 text-secondary-900 hover:bg-secondary-200",
    disabled: "bg-secondary-100 text-secondary-700 opacity-60 pointer-events-none",
    loading: "bg-primary-600 text-white pointer-events-none",
  }[variant];
  const inner = (
    <>
      {variant === "loading" && (
        <span className="size-[18px] animate-spin rounded-full border-[2.5px] border-white border-r-transparent" />
      )}
      {children}
    </>
  );
  return href ? (
    <Link href={href} className={`${base} ${look} ${className}`}>{inner}</Link>
  ) : (
    <button type="button" className={`${base} ${look} ${className}`}>{inner}</button>
  );
}

// Top bar / Path (Figma 42:1865): back, 6-segment progress, Skip. step = filled segments, 0 hides progress.
export function TopBar({
  step = 0,
  back,
  skip,
  className = "",
}: {
  step?: number;
  back?: string;
  skip?: string;
  className?: string;
}) {
  return (
    <div data-edge="top" className={`sticky top-0 z-20 flex h-14 items-center justify-between bg-white px-1 py-1.5 ${className}`}>
      <div className="flex w-[94px] items-center">
        {back && (
          <Link href={back} aria-label="Back" className="flex size-11 items-center justify-center rounded-[22px] text-secondary-900">
            <Icon name="back" />
          </Link>
        )}
      </div>
      <div className={`flex items-center gap-1 ${step ? "" : "invisible"}`} aria-hidden>
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} className={`h-1 w-5 rounded-sm ${i < step ? "bg-secondary-900" : "bg-secondary-100"}`} />
        ))}
      </div>
      <div className="flex w-[94px] justify-end">
        {skip && (
          <Link href={skip} className="t-body flex h-11 items-center justify-center rounded-[22px] px-4 text-secondary-700">
            Skip
          </Link>
        )}
      </div>
    </div>
  );
}

// Tab bar (Figma 230:798)
const TABS: { label: string; icon: IconName; href: string }[] = [
  { label: "Home", icon: "home", href: "/home/10a" },
  { label: "Reviews", icon: "chat", href: "#" },
  { label: "Posts", icon: "campaign", href: "#" },
  { label: "Map", icon: "location", href: "#" },
  { label: "More", icon: "more", href: "#" },
];

export function TabBar({ active = "Home" }: { active?: string }) {
  return (
    <nav className="sticky bottom-0 flex border-t border-secondary-100 bg-white px-2 pt-2.5 pb-[17px]">
      {TABS.map((t) => {
        const on = t.label === active;
        return (
          <Link key={t.label} href={t.href} className="flex flex-1 flex-col items-center gap-1">
            <span className={`flex h-8 w-14 items-center justify-center rounded-2xl ${on ? "bg-primary-50 text-primary-600" : "text-secondary-600"}`}>
              <Icon name={t.icon} />
            </span>
            <span className={on ? "t-caption text-primary-600" : "t-footnote text-secondary-600"}>{t.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

// Header link with chevron used in Home modules ("Details ›"). 44px tap height without growing the row.
export function HeadLink({ children, href = "#" }: { children: React.ReactNode; href?: string }) {
  return (
    <Link href={href} className="t-headline -my-[11px] flex h-11 items-center gap-0.5 text-primary-600">
      {children}
      <Icon name="chevron" size={16} rotate={-90} />
    </Link>
  );
}
