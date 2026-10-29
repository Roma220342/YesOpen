"use client";

import { useState } from "react";
import { Collapse } from "@/components/collapse";
import { Icon } from "@/components/icon";
import { CountPill, LockedMore, PillButton, TextButton } from "./module-card";
import { ReplyEditor } from "./reply-editor";
import { SkipMenu } from "./skip";
import { Toast } from "./toast";
import { ImpactChip, ReplyField, ReviewBlock, Stars, TaskFields, type Task } from "./task";
import { useTasks } from "./use-tasks";

// Desktop "To approve" module: the open item splits into what/why (360px) and fields + button; others are 64px rows.
// Opening and closing animate height; approving folds the item away and opens the next.
// The open item grows with its content: a review shows up to 4 lines, its reply in full.
// Tapping a reply edits it in place (blue border, counter, Reset to suggestion) and the row gets Discard + Approve.
// "Skip ▾" opens Not now / Don’t suggest again; the item folds away, the next opens, and the toast offers Undo.
export function ToApproveAccordion({
  tasks,
  title = "To approve",
  defaultOpen = 0,
  lockedMore,
  startEditing,
  startSkipChoice,
  startSkipped,
}: {
  tasks: Task[];
  title?: string;
  defaultOpen?: number;
  /** Tasks that exist but stay hidden until the trial (10c). */
  lockedMore?: { count: number; href: string };
  /** Opens the first review's reply for editing on arrival (10e). */
  startEditing?: boolean;
  /** Opens the Skip choice on the first task on arrival (10f). */
  startSkipChoice?: boolean;
  /** Arrives with the first task just skipped and the Undo toast up (10g). */
  startSkipped?: boolean;
}) {
  const { skips, away, left, approve, replyOf, setReply, dropReply } = useTasks(tasks, startSkipped ? tasks[0]?.title : undefined);
  const [open, setOpen] = useState(startSkipped ? 1 : defaultOpen);
  // "Task title:review index" of the reply being edited.
  const [editing, setEditing] = useState<string | null>(startEditing ? `${tasks[defaultOpen]?.title}:0` : null);

  // Skip: the item folds away like an approved one and the next opens; Undo puts it back and opens it.
  const skip = (t: Task, choice: Parameters<typeof skips.skip>[1]) => {
    skips.skip(t.title, choice);
    setEditing(null);
    setOpen(tasks.findIndex((x) => x.title !== t.title && !away(x)));
  };
  const undoSkip = () => {
    const back = skips.undo();
    const i = tasks.findIndex((t) => t.title === back);
    if (i >= 0) setOpen(i);
  };

  // Approve: the item folds away at once and the next one opens.
  const settle = (t: Task) => {
    setEditing(null);
    approve(t);
    setOpen(tasks.findIndex((x) => x.title !== t.title && !away(x)));
  };

  return (
    <section id="to-approve" className="flex scroll-mt-8 flex-col rounded-3xl bg-white p-5">
      <div className="flex items-center gap-2 pb-4">
        <h2 className="t-headline text-secondary-900">{title}</h2>
        <CountPill>{left.length + (lockedMore?.count ?? 0)}</CountPill>
      </div>

      {tasks.map((t, i) => {
        const isOpen = i === open;
        const one = t.reviews?.length === 1 ? t.reviews[0] : undefined;
        return (
          <Collapse key={t.title} open={!away(t)}>
            <div className="pb-3">
              <div
                className={`rounded-2xl border transition-colors duration-300 ${
                  isOpen ? "border-secondary-200" : "border-secondary-200 hover:bg-secondary-50"
                }`}
              >
                {/* Closed row */}
                <Collapse open={!isOpen}>
                  <button
                    type="button"
                    aria-expanded={false}
                    aria-controls={`task-${i}`}
                    onClick={() => setOpen(i)}
                    className="flex h-16 w-full items-center gap-4 rounded-2xl px-5 text-left"
                  >
                    <Icon name="chevron" rotate={-90} className="shrink-0 text-secondary-900" />
                    {/* 348px at 1440 (Figma); narrower desktops give the summary its share instead of squeezing it. */}
                    <span className="t-headline w-[min(348px,34%)] shrink-0 truncate text-secondary-900">{t.title}</span>
                    <span className="flex min-w-0 flex-1 items-center gap-2">
                      {one && <Stars stars={one.stars} />}
                      <span className="t-body min-w-0 truncate text-secondary-600">{t.why}</span>
                    </span>
                    <ImpactChip impact={t.impact} />
                  </button>
                </Collapse>

                {/* Open item */}
                <Collapse open={isOpen}>
                  <div id={`task-${i}`} className="flex items-start gap-10 p-5">
                    <div className="flex w-[min(360px,35%)] shrink-0 flex-col gap-2">
                      <h3 className="t-title text-secondary-900">
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={`task-${i}`}
                          onClick={() => setOpen(-1)}
                          className="flex w-full items-center gap-2 rounded-lg text-left"
                        >
                          <Icon name="chevron" className="shrink-0" />
                          <span className="flex-1">{t.title}</span>
                        </button>
                      </h3>
                      <p className="t-body pl-7 text-secondary-600">{t.why}</p>
                      {t.impact ? (
                        <div className="pl-7">
                          <ImpactChip impact={t.impact} />
                        </div>
                      ) : null}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-6">
                      {t.fields?.length ? <TaskFields fields={t.fields} hint={t.hint} className="gap-4" /> : null}
                      {t.reviews?.map((r, ri) => {
                        const key = `${t.title}:${ri}`;
                        return (
                          <div key={r.name} className="flex flex-col gap-4">
                            <ReviewBlock review={r} clamp={4} />
                            {editing === key ? (
                              <ReplyEditor
                                id={`reply-${key}`}
                                value={replyOf(t, ri)}
                                onChange={(text) => setReply(key, text)}
                                onReset={() => dropReply(key)}
                              />
                            ) : (
                              <button type="button" className="text-left" onClick={() => setEditing(key)}>
                                <ReplyField reply={replyOf(t, ri)} hint />
                              </button>
                            )}
                          </div>
                        );
                      })}
                      <div className="flex justify-end gap-2">
                        {editing?.startsWith(`${t.title}:`) && (
                          <TextButton
                            onClick={() => {
                              dropReply(editing);
                              setEditing(null);
                            }}
                          >
                            Discard
                          </TextButton>
                        )}
                        {t.skip && !editing?.startsWith(`${t.title}:`) && (
                          <SkipMenu defaultOpen={startSkipChoice && i === 0} onChoose={(c) => skip(t, c)} />
                        )}
                        {t.alt && (
                          <TextButton onClick={() => settle(t)}>
                            {t.alt.label}
                          </TextButton>
                        )}
                        <PillButton href={t.href} onClick={() => settle(t)}>
                          {t.desktopAction ?? t.action}
                        </PillButton>
                      </div>
                    </div>
                  </div>
                </Collapse>
              </div>
            </div>
          </Collapse>
        );
      })}

      {lockedMore && <LockedMore {...lockedMore} />}

      <Collapse open={left.length === 0}>
        <div className="flex items-center gap-3 rounded-2xl bg-success-50 p-4">
          <Icon name="check" className="shrink-0 text-success-600" />
          <p className="t-headline text-secondary-900">All done. We’ll send these to Google.</p>
        </div>
      </Collapse>
      {skips.toast && <Toast desktop message={skips.toast.message} onUndo={undoSkip} onClose={skips.closeToast} />}
    </section>
  );
}
