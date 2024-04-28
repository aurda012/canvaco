import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";

import { fontHeading, fontSans, fontUrban } from "@/components/ui/fonts";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "CanvaCo",
  description:
    "A collaborative whiteboard for teams using Fabric.js and Liveblocks for real-time collaboration.",
  keywords: [
    "Next.js",
    "React",
    "LiveBlocks",
    "Clerk",
    "Fabric.js",
    "Shadcn UI",
    "Tailwind CSS",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${workSans.className} min-h-screen bg-background font-sans antialiased ${fontSans.variable} ${fontUrban.variable} ${fontHeading.variable}`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
