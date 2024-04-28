"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const EmptyBoards = () => {
  const router = useRouter();
  const { mutate, pending } = useApiMutation(api.board.create);
  const { organization } = useOrganization();

  const onClickBoard = () => {
    if (!organization) return;
    mutate({
      title: "Untitled",
      orgId: organization.id,
      type: "board",
    })
      .then((id) => {
        toast.success("Board created");
        router.push(`/board/${id}`);
      })
      .catch(() => toast.error("Failed to create board"));
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/assets/note.svg" height={140} width={140} alt="Empty" />
      <h2 className="text-2xl font-semibold mt-6">Create your first board!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a board for your organization
      </p>
      <div className="mt-6 flex gap-2">
        <Button
          className="disabled:cursor-not-allowed dark:bg-white dark:text-black bg-black text-white"
          disabled={pending}
          onClick={onClickBoard}
          size="lg"
        >
          Create Board
        </Button>
        <Button
          className="disabled:cursor-not-allowed bg-primary-green/90 text-white font-semibold"
          disabled={pending}
          onClick={() => {}}
          size="lg"
        >
          Create Fig
        </Button>
      </div>
    </div>
  );
};
