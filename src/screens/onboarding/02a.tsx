"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/ui";
import { DesktopBack, DesktopHeader, Intro } from "./01a";

// Figma 131:732 (mobile), 320:2153 (desktop)

type State = "good" | "fix" | "current" | "pending";

const CHECKS: { label: string; state: State }[] = [
  { label: "Website", state: "good" },
  { label: "Opening hours", state: "fix" },
  { label: "Contact details", state: "good" },
  { label: "Description", state: "fix" },
  { label: "Photos", state: "fix" },
  { label: "Reviews", state: "current" },
  { label: "Services", state: "pending" },
  { label: "Completeness", state: "pending" },
];

const INTRO = {
  title: "Checking your profile",
  text: "About a minute. Your report opens on its own when it’s ready.",
};

/** Path node (Figma 42:1730). Pending ring is Secondary/200 on mobile, Secondary/100 on desktop. */
function Node({ state, pendingRing = "border-secondary-200" }: { state: State; pendingRing?: string }) {
  const look = {
    good: "size-2 bg-success-500",
    fix: "size-2 bg-error-500",
    current: "size-3 border-2 border-secondary-900 bg-white",
    pending: `size-2 border-[1.4px] ${pendingRing} bg-white`,
  }[state];
  return <span className={`block shrink-0 rounded-md ${look}`} />;
}

/** Opens the report when the check finishes. */
function useOpenReport() {
  const router = useRouter();
  useEffect(() => {
    const t = setTimeout(() => router.replace("/onboarding/02b"), 6000);
    return () => clearTimeout(t);
  }, [router]);
}

export function Mobile() {
  useOpenReport();
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <TopBar step={2} back="/onboarding/01c" />
      <main className="flex flex-1 flex-col gap-8 px-5 pt-4 pb-[104px]">
        <Intro {...INTRO} />
        <div className="flex flex-col">
          <div className="flex items-center gap-2 pb-4">
            <p className="t-headline flex-1 text-secondary-900">5 of 8 checked</p>
            <p className="t-footnote text-secondary-700">3 to fix so far</p>
          </div>
          <ol>
            {CHECKS.map((c, i) => {
              const first = i === 0;
              const last = i === CHECKS.length - 1;
              return (
                <li key={c.label} className="flex items-start gap-3">
                  <span className="flex w-4 shrink-0 flex-col items-center self-stretch" aria-hidden>
                    <span className={`h-[5px] w-0.5 ${first ? "" : "bg-secondary-200"}`} />
                    <Node state={c.state} />
                    {!last && <span className="w-0.5 flex-1 bg-secondary-200" />}
                  </span>
                  <span className={`flex min-w-0 flex-1 items-center gap-2 ${last ? "" : "pb-3.5"}`}>
                    <span className={`t-body flex-1 ${c.state === "pending" ? "text-secondary-700" : "text-secondary-900"}`}>
                      {c.label}
                    </span>
                    {c.state === "current" && <span className="t-footnote text-secondary-700">Checking…</span>}
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
  useOpenReport();
  return (
    <div className="flex min-h-dvh flex-col items-center bg-white">
      <DesktopHeader step={2} />
      <main className="flex w-full flex-1 flex-col items-center px-10 pt-[50px] pb-20">
        <div className="flex w-full max-w-[640px] flex-col gap-6">
          <DesktopBack href="/onboarding/01c" />
          <div className="flex w-full flex-col gap-8">
            <Intro {...INTRO} />
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <p className="t-headline flex-1 text-secondary-900">5 of 8 checked</p>
                <p className="t-small text-secondary-700">3 to fix so far</p>
              </div>
              <div className="h-1 overflow-hidden rounded-sm bg-secondary-100">
                <div className="h-1 w-[62.5%] rounded-sm bg-secondary-900" />
              </div>
              <div className="h-1" />
              <ol className="grid grid-cols-2 gap-x-8">
                {CHECKS.map((c) => (
                  <li key={c.label} className="flex items-center gap-3 border-b border-secondary-100 py-3.5">
                    <span className="flex w-4 shrink-0 justify-center" aria-hidden>
                      <Node state={c.state} pendingRing="border-secondary-100" />
                    </span>
                    <span className="flex min-w-0 flex-1 items-center gap-2">
                      <span className={`t-body flex-1 ${c.state === "pending" ? "text-secondary-700" : "text-secondary-900"}`}>
                        {c.label}
                      </span>
                      {c.state === "current" && <span className="t-small text-secondary-700">Checking…</span>}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
