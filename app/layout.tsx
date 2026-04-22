import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Truus - We make advertising for the new mainstream",
  description:
    "To reach the new generation you need to know where they are. We are a true 360° agency, working the whole spectrum from TikTok content to TVC and from influencer collabs to out of home spectaculars.",
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
      <body>{children}</body>
    </html>
  );
}
