"use client";

import { Loading } from "@/components/auth/loading";
import { Toaster } from "@/components/ui/toaster";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { ModalProvider } from "@/providers/modal-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { Suspense } from "react";
import { dark } from "@clerk/themes";
import DarkModeSwitcher from "@/components/shared/dark-mode-switcher";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = useTheme();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
      }}
    >
      <Suspense fallback={<Loading />}>
        <ConvexClientProvider>
          <Toaster />
          <ModalProvider />
          {children}
        </ConvexClientProvider>
      </Suspense>
    </ClerkProvider>
  );
}
