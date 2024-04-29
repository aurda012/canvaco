"use client";

import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";

import Loader from "@/components/Loader";
import { RoomProvider } from "@/liveblocks.config";
import { Layer } from "@/types/canvas";

const Room = ({
  children,
  roomId,
}: {
  children: React.ReactNode;
  roomId: string;
}) => {
  return (
    <RoomProvider
      id={roomId}
      // initialPresence is used to initialize the presence of the current user in the room.
      initialPresence={{
        cursor: null,
        selection: [],
        pencilDraft: null,
        penColor: null,
        cursorColor: null,
        message: null,
      }}
      // initialStorage is used to initialize the storage of the room.
      initialStorage={{
        // We're using a LiveMap to store the canvas objects
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layerIds: new LiveList(),
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
