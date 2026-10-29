import { PaymentMobile, PaymentDesktop } from "./_payment";

export function Mobile() {
  return <PaymentMobile state="empty" />;
}

export function Desktop() {
  return <PaymentDesktop state="empty" />;
}
