import Link from "next/link";
import { Icon, type IconName } from "@/components/icon";
import { ScrollPane } from "@/components/scroll-edges";

export type Business = { name: string; photo: string };
export type User = { initial: string; name: string; email: string };

function Avatar({ initial }: { initial: string }) {
  return (
    <span className="flex size-11 shrink-0 items-center justify-center rounded-full border-3 border-white">
      <span className="t-caption flex size-full items-center justify-center rounded-full bg-primary-50 text-primary-600">{initial}</span>
    </span>
  );
}

function BusinessSwitcher({ business, className = "" }: { business: Business; className?: string }) {
  return (
    <button type="button" className={`flex items-center gap-2 rounded-full px-3 py-2.5 text-left ${className}`}>
      <img src={business.photo} alt="" width={24} height={24} className="size-6 shrink-0 rounded-md object-cover" />
      <span className="t-headline min-w-0 flex-1 truncate text-secondary-900">{business.name}</span>
      <Icon name="chevron" size={20} className="shrink-0 text-secondary-700" />
    </button>
  );
}

// Mobile Home header: business switcher pill + account avatar.
export function HomeHeader({ business, user }: { business: Business; user: User }) {
  return (
    <header className="flex h-14 items-center justify-between px-5">
      <BusinessSwitcher business={business} className="bg-white" />
      <Avatar initial={user.initial} />
    </header>
  );
}

// "A good week. / 4 things need you." — second line in secondary-700.
export function Greeting({ lines }: { lines: [string, string] }) {
  return (
    // Small line sets the tone ("A good week"), the big one says what needs the owner ("5 things need you").
    <hgroup className="flex flex-col gap-1 pt-2 pb-3">
      <p className="t-body text-secondary-700">{lines[0]}</p>
      <h1 className="t-large-title text-secondary-900">{lines[1]}</h1>
    </hgroup>
  );
}

/* ------------------------------------------------------------------ Desktop sidebar */

// Settings and Help glyphs are not in the shared icon set; paths from the Figma Icons component.
const SETTINGS =
  "M10.8922 21.5C10.5512 21.5 10.2568 21.3868 10.0087 21.1605C9.76058 20.9343 9.60958 20.6558 9.55575 20.325L9.3115 18.4538C9.04367 18.3641 8.769 18.2385 8.4875 18.077C8.20617 17.9153 7.95458 17.7423 7.73275 17.5577L6 18.2943C5.68583 18.4328 5.37017 18.4462 5.053 18.3345C4.73567 18.223 4.48917 18.0205 4.3135 17.727L3.1865 15.773C3.01083 15.4795 2.96025 15.1689 3.03475 14.8413C3.10908 14.5137 3.27958 14.2436 3.54625 14.0308L5.04425 12.9058C5.02125 12.7571 5.00492 12.6077 4.99525 12.4578C4.98558 12.3077 4.98075 12.1583 4.98075 12.0095C4.98075 11.8673 4.98558 11.7228 4.99525 11.576C5.00492 11.4292 5.02125 11.2686 5.04425 11.0943L3.54625 9.96925C3.27958 9.75642 3.11067 9.48458 3.0395 9.15375C2.96833 8.82308 3.02058 8.51092 3.19625 8.21725L4.3135 6.29225C4.48917 6.00508 4.73567 5.80417 5.053 5.6895C5.37017 5.57467 5.68583 5.5865 6 5.725L7.723 6.452C7.96417 6.261 8.22158 6.08633 8.49525 5.928C8.76892 5.76967 9.03783 5.64242 9.302 5.54625L9.55575 3.675C9.60958 3.34417 9.76058 3.06567 10.0087 2.8395C10.2568 2.61317 10.5512 2.5 10.8922 2.5H13.1077C13.4487 2.5 13.7433 2.61317 13.9913 2.8395C14.2394 3.06567 14.3904 3.34417 14.4443 3.675L14.6885 5.55575C14.9885 5.66475 15.2599 5.792 15.5027 5.9375C15.7457 6.083 15.991 6.2545 16.2385 6.452L18.0098 5.725C18.3238 5.5865 18.6394 5.57467 18.9567 5.6895C19.2741 5.80417 19.5205 6.00508 19.696 6.29225L20.8135 8.227C20.9892 8.5205 21.0397 8.83108 20.9653 9.15875C20.8909 9.48625 20.7204 9.75642 20.4538 9.96925L18.9172 11.123C18.9531 11.2845 18.9727 11.4355 18.976 11.576C18.9792 11.7163 18.9807 11.8577 18.9807 12C18.9807 12.1358 18.9775 12.274 18.971 12.4145C18.9647 12.5548 18.9417 12.7154 18.902 12.8963L20.4095 14.0308C20.6762 14.2436 20.8483 14.5137 20.926 14.8413C21.0035 15.1689 20.9544 15.4795 20.7788 15.773L19.646 17.7172C19.4705 18.0109 19.2225 18.2135 18.902 18.325C18.5815 18.4365 18.2642 18.423 17.95 18.2845L16.2385 17.548C15.991 17.7455 15.7384 17.9202 15.4807 18.072C15.2231 18.224 14.959 18.3481 14.6885 18.4443L14.4443 20.325C14.3904 20.6558 14.2394 20.9343 13.9913 21.1605C13.7433 21.3868 13.4487 21.5 13.1077 21.5H10.8922ZM11 20H12.9655L13.325 17.3212C13.8353 17.1879 14.3017 16.9985 14.724 16.753C15.1465 16.5073 15.5539 16.1916 15.9462 15.8057L18.4307 16.85L19.4155 15.15L17.2462 13.5155C17.3296 13.2565 17.3863 13.0026 17.4163 12.7537C17.4464 12.5051 17.4615 12.2538 17.4615 12C17.4615 11.7397 17.4464 11.4884 17.4163 11.2462C17.3863 11.0039 17.3296 10.7564 17.2462 10.5038L19.4345 8.85L18.45 7.15L15.9365 8.2095C15.6018 7.85183 15.2009 7.53583 14.7337 7.2615C14.2664 6.98717 13.7937 6.79292 13.3155 6.67875L13 4H11.0155L10.6845 6.66925C10.1743 6.78975 9.70325 6.97433 9.27125 7.223C8.83908 7.47183 8.42683 7.79233 8.0345 8.1845L5.55 7.15L4.5655 8.85L6.725 10.4595C6.64167 10.6968 6.58333 10.9437 6.55 11.2C6.51667 11.4563 6.5 11.7262 6.5 12.0095C6.5 12.2698 6.51667 12.525 6.55 12.775C6.58333 13.025 6.6385 13.2718 6.7155 13.5155L4.5655 15.15L5.55 16.85L8.025 15.8C8.4045 16.1897 8.81025 16.5089 9.24225 16.7578C9.67442 17.0064 10.152 17.1974 10.675 17.3307L11 20ZM12.0115 15C12.8435 15 13.5515 14.708 14.1355 14.124C14.7195 13.54 15.0115 12.832 15.0115 12C15.0115 11.168 14.7195 10.46 14.1355 9.876C13.5515 9.292 12.8435 9 12.0115 9C11.1692 9 10.4586 9.292 9.87975 9.876C9.30092 10.46 9.0115 11.168 9.0115 12C9.0115 12.832 9.30092 13.54 9.87975 14.124C10.4586 14.708 11.1692 15 12.0115 15Z";
