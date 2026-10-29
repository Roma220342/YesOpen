"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { PillButton } from "./module-card";
import { ReviewBlock, type ReviewReply } from "./task";

// Mobile bottom sheet for one review: the whole review and the whole reply, which the owner can change here.
// Opens from a task card, where both are cut to a few lines so the card keeps its height.
export function ReviewSheet({
  review,
  reply,
  onReply,
  action,
  onAction,
  onClose,
}: {
  review: ReviewReply;
  reply: string;
  onReply: (text: string) => void;
  /** Button label: "Approve reply" for a single-review task, "Done" when the card approves several at once. */
  action: string;
  onAction: () => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Portal to <body>: the screen's entrance animation transforms its ancestors, which would pin "fixed" to them.
  return createPortal(
    <div className="fixed inset-0 z-50 flex flex-col justify-end" role="dialog" aria-modal="true" aria-label={`Review from ${review.name}`}>
      <button type="button" aria-label="Close" onClick={onClose} className="animate-fade-in absolute inset-0 bg-secondary-900/40" />
      <div className="animate-sheet-in relative flex max-h-[90dvh] flex-col gap-5 overflow-y-auto rounded-t-3xl bg-white px-5 pt-3 pb-[max(34px,env(safe-area-inset-bottom))]">
        <span className="mx-auto h-[5px] w-9 shrink-0 rounded-full bg-secondary-200" aria-hidden />
        <div className="flex flex-col gap-4">
          <ReviewBlock review={review} />
          <label className="flex flex-col gap-1.5">
            <span className="t-caption text-secondary-700">Your reply</span>
            <textarea
              value={reply}
              onChange={(e) => onReply(e.target.value)}
              className="t-body resize-none rounded-2xl bg-secondary-50 p-4 text-secondary-900 outline-none [field-sizing:content] focus-visible:ring-2 focus-visible:ring-primary-500"
            />
            <span className="t-footnote text-secondary-700">Tap the text to change it.</span>
          </label>
        </div>
        <PillButton className="w-full shrink-0" onClick={onAction}>
          {action}
        </PillButton>
      </div>
    </div>,
    document.body,
  );
}
