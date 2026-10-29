import { PaymentMobile, PaymentDesktop } from "./_payment";

export function Mobile() {
  return <PaymentMobile state="ready" />;
}

export function Desktop() {
  return <PaymentDesktop state="ready" />;
}
