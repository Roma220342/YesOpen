import { PaymentMobile, PaymentDesktop } from "./_payment";

export function Mobile() {
  return <PaymentMobile state="processing" />;
}

export function Desktop() {
  return <PaymentDesktop state="processing" />;
}
