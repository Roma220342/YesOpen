"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icon";
import { CountPill, LockedMore, PillButton, TextButton } from "./module-card";
import { ReviewSheet } from "./review-sheet";
import { SkipSheet } from "./skip";
import { Toast } from "./toast";
import { ImpactChip, ReplyField, ReviewBlock, TaskFields, type Task } from "./task";
import { useTasks } from "./use-tasks";

// Every task card has this height on every Home state, so cards never change size between states.
// Review cards fit it by rule: title 1 line, why 1 line, review 2 lines, reply 2 lines + the "Tap the text" hint
// and the Skip button; tapping the reply opens the sheet, where it is edited in full.
const CARD_HEIGHT = 504;
// Length of the approve exit; matches --animate-card-out in globals.css.
const CARD_OUT_MS = 280;

// Mobile "To approve" module: horizontally scrolling task cards, segment progress below.
// The active card snaps to the centre; the previous and next cards peek out by the same amount on each side.
export function ToApproveCarousel({
  tasks: all,
  title = "To approve",
  lockedMore,
  startEditing,
  startSkipChoice,
  startSkipped,
}: {
  tasks: Task[];
  title?: string;
  /** Tasks that exist but stay hidden until the trial (10c). */
  lockedMore?: { count: number; href: string };
  /** Opens the first review's reply in the edit sheet on arrival (10e). */
  startEditing?: boolean;
  /** Opens the Skip choice for the first task on arrival (10f). */
  startSkipChoice?: boolean;
  /** Arrives with the first task just skipped and the Undo toast up (10g). */
  startSkipped?: boolean;
}) {
  // Approved and skipped tasks leave the row; everything below works on what is still there.
  const { skips, away, left: tasks, approve, replyOf, setReply, dropReply } = useTasks(all, startSkipped ? all[0]?.title : undefined);

  const [index, setIndex] = useState(0);
  const [sheet, setSheet] = useState<{ task: number; review: number } | null>(startEditing ? { task: 0, review: 0 } : null);
  const [skipFor, setSkipFor] = useState<string | null>(startSkipChoice ? all[0]?.title : null);
  const track = useRef<HTMLDivElement>(null);

  // Pending glides and exits, cleared if Home unmounts before they fire.
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const later = (fn: () => void, ms: number) => timers.current.push(setTimeout(fn, ms));
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Card i is centred when the track is scrolled to its left edge minus the side padding.
  const centreOf = (i: number) => {
    const card = track.current?.children[i] as HTMLElement | undefined;
    return card ? card.offsetLeft - (track.current!.clientWidth - card.clientWidth) / 2 : 0;
  };
  const glideTo = (i: number, delay = 0) => later(() => track.current?.scrollTo({ left: centreOf(i), behavior: "smooth" }), delay);

  // Approve: the card lifts away (card-out), then leaves the row and the next one glides in. No Undo: it is sent.
  const [leaving, setLeaving] = useState<string | null>(null);
  const settle = (t: Task, i: number) => {
    if (leaving) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setLeaving(t.title);
    later(() => {
      approve(t);
      setLeaving(null);
      glideTo(Math.min(i, tasks.length - 2), 60);
    }, reduce ? 0 : CARD_OUT_MS);
  };

  // Skip: the card leaves at once and the next one slides in; Undo brings it back where it was.
  const skip = (t: Task, i: number, choice: Parameters<typeof skips.skip>[1]) => {
    skips.skip(t.title, choice);
    setSkipFor(null);
    glideTo(Math.min(i, tasks.length - 2), 60);
  };
  const undoSkip = () => {
    const back = skips.undo();
    const at = all.filter((t) => !away(t) || t.title === back).findIndex((t) => t.title === back);
    if (at >= 0) glideTo(at, 80);
  };

  // The centred card, measured once per frame rather than on every scroll event.
  const frame = useRef(0);
  const onScroll = () => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const x = track.current?.scrollLeft ?? 0;
      const gaps = tasks.map((_, i) => Math.abs(centreOf(i) - x));
      setIndex(gaps.indexOf(Math.min(...gaps)));
    });
  };

  const open = sheet && tasks[sheet.task];
  const skipping = skipFor ? tasks.findIndex((t) => t.title === skipFor) : -1;

  return (
    <section id="to-approve" className="flex scroll-mt-4 flex-col gap-4 overflow-hidden rounded-3xl bg-white py-5">
      <div className="flex items-center gap-2 px-5">
        <h2 className="t-headline text-secondary-900">{title}</h2>
        <CountPill>{tasks.length + (lockedMore?.count ?? 0)}</CountPill>
      </div>

      <p className="sr-only" aria-live="polite">
        {tasks.length > 0 && `Task ${Math.min(index, tasks.length - 1) + 1} of ${tasks.length}`}
      </p>
      <div
        ref={track}
        role="region"
        aria-roledescription="carousel"
        aria-label="Tasks to approve"
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-8"
        onScroll={onScroll}
      >
        {tasks.map((t, i) => {
          const one = t.reviews?.length === 1;
          return (
            <article
              key={t.title}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${tasks.length}: ${t.title}`}
              className={`flex w-full shrink-0 snap-center snap-always flex-col gap-4 overflow-hidden rounded-2xl border border-secondary-200 p-4 ${
                leaving === t.title ? "animate-card-out pointer-events-none" : ""
              }`}
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
                      <ReviewBlock review={t.reviews![0]} clamp={2} />
                    </button>
                    <button type="button" className="text-left" onClick={() => setSheet({ task: i, review: 0 })}>
                      <ReplyField reply={replyOf(t, 0)} clamp={2} hint />
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
                    <p className="t-footnote text-secondary-700">Tap a review to read or change its reply.</p>
                  </>
                )}
              </div>
              <div className="flex flex-col gap-1">
                {t.alt && (
                  <TextButton className="w-full" onClick={() => settle(t, i)}>
                    {t.alt.label}
                  </TextButton>
                )}
                {t.skip && (
                  <TextButton className="w-full" onClick={() => setSkipFor(t.title)}>
                    Skip
                  </TextButton>
                )}
                <PillButton className="w-full" href={t.href} onClick={() => settle(t, i)}>
                  {t.action}
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

      {tasks.length === 0 && !lockedMore && (
        <div className="mx-5 flex items-center gap-3 rounded-2xl bg-success-50 p-4">
          <Icon name="check" className="shrink-0 text-success-600" />
          <p className="t-headline text-secondary-900">All done. We’ll send these to Google.</p>
        </div>
      )}

      {lockedMore && <LockedMore {...lockedMore} className="mx-5" />}

      {open && sheet && (
        <ReviewSheet
          review={open.reviews![sheet.review]}
          reply={replyOf(open, sheet.review)}
          onReply={(text) => setReply(`${open.title}:${sheet.review}`, text)}
          action={open.reviews!.length === 1 ? open.action : "Done"}
          onAction={() => {
            if (open.reviews!.length === 1) settle(open, sheet.task);
            setSheet(null);
          }}
          onDiscard={() => {
            dropReply(`${open.title}:${sheet.review}`);
            setSheet(null);
          }}
          onClose={() => setSheet(null)}
        />
      )}

      {skipFor && (
        <SkipSheet
          onChoose={(c) => skip(tasks[skipping] ?? all.find((t) => t.title === skipFor)!, Math.max(skipping, 0), c)}
          onClose={() => setSkipFor(null)}
        />
      )}

      {skips.toast && <Toast message={skips.toast.message} onUndo={undoSkip} onClose={skips.closeToast} />}
    </section>
  );
}
