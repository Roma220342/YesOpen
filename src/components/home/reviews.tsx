import Link from "next/link";
import { Icon } from "@/components/icon";
import { LockedRow, ModuleCard, Star, type Locked } from "./module-card";

type HeadLinkData = { label: string; href?: string };

export type ReviewsData = {
  title?: string;
  link?: HeadLinkData;
  rating: string; // "4.4"
  count: string; // "212 reviews"
  fresh: string; // "5 new this week"
  /** Fill of the reply bar, 0..1 (as drawn in Figma). */
  replied: number;
  repliedLabel: string; // "209 of 212 have a reply"
  /** Reply bar colour: blue (default) or green when every review has a reply (10b). */
  barTone?: "primary" | "success";
  /**
   * "3 replies to approve · View" row; omitted when nothing waits. The count matches the review tasks in
   * To approve, and View scrolls up to them.
   */
  drafts?: { label: string; href?: string };
  /** Without a plan the ready replies open the trial (10c). */
  locked?: Locked;
};

export function Reviews({ data, className }: { data: ReviewsData; className?: string }) {
  return (
    <ModuleCard title={data.title ?? "Reviews"} link={data.link ?? { label: "All reviews" }} className={className}>
      <div className="flex items-center gap-2">
        <Star size={22} />
        <p className="t-title text-secondary-900">{data.rating}</p>
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="t-body text-secondary-900">{data.count}</p>
          <p className="t-small text-secondary-600">{data.fresh}</p>
        </div>
      </div>
      <div className="h-1.5 overflow-hidden rounded-[3px] bg-secondary-100">
        <div className={`h-full rounded-[3px] ${data.barTone === "success" ? "bg-success-500" : "bg-primary-500"}`} style={{ width: `${data.replied * 100}%` }} />
      </div>
      <p className="t-small text-secondary-700">{data.repliedLabel}</p>
      {data.drafts && (
        <Link
          href={data.drafts.href ?? "#to-approve"}
          className="t-headline flex items-center gap-2 rounded-xl bg-primary-50 px-3 py-2.5 text-primary-600"
        >
          <span className="min-w-0 flex-1">{data.drafts.label}</span>
          <span className="flex shrink-0 items-center gap-0.5">
            View
            <Icon name="chevron" size={22} rotate={-90} className="-mr-1" />
          </span>
        </Link>
      )}
      {data.locked && <LockedRow {...data.locked} />}
    </ModuleCard>
  );
}
