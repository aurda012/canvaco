import * as React from "react";
import Link from "next/link";

import { siteConfig } from "@/config/marketing";
import { cn } from "@/lib/utils";

import { Icons } from "../shared/icons";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn("border-t", className)}>
      <div className="border-t py-4">
        <div className="container flex items-center justify-between">
          <p className="text-left text-sm text-muted-foreground">
            Built by{" "}
            <Link
              href="https://github.com/aurda012"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              aurda
            </Link>
            . Hosted on{" "}
            <Link
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Vercel
            </Link>
            .
          </p>

          <div className="flex items-center gap-3">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              <Icons.gitHub className="size-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
