"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Collapse } from "@/components/collapse";
import { TopBar } from "@/components/ui";
import { DesktopHeader } from "@/components/desktop-header";
import { Intro } from "./01a";

// Figma 131:732 (mobile), 320:2153 (desktop). The check plays out step by step, as it runs for real:
// each part shows what we're reading, then lands as good / to fix / couldn't check, and the report opens at the end.

type Result = "good" | "fix" | "unknown";
type State = Result | "current" | "pending";

const CHECKS: { label: string; reading: string; result: Result; finding?: string; ms: number }[] = [
  { label: "Website", reading: "Opening fornorosso.com", result: "good", ms: 700 },
  { label: "Opening hours", reading: "Reading your hours for each day", result: "fix", finding: "No Sunday hours", ms: 900 },
  { label: "Contact details", reading: "Checking phone and address", result: "good", ms: 600 },
  { label: "Description", reading: "Comparing with 8 pizzerias nearby", result: "fix", finding: "Doesn’t mention delivery", ms: 1200 },
  { label: "Photos", reading: "Counting photos and their dates", result: "fix", finding: "Newest is 2 years old", ms: 900 },
  { label: "Reviews", reading: "Reading 212 reviews", result: "fix", finding: "12 without a reply", ms: 1300 },
  { label: "Services", reading: "Looking for your services list", result: "unknown", finding: "Not public. We’ll check after you connect", ms: 800 },
  { label: "Completeness", reading: "Adding it all up", result: "good", ms: 700 },
];
const HOLD_MS = 1100; // pause on the finished list before the report opens

const INTRO = {
  title: "Checking your profile",
  text: "About a minute. Your report opens on its own when it’s ready.",
};

/** Runs the check: `step` is the index being checked now (CHECKS.length once finished). Opens the report after. */
function useCheck() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (step >= CHECKS.length) {
      const t = setTimeout(() => router.replace("/onboarding/02b"), HOLD_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), CHECKS[step].ms);
    return () => clearTimeout(t);
  }, [step, router]);

  const state = (i: number): State => (i < step ? CHECKS[i].result : i === step ? "current" : "pending");
  const done = Math.min(step, CHECKS.length);
  const toFix = CHECKS.slice(0, done).filter((c) => c.result === "fix").length;
  return { step, state, done, toFix, finished: step >= CHECKS.length };
}

/** Path node (Figma 42:1730): a spinning ring while checking, then a dot that pops in with the result. */
function Node({ state, pendingRing = "border-secondary-200" }: { state: State; pendingRing?: string }) {
  if (state === "current")
    return <span className="block size-3 shrink-0 animate-spin rounded-full border-2 border-secondary-200 border-t-secondary-900" />;
  const look = {
    good: "size-2 bg-success-500 animate-pop-in",
    fix: "size-2 bg-error-500 animate-pop-in",
    unknown: `size-2 border-[1.4px] border-secondary-400 bg-white animate-pop-in`,
    pending: `size-2 border-[1.4px] ${pendingRing} bg-white`,
  }[state];
  return <span className={`block shrink-0 rounded-md ${look}`} />;
}

function Summary({ done, toFix, finished }: { done: number; toFix: number; finished: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <p className="t-headline flex-1 text-secondary-900 tabular-nums">
        {finished ? "All 8 checked" : `${done} of 8 checked`}
      </p>
      <p className="t-small text-secondary-700 tabular-nums">
        {finished ? "Opening your report…" : toFix ? `${toFix} to fix so far` : "Nothing to fix so far"}
      </p>
    </div>
  );
}

/** Label + what we're reading now, or the finding once it's in. */
function Row({ c, s }: { c: (typeof CHECKS)[number]; s: State }) {
  return (
    <span className="flex min-w-0 flex-1 flex-col">
      <span className={`t-body transition-colors duration-300 ${s === "pending" ? "text-secondary-600" : "text-secondary-900"}`}>
        {c.label}
      </span>
      <Collapse open={s === "current"}>
        <span className="t-small block animate-pulse pt-0.5 text-secondary-700">{c.reading}…</span>
      </Collapse>
      <Collapse open={(s === "fix" || s === "unknown") && !!c.finding}>
        <span className={`t-small block pt-0.5 ${s === "fix" ? "text-error-700" : "text-secondary-700"}`}>{c.finding}</span>
      </Collapse>
    </span>
  );
}

export function Mobile() {
  const { state, done, toFix, finished } = useCheck();
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <TopBar step={2} back="/onboarding/01c" />
      <main className="flex flex-1 flex-col gap-8 px-5 pt-2 pb-10">
        <Intro {...INTRO} />
        <div className="flex flex-col gap-4">
          <Summary done={done} toFix={toFix} finished={finished} />
          <ol>
            {CHECKS.map((c, i) => {
              const s = state(i);
              const first = i === 0;
              const last = i === CHECKS.length - 1;
              return (
                <li key={c.label} className="flex items-start gap-3">
                  {/* The connector darkens behind the check as it moves down the list. */}
                  <span className="flex w-4 shrink-0 flex-col items-center self-stretch" aria-hidden>
                    <span className={`h-[5px] w-0.5 ${first ? "" : i <= done ? "bg-secondary-900" : "bg-secondary-200"} transition-colors duration-500`} />
                    <Node state={s} />
                    {!last && (
                      <span className={`w-0.5 flex-1 transition-colors duration-500 ${i < done ? "bg-secondary-900" : "bg-secondary-200"}`} />
                    )}
                  </span>
                  <span className={`flex min-w-0 flex-1 ${last ? "" : "pb-3.5"}`}>
                    <Row c={c} s={s} />
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </main>
    </div>
  );
}

export function Desktop() {
  const { state, done, toFix, finished } = useCheck();
  return (
    <div className="flex min-h-dvh flex-col items-center bg-white">
      <DesktopHeader back="/onboarding/01c" step={2} />
      <main className="flex w-full flex-1 flex-col items-center px-10 pt-desk pb-desk">
        <div className="flex w-full max-w-[640px] flex-col">
          <div className="flex w-full flex-col gap-8">
            <Intro {...INTRO} />
            <div className="flex flex-col gap-3">
              <Summary done={done} toFix={toFix} finished={finished} />
              <div className="h-1 overflow-hidden rounded-sm bg-secondary-100">
                <div
                  className="h-1 rounded-sm bg-secondary-900 transition-[width] duration-700 ease-[cubic-bezier(0.2,0,0,1)]"
                  style={{ width: `${(done / CHECKS.length) * 100}%` }}
                />
              </div>
              <div className="h-1" />
              <ol className="grid grid-cols-2 gap-x-8">
                {CHECKS.map((c, i) => {
                  const s = state(i);
                  return (
                    <li key={c.label} className="flex items-start gap-3 border-b border-secondary-100 py-3.5">
                      <span className="flex h-[22px] w-4 shrink-0 items-center justify-center" aria-hidden>
                        <Node state={s} pendingRing="border-secondary-100" />
                      </span>
                      <Row c={c} s={s} />
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
