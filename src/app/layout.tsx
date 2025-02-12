import type { Metadata } from "next";
import { Hubot_Sans } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { GoogleAnalytics } from "@next/third-parties/google";

const Barlow_Font = Hubot_Sans({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_CLIENT_HOST as string),
  title: `${
    process.env.NEXT_PUBLIC_PROJECT_NAME
      ? process.env.NEXT_PUBLIC_PROJECT_NAME + " | "
      : ""
  } | Catalog`,
  description: "",
  openGraph: {
    title: process.env.NEXT_PUBLIC_PROJECT_NAME || "",
    siteName: process.env.NEXT_PUBLIC_PROJECT_NAME || "",
    description: "",
    images: ["/og.jpg"],
    locale: "en_US",
    type: "website",
  },
  verification: {
    other: {
      "facebook-domain-verification": "pybjdj205kpa2dgiz6c5bqjy5yt2mf",
    },
  },
  // robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={Barlow_Font.className}>
      <body className="wco-font-light">{children}</body>
      <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID as string} />
    </html>
  );
}
