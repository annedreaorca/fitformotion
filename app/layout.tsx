import type { Metadata } from "next";
import { Alexandria } from "next/font/google";
import Script from "next/script"; // Import Next.js Script component
import "./globals.css";
import { Providers } from "./providers";

// Viewport settings with zooming disabled
export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    minimumScale: 1,
    userScalable: "no",
  };
}

const alexandria = Alexandria({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Fitformotion: Every Rep Smarter, Every Goal Closer",
  description:
    "Fitformotion provides gym beginners with personalized workout plans, real-time tracking, and smart progress insights ensuring every rep leads to faster, smarter gains.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="min-h-dvh flex flex-col"
      suppressHydrationWarning
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
        />
        <link rel="canonical" href="https://fitformotion.com/" />
      </head>
      <body
        className={`${alexandria.className} flex flex-col grow overflow-x-hidden`}
      >
        {/* Google Tag Manager */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-7YY1WM27T9"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-7YY1WM27T9', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
