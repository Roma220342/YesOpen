import { Icon } from "@/components/icon";
import { TabBar } from "@/components/ui";
import { Greeting, HomeHeader, Sidebar, type Business, type User } from "./shell";
import { ToApproveCarousel } from "./to-approve-carousel";
import { ToApproveAccordion } from "./to-approve-accordion";
import { PlaceNearby, ProfileScore, Reviews, ThisWeek, WeekChart, type NearbyData, type ReviewsData, type ScoreData, type ThisWeekData, type WeekData } from "./modules";
import type { Task } from "./task";

// Everything a Home state (10a, 10a2, 10b…) varies. Screens pass this; layouts stay here.
export type HomeState = {
  business: Business;
  user: User;
  greeting: [string, string];
  /** Tasks to approve. Empty hides the To approve module. */
  tasks: Task[];
  /** Fixed mobile task-card height from Figma. */
  cardHeight: number;
  /** Index of the open desktop accordion item. */
  openTask?: number;
  week: WeekData;
  nearby: NearbyData;
  score: ScoreData;
  reviews: ReviewsData;
  thisWeek: ThisWeekData;
  /** Desktop-only This week when it differs from mobile (10b desktop drops Done). */
  thisWeekDesktop?: ThisWeekData;
  /** Shown in place of To approve when there are no tasks (10b "You're all caught up"). */
  caughtUp?: { title: string; sub: string };
  /** Desktop row sizes when a state differs from 10a (top 510, bottom 346). */
  desktopLayout?: {
    topRowHeight?: number;
    /** "auto" sizes the bottom row to its content (10b, 10c). */
    bottomRowHeight?: number | "auto";
    /** 24px instead of 16px under the module head in Week, Score and Reviews (10c). */
    wideHeadGap?: boolean;
  };
};

// White status card: green check tile + title + footnote.
function CaughtUp({ title, sub }: { title: string; sub: string }) {
  return (
    <section className="flex items-center gap-3 rounded-3xl bg-white p-5">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-success-50 text-secondary-900">
        <Icon name="check" size={20} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="t-headline text-secondary-900">{title}</span>
        <span className="t-footnote text-secondary-700">{sub}</span>
      </span>
    </section>
  );
}

export function HomeMobile({ state }: { state: HomeState }) {
  return (
    <div data-page-bg="neutral" className="flex min-h-dvh flex-col bg-secondary-75">
      <HomeHeader business={state.business} user={state.user} />
      <main className="flex flex-1 flex-col gap-2 px-5 pt-2 pb-6">
        <Greeting lines={state.greeting} />
        <div className="flex flex-col gap-5">
          {state.tasks.length > 0 && <ToApproveCarousel tasks={state.tasks} cardHeight={state.cardHeight} />}
          {state.tasks.length === 0 && state.caughtUp && <CaughtUp {...state.caughtUp} />}
          <WeekChart data={state.week} barMax={64} />
          <PlaceNearby data={state.nearby} />
          <ProfileScore data={state.score} />
          <Reviews data={state.reviews} />
          <ThisWeek data={state.thisWeek} />
        </div>
      </main>
      <TabBar active="Home" />
    </div>
  );
}

export function HomeDesktop({ state }: { state: HomeState }) {
  const layout = state.desktopLayout ?? {};
  const top = layout.topRowHeight ?? 510;
  const bottom = layout.bottomRowHeight ?? 346;
  const head = layout.wideHeadGap ? " [&>:first-child]:mb-2" : "";
  return (
    <div data-page-bg="neutral" className="flex min-h-dvh bg-secondary-75">
      <Sidebar business={state.business} user={state.user} />
      <main className="flex min-w-0 flex-1 flex-col gap-6 px-10 pt-8 pb-12">
        <Greeting lines={state.greeting} />
        {state.tasks.length > 0 && <ToApproveAccordion tasks={state.tasks} defaultOpen={state.openTask} />}
        {state.tasks.length === 0 && state.caughtUp && <CaughtUp {...state.caughtUp} />}
        <div className="flex gap-6" style={{ height: top }}>
          <WeekChart data={state.week} barMax={141} className={`min-w-0 flex-1${head}`} />
          <div className="flex w-[544px] shrink-0 flex-col gap-6">
            <PlaceNearby data={state.nearby} />
            <ProfileScore data={state.score} className={`flex-1${head}`} />
          </div>
        </div>
        <div className="flex gap-6" style={bottom === "auto" ? undefined : { height: bottom }}>
          <Reviews data={state.reviews} className={`min-w-0 flex-1${head}`} />
          <ThisWeek data={state.thisWeekDesktop ?? state.thisWeek} className="min-w-0 flex-1" />
        </div>
      </main>
    </div>
  );
}
