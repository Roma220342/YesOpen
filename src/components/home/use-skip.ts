"use client";

import { useState } from "react";
import type { SkipChoice } from "./skip";

const LATER = "Skipped. We’ll ask again next week.";
const SECOND = "Skipped. We won’t bring this one up again.";
const NEVER = "Got it. We won’t suggest this again.";

// What Skip does, shared by the mobile carousel and the desktop accordion:
// - "Not now" hides the task; it comes back once, next week. A second "Not now" on the same task hides it for good.
// - "Don’t suggest again" hides it for good.
// Skip changes nothing on Google and never raises Profile score. Undo, while the toast is up, puts the task back.
export function useSkip(startWith?: string) {
  const [hidden, setHidden] = useState<string[]>(startWith ? [startWith] : []);
  const [counts, setCounts] = useState<Record<string, number>>(startWith ? { [startWith]: 1 } : {});
  const [toast, setToast] = useState<{ title: string; message: string } | null>(startWith ? { title: startWith, message: LATER } : null);

  const skip = (title: string, choice: SkipChoice) => {
    const n = (counts[title] ?? 0) + (choice === "later" ? 1 : 0);
    setCounts((c) => ({ ...c, [title]: n }));
    setHidden((h) => [...h, title]);
    setToast({ title, message: choice === "never" ? NEVER : n >= 2 ? SECOND : LATER });
  };

  /** Puts the skipped task back; returns its title. */
  const undo = () => {
    if (!toast) return undefined;
    const { title, message } = toast;
    setHidden((h) => h.filter((x) => x !== title));
    if (message !== NEVER) setCounts((c) => ({ ...c, [title]: Math.max((c[title] ?? 1) - 1, 0) }));
    setToast(null);
    return title;
  };

  return { hidden, toast, skip, undo, closeToast: () => setToast(null) };
}
