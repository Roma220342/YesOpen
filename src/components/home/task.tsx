// A "To approve" task, shared by the mobile carousel and the desktop accordion.
export type TaskField = { label: string; value: string };

export type Task = {
  title: string;
  /** Why it matters. Shown under the title (mobile card, open desktop item). */
  why: string;
  /** One-line context shown in a collapsed desktop row. */
  summary: string;
  /** Now / New boxes. Empty for tasks that are a single yes. */
  fields?: TaskField[];
  /** Small hint under the last field ("Tap to change the hours."). */
  hint?: string;
  /** Button label on the mobile card. */
  action: string;
  /** Button label in the open desktop item. Defaults to `action`. */
  desktopAction?: string;
  /** Collapsed desktop row shows a lock (10c: approving needs the trial). */
  locked?: boolean;
};

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
