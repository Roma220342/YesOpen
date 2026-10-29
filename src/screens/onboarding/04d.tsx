import { ConnectErrorDesktop, ConnectErrorMobile, type ConnectErrorProps } from "./04b";

const PROPS: ConnectErrorProps = {
  title: "Your business isn’t verified yet",
  text: "Google won’t show any changes until it’s verified. Finish verification and we’ll pick up from here.",
  icon: "shield",
  status: "Waiting for verification with Google",
  secondary: { label: "Use another account", href: "/onboarding/04" },
  primary: "See how to verify",
};

export function Mobile() {
  return <ConnectErrorMobile {...PROPS} />;
}

export function Desktop() {
  return <ConnectErrorDesktop {...PROPS} />;
}