const HELP =
  "M10.2125 14.8198C10.4093 14.6226 10.5078 14.3812 10.5078 14.0955C10.5078 13.81 10.4092 13.5688 10.212 13.372C10.0148 13.1753 9.7735 13.077 9.488 13.077C9.2025 13.077 8.96133 13.1756 8.7645 13.3728C8.56767 13.5699 8.46925 13.8112 8.46925 14.0968C8.46925 14.3822 8.56783 14.6234 8.765 14.8203C8.96217 15.0169 9.2035 15.1152 9.489 15.1152C9.7745 15.1152 10.0157 15.0168 10.2125 14.8198ZM9.50175 19C8.18775 19 6.95267 18.7507 5.7965 18.252C4.64033 17.7533 3.63467 17.0766 2.7795 16.2218C1.92433 15.3669 1.24725 14.3617 0.74825 13.206C0.249417 12.0503 0 10.8156 0 9.50175C0 8.18775 0.249333 6.95267 0.748 5.7965C1.24667 4.64033 1.92342 3.63467 2.77825 2.7795C3.63308 1.92433 4.63833 1.24725 5.794 0.74825C6.94967 0.249417 8.18442 0 9.49825 0C10.8123 0 12.0473 0.249333 13.2035 0.748C14.3597 1.24667 15.3653 1.92342 16.2205 2.77825C17.0757 3.63308 17.7528 4.63833 18.2518 5.794C18.7506 6.94967 19 8.18442 19 9.49825C19 10.8123 18.7507 12.0473 18.252 13.2035C17.7533 14.3597 17.0766 15.3653 16.2218 16.2205C15.3669 17.0757 14.3617 17.7528 13.206 18.2518C12.0503 18.7506 10.8156 19 9.50175 19ZM9.5 17.5C11.7333 17.5 13.625 16.725 15.175 15.175C16.725 13.625 17.5 11.7333 17.5 9.5C17.5 7.26667 16.725 5.375 15.175 3.825C13.625 2.275 11.7333 1.5 9.5 1.5C7.26667 1.5 5.375 2.275 3.825 3.825C2.275 5.375 1.5 7.26667 1.5 9.5C1.5 11.7333 2.275 13.625 3.825 15.175C5.375 16.725 7.26667 17.5 9.5 17.5ZM9.581 5.21925C10.0423 5.21925 10.4416 5.3645 10.7788 5.655C11.1161 5.9455 11.2848 6.30858 11.2848 6.74425C11.2848 7.11092 11.177 7.43908 10.9615 7.72875C10.7462 8.01858 10.5 8.2885 10.223 8.5385C9.86 8.8605 9.54042 9.21475 9.26425 9.60125C8.98808 9.98758 8.84042 10.4179 8.82125 10.8923C8.81475 11.0744 8.87883 11.227 9.0135 11.35C9.14817 11.473 9.30517 11.5345 9.4845 11.5345C9.67683 11.5345 9.83967 11.4704 9.973 11.3422C10.1063 11.2141 10.1916 11.0571 10.2288 10.8713C10.2954 10.5276 10.4374 10.2215 10.6547 9.953C10.8721 9.68433 11.1075 9.42892 11.361 9.18675C11.7255 8.83142 12.0436 8.44408 12.3152 8.02475C12.5871 7.60525 12.723 7.13742 12.723 6.62125C12.723 5.82892 12.4108 5.17792 11.7865 4.66825C11.1622 4.15875 10.4333 3.904 9.6 3.904C9.00517 3.904 8.44425 4.03567 7.91725 4.299C7.39042 4.5625 6.98017 4.94683 6.6865 5.452C6.5955 5.60717 6.56633 5.77042 6.599 5.94175C6.6315 6.11325 6.71942 6.24342 6.86275 6.33225C7.04525 6.43375 7.23267 6.46275 7.425 6.41925C7.61733 6.37558 7.78075 6.266 7.91525 6.0905C8.11792 5.82767 8.36317 5.61675 8.651 5.45775C8.93883 5.29875 9.24883 5.21925 9.581 5.21925Z";

