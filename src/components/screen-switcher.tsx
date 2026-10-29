"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { screensFor, VIEW_COOKIE, type View } from "@/screens/list";
import { Icon } from "./icon";

const saveView = (v: View) => {
  document.cookie = `${VIEW_COOKIE}=${v}; path=/; max-age=31536000`;
};

const readView = (): View => {
  const param = new URLSearchParams(window.location.search).get("view");
  if (param === "mobile" || param === "desktop") {
    saveView(param);
    return param;
  }
  return document.cookie.includes(`${VIEW_COOKIE}=mobile`) ? "mobile" : "desktop";
};

// Prototype-only control: pick Mobile or Desktop, then step through that version's screens. Arrow keys work too.
export function ScreenSwitcher() {
  const path = usePathname();
  const router = useRouter();
  const [view, setView] = useState<View>("desktop");
  const [expanded, setExpanded] = useState(false); // phones: collapsed to a dot until tapped
  useEffect(() => setView(readView()), [path]);

  const screens = screensFor(view);
  const i = screens.findIndex((s) => s.href === path);
  const prev = screens[i - 1];
  const next = screens[i + 1];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, select, [contenteditable]")) return;
      if (e.key === "ArrowLeft" && prev) router.push(prev.href);
      if (e.key === "ArrowRight" && next) router.push(next.href);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, router]);

  if (!path.startsWith("/onboarding/") && !path.startsWith("/home/")) return null;

  const switchTo = (v: View) => {
    saveView(v);
    setView(v);
    // A mobile-only screen has no desktop version: jump to the nearest one before it.
    const all = screensFor("mobile");
    const here = all.findIndex((s) => s.href === path);
    const target = screensFor(v).filter((s) => all.indexOf(s) <= here).pop() ?? screensFor(v)[0];
    router.replace(target.href);
    router.refresh();
  };

  const arrow = "flex size-9 shrink-0 items-center justify-center rounded-full hover:bg-white/10";
  const seg = (v: View) =>
    `t-caption h-7 rounded-full px-3 transition-colors duration-200 ${view === v ? "bg-white text-secondary-900" : "text-white/70 hover:text-white"}`;

  return (
    <>
      {/* Phones: a small translucent dot on the right edge, out of the way of buttons and the tab bar. */}
      {!expanded && (
        <button
          type="button"
          aria-label="Show screen switcher"
          onClick={() => setExpanded(true)}
          className="fixed top-1/3 right-0 z-50 flex h-10 w-6 items-center justify-center rounded-l-full bg-secondary-900/40 text-white backdrop-blur lg:hidden print:hidden"
        >
          <Icon name="chevron" size={16} rotate={90} />
        </button>
      )}
      <div
        className={`fixed inset-x-2 top-3 z-50 items-center gap-1 rounded-full bg-secondary-900/90 p-1 text-white shadow-lg backdrop-blur animate-drop-in lg:inset-x-auto lg:top-auto lg:right-4 lg:bottom-4 lg:flex lg:animate-none print:hidden ${
          expanded ? "flex" : "hidden"
        }`}
      >
        <div className="flex rounded-full bg-white/10 p-0.5">
          <button type="button" onClick={() => switchTo("mobile")} className={seg("mobile")}>Mobile</button>
          <button type="button" onClick={() => switchTo("desktop")} className={seg("desktop")}>Desktop</button>
        </div>
        {prev ? (
          <Link href={prev.href} aria-label={`Previous: ${prev.label}`} className={arrow}>
            <Icon name="chevron" size={18} rotate={90} />
          </Link>
        ) : (
          <span className={`${arrow} opacity-30`}><Icon name="chevron" size={18} rotate={90} /></span>
        )}
        <select
          value={path}
          onChange={(e) => router.push(e.target.value)}
          aria-label="Go to screen"
          className="t-small-bold min-w-0 flex-1 cursor-pointer lg:w-[180px] lg:flex-none truncate bg-transparent px-1 outline-none [&_optgroup]:text-secondary-900 [&_option]:text-secondary-900"
        >
          {["Onboarding", "Home"].map((g) => (
            <optgroup key={g} label={g}>
              {screens.filter((s) => s.group === g).map((s) => (
                <option key={s.href} value={s.href}>{s.label}</option>
              ))}
            </optgroup>
          ))}
        </select>
        {next ? (
          <Link href={next.href} aria-label={`Next: ${next.label}`} className={arrow}>
            <Icon name="chevron" size={18} rotate={-90} />
          </Link>
        ) : (
          <span className={`${arrow} opacity-30`}><Icon name="chevron" size={18} rotate={-90} /></span>
        )}
        <button
          type="button"
          aria-label="Hide screen switcher"
          onClick={() => setExpanded(false)}
          className={`${arrow} lg:hidden`}
        >
          <Icon name="close" size={18} />
        </button>
      </div>
    </>
  );
}
