"use client";

import { useRef, useState } from "react";
import { CountPill, PillButton } from "./module-card";
import { TaskFields, type Task } from "./task";

// Mobile "To approve" module: horizontally scrolling task cards, segment progress below.
// The active card snaps to the centre; the previous and next cards peek out by the same amount on each side.
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

  // Card i is centred when the track is scrolled to its left edge minus the side padding.
  const centreOf = (i: number) => {
    const card = track.current?.children[i] as HTMLElement | undefined;
    return card ? card.offsetLeft - (track.current!.clientWidth - card.clientWidth) / 2 : 0;
  };

  // Approve: button turns green with a check, then the row glides to the next card.
  const approve = (t: Task, i: number) => {
    setApproved((a) => [...a, t.title]);
    if (i < tasks.length - 1) setTimeout(() => track.current?.scrollTo({ left: centreOf(i + 1), behavior: "smooth" }), 600);
  };

  const onScroll = () => {
    const x = track.current?.scrollLeft ?? 0;
    let best = 0;
    tasks.forEach((_, i) => {
      if (Math.abs(centreOf(i) - x) < Math.abs(centreOf(best) - x)) best = i;
    });
    setIndex(best);
  };

  return (
    <section className="flex flex-col gap-4 overflow-hidden rounded-3xl bg-white py-5">
      <div className="flex items-center gap-2 px-5">
        <h2 className="t-headline text-secondary-900">{title}</h2>
        <CountPill>{tasks.length - approved.length}</CountPill>
      </div>

      <div
        ref={track}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-8"
        onScroll={onScroll}
      >
        {tasks.map((t, i) => (
          <article
            key={t.title}
            className="flex w-full shrink-0 snap-center snap-always flex-col gap-4 overflow-hidden rounded-2xl border border-secondary-200 p-4"
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
