"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Marks <html> with whether content is hidden above or below the viewport, so pinned bars ([data-edge])
// can show a hairline only when something is actually scrolled under them. Styles live in globals.css.
export function ScrollEdges() {
  const path = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    // A few pixels of overflow (rounding, mobile browser bars) is not real hidden content.
    const SLACK = 8;
    const update = () => {
      const y = window.scrollY;
      const below = root.scrollHeight - (y + window.innerHeight);
      root.dataset.under = [y > SLACK ? "top" : "", below > SLACK ? "bottom" : ""]
        .filter(Boolean)
        .join(" ");
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(document.body);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [path]);
  return null;
}

// Same idea for a box that scrolls on its own (the desktop sidebar nav): marks its parent with
// data-pane-under, so sibling bars ([data-pane-edge]) show a hairline only when nav is hidden under them.
export function ScrollPane({ className = "", children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    const SLACK = 2;
    const update = () => {
      const below = el.scrollHeight - (el.scrollTop + el.clientHeight);
      parent.dataset.paneUnder = [el.scrollTop > SLACK ? "top" : "", below > SLACK ? "bottom" : ""]
        .filter(Boolean)
        .join(" ");
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    for (const child of el.children) ro.observe(child);
    el.addEventListener("scroll", update, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", update);
    };
  }, []);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
