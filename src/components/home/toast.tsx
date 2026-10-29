"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const SECONDS = 6;

// Message with Undo, fixed to the window. Mobile: centred above the tab bar. Desktop: bottom left, on the
// content's left edge (past the 248px sidebar plus 40px padding), never over the sidebar.
// It leaves after 6 seconds; hover or touch pauses the timer.
export function Toast({
  message,
  onUndo,
  onClose,
  desktop = false,
}: {
  message: string;
  onUndo: () => void;
  onClose: () => void;
  desktop?: boolean;
}) {
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const start = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(onClose, SECONDS * 1000);
  };
  const stop = () => clearTimeout(timer.current);

  // A new message restarts the timer.
  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  return createPortal(
    <div
      role="status"
      onMouseEnter={stop}
      onMouseLeave={start}
      onTouchStart={stop}
      onTouchEnd={start}
      // Keyboard users reaching Undo pause the timer too.
      onFocus={stop}
      onBlur={start}
      className={`animate-screen-in fixed z-40 flex items-center rounded-2xl bg-secondary-800 text-white shadow-toast ${
        desktop
          ? "bottom-6 left-[288px] w-fit max-w-[420px] gap-6 px-5 py-3.5"
          : "inset-x-5 bottom-[92px] mx-auto max-w-[353px] gap-3 px-4 py-3.5"
      }`}
    >
      <p className="t-small min-w-0 flex-1">{message}</p>
      <button type="button" onClick={onUndo} className="t-small-bold shrink-0 text-primary-200">
        Undo
      </button>
    </div>,
    document.body,
  );
}
