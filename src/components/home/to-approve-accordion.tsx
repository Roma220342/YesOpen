"use client";

import { useState } from "react";
import { Collapse } from "@/components/collapse";
import { Icon } from "@/components/icon";
import { CountPill, PillButton } from "./module-card";
import { TaskFields, type Task } from "./task";

const doneLabel = (action: string) => (/^approve/i.test(action) ? "Approved" : "Done");

// Desktop "To approve" module: the open item splits into what/why (360px) and fields + button; others are 64px rows.
// Opening and closing animate height; approving turns the button green, then the item folds away and the next opens.
export function ToApproveAccordion({
  tasks,
  title = "To approve",
  defaultOpen = 0,
}: {
  tasks: Task[];
  title?: string;
  defaultOpen?: number;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [approved, setApproved] = useState<string[]>([]); // button shows the done state
  const [gone, setGone] = useState<string[]>([]); // item folded away

  const left = tasks.filter((t) => !gone.includes(t.title));

  const approve = (t: Task) => {
    setApproved((a) => [...a, t.title]);
    setTimeout(() => {
      setGone((g) => [...g, t.title]);
      const next = tasks.findIndex((x) => x.title !== t.title && !gone.includes(x.title));
      setOpen(next);
    }, 700);
  };

  return (
    <section className="flex flex-col rounded-3xl bg-white p-5">
      <div className="flex items-center gap-2 pb-4">
        <h2 className="t-headline text-secondary-900">{title}</h2>
        <CountPill>{left.length}</CountPill>
      </div>

      {tasks.map((t, i) => {
        const isOpen = i === open;
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
                    <span className="t-headline w-[348px] shrink-0 text-secondary-900">{t.title}</span>
                    <span className="t-body min-w-0 flex-1 text-secondary-600">{t.summary}</span>
                    {t.locked && <Icon name="lock" size={20} className="shrink-0 text-secondary-600" />}
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
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-6">
                      {t.fields?.length ? <TaskFields fields={t.fields} hint={t.hint} className="gap-4" /> : null}
                      <div className="flex justify-end">
                        <PillButton
                          size="l"
                          className="w-[220px]"
                          done={approved.includes(t.title)}
                          onClick={t.locked ? undefined : () => approve(t)}
                        >
                          {approved.includes(t.title)
                            ? doneLabel(t.desktopAction ?? t.action)
                            : (t.desktopAction ?? t.action)}
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

      <Collapse open={left.length === 0}>
        <div className="flex items-center gap-3 rounded-2xl bg-success-50 p-4">
          <Icon name="check" size={20} className="shrink-0 text-success-600" />
          <p className="t-headline text-secondary-900">All done. We’ll send these to Google.</p>
        </div>
      </Collapse>
    </section>
  );
}
