"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "./icon";

// Tab bar (Figma 230:798)
const TABS: { label: string; icon: IconName; href: string }[] = [
  { label: "Home", icon: "home", href: "/home/10a" },
  { label: "Reviews", icon: "chat", href: "#" },
  { label: "Posts", icon: "campaign", href: "#" },
  { label: "Map", icon: "location", href: "#" },
  { label: "More", icon: "more", href: "#" },
];

// How far the page has to move before the bar reacts, so a finger's jitter doesn't flicker it.
const THRESHOLD = 8;

/**
 * Hides while the owner scrolls down to read and comes back on the first scroll up, so Home gets the whole screen
 * without the tabs going out of reach. Always shown at the very top and at the bottom of the page.
 */
export function TabBar({ active = "Home" }: { active?: string }) {
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    last.current = window.scrollY;
    // Reads scroll position only (no layout writes), so it runs straight in the passive listener.
    const onScroll = () => {
      const y = window.scrollY;
      const atEnd = y + window.innerHeight >= document.documentElement.scrollHeight - 2;
      if (y <= 0 || atEnd) setHidden(false);
      else if (y - last.current > THRESHOLD) setHidden(true);
      else if (last.current - y > THRESHOLD) setHidden(false);
      else return;
      last.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky bottom-0 flex border-t border-secondary-100 bg-white px-2 pt-2.5 pb-3 transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
        hidden ? "translate-y-full" : ""
      }`}
    >
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
