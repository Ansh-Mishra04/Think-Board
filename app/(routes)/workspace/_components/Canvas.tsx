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

  

  return (
    <div className="w-full h-full custom-styles">
      { fileData &&<Excalidraw
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
          {/* <MainMenu.DefaultItems.ClearCanvas /> */}
          <MainMenu.DefaultItems.SearchMenu />
          <MainMenu.DefaultItems.SaveAsImage />
          <MainMenu.DefaultItems.Help />
          <MainMenu.DefaultItems.ChangeCanvasBackground />
          <MainMenu.Separator />
          <MainMenu.Item
            onClick={() =>
              window.open("https://github.com/Ansh-Mishra04/draw-tools")
            }
            icon={<Github width={16} />}
          >
            Github
          </MainMenu.Item>
        </MainMenu>
        <WelcomeScreen>
          <WelcomeScreen.Center>
            <WelcomeScreen.Center.Logo>
              <img
                src="https://i.ibb.co/vCmPKKGF/logo1.png"
                alt="logo"
                width={120}
              />
            </WelcomeScreen.Center.Logo>
            <WelcomeScreen.Center.Heading>
              Welcome to Think Board!
            </WelcomeScreen.Center.Heading>
            <WelcomeScreen.Center.Menu>
              <WelcomeScreen.Center.MenuItemLink
                href="https://github.com/Ansh-Mishra04/Think-Board"
                icon={<Github width={16} />}
                shortcut={"⌘G"}
              >
                Think-Board GitHub
              </WelcomeScreen.Center.MenuItemLink>
              <WelcomeScreen.Center.MenuItemHelp />
            </WelcomeScreen.Center.Menu>
          </WelcomeScreen.Center>
          <WelcomeScreen.Hints.ToolbarHint>
            <p> ToolBar Hints </p>
          </WelcomeScreen.Hints.ToolbarHint>
          <WelcomeScreen.Hints.MenuHint />
          <WelcomeScreen.Hints.HelpHint />
        </WelcomeScreen>

      </Excalidraw>}
    </div>
  );
}
