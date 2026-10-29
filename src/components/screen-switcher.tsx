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
    <div className="fixed right-4 bottom-4 z-50 flex items-center gap-1 rounded-full bg-secondary-900/90 p-1 text-white shadow-lg backdrop-blur print:hidden">
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
        className="t-small-bold w-[180px] cursor-pointer truncate bg-transparent px-1 outline-none [&_optgroup]:text-secondary-900 [&_option]:text-secondary-900"
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
    </div>
  );
}
