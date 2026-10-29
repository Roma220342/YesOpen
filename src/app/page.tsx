import Link from "next/link";
import { screensFor, type View } from "@/screens/list";

const VIEWS: { view: View; title: string }[] = [
  { view: "mobile", title: "Mobile" },
  { view: "desktop", title: "Desktop" },
];

export default function Index() {
  return (
    <main className="mx-auto max-w-[880px] px-5 py-12">
      <h1 className="t-large-title">YesOpen screens</h1>
      <div className="mt-8 grid gap-10 sm:grid-cols-2">
        {VIEWS.map(({ view, title }) => (
          <section key={view}>
            <h2 className="t-title mb-4">{title}</h2>
            {["Onboarding", "Home"].map((g) => (
              <div key={g} className="mb-6">
                <h3 className="t-headline mb-2">{g}</h3>
                <ul className="flex flex-col gap-1">
                  {screensFor(view)
                    .filter((s) => s.group === g)
                    .map((s) => (
                      <li key={s.href}>
                        <Link className="t-body text-primary-600" href={`${s.href}?view=${view}`}>{s.label}</Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
