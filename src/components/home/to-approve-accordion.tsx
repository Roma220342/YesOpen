"use client";

import { useState } from "react";
import { Collapse } from "@/components/collapse";
import { Icon } from "@/components/icon";
import { CountPill, LockedMore, PillButton, TextButton } from "./module-card";
import { doneLabel, ImpactChip, ReplyField, ReviewBlock, Stars, TaskFields, type Task } from "./task";

// Desktop "To approve" module: the open item splits into what/why (360px) and fields + button; others are 64px rows.
// Opening and closing animate height; approving turns the button green, then the item folds away and the next opens.
// The open item grows with its content: a review shows up to 4 lines, its reply in full.
export function ToApproveAccordion({
  tasks,
  title = "To approve",
  defaultOpen = 0,
  lockedMore,
}: {
  tasks: Task[];
  title?: string;
  defaultOpen?: number;
  /** Tasks that exist but stay hidden until the trial (10c). */
  lockedMore?: { count: number; href: string };
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [settled, setSettled] = useState<Record<string, string>>({}); // button shows the done state
  const [gone, setGone] = useState<string[]>([]); // item folded away

  const left = tasks.filter((t) => !gone.includes(t.title));

  const settle = (t: Task, label: string) => {
    setSettled((s) => ({ ...s, [t.title]: label }));
    setTimeout(() => {
      setGone((g) => [...g, t.title]);
      const next = tasks.findIndex((x) => x.title !== t.title && !gone.includes(x.title));
      setOpen(next);
    }, 700);
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
          <Collapse key={t.title} open={!gone.includes(t.title)}>
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
                    onClick={() => setOpen(i)}
                    className="flex h-16 w-full items-center gap-4 px-5 text-left"
                  >
                    <Icon name="chevron" size={20} rotate={-90} className="shrink-0 text-secondary-900" />
                    <span className="t-headline w-[348px] shrink-0 truncate text-secondary-900">{t.title}</span>
                    <span className="flex min-w-0 flex-1 items-center gap-2">
                      {one && <Stars stars={one.stars} />}
                      <span className="t-body min-w-0 truncate text-secondary-600">{t.why}</span>
                    </span>
                    <ImpactChip impact={t.impact} />
                  </button>
                </Collapse>

                {/* Open item */}
                <Collapse open={isOpen}>
                  <div className="flex items-start gap-10 p-5">
                    <div className="flex w-[360px] shrink-0 flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => setOpen(-1)}
                        className="flex items-center gap-2 text-left text-secondary-900"
                      >
                        <Icon name="chevron" size={20} className="shrink-0" />
                        <h3 className="t-title flex-1">{t.title}</h3>
                      </button>
                      <p className="t-body pl-7 text-secondary-600">{t.why}</p>
                      {t.impact ? (
                        <div className="pl-7">
                          <ImpactChip impact={t.impact} />
                        </div>
                      ) : null}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-6">
                      {t.fields?.length ? <TaskFields fields={t.fields} hint={t.hint} className="gap-4" /> : null}
                      {t.reviews?.map((r) => (
                        <div key={r.name} className="flex flex-col gap-4">
                          <ReviewBlock review={r} clamp={4} />
                          <ReplyField reply={r.reply} hint={t.reviews!.length === 1} />
                        </div>
                      ))}
                      <div className="flex justify-end gap-2">
                        {t.alt && !settled[t.title] && (
                          <TextButton onClick={() => settle(t, t.alt!.done)}>
                            {t.alt.label}
                          </TextButton>
                        )}
                        <PillButton
                          done={!!settled[t.title]}
                          href={t.href}
                          onClick={() => settle(t, doneLabel(t.desktopAction ?? t.action))}
                        >
                          {settled[t.title] ?? t.desktopAction ?? t.action}
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
          <Icon name="check" size={20} className="shrink-0 text-success-600" />
          <p className="t-headline text-secondary-900">All done. We’ll send these to Google.</p>
        </div>
      </Collapse>
    </section>
  );
}
