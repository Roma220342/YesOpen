"use client";

import { useEffect, useRef } from "react";

export const REPLY_MAX = 750;

// A reply while the owner changes it: the field takes the blue focus border, the caret sits at the end,
// and a counter plus "Reset to suggestion" appear under it, as in the onboarding description editor (03b).
export function ReplyEditor({
  id,
  value,
  onChange,
  onReset,
}: {
  id: string;
  value: string;
  onChange: (text: string) => void;
  /** Puts the drafted reply back and keeps editing. */
  onReset: () => void;
}) {
  const field = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = field.current;
    if (!el) return;
    el.focus();
    el.setSelectionRange(el.value.length, el.value.length);
  }, []);

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="t-caption text-secondary-700">
        Your reply
      </label>
      <textarea
        id={id}
        ref={field}
        value={value}
        maxLength={REPLY_MAX}
        onChange={(e) => onChange(e.target.value)}
        className="t-body field-sizing-content w-full resize-none rounded-2xl border-[1.5px] border-primary-600 bg-secondary-50 p-4 text-secondary-900 caret-primary-600 outline-none"
      />
      <div className="flex h-[17px] items-center justify-between">
        <p className="t-footnote text-secondary-700 tabular-nums">
          {value.length} / {REPLY_MAX}
        </p>
        <button
          type="button"
          onClick={() => {
            onReset();
            field.current?.focus();
          }}
          className="t-small flex h-11 items-center text-primary-600"
        >
          Reset to suggestion
        </button>
      </div>
    </div>
  );
}
