import type { Metadata } from "next";
import { Hubot_Sans } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ToastContainer } from "react-toastify";
import { SWRProvider } from "@/common/http/swrProvider";
import ReduxProvider from "@/common/redux/ReduxProvider";

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
  }Catalog`,
  description:
    "We are the WCO market. We understand the appeal of vintage Volkswagens and the desire to preserve their original beauty. This store is for you. We create retro parts for cars and buses.",
  openGraph: {
    title: process.env.NEXT_PUBLIC_PROJECT_NAME || "",
    siteName: process.env.NEXT_PUBLIC_PROJECT_NAME || "",
    description:
      "We are the WCO market. We understand the appeal of vintage Volkswagens and the desire to preserve their original beauty. This store is for you. We create retro parts for cars and buses.",
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
      <body className="wco-font-light">
        <ToastContainer position="top-center" autoClose={5000} />
        <SWRProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </SWRProvider>
      </body>
      <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID as string} />
    </html>
  );
}
