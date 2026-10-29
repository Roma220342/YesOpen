"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/icon";

// Sidebar footer: the account row; its chevron opens Subscription, Settings, Help and Log out above it.
// The list sits 12px over the footer, left-aligned with the nav, and turns the chevron up while open.
export function AccountMenu({ avatar, name, children }: { avatar: ReactNode; name: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onDown = (e: MouseEvent) => !root.current?.contains(e.target as Node) && close();
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  return (
    <div ref={root} data-pane-edge="bottom" className="relative shrink-0 border-t border-secondary-100 px-4 py-2">
      {open && (
        <div
          role="menu"
          className="animate-drop-in absolute bottom-[calc(100%+12px)] left-[17px] z-50 flex w-[248px] flex-col gap-1 rounded-2xl border border-secondary-100 bg-white p-2 shadow-pop"
        >
          {children}
        </div>
      )}
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex h-11 w-full items-center gap-3 rounded-full px-2 py-1 text-left hover:bg-secondary-50"
      >
        <span className="flex min-w-0 flex-1 items-center gap-1">
          {avatar}
          <span data-figma-12 className="t-caption min-w-0 flex-1 truncate text-secondary-900">{name}</span>
        </span>
        <Icon name="chevron" rotate={open ? 180 : undefined} className="shrink-0 text-secondary-700" />
      </button>
    </div>
  );
}
