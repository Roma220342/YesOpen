"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components/icon";
import { BottomSheet } from "./bottom-sheet";

export type SkipChoice = "later" | "never";

// What Skip asks: leave it for now (it comes back once, next week) or never bring it up again.
const OPTIONS: { id: SkipChoice; title: string; sub: string }[] = [
  { id: "later", title: "Not now", sub: "We’ll ask again next week." },
  { id: "never", title: "Don’t suggest again", sub: "We won’t bring this one up." },
];

function Options({ onChoose, className, menu = false }: { onChoose: (c: SkipChoice) => void; className: string; menu?: boolean }) {
  return (
    <>
      {OPTIONS.map((o, i) => (
        <button
          key={o.id}
          type="button"
          role={menu ? "menuitem" : undefined}
          autoFocus={i === 0}
          onClick={() => onChoose(o.id)}
          className={`flex flex-col gap-0.5 text-left hover:bg-secondary-50 focus-visible:bg-secondary-50 ${className}`}
        >
          <span className="t-headline text-secondary-900">{o.title}</span>
          <span className="t-small text-secondary-700">{o.sub}</span>
        </button>
      ))}
    </>
  );
}

// Mobile: the choice rises from the bottom over the dimmed Home, like the reply sheet, and slides down before the card leaves.
export function SkipSheet({ onChoose, onClose }: { onChoose: (c: SkipChoice) => void; onClose: () => void }) {
  return (
    <BottomSheet label="Skip this task" onClose={onClose} className="gap-2 px-5 pt-3 pb-[max(34px,env(safe-area-inset-bottom))]">
      {(close) => <Options onChoose={(c) => close(() => onChoose(c))} className="rounded-2xl bg-secondary-50 p-4" />}
    </BottomSheet>
  );
}

// Desktop: "Skip ▾" opens a small list under the button, right edges aligned. The chevron says a choice follows.
// The list is portalled: the open item sits in a clipping Collapse and would cut it off.
const MENU_WIDTH = 300;
const MENU_HEIGHT = 156; // two options, 8px padding and gap

export function SkipMenu({ onChoose, defaultOpen = false }: { onChoose: (c: SkipChoice) => void; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  const button = useRef<HTMLButtonElement>(null);

  // Placed in page coordinates (absolute on <body>), so the list scrolls with the button instead of staying put on
  // screen. It opens above the button when there is no room for it below.
  const place = () => {
    const r = button.current?.getBoundingClientRect();
    if (!r) return;
    const below = window.innerHeight - r.bottom >= MENU_HEIGHT + 16;
    setPos({
      left: r.right - MENU_WIDTH + window.scrollX,
      top: (below ? r.bottom + 8 : r.top - 8 - MENU_HEIGHT) + window.scrollY,
    });
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
        className="btn-text t-headline flex h-12 items-center gap-1 rounded-[28px] pr-6 pl-8 whitespace-nowrap"
      >
        Skip
        <Icon name="chevron" />
      </button>
      {open &&
        pos &&
        createPortal(
          <div
            data-skip-menu
            role="menu"
            style={{ left: pos.left, top: pos.top }}
            className="animate-drop-in absolute z-50 flex w-[300px] flex-col gap-1 rounded-2xl border border-secondary-200 bg-white p-2 shadow-pop"
          >
            <Options
              onChoose={(c) => {
                setOpen(false);
                onChoose(c);
              }}
              className="rounded-xl px-4 py-3"
              menu
            />
          </div>,
          document.body,
        )}
    </>
  );
}
