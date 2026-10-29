"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// How long the sheet takes to slide back down; matches --animate-sheet-out in globals.css.
const OUT_MS = 220;

/**
 * Mobile bottom sheet over the dimmed Home. It rises in, and every way out (backdrop, Escape, an action inside)
 * slides it back down first; `close(then)` runs `then` once it is gone, so the card can leave after the sheet.
 * While it is open the page behind does not scroll: otherwise a swipe on the sheet scrolls Home, and on iPhone the
 * browser bars resize the window under the fixed sheet.
 */
export function BottomSheet({
  label,
  onClose,
  className = "",
  children,
}: {
  label: string;
  onClose: () => void;
  className?: string;
  children: (close: (then?: () => void) => void) => React.ReactNode;
}) {
  const [leaving, setLeaving] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  const close = useCallback(
    (then?: () => void) => {
      if (done.current) return;
      done.current = true;
      setLeaving(true);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setTimeout(() => {
        onClose();
        then?.();
      }, reduce ? 0 : OUT_MS);
    },
    [onClose],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  // Lock the page, make it inert so Tab stays in the sheet, take focus in, and give all of it back on the way out.
  useEffect(() => {
    const html = document.documentElement;
    const before = { html: html.style.overflow, body: document.body.style.overflow };
    const opener = document.activeElement as HTMLElement | null;
    const sheet = panel.current?.closest("[role=dialog]");
    const page = [...document.body.children].filter((el): el is HTMLElement => el instanceof HTMLElement && el !== sheet && !el.inert);
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    page.forEach((el) => (el.inert = true));
    panel.current?.focus({ preventScroll: true });
    return () => {
      html.style.overflow = before.html;
      document.body.style.overflow = before.body;
      page.forEach((el) => (el.inert = false));
      opener?.focus?.({ preventScroll: true });
    };
  }, []);

  // Portal to <body>: the screen's entrance animation transforms its ancestors, which would pin "fixed" to them.
  return createPortal(
    <div className="fixed inset-0 z-50 flex flex-col justify-end" role="dialog" aria-modal="true" aria-label={label}>
      <button
        type="button"
        aria-label="Close"
        onClick={() => close()}
        className={`absolute inset-0 touch-none bg-secondary-900/40 ${leaving ? "animate-fade-out" : "animate-fade-in"}`}
      />
      <div
        ref={panel}
        tabIndex={-1}
        className={`relative flex max-h-[90dvh] flex-col overflow-y-auto overscroll-contain rounded-t-3xl bg-white outline-none ${
          leaving ? "animate-sheet-out" : "animate-sheet-in"
        } ${className}`}
      >
        <span className="mx-auto mb-1 h-[5px] w-9 shrink-0 rounded-full bg-secondary-200" aria-hidden />
        {children(close)}
      </div>
    </div>,
    document.body,
  );
}
