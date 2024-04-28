import Link from "next/link";

import { siteConfig } from "@/config/marketing";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Sign } from "crypto";

export async function HeroLanding() {
  return (
    <section className="space-y-6 py-12 sm:py-20 lg:py-20">
      <div className="container flex max-w-5xl flex-col items-center gap-5 text-center">
        <h1 className="text-balance font-urban text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[66px]">
          Real-time Design Collab with{" "}
          <span className="text-primary-green font-extrabold">CanvaCo</span>
        </h1>

        <p
          className="max-w-2xl text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8"
          style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
        >
          Build your next set of designs, live, with collaborators.
        </p>

        <div
          className="flex justify-center space-x-2 md:space-x-4"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
          <Link
            href="/dashboard"
            className={cn(
              buttonVariants({ size: "lg", rounded: "full" }),
              "gap-2 bg-primary-green/80 text-white font-semibold"
            )}
          >
            <SignedIn>
              <span>Dashboard</span>
            </SignedIn>
            <SignedOut>
              <span>Get Started</span>
            </SignedOut>
            <Icons.arrowRight className="size-4" />
          </Link>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "lg",
                rounded: "full",
              }),
              "px-5"
            )}
          >
            <Icons.gitHub className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
