import type { ComponentType } from "react";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { VIEW_COOKIE, type View } from "@/screens/list";

// A screen module exports the mobile layout (393px Figma frame) and, when Figma has one, the desktop layout (1440px+).
export type ScreenModule = { Mobile: ComponentType; Desktop?: ComponentType };

/** Loads a screen and renders it in the chosen view: ?view= wins, then the cookie the switcher sets, else desktop. */
export async function Screen({
  group,
  id,
  searchParams,
}: {
  group: "onboarding" | "home";
  id: string;
  searchParams: Promise<{ view?: string }>;
}) {
  let mod: ScreenModule;
  try {
    mod = await import(`@/screens/${group}/${id}`);
  } catch {
    notFound();
  }
  const param = (await searchParams).view;
  const saved = (await cookies()).get(VIEW_COOKIE)?.value;
  const view: View = param === "mobile" || param === "desktop" ? param : saved === "mobile" ? "mobile" : "desktop";
  return <ScreenFrame mod={mod} view={view} />;
}

export function ScreenFrame({ mod, view }: { mod: ScreenModule; view: View }) {
  const { Mobile, Desktop } = mod;
  // Each screen fades up on arrival; the page remounts on navigation, so this plays between screens.
  if (view === "desktop" && Desktop)
    return (
      <div data-desktop className="animate-screen-in">
        <Desktop />
      </div>
    );
  // Mobile view, or a mobile-only screen: the 393px frame centred on a grey page.
  return (
    <div className="min-h-dvh bg-secondary-75">
      <div className="mx-auto min-h-dvh w-full max-w-[393px] animate-screen-in bg-white">
        <Mobile />
      </div>
    </div>
  );
}
