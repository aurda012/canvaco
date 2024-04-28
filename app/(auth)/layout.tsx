"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
import DarkModeSwitcher from "@/components/shared/dark-mode-switcher";

export default function AuthLayout({
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
      <main className="w-full h-screen flex items-center justify-center">
        {children}
        <DarkModeSwitcher />
      </main>
    </ClerkProvider>
  );
}
