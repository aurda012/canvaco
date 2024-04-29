"use client";

import { Actions } from "@/components/shared/actions";
import { Hint } from "@/components/shared/hint";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useRenameModal } from "@/store/use-rename-modal";
import { useQuery } from "convex/react";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TabSeparator = () => {
  return <div className="text-neutral-300 px-1.5">|</div>;
};

interface InfoProps {
  boardId: string;
}

export const Info = ({ boardId }: InfoProps) => {
  const { onOpen } = useRenameModal();

  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">,
  });

  if (!data) return <InfoSkeleton />;

  return (
    <div className=" rounded-md px-1.5 h-12 flex items-center shadow-md">
      <Hint label="Go to boards" side="bottom" sideOffset={10}>
        <Button asChild className="pl-0 pr-2" variant="board">
          <Link href="/dashboard">
            <Image
              src="/assets/logo.svg"
              alt="CanvaCo logo"
              height={32}
              width={112}
            />
          </Link>
        </Button>
      </Hint>
      <div className="flex items-center mt-1">
        <TabSeparator />
        <Hint label="Edit title" side="bottom" sideOffset={10}>
          <Button
            onClick={() => onOpen(data._id, data.title)}
            variant="board"
            className="text-base font-normal px-2 hover:text-white"
          >
            {data.title}
          </Button>
        </Hint>
        <TabSeparator />
      </div>
      <Actions
        id={data._id}
        title={data.title}
        type={data.type}
        side="bottom"
        sideOffset={10}
      >
        <div>
          <Hint label="Main menu" side="bottom" sideOffset={10}>
            <Button size="icon" variant="board">
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
};

export const InfoSkeleton = () => {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md h-12 flex items-center w-[300px]">
      <Skeleton className="h-full w-full bg-neutral-200" />
    </div>
  );
};
