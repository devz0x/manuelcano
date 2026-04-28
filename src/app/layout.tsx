import type { Metadata } from "next";
import { Playfair_Display, Oswald, Inter, Caveat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manny Cano | Equipamiento de Béisbol Profesional",
  description:
    "Guantes, bates, pelotas, mochilas y equipo de catcher de calidad profesional. Diseñado en República Dominicana para el jugador serio.",
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Manny Cano | Equipamiento de Béisbol Profesional",
    description:
      "Guantes, bates, pelotas, mochilas y equipo de catcher de calidad profesional. Diseñado en República Dominicana para el jugador serio.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${playfairDisplay.variable} ${oswald.variable} ${inter.variable} ${caveat.variable} font-body antialiased bg-background text-foreground`}
      >
        <div className="flex min-h-screen flex-col">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
