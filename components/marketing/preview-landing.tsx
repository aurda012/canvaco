"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

export function PreviewLanding() {
  const { theme } = useTheme();

  return (
    <div className="pb-6 sm:pb-16">
      <div className="container max-w-7xl">
        <div className="rounded-xl md:bg-muted/30 md:p-3.5 md:ring-1 md:ring-inset md:ring-border">
          <div className="relative aspect-video overflow-hidden rounded-xl border md:rounded-lg">
            <Image
              className="size-full object-cover object-center"
              src={`/images/dashboard-${theme === "dark" ? "dark" : "light"}.png`}
              alt="preview landing"
              width={2000}
              height={1000}
              priority={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
