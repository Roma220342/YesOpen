import { Star } from "./module-card";

// A "To approve" task, shared by the mobile carousel and the desktop accordion.
export type TaskField = { label: string; value: string };

/** A Google review as the Business Profile gives it: who, how many stars, when, what they wrote. */
export type Review = { name: string; initial: string; stars: number; when: string; text: string };

/** A review with the reply we drafted for it. */
export type ReviewReply = Review & { reply: string };

export type Task = {
  title: string;
  /**
   * One short fact a customer sees on Google now, ending with a period: "Google shows you closed on Sundays."
   * Reviews always read "No reply for N days." The same line is the summary of a collapsed desktop row.
   */
  why: string;
  /** Now / New boxes. Empty for tasks that are a single yes. */
  fields?: TaskField[];
  /** Small hint under the last field ("Tap to change the hours."). */
  hint?: string;
  /** Reviews this task answers. One review shows its reply; several are listed and open one at a time. */
  reviews?: ReviewReply[];
  /** Button label on the mobile card. */
  action: string;
  /** Button label in the open desktop item. Defaults to `action`. */
  desktopAction?: string;
  /** Second answer for when the owner disagrees ("Not right for us"). Settles the task, so it isn’t raised again. */
  alt?: { label: string; done: string };
  /** The button opens this page instead of approving (10c: approving needs the trial). */
  href?: string;
  /** Points this fix surely adds to Profile score once Google applies it. Omit when the gain depends on the answer (Thanksgiving). */
  impact?: number;
};

export const doneLabel = (action: string) => (/^approve/i.test(action) ? "Approved" : "Done");

export function TaskFields({ fields, hint, className = "gap-3" }: { fields: TaskField[]; hint?: string; className?: string }) {
  return (
    <div className={`flex flex-col ${className}`}>
      {fields.map((f, i) => (
        <div key={f.label} className="flex flex-col gap-1.5">
          <p className="t-caption text-secondary-700">{f.label}</p>
          <div className="t-body rounded-2xl bg-secondary-50 p-4 whitespace-pre-line text-secondary-900">{f.value}</div>
          {hint && i === fields.length - 1 && <p className="t-footnote text-secondary-700">{hint}</p>}
        </div>
      ))}
    </div>
  );
}

// "+6 to score" pill under the why line. Green like a rise, no arrow: the plus already says it.
export function ImpactChip({ impact }: { impact?: number }) {
  if (!impact) return null;
  return (
    <span className="t-caption w-fit shrink-0 rounded-full bg-success-50 px-2.5 py-1 whitespace-nowrap text-success-700">
      +{impact} to score
    </span>
  );
}

// Five stars, the first `stars` filled.
export function Stars({ stars, size = 14 }: { stars: number; size?: number }) {
  return (
    <span className="flex shrink-0 gap-0.5" role="img" aria-label={`${stars} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={size} className={i < stars ? "text-warning-500" : "text-secondary-100"} />
      ))}
    </span>
  );
}

const CLAMP = { 2: "line-clamp-2", 3: "line-clamp-3", 4: "line-clamp-4" } as const;

/**
 * The review as a grey box: avatar, name and day, stars, then the text.
 * Long reviews: `clamp` cuts the text with "…" so the card keeps its height; the sheet shows it all.
 */
export function ReviewBlock({ review, clamp }: { review: Review; clamp?: keyof typeof CLAMP }) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl bg-secondary-50 p-4">
      <div className="flex items-center gap-2.5">
        <span className="t-caption flex size-[38px] shrink-0 items-center justify-center rounded-full bg-white text-primary-600">
          {review.initial}
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <p className="t-headline min-w-0 flex-1 truncate text-secondary-900">{review.name}</p>
            <p className="t-footnote shrink-0 text-secondary-700">{review.when}</p>
          </div>
          <Stars stars={review.stars} />
        </div>
      </div>
      <p className={`t-body text-secondary-900 ${clamp ? CLAMP[clamp] : ""}`}>{review.text}</p>
    </div>
  );
}

/** "Your reply" label + the drafted reply. */
export function ReplyField({ reply, clamp, hint }: { reply: string; clamp?: keyof typeof CLAMP; hint?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="t-caption text-secondary-700">Your reply</p>
      {/* Clamp the text, not the padded box: a clamped box still shows the next line through its padding. */}
      <div className="rounded-2xl bg-secondary-50 p-4">
        <p className={`t-body text-secondary-900 ${clamp ? CLAMP[clamp] : ""}`}>{reply}</p>
      </div>
      {hint && <p className="t-footnote text-secondary-700">Tap the text to change it.</p>}
    </div>
  );
}
