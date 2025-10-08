import type { Metadata } from "next";
import { Cinzel, Roboto } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";

const roboto = Roboto({
  variable: "--font-sans",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Gian Paul Ramirez",
  description: "Personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${roboto.variable} bg-background`}>
      <body className="min-h-screen">
        {/* Two-pane layout, right can change via {children} */}
        <div
          className="
            grid grid-cols-1
            md:grid-cols-[clamp(280px,34vw,520px)_1fr]
            min-h-screen md:h-screen
          "
        >
          {/* LEFT: sticky, doesn't move based on RIGHT's scroll */}
          <aside className="min-w-0 md:border-b-0 md:border-r border-golden/20 md:sticky md:top-0 md:h-screen md:overflow-y-auto">
            <Sidebar />
          </aside>

          {/* RIGHT: independent scroll area, replaced on route change */}
          <main className="md:h-screen md:overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
