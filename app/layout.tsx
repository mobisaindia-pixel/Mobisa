import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "./components/LenisProvider";

export const metadata: Metadata = {
  title: "Mobisa — AI-Powered Creative Agency",
  description:
    "We make cinematic ads powered by AI. Social posts, mockups, UGC ads, and AI video ads for D2C brands.",
  icons: {
    icon: "/Mobisa-Logo.png",
    apple: "/Mobisa-Logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Caveat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
