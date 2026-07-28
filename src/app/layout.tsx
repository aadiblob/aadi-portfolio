import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aaditya Patil — Mechanical Engineering Portfolio",
  description:
    "Mechanical engineering portfolio focused on simulation, computational design, product development, and technical visualization.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Aaditya Patil — Mechanical Engineering Portfolio",
    description:
      "Simulation, computational design, product development, and technical visualization.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080808",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
