"use client";

import LeftSidebar from "@/components/LeftSidebar";
import Live from "@/components/Live";
import Navbar from "@/components/Navbar";
import RightSidebar from "@/components/RightSidebar";
import { defaultNavElement } from "@/constants";
import { handleDelete } from "@/lib/key-events";
import { handleImageUpload } from "@/lib/shapes";
import { useMutation, useRedo, useStorage, useUndo } from "@/liveblocks.config";
import { ActiveElement, Attributes } from "@/types/type";
import { useRef, useState } from "react";

const App = () => {
  /* useUndo and useRedo are hooks provided by Liveblocks that allow you to
   undo and redo mutations. */
  const undo = useUndo();
  const redo = useRedo();

  /* useStorage is a hook provided by Liveblocks that allows you to store
   data in a key-value store and automatically sync it with other users
   Over here, we are storing the canvas objects in the key-value store. */
  const canvasObjects = useStorage((root) => root.canvasObjects);

  // canvasRef is a reference to the canvas element that we'll use to init the fabric canvas.
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* fabricRef is a reference to the fabric canvas that we use to perform
   operations on the canvas. It's a copy of the created canvas so we can use
   it outside the canvas event listeners. */
  const fabricRef = useRef<fabric.Canvas | null>(null);

  /* isDrawing is a boolean that tells us if the user is drawing on the canvas.
   We use this to determine if the user is drawing or not
   i.e., if the freeform drawing mode is on or not. */
  const isDrawing = useRef(false);

  /* shapeRef is a reference to the shape that the user is currently drawing.
   We use this to update the shape's properties when the user is
   drawing/creating shape */
  const shapeRef = useRef<fabric.Object | null>(null);

  /* selectedShapeRef is a reference to the shape that the user has selected.
   For example, if the user has selected the rectangle shape, then this will
   be set to "rectangle".

   We're using refs here because we want to access these variables inside the
   event listeners. We don't want to lose the values of these variables when
   the component re-renders. Refs help us with that. */
  const selectedShapeRef = useRef<string | null>(null);

  /* activeObjectRef is a reference to the active/selected object in the canvas
   We want to keep track of the active object so that we can keep it in
   selected form when user is editing the width, height, color etc
   properties/attributes of the object.
   
   Since we're using live storage to sync shapes across users in real-time,
   we have to re-render the canvas when the shapes are updated.
   Due to this re-render, the selected shape is lost. We want to keep track
   of the selected shape so that we can keep it selected when the
   canvas re-renders. */
  const activeObjectRef = useRef<fabric.Object | null>(null);
  const isEditingRef = useRef(false);

  /* imageInputRef is a reference to the input element that we use to upload
   an image to the canvas.
  
   We want image upload to happen when clicked on the image item from the
   dropdown menu. So we're using this ref to trigger the click event on the
   input element when the user clicks on the image item from the dropdown. */
  const imageInputRef = useRef<HTMLInputElement>(null);

  /* activeElement is an object that contains the name, value and icon of the
   active element in the navbar. */
  const [activeElement, setActiveElement] = useState<ActiveElement>({
    name: "",
    value: "",
    icon: "",
  });

  /* elementAttributes is an object that contains the attributes of the selected
  element in the canvas.
   
   We use this to update the attributes of the selected element when the user
   is editing the width, height, color etc properties/attributes of the
   object. */
  const [elementAttributes, setElementAttributes] = useState<Attributes>({
    width: "",
    height: "",
    fontSize: "",
    fontFamily: "",
    fontWeight: "",
    fill: "#aabbcc",
    stroke: "#aabbcc",
  });

  /* deleteShapeFromStorage is a mutation that deletes a shape from the
   key-value store of liveblocks. useMutation is a hook provided by 
   Liveblocks that allows you to perform mutations on liveblocks data.
  
   We're using this mutation to delete a shape from the key-value store when
   the user deletes a shape from the canvas. */
  const deleteShapeFromStorage = useMutation(({ storage }, shapeId) => {
    /* canvasObjects is a Map that contains all the shapes in the key-value.
     Like a store. We can create multiple stores in liveblocks. */
    const canvasObjects = storage.get("canvasObjects");
    canvasObjects.delete(shapeId);
  }, []);

  /* deleteAllShapes is a mutation that deletes all the shapes from the
   key-value store of liveblocks.
   
   We're using this mutation to delete all the shapes from the key-value 
   store when the user clicks on the reset button. */
  const deleteAllShapes = useMutation(({ storage }) => {
    // get the canvasObjects store
    const canvasObjects = storage.get("canvasObjects");
    // if the store doesn't exist or is empty, return
    if (!canvasObjects || canvasObjects.size === 0) return true;
    // delete all the shapes from the store
    for (const [key, value] of canvasObjects.entries()) {
      canvasObjects.delete(key);
    }
    // return true if the store is empty
    return canvasObjects.size === 0;
  }, []);

  /* syncShapeInStorage is a mutation that syncs the shape in the key-value
   store of liveblocks.

   We're using this mutation to sync the shape in the key-value store
   whenever user performs any action on the canvas such as drawing, moving
   editing, deleting etc. */
  const syncShapeInStorage = useMutation(({ storage }, object) => {
    // if the passed object is null, return
    if (!object) return;
    const { objectId } = object;

    /* Turn Fabric object (kclass) into JSON format so that we can store it in the
     key-value store. */
    const shapeData = object.toJSON();
    shapeData.objectId = objectId;

    const canvasObjects = storage.get("canvasObjects");
    // set is a method provided by Liveblocks that allows you to set a value
    canvasObjects.set(objectId, shapeData);
  }, []);

  /* Set the active element in the navbar and perform the action based
   on the selected element. */
  const handleActiveElement = (elem: ActiveElement) => {
    setActiveElement(elem);

    switch (elem?.value) {
      // delete all the shapes from the canvas
      case "reset":
        // clear the storage
        deleteAllShapes();
        // clear the canvas
        fabricRef.current?.clear();
        // set "select" as the active element
        setActiveElement(defaultNavElement);
        break;

      // delete the selected shape from the canvas
      case "delete":
        // delete it from the canvas
        handleDelete(fabricRef.current as any, deleteShapeFromStorage);
        // set "select" as the active element
        setActiveElement(defaultNavElement);
        break;

      // upload an image to the canvas
      case "image":
        // trigger the click event on the input element which opens the file dialog
        imageInputRef.current?.click();
        /* set drawing mode to false. If the user is drawing on the canvas, we want
         to stop the drawing mode when clicked on the image item from the dropdown. */
        isDrawing.current = false;

        if (fabricRef.current) {
          // disable the drawing mode of canvas
          fabricRef.current.isDrawingMode = false;
        }
        break;

      // for comments, do nothing
      case "comments":
        break;

      default:
        // set the selected shape to the selected element
        selectedShapeRef.current = elem?.value as string;
        break;
    }
  };

  return (
    <main className="h-screen overflow-hidden">
      <Navbar
        imageInputRef={imageInputRef}
        activeElement={activeElement}
        handleImageUpload={(e: any) => {
          // prevent the default behavior of the input element
          e.stopPropagation();

          handleImageUpload({
            file: e.target.files[0],
            canvas: fabricRef as any,
            shapeRef,
            syncShapeInStorage,
          });
        }}
        handleActiveElement={handleActiveElement}
      />

      <section className="flex h-full flex-row">
        <LeftSidebar />

        <Live canvasRef={canvasRef} undo={undo} redo={redo} />

        <RightSidebar />
      </section>
    </main>
  );
};
export default App;
