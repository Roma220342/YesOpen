"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icon";

export const RESULTS = [
  { name: "Forno Rosso Pizzeria", address: "214 Bedford Ave, Brooklyn", photo: "/assets/business.jpg" },
  { name: "Forno Rosso Pizzeria", address: "88 Court St, Brooklyn", photo: "/assets/onboarding/01b/photo-1.jpg" },
  { name: "Forno Romano", address: "401 Grand St, Brooklyn", photo: "/assets/onboarding/01b/photo-2.png" },
  { name: "Rosso Pomodoro", address: "12 Ninth Ave, New York", photo: "/assets/onboarding/01b/photo-3.png" },
];

// Search bar component from Figma (Material 3): 56px pill, secondary-50 fill, 48px icon slots.
const FIELD = "flex h-14 w-full min-w-0 flex-1 items-center rounded-full bg-secondary-50 p-1";
const SLOT = "flex size-12 shrink-0 items-center justify-center text-secondary-900";

/** Desktop search: the search bar component, with results in a dropdown (no separate typing screen). */
export function DesktopSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const hits = RESULTS.filter((r) => `${r.name} ${r.address}`.toLowerCase().includes(query.trim().toLowerCase()));
  const show = open && query.trim() !== "";

  return (
    <div className="relative min-w-0 flex-1">
      <label className={FIELD}>
        <span className={SLOT}>
          <Icon name="search" />
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          placeholder="Business name or address"
          aria-label="Business name or address"
          className="t-body min-w-0 flex-1 bg-transparent text-secondary-900 caret-primary-600 outline-none placeholder:text-secondary-600 [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button type="button" aria-label="Clear" onClick={() => setQuery("")} className={`${SLOT} rounded-full`}>
            <Icon name="close" />
          </button>
        )}
      </label>

      {show && (
        <div className="absolute inset-x-0 top-full z-10 mt-2 origin-top animate-drop-in rounded-3xl border border-secondary-100 bg-white p-2 shadow-pop">
          {hits.length > 0 ? (
            <ul className="flex flex-col">
              {hits.map((r) => (
                <li key={r.address}>
                  <Link
                    href="/onboarding/01c"
                    // Keep the input focused on press, so blur does not close the list before the click lands.
                    onMouseDown={(e) => e.preventDefault()}
                    className="flex items-center gap-3 rounded-2xl px-2 py-2 hover:bg-secondary-50"
                  >
                    <img src={r.photo} alt="" className="size-9 shrink-0 rounded-lg object-cover" />
                    <span className="t-body truncate text-secondary-900">{r.name}</span>
                    <span className="t-small truncate text-secondary-600">{r.address}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="t-small px-2 py-2 text-secondary-600">No match. Try the street address.</p>
          )}
        </div>
      )}
    </div>
  );
}
