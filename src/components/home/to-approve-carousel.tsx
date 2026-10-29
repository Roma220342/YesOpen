"use client";

import { useRef, useState } from "react";
import { Collapse } from "@/components/collapse";
import { CountPill, LockedMore, PillButton, TextButton } from "./module-card";
import { ReviewSheet } from "./review-sheet";
import { doneLabel, ImpactChip, ReplyField, ReviewBlock, TaskFields, type Task } from "./task";

// Every task card has this height on every Home state, so cards never change size between states.
// Review cards fit it by rule: title 1 line, why 1 line, review 3 lines, reply 4 lines; the sheet shows the rest.
const CARD_HEIGHT = 504;

// Mobile "To approve" module: horizontally scrolling task cards, segment progress below.
// The active card snaps to the centre; the previous and next cards peek out by the same amount on each side.
export function ToApproveCarousel({
  tasks,
  title = "To approve",
  lockedMore,
}: {
  tasks: Task[];
  title?: string;
  /** Tasks that exist but stay hidden until the trial (10c). */
  lockedMore?: { count: number; href: string };
}) {
  const [index, setIndex] = useState(0);
  // Task title → label the settled button shows ("Approved", "Kept as closed").
  const [settled, setSettled] = useState<Record<string, string>>({});
  // "Task title:review index" → reply the owner changed in the sheet.
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [sheet, setSheet] = useState<{ task: number; review: number } | null>(null);
  const track = useRef<HTMLDivElement>(null);

  const replyOf = (t: Task, r: number) => edits[`${t.title}:${r}`] ?? t.reviews![r].reply;

  // Card i is centred when the track is scrolled to its left edge minus the side padding.
  const centreOf = (i: number) => {
    const card = track.current?.children[i] as HTMLElement | undefined;
    return card ? card.offsetLeft - (track.current!.clientWidth - card.clientWidth) / 2 : 0;
  };

  // Approve: button turns green with a check, then the row glides to the next card.
  const settle = (t: Task, i: number, label: string) => {
    setSettled((s) => ({ ...s, [t.title]: label }));
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

  const open = sheet && tasks[sheet.task];

  return (
    <section id="to-approve" className="flex scroll-mt-4 flex-col gap-4 overflow-hidden rounded-3xl bg-white py-5">
      <div className="flex items-center gap-2 px-5">
        <h2 className="t-headline text-secondary-900">{title}</h2>
        <CountPill>{tasks.length - Object.keys(settled).length + (lockedMore?.count ?? 0)}</CountPill>
      </div>

      <div
        ref={track}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-8"
        onScroll={onScroll}
      >
        {tasks.map((t, i) => {
          const one = t.reviews?.length === 1;
          return (
            <article
              key={t.title}
              className="flex w-full shrink-0 snap-center snap-always flex-col gap-4 overflow-hidden rounded-2xl border border-secondary-200 p-4"
              style={{ height: CARD_HEIGHT }}
            >
              <div className={`flex min-h-0 flex-1 flex-col ${t.reviews ? "gap-2.5" : "gap-3"}`}>
                <div className={`flex flex-col ${t.reviews ? "gap-1" : "gap-2"}`}>
                  <h3 className="t-headline line-clamp-1 text-secondary-900">{t.title}</h3>
                  <p className="t-small text-secondary-700">{t.why}</p>
                  <ImpactChip impact={t.impact} />
                </div>
                {t.fields?.length ? <TaskFields fields={t.fields} hint={t.hint} /> : null}
                {one && (
                  <>
                    <button type="button" className="text-left" onClick={() => setSheet({ task: i, review: 0 })}>
                      <ReviewBlock review={t.reviews![0]} clamp={3} />
                    </button>
                    <button type="button" className="text-left" onClick={() => setSheet({ task: i, review: 0 })}>
                      <ReplyField reply={replyOf(t, 0)} clamp={4} />
                    </button>
                  </>
                )}
                {t.reviews && !one && (
                  <>
                    {t.reviews.map((r, ri) => (
                      <button key={r.name} type="button" className="text-left" onClick={() => setSheet({ task: i, review: ri })}>
                        <ReviewBlock review={r} clamp={2} />
                      </button>
                    ))}
                    <p className="t-footnote text-secondary-700">Tap a review to read its reply.</p>
                  </>
                )}
              </div>
              <div className="flex flex-col gap-1">
                {t.alt && (
                  <Collapse open={!settled[t.title]}>
                    <TextButton className="w-full" onClick={() => settle(t, i, t.alt!.done)}>
                      {t.alt.label}
                    </TextButton>
                  </Collapse>
                )}
                <PillButton
                  className="w-full"
                  done={!!settled[t.title]}
                  href={t.href}
                  onClick={() => settle(t, i, doneLabel(t.action))}
                >
                  {settled[t.title] ?? t.action}
                </PillButton>
              </div>
            </article>
          );
        })}
      </div>

      {tasks.length > 1 && (
        <div className="flex justify-center gap-1" aria-hidden>
          {tasks.map((t, i) => (
            <span key={t.title} className={`h-1 w-5 rounded-sm transition-colors duration-300 ${i === index ? "bg-secondary-900" : "bg-secondary-100"}`} />
          ))}
        </div>
      )}

      {lockedMore && <LockedMore {...lockedMore} className="mx-5" />}

      {open && sheet && (
        <ReviewSheet
          review={open.reviews![sheet.review]}
          reply={replyOf(open, sheet.review)}
          onReply={(text) => setEdits((e) => ({ ...e, [`${open.title}:${sheet.review}`]: text }))}
          action={open.reviews!.length === 1 && !settled[open.title] ? open.action : "Done"}
          onAction={() => {
            if (open.reviews!.length === 1 && !settled[open.title]) settle(open, sheet.task, doneLabel(open.action));
            setSheet(null);
          }}
          onClose={() => setSheet(null)}
        />
      )}
    </section>
  );
}
