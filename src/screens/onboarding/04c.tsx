import { ConnectErrorDesktop, ConnectErrorMobile, type ConnectErrorProps } from "./04b";

const PROPS: ConnectErrorProps = {
  title: "You need manager access",
  text: "Ask the owner to add you as a manager of the business on Google. It takes about 2 minutes.",
  icon: "store",
  status: "You can see it, but can’t make changes",
  secondary: { label: "Use another account", href: "/onboarding/04" },
  primary: "Send steps to the owner",
};

export function Mobile() {
  return <ConnectErrorMobile {...PROPS} />;
}

export function Desktop() {
  return <ConnectErrorDesktop {...PROPS} />;
}
