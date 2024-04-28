"use client";

import { LiveMap } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";

import Loader from "@/components/Loader";
import { RoomProvider } from "@/liveblocks.config";

const Room = ({ children }: { children: React.ReactNode }) => {
  return (
    <RoomProvider
      id="fig-room"
      // initialPresence is used to initialize the presence of the current user in the room.
      initialPresence={{ cursor: null, cursorColor: null, editingText: null }}
      // initialStorage is used to initialize the storage of the room.
      initialStorage={{
        // We're using a LiveMap to store the canvas objects
        canvasObjects: new LiveMap(),
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default Room;
