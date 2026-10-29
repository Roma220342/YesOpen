"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components/icon";

export type SkipChoice = "later" | "never";

// What Skip asks: leave it for now (it comes back once, next week) or never bring it up again.
const OPTIONS: { id: SkipChoice; title: string; sub: string }[] = [
  { id: "later", title: "Not now", sub: "We’ll ask again next week." },
  { id: "never", title: "Don’t suggest again", sub: "We won’t bring this one up." },
];

function Options({ onChoose, className }: { onChoose: (c: SkipChoice) => void; className: string }) {
  return (
    <>
      {OPTIONS.map((o, i) => (
        <button
          key={o.id}
          type="button"
          role="menuitem"
          autoFocus={i === 0}
          onClick={() => onChoose(o.id)}
          className={`flex flex-col gap-0.5 text-left outline-none hover:bg-secondary-50 focus:bg-secondary-50 ${className}`}
        >
          <span className="t-headline text-secondary-900">{o.title}</span>
          <span className="t-small text-secondary-700">{o.sub}</span>
        </button>
      ))}
    </>
  );
}

// Mobile: the choice rises from the bottom over the dimmed Home, like the reply sheet.
export function SkipSheet({ onChoose, onClose }: { onChoose: (c: SkipChoice) => void; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Portal to <body>: the screen's entrance animation transforms its ancestors, which would pin "fixed" to them.
  return createPortal(
    <div className="fixed inset-0 z-50 flex flex-col justify-end" role="dialog" aria-modal="true" aria-label="Skip this task">
      <button type="button" aria-label="Close" onClick={onClose} className="animate-fade-in absolute inset-0 bg-secondary-900/40" />
      <div role="menu" className="animate-sheet-in relative flex flex-col gap-2 rounded-t-3xl bg-white px-5 pt-3 pb-[max(34px,env(safe-area-inset-bottom))]">
        <span className="mx-auto mb-1 h-[5px] w-9 shrink-0 rounded-full bg-secondary-200" aria-hidden />
        <Options onChoose={onChoose} className="rounded-2xl bg-secondary-50 p-4" />
      </div>
    </div>,
    document.body,
  );
}

// Desktop: "Skip ▾" opens a small list under the button, right edges aligned. The chevron says a choice follows.
// The list is portalled: the open item sits in a clipping Collapse and would cut it off.
export function SkipMenu({ onChoose, defaultOpen = false }: { onChoose: (c: SkipChoice) => void; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  const button = useRef<HTMLButtonElement>(null);

  const place = () => {
    const r = button.current?.getBoundingClientRect();
    if (r) setPos({ left: r.right - 300, top: r.bottom + 8 });
  };

  useLayoutEffect(() => {
    if (open) place();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onDown = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("[data-skip-menu]") && !button.current?.contains(e.target as Node)) close();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("resize", place);
    };
  }, [open]);

  return (
    <>
      <button
        ref={button}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="t-headline flex h-12 items-center gap-1 rounded-[28px] pr-6 pl-8 whitespace-nowrap text-primary-600 transition-colors hover:bg-primary-50"
      >
        Skip
        <Icon name="chevron" size={20} />
      </button>
      {open &&
        pos &&
        createPortal(
          <div
            data-skip-menu
            role="menu"
            style={{ left: pos.left, top: pos.top }}
            className="animate-drop-in fixed z-50 flex w-[300px] flex-col gap-1 rounded-2xl border border-secondary-200 bg-white p-2 shadow-[0_8px_24px_rgba(0,0,0,0.14)]"
          >
            <Options
              onChoose={(c) => {
                setOpen(false);
                onChoose(c);
              }}
              className="rounded-xl px-4 py-3"
            />
          </div>,
          document.body,
        )}
    </>
  );
}
