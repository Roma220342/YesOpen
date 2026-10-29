"use client";

import { useRef, useState } from "react";
import { CountPill, PillButton } from "./module-card";
import { TaskFields, type Task } from "./task";

const CARD_W = 281;
const GAP = 12;

// Mobile "To approve" module: horizontally scrolling task cards (next card peeks), segment progress below.
export function ToApproveCarousel({
  tasks,
  cardHeight,
  title = "To approve",
}: {
  tasks: Task[];
  /** Fixed card height from Figma so all cards line up (489 in 10a, 497 in 10a2). */
  cardHeight: number;
  title?: string;
}) {
  const [index, setIndex] = useState(0);
  const [approved, setApproved] = useState<string[]>([]);
  const track = useRef<HTMLDivElement>(null);

  // Approve: button turns green with a check, then the row glides to the next card.
  const approve = (t: Task, i: number) => {
    setApproved((a) => [...a, t.title]);
    if (i < tasks.length - 1)
      setTimeout(() => track.current?.scrollTo({ left: (i + 1) * (CARD_W + GAP), behavior: "smooth" }), 600);
  };

  return (
    <section className="flex flex-col gap-4 overflow-hidden rounded-3xl bg-white py-5">
      <div className="flex items-center gap-2 px-5">
        <h2 className="t-headline text-secondary-900">{title}</h2>
        <CountPill>{tasks.length - approved.length}</CountPill>
      </div>

      <div
        ref={track}
        className="flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onScroll={(e) => setIndex(Math.min(tasks.length - 1, Math.round(e.currentTarget.scrollLeft / (CARD_W + GAP))))}
      >
        {tasks.map((t, i) => (
          <article
            key={t.title}
            className="flex w-[281px] shrink-0 snap-start flex-col gap-4 overflow-hidden rounded-2xl border border-secondary-200 p-4"
            style={{ height: cardHeight }}
          >
            <div className="flex min-h-0 flex-1 flex-col gap-3">
              <div className="flex flex-col gap-1">
                <h3 className="t-headline text-secondary-900">{t.title}</h3>
                <p className="t-footnote text-secondary-700">{t.why}</p>
              </div>
              {t.fields?.length ? <TaskFields fields={t.fields} hint={t.hint} /> : null}
            </div>
            <PillButton
              className="w-full"
              done={approved.includes(t.title)}
              onClick={t.locked ? undefined : () => approve(t, i)}
            >
              {approved.includes(t.title) ? (/^approve/i.test(t.action) ? "Approved" : "Done") : t.action}
            </PillButton>
          </article>
        ))}
      </div>

      <div className="flex justify-center gap-1" aria-hidden>
        {tasks.map((t, i) => (
          <span key={t.title} className={`h-1 w-5 rounded-sm transition-colors duration-300 ${i === index ? "bg-secondary-900" : "bg-secondary-100"}`} />
        ))}
      </div>
    </section>
  );
}