type NavIcon = IconName | "settings" | "help";
type NavItem = { label: string; icon: NavIcon; href: string };

const MAIN_NAV: NavItem[] = [
  { label: "Home", icon: "home", href: "/home/10a" },
  { label: "Reviews", icon: "chat", href: "#" },
  { label: "Posts", icon: "campaign", href: "#" },
  { label: "Map", icon: "location", href: "#" },
];
const PROFILE_NAV: NavItem[] = [
  { label: "Fixes", icon: "edit", href: "#" },
  { label: "Business details", icon: "store", href: "#" },
  { label: "Activity", icon: "clock", href: "#" },
];
const FOOTER_NAV: NavItem[] = [
  { label: "Subscription", icon: "card", href: "#" },
  { label: "Settings", icon: "settings", href: "#" },
  { label: "Help", icon: "help", href: "#" },
];

function NavGlyph({ name }: { name: NavIcon }) {
  if (name === "settings" || name === "help") {
    return (
      <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden className="shrink-0">
        <path d={name === "settings" ? SETTINGS : HELP} transform={name === "help" ? "translate(2.5 2.5)" : undefined} />
      </svg>
    );
  }
  return <Icon name={name} size={20} className="shrink-0" />;
}

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      className={`flex h-11 items-center gap-3 rounded-xl px-3 ${
        active ? "t-headline bg-primary-50 text-primary-600" : "t-body text-secondary-900 hover:bg-secondary-50"
      }`}
    >
      <NavGlyph name={item.icon} />
      <span className="min-w-0 flex-1">{item.label}</span>
    </Link>
  );
}

// Desktop sidebar (248px): logo, business switcher, main nav, "Your profile" group, footer nav + account.
export function Sidebar({ business, user, active = "Home" }: { business: Business; user: User; active?: string }) {
  return (
    // Logo + switcher and footer stay put; only the nav scrolls when the window is short.
    <aside className="sticky top-0 flex h-dvh w-[248px] shrink-0 flex-col self-start bg-white py-6">
      <div data-pane-edge="top" className="flex shrink-0 flex-col gap-5 px-4 pb-5">
        <div className="pl-3">
          <img src="/brand/logo.svg" alt="YesOpen" width={84} height={24} />
        </div>
        <BusinessSwitcher business={business} className="w-full bg-secondary-50" />
      </div>
      <ScrollPane className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-4 no-scrollbar">
        <nav className="flex flex-col gap-1">
          {MAIN_NAV.map((n) => (
            <NavLink key={n.label} item={n} active={n.label === active} />
          ))}
        </nav>
        <nav className="flex flex-col gap-1">
          <p className="t-caption pb-1 pl-3 text-secondary-600">Your profile</p>
          {PROFILE_NAV.map((n) => (
            <NavLink key={n.label} item={n} active={n.label === active} />
          ))}
        </nav>
      </ScrollPane>
      <div data-pane-edge="bottom" className="flex shrink-0 flex-col gap-2 px-4 pt-5">
        {FOOTER_NAV.map((n) => (
          <NavLink key={n.label} item={n} active={n.label === active} />
        ))}
        <div className="flex h-14 items-center gap-3 px-2">
          <Avatar initial={user.initial} />
          <div className="flex min-w-0 flex-1 flex-col">
            <p className="t-headline truncate text-secondary-900">{user.name}</p>
            <p className="t-footnote truncate text-secondary-600">{user.email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
