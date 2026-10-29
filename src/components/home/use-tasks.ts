"use client";

import { useState } from "react";
import type { Task } from "./task";
import { useSkip } from "./use-skip";

/**
 * To approve state shared by the mobile carousel and the desktop accordion: which tasks were approved or skipped,
 * and the replies the owner changed. Replies are keyed "task title:review index".
 */
export function useTasks(all: Task[], startSkipped?: string) {
  const skips = useSkip(startSkipped);
  const [approved, setApproved] = useState<string[]>([]);
  const [edits, setEdits] = useState<Record<string, string>>({});

  const away = (t: Task) => approved.includes(t.title) || skips.hidden.includes(t.title);

  return {
    skips,
    away,
    /** Tasks still waiting, in order. */
    left: all.filter((t) => !away(t)),
    approve: (t: Task) => setApproved((a) => [...a, t.title]),
    replyOf: (t: Task, ri: number) => edits[`${t.title}:${ri}`] ?? t.reviews![ri].reply,
    setReply: (key: string, text: string) => setEdits((e) => ({ ...e, [key]: text })),
    /** Drops the owner's change, back to the drafted reply. */
    dropReply: (key: string) =>
      setEdits((e) => {
        const next = { ...e };
        delete next[key];
        return next;
      }),
  };
}
