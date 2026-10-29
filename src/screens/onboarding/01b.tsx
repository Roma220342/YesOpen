"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { RESULTS } from "./_search";

// Figma 89:1029 (mobile only). The iOS keyboard is not drawn: the input is focused instead.

export function Mobile() {
  const [query, setQuery] = useState("Forno");

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <main className="flex flex-1 flex-col gap-4 px-5 pt-2 pb-3">
        <div className="flex items-center rounded-full bg-secondary-50 p-1">
          <Link
            href="/onboarding/01a"
            aria-label="Back"
            className="flex size-12 shrink-0 items-center justify-center rounded-full text-secondary-900"
          >
            <Icon name="back" />
          </Link>
          <input
            autoFocus
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Business name or address"
            aria-label="Business name or address"
            className="t-body h-6 min-w-0 flex-1 bg-transparent text-secondary-900 caret-primary-600 outline-none placeholder:text-secondary-600 [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              aria-label="Clear"
              onClick={() => setQuery("")}
              className="flex size-12 shrink-0 items-center justify-center rounded-full text-secondary-900"
            >
              <Icon name="close" />
            </button>
          )}
        </div>

        <ul className="flex flex-col gap-0.5">
          {RESULTS.map((r, i) => (
            <li key={r.address}>
              <Link
                href="/onboarding/01c"
                className={`flex items-center gap-3 rounded-3xl px-3 py-2.5 ${i === 0 ? "h-[68px] bg-secondary-50" : "h-[60px]"}`}
              >
                <img src={r.photo} alt="" className="size-11 shrink-0 rounded-xl object-cover" />
                <span className="flex min-w-0 flex-1 flex-col gap-px">
                  <span className="t-headline text-secondary-900">{r.name}</span>
                  <span className="t-footnote text-secondary-700">{r.address}</span>
                </span>
              </Link>
            </li>
          ))}
          <li>
            <button type="button" className="flex w-full items-center gap-1 py-3 pr-3.5 pl-2 text-secondary-700">
              <Icon name="location" size={16} />
              <span className="t-small">Not listed? Search by address</span>
            </button>
          </li>
        </ul>
      </main>
    </div>
  );
}
