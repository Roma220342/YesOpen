import Link from "next/link";
import { Icon } from "@/components/icon";
import { Button, TopBar } from "@/components/ui";

// Shared payment form for 07 (empty), 07b (typing), 07c (declined), 07d (ready), 07e (processing).
export type PaymentState = "empty" | "typing" | "declined" | "ready" | "processing";

const BACK = "/onboarding/06";
const SKIP = "/home/10a";
const NEXT = "/onboarding/07e";

type Values = { card: string; exp: string; cvc: string; zip: string };
const FILLED: Values = { card: "4242 4242 4242 4242", exp: "08 / 29", cvc: "123", zip: "94110" };
const VALUES: Record<PaymentState, Values> = {
  empty: { card: "", exp: "", cvc: "", zip: "" },
  typing: { card: "4242 42", exp: "", cvc: "", zip: "" },
  declined: { ...FILLED, card: "4000 0000 0000 0002" },
  ready: FILLED,
  processing: FILLED,
};

function Field({
  label,
  labelClass,
  children,
  error,
}: {
  label: string;
  labelClass: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <label className="flex min-w-0 flex-1 flex-col gap-2">
      <span className={labelClass}>{label}</span>
      {children}
      {error && (
        <span className="t-small text-error-600">{error}</span>
      )}
    </label>
  );
}

function PaymentForm({ state, desktop }: { state: PaymentState; desktop: boolean }) {
  const v = VALUES[state];
  const disabled = state === "processing";
  // Figma 07b draws labels in Footnote/900 and placeholders in 700; the other states use Caption/700 and 500.
  const labelClass =
    state === "typing"
      ? `${desktop ? "t-small" : "t-footnote"} text-secondary-900`
      : `${desktop ? "t-small-bold" : "t-caption"} text-secondary-700`;
  const placeholder = state === "typing" ? "placeholder:text-secondary-700" : "placeholder:text-secondary-600";
  const box = `${desktop ? "h-12" : "h-14"} w-full rounded-2xl border-[1.5px] bg-secondary-50 px-4 t-body text-secondary-900 outline-none focus:border-primary-600`;
  const input = (extra = "border-transparent") => `${box} ${placeholder} ${extra}`;

  return (
    <div className={`flex w-full flex-col gap-6 ${disabled ? "opacity-50" : ""}`}>
      <div className="flex w-full flex-col gap-3">
        <h1 className="t-large-title text-secondary-900">Add a payment method</h1>
        <p className="t-body text-secondary-700">
          $0 today. Then $49 a month from November 11. Cancel anytime before then.
        </p>
      </div>

      <button
        type="button"
        disabled={disabled}
        className={`flex w-full items-center justify-center gap-1.5 bg-secondary-900 text-white ${
          desktop ? "h-12 rounded-3xl" : "h-14 rounded-[28px]"
        }`}
      >
        <img src="/assets/onboarding/07/apple.svg" alt="" width={24} height={24} />
        <span className="text-[20px] font-semibold leading-normal">Pay</span>
      </button>

      <div className="flex w-full items-center gap-3">
        <span className="h-px flex-1 rounded-full bg-secondary-100" />
        <span className="t-small text-secondary-700">or pay with card</span>
        <span className="h-px flex-1 rounded-full bg-secondary-100" />
      </div>

      <div className="flex w-full flex-col gap-4">
        <Field
          label="Card number"
          labelClass={labelClass}
          error={state === "declined" ? "Your bank declined this card. Try another card or use Apple Pay." : undefined}
        >
          <input
            className={input(state === "typing" ? "border-primary-600" : "border-transparent")}
            style={state === "declined" ? { borderColor: "var(--color-error-600)" } : undefined}
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="1234 1234 1234 1234"
            defaultValue={v.card}
            autoFocus={state === "typing"}
            disabled={disabled}
          />
        </Field>
        <div className="flex w-full gap-3">
          <Field label="Expiry date" labelClass={labelClass}>
            <input className={input()} inputMode="numeric" autoComplete="cc-exp" placeholder="MM / YY" defaultValue={v.exp} disabled={disabled} />
          </Field>
          <Field label="Security code" labelClass={labelClass}>
            <input className={input()} inputMode="numeric" autoComplete="cc-csc" placeholder="CVC" defaultValue={v.cvc} disabled={disabled} />
          </Field>
        </div>
        <div className="flex w-full gap-3">
          <Field label="Country" labelClass={labelClass}>
            <span className="relative block">
              <select
                className={`${input()} appearance-none pr-11`}
                autoComplete="country-name"
                defaultValue="United States"
                disabled={disabled}
              >
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
              </select>
              <Icon name="chevron" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-secondary-700" />
            </span>
          </Field>
          <Field label="ZIP code" labelClass={labelClass}>
            <input className={input()} inputMode="numeric" autoComplete="postal-code" placeholder="12345" defaultValue={v.zip} disabled={disabled} />
          </Field>
        </div>
      </div>

      <div className="flex w-full items-center gap-2">
        <Icon name="lock" size={16} className="shrink-0 text-secondary-700" />
        <p className="t-small flex-1 text-secondary-700">
          Secured by Stripe. By continuing, you agree to the{" "}
          <a href="#" className="text-primary-600 underline">Terms</a>.
        </p>
      </div>
    </div>
  );
}

