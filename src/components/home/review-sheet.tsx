"use client";

import { BottomSheet } from "./bottom-sheet";
import { PillButton, TextButton } from "./module-card";
import { ReplyEditor } from "./reply-editor";
import { ReviewBlock, type ReviewReply } from "./task";

// Mobile bottom sheet for one review: the whole review and the reply in edit mode. It opens when the owner
// taps the reply on a task card, where the text is cut to a few lines so the card keeps its height.
// Discard drops the changes and closes; the primary button approves (one review) or keeps the edit (several).
// Every way out slides the sheet down first; onAction and onDiscard run once it is gone.
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
  return (
    <BottomSheet label={`Review from ${review.name}`} onClose={onClose} className="gap-4 px-5 pt-3 pb-[max(20px,env(safe-area-inset-bottom))]">
      {(close) => (
        <>
          <ReviewBlock review={review} />
          <ReplyEditor id="reply-sheet" value={reply} onChange={onReply} onReset={() => onReply(review.reply)} />
          <div className="flex shrink-0 gap-2">
            <TextButton onClick={() => close(onDiscard)}>Discard</TextButton>
            <PillButton className="min-w-0 flex-1" onClick={() => close(onAction)}>
              {action}
            </PillButton>
          </div>
        </>
      )}
    </BottomSheet>
  );
}
