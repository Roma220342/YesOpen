// Every prototype screen in flow order. Used by the index page and the screen switcher.
export const ONBOARDING = [
  ["01a", "Welcome"], ["01b", "Search · typing"], ["01c", "Search · selected"], ["02a", "Checking"], ["02b", "Report"],
  ["03a", "Free fix"], ["03b", "Free fix · editing"], ["04", "Connect Google"], ["04b", "Connect · wrong account"],
  ["04c", "Connect · no access"], ["04d", "Connect · not verified"], ["05", "Sent"], ["06", "Free trial"],
  ["07", "Payment"], ["07b", "Payment · typing"], ["07c", "Payment · declined"], ["07d", "Payment · ready"],
  ["07e", "Payment · processing"], ["08", "Payment success"],
] as const;

export const HOME = [
  ["10a", "Needs you"], ["10a2", "After approve"], ["10b", "All good"], ["10c", "Trial skipped"], ["10d", "Slower week"], ["10e", "Editing reply"],
] as const;

// Figma has these only as mobile frames (on desktop the dropdown search and inline editing replace them).
export const MOBILE_ONLY: readonly string[] = ["01b", "03b", "07b"];

export type View = "mobile" | "desktop";
export const VIEW_COOKIE = "view";

export const SCREENS = [
  ...ONBOARDING.map(([id, name]) => ({ id, href: `/onboarding/${id}`, label: `${id} ${name}`, group: "Onboarding" })),
  ...HOME.map(([id, name]) => ({ id, href: `/home/${id}`, label: `${id} ${name}`, group: "Home" })),
];

export const screensFor = (view: View) => SCREENS.filter((s) => view === "mobile" || !MOBILE_ONLY.includes(s.id));
