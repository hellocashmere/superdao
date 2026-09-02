import type { Metadata } from "next";

import { cn } from "@superdao/lib/utils";

import { CookieBanner } from "@/widgets/banners";

import "@superdao/ui/globals.css";

import { inter, sfProDisplay, sfProText } from "./fonts";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: "Superdao",
    template: "%s | Superdao",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("dark font-sans antialiased", inter.variable, sfProDisplay.variable, sfProText.variable)}
    >
      <body>
        <Providers>
          {children}
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
