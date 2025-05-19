"use client";
import React, { useEffect, useState } from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Image from "next/image";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@/components/ui/button";
import { Link2, Save } from "lucide-react";
import Document from "../_components/Document";
import Canvas from "../_components/Canvas";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Excalidraw } from "@excalidraw/excalidraw";
import dynamic from "next/dynamic";
const  ExcalidrawClient = dynamic(() => import("../_components/Canvas"), {
  ssr: false,
});

const WorkSpace = ({ params }: any) => {
  const [layout, setLayout] = useState("both");
  const { user }: any = useKindeBrowserClient();
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
    "horizontal"
  );
  const [save, setSave] = useState(false);
  const [fileData, setFileData] = useState<any>(null);
  const handleLayoutChange = (newLayout: any) => {
    setLayout(newLayout);
  };
  const handleSave = () => {
    setSave(true);
  };
  const convex = useConvex();

  const getFileData = async () => {
    const result = await convex.query(api.files.getFileById, {
      _id: params.fileId,
    });
    setFileData(result);
    console.log(result);
  };

  useEffect(() => {
    params.fileId && getFileData();
  }, []);
  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-300 shadow-2xl p-2 bg-[#c5e7ff]">
        <div className="flex items-center gap-3">
          <Image src="/logo1.png" alt="logo" width={40} height={40} />
          <h2 className="text-lg font-bold">{fileData?.name}</h2>
        </div>
        <div className="flex items-center rounded bg-white">
          <span
            className="border hover:bg-cyan-100 border-gray-500 px-2 py-1 text-[14px] rounded-l cursor-pointer font-medium min-w-20 text-center"
            onClick={() => setLayout("document")}
          >
            Document
          </span>
          <span
            className="border hover:bg-cyan-100 border-gray-500 px-2 py-1 text-[14px] cursor-pointer font-medium min-w-20 text-center"
            onClick={() => setLayout("both")}
          >
            Both
          </span>
          <span
            className="border hover:bg-cyan-100 border-gray-500 px-2 py-1 text-[14px] rounded-r cursor-pointer font-medium min-w-20 text-center"
            onClick={() => setLayout("canvas")}
          >
            Canvas
          </span>
        </div>
        <div className="flex items-center gap-6 mr-3">
          <Button
            className="text-[12px] bg-gray-600 hover:bg-gray-700 cursor-pointer h-8"
            onClick={handleSave}
          >
            Save <Save />
          </Button>
          <Button className="text-[12px] bg-cyan-600 hover:bg-cyan-700 cursor-pointer h-8">
            Share <Link2 />
          </Button>
        </div>
      </div>

      {/* Content Area (Document and Canvas) */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction={orientation} className="h-full border-r">
          {layout === "both" && (
            <>
              <ResizablePanel
                minSize={20}
                className="h-full "
                defaultSize={30}
              >
                <Document
                  onSaveTrigger={save}
                  onSaveHandled={() => setSave(false)}
                  fileId={params.fileId}
                  fileData={fileData}
                />
              </ResizablePanel>
              <ResizableHandle  />
              <ResizablePanel minSize={20} className="h-full border-l bg-[#E5F4FF]">
                <ExcalidrawClient onSaveTrigger={save} onSaveHandled={() => setSave(false)}
                  fileId={params.fileId}
                  fileData={fileData}/>
                {/* <div className="excalidraw-container">
                  <Excalidraw />
                </div> */}
              </ResizablePanel>
            </>
          )}

          {layout === "document" && (
            <>
              <ResizablePanel
                minSize={100}
                style={{ width: "100%" }}
                className="h-full "
              >
                <Document
                  onSaveTrigger={save}
                  onSaveHandled={() => setSave(false)}
                  fileId={params.fileId}
                  fileData={fileData}
                />
              </ResizablePanel>
            </>
          )}

          {layout === "canvas" && (
            <>
              <ResizablePanel
                minSize={100}
                style={{ width: "100%" }}
                className="h-full "
              >
                <ExcalidrawClient />
                {/* <div className="excalidraw-container">
                  <Excalidraw />
                </div> */}
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default WorkSpace;
