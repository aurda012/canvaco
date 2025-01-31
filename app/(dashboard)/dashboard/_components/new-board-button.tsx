"use client";

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}

export const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
  const router = useRouter();
  const { mutate, pending } = useApiMutation(api.board.create);

  const onClickBoard = () => {
    mutate({
      orgId,
      title: "Untitled",
      type: "board",
    })
      .then((id) => {
        toast.success("Board created");
        router.push(`/board/${id}`);
      })
      .catch(() => toast.error("Failed to create board"));
  };

  const onClickFigma = () => {
    mutate({
      orgId,
      title: "Untitled",
      type: "figma",
    })
      .then((id) => {
        toast.success("Figma created");
        router.push(`/figma/${id}`);
      })
      .catch(() => toast.error("Failed to create figma"));
  };

  return (
    <div className="flex flex-col">
      <button
        disabled={pending || disabled}
        onClick={onClickBoard}
        className={cn(
          "aspect-[163/100] bg-blue-600 transition-colors rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
          (pending || disabled) &&
            "opacity-75 cursor-not-allowed hover:bg-blue-600"
        )}
      >
        <div />
        <Plus className="h-12 w-12 text-white stroke-1" />
        <p className="text-xs text-white font-light">New Board</p>
      </button>
      <button
        disabled={pending || disabled}
        onClick={onClickFigma}
        className={cn(
          "mt-2 aspect-[163/100] bg-primary-green/85 hover:bg-primary-green dark:bg-primary-green/70 transition-colors rounded-lg dark:hover:bg-primary-green/90 flex flex-col items-center justify-center py-6",
          (pending || disabled) &&
            "opacity-75 cursor-not-allowed hover:bg-blue-600"
        )}
      >
        <div />
        <Plus className="h-12 w-12 text-white stroke-1" />
        <p className="text-xs text-white font-light">New Figma</p>
      </button>
    </div>
  );
};