// 07e auto-advances to 08 once the trial has started (React hoists <meta> into <head>).
function AutoAdvance() {
  return <meta httpEquiv="refresh" content="2;url=/onboarding/08" />;
}

function mobileButton(state: PaymentState) {
  if (state === "ready") return <Button href={NEXT}>Start free trial</Button>;
  if (state === "processing") return <Button variant="loading" href="/onboarding/08">Starting your trial</Button>;
  return <Button variant="disabled">Start free trial</Button>;
}

export function PaymentMobile({ state }: { state: PaymentState }) {
  const processing = state === "processing";
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      {processing && <AutoAdvance />}
      <TopBar back={processing ? undefined : BACK} skip={processing ? undefined : SKIP} />
      <main className="flex flex-1 flex-col px-5 pt-4 pb-6">
        <PaymentForm state={state} desktop={false} />
      </main>
      <div data-edge="bottom" className="sticky bottom-0 z-10 bg-white px-5 pt-4 pb-[env(safe-area-inset-bottom)]">{mobileButton(state)}</div>
    </div>
  );
}

export function DesktopHeader({ skip }: { skip?: string }) {
  return (
    <header className="sticky top-0 z-20 flex h-[72px] w-full shrink-0 items-center justify-between border-b border-secondary-200 bg-white px-10">
      <div className="flex w-60 items-center">
        <img src="/brand/logo.svg" alt="YesOpen" width={84} height={24} />
      </div>
      <div className="flex w-60 items-center justify-end">
        {skip && (
          <Link href={skip} className="t-body rounded-lg px-3 py-2 text-secondary-700">Skip</Link>
        )}
      </div>
    </header>
  );
}

const SUMMARY: [string, string][] = [
  ["Plan", "YesOpen, 1 location"],
  ["Today", "$0.00"],
  ["From November 11", "$49 a month"],
  ["Each extra location", "+$15 a month"],
];

function SummaryPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full max-w-[416px] flex-col gap-4">
      <p className="t-headline text-secondary-900">Summary</p>
      {SUMMARY.map(([k, v]) => (
        <div key={k} className="t-body flex justify-between whitespace-nowrap">
          <span className="text-secondary-600">{k}</span>
          <span className="text-secondary-900">{v}</span>
        </div>
      ))}
      <p className="t-small text-secondary-600">Cancel anytime before November 11 and you won’t pay.</p>
      <div className="pt-4">{children}</div>
    </div>
  );
}

function desktopButton(state: PaymentState) {
  if (state === "ready") return <Button href={NEXT}>Start free trial</Button>;
  if (state === "processing") return <Button variant="loading" href="/onboarding/08">Starting your trial</Button>;
  return <Button variant="disabled">Start free trial</Button>;
}

export function PaymentDesktop({ state }: { state: PaymentState }) {
  const processing = state === "processing";
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      {processing && <AutoAdvance />}
      <DesktopHeader skip={processing ? undefined : SKIP} />
      {/* Figma: a centred 1128px block, task column 520px on the left, context column 416px on the right. */}
      <div className="mx-auto flex w-full max-w-[1208px] flex-1 items-start justify-between gap-12 px-10">
        <div className={`w-full max-w-[520px] min-w-0 pb-24 short:pb-12 ${processing ? "pt-28 short:pt-14" : "pt-12"}`}>
          <div className="flex flex-col gap-6">
            {!processing && (
              <Link href={BACK} className="t-body flex items-center gap-1.5 self-start py-2 pr-1 text-secondary-700">
                <Icon name="back" size={20} />
                Back
              </Link>
            )}
            <div className="flex w-full flex-col">
              <PaymentForm state={state} desktop />
            </div>
          </div>
        </div>
        <div className={`w-full max-w-[416px] min-w-0 pb-24 short:pb-12 ${processing ? "pt-28 short:pt-14" : "pt-[110px]"}`}>
          <SummaryPanel>{desktopButton(state)}</SummaryPanel>
        </div>
      </div>
    </div>
  );
}
