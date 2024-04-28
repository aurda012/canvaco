"use client";
import { NavBar } from "@/components/marketing/navbar";
import { SiteFooter } from "@/components/marketing/site-footer";
import DarkModeSwitcher from "@/components/shared/dark-mode-switcher";
import { ClerkProvider } from "@clerk/nextjs";
// import { getCurrentUser } from "@/lib/session"
import { Suspense } from "react";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  // const user = await getCurrentUser()

  return (
    <ClerkProvider>
      <div className="flex min-h-screen flex-col">
        <Suspense fallback="...">
          <NavBar scroll={true} />
        </Suspense>
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <DarkModeSwitcher />
      </div>
    </ClerkProvider>
  );
}
