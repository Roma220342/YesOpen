"use client";

import { useEffect, useRef, useState } from "react";
import { Button, TopBar } from "@/components/ui";
import { Intro } from "./01a";
import { CURRENT, INTRO, SUGGESTION_ADDED, SUGGESTION_BASE } from "./03a";

// Figma 166:822 (mobile only). The iOS keyboard is not drawn: the field is focused instead.

const SUGGESTION = SUGGESTION_BASE + SUGGESTION_ADDED;
const EDITED = "Family-run pizzeria in Brooklyn since 2009. Wood-fired pizza and fresh pasta, with delivery across Williamsburg and Greenpoint until 11 pm.";
const MAX = 750;

export function Mobile() {
  const [text, setText] = useState(EDITED);
  const field = useRef<HTMLTextAreaElement>(null);

  // Focus with the caret at the end of the text, as in Figma.
  useEffect(() => {
    const el = field.current;
    if (!el) return;
    el.focus();
    el.setSelectionRange(el.value.length, el.value.length);
  }, []);

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <TopBar step={4} back="/onboarding/03a" skip="/home/10c" />
      <main className="flex flex-1 flex-col px-5 pt-4 pb-6">
        <div className="flex flex-col gap-8">
          <Intro {...INTRO} />
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <p className="t-caption text-secondary-700">Now</p>
              <p className="t-body rounded-2xl bg-secondary-50 p-4 text-secondary-900">{CURRENT}</p>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="new-description" className="t-caption text-secondary-700">
                New description
              </label>
              <textarea
                id="new-description"
                ref={field}
                value={text}
                maxLength={MAX}
                onChange={(e) => setText(e.target.value)}
                className="t-body field-sizing-content w-full resize-none rounded-2xl border-[1.5px] border-primary-600 bg-secondary-50 p-4 text-secondary-900 caret-primary-600 outline-none"
              />
              <div className="flex h-[17px] items-center justify-between">
                <p className="t-footnote text-secondary-700">
                  {text.length} / {MAX}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setText(SUGGESTION);
                    field.current?.focus();
                  }}
                  className="t-small flex h-11 items-center text-primary-600"
                >
                  Reset to suggestion
                </button>
              </div>
            </div>
          </div>
          <p className="t-small text-secondary-700">
            Written by AI, so check it. Next, Google asks you to allow the change.
          </p>
        </div>
      </main>
      <div data-edge="bottom" className="sticky bottom-0 z-10 bg-white px-5 pt-4 pb-8">
        <Button href="/onboarding/04">Send to Google</Button>
      </div>
    </div>
  );
}
