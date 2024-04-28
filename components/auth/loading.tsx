"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

export const Loading = () => {
  const { theme } = useTheme();
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <Image
        src={`/assets/${theme === "light" ? "logo-light" : "logo"}.svg`}
        alt="Logo"
        width={124}
        height={38}
        // className="animate-spin duration-700"
      />
    </div>
  );
};
