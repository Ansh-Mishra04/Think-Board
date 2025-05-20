"use client";

import { api } from "@/convex/_generated/api";
import {
  Excalidraw,
  MainMenu,
  WelcomeScreen,
} from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { useMutation } from "convex/react";
import { Github } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Canvas({
  onSaveTrigger,
  onSaveHandled,
  fileData,
  fileId,
}: any) {
  const [canvas, setCanvas] = useState<any | null>(null);

  const updateCanvas = useMutation(api.files.updateCanvas);

  // Load canvas from fileData
  useEffect(() => {
    if (fileData?.canvas) {
      try {
        const parsed = JSON.parse(fileData.canvas);
        setCanvas(parsed); // Set initial canvas elements
      } catch (err) {
        console.error("Failed to parse canvas:", err);
      }
    }
  }, [fileData]);

  // Save logic
  useEffect(() => {
    if (onSaveTrigger) {
      saveCanvas();
      onSaveHandled();
    }
  }, [onSaveTrigger]);

  const saveCanvas = () => {
    updateCanvas({ _id: fileId, canvas: JSON.stringify(canvas) })
      .then(() => toast.success("Saved Successfully"))
      .catch((e) => {
        toast.error("An error occurred while saving");
        console.error(e);
      });
  };

  const handleChange = (elements: any) => {
    setCanvas(elements);
  };

  // Avoid rendering until canvas is loaded
  if (canvas === null) return <div>Loading canvas...</div>;

  return (
    <div className="w-full h-full">
      <Excalidraw
        onChange={handleChange}
        initialData={{
          elements: canvas,
          appState: {
            zenModeEnabled: false,
            viewBackgroundColor: "#E5F4FF",
          },
          scrollToContent: true,
        }}
        UIOptions={{
          canvasActions: {
            saveToActiveFile: false,
            loadScene: false,
            export: false,
            toggleTheme: false,
          },
        }}
      >
        <MainMenu>
          <MainMenu.DefaultItems.ClearCanvas />
          <MainMenu.DefaultItems.Help />
          <MainMenu.DefaultItems.SaveAsImage />
          <MainMenu.DefaultItems.SearchMenu />
          <MainMenu.Item
            onClick={() =>
              window.open("https://github.com/Ansh-Mishra04/draw-tools")
            }
            icon={<Github width={16} />}
          >
            Github
          </MainMenu.Item>
        </MainMenu>
      </Excalidraw>
    </div>
  );
}
