import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { ScreenSwitcher } from "@/components/screen-switcher";
import { ScrollEdges } from "@/components/scroll-edges";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "YesOpen",
  description: "Your Google profile, looked after.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="antialiased">
        {children}
        <ScreenSwitcher />
        <ScrollEdges />
      </body>
    </html>
  );
}
