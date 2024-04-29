"use client";

import dynamic from "next/dynamic";
import Room from "./Room";
import { useEffect } from "react";
import { useTheme } from "next-themes";

/**
 * disable ssr to avoid pre-rendering issues of Next.js
 *
 * we're doing this because we're using a canvas element that can't be pre-rendered by Next.js on the server
 */
const App = dynamic(() => import("./App"), { ssr: false });

interface FigmaPageProps {
  params: {
    figmaId: string;
  };
}

const FigmaPage = ({ params }: FigmaPageProps) => {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("dark");
  }, [setTheme]);

  return (
    <Room roomId={params.figmaId}>
      <App />
    </Room>
  );
};
export default FigmaPage;
