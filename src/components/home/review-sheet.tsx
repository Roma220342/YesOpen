"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { PillButton, TextButton } from "./module-card";
import { ReplyEditor } from "./reply-editor";
import { ReviewBlock, type ReviewReply } from "./task";

// Mobile bottom sheet for one review: the whole review and the reply in edit mode. It opens when the owner
// taps the reply on a task card, where the text is cut to a few lines so the card keeps its height.
// Discard drops the changes and closes; the primary button approves (one review) or keeps the edit (several).
export function ReviewSheet({
  review,
  reply,
  onReply,
  action,
  onAction,
  onDiscard,
  onClose,
}: {
  review: ReviewReply;
  reply: string;
  onReply: (text: string) => void;
  /** Primary button label: "Approve reply" for a single-review task, "Done" when the card approves several at once. */
  action: string;
  onAction: () => void;
  onDiscard: () => void;
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
      <div className="animate-sheet-in relative flex max-h-[90dvh] flex-col gap-4 overflow-y-auto rounded-t-3xl bg-white px-5 pt-3 pb-[max(20px,env(safe-area-inset-bottom))]">
        <span className="mx-auto h-[5px] w-9 shrink-0 rounded-full bg-secondary-200" aria-hidden />
        <ReviewBlock review={review} />
        <ReplyEditor id="reply-sheet" value={reply} onChange={onReply} onReset={() => onReply(review.reply)} />
        <div className="flex shrink-0 gap-2">
          <TextButton onClick={onDiscard}>Discard</TextButton>
          <PillButton className="min-w-0 flex-1" onClick={onAction}>
            {action}
          </PillButton>
        </div>
      </div>
    </div>,
    document.body,
  );
}
