"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Marks <html> with whether content is hidden above or below the viewport, so pinned bars ([data-edge])
// can show a hairline only when something is actually scrolled under them. Styles live in globals.css.
export function ScrollEdges() {
  const path = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    const update = () => {
      const y = window.scrollY;
      root.dataset.under = [y > 1 ? "top" : "", y + window.innerHeight < root.scrollHeight - 1 ? "bottom" : ""]
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
