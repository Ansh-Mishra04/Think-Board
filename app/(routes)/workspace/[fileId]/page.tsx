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
import { ArchiveIcon, Copy, LayoutDashboard, Link2, MoreHorizontal, Save } from "lucide-react";
import Document from "../_components/Document";
import Canvas from "../_components/Canvas";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Excalidraw } from "@excalidraw/excalidraw";
import dynamic from "next/dynamic";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";


const  ExcalidrawClient = dynamic(() => import("../_components/Canvas"), {
  ssr: false,
});


const WorkSpace = ({ params }: any) => {

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast.success("Copied to clipboard");
    })
  }
  const router = useRouter();
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
      <div className="flex items-center justify-between border-b-2 border-gray-300 shadow-2xl p-2 bg-[#E5f4f9]">
        <div className="flex items-center gap-3">
          <a href="/dashboard">
          <Image src="/logo1.png" alt="logo" width={40} height={40} />
          </a>
          <h2 className="text-lg font-bold text-gray-600">{fileData?.name || "Untitled"}</h2>
          <div className="flex justify-center items-center">
            <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreHorizontal className="text-gray-700 w-4 h-4 cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => {router.push("/dashboard")}}>
                        <LayoutDashboard className="w-4 h-4 mr-2 font-medium" /> Dashboard
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
          </div>
        </div>
        <div className="flex items-center rounded bg-white">
      <span
        className={`border px-2 py-1 text-[14px] rounded-l cursor-pointer font-medium min-w-20 text-center ${
          layout === "document"            
            ? "bg-cyan-700 text-white" 

            : "border-gray-200 hover:bg-cyan-100"
        }`}
        onClick={() => setLayout("document")}
      >
        Document
      </span>
      <span
        className={`border px-2 py-1 text-[14px] cursor-pointer font-medium min-w-20 text-center ${
          layout === "both"
            ? "bg-cyan-700 text-white" 
            : "border-gray-200 hover:bg-cyan-100"
        }`}
        onClick={() => setLayout("both")}
      >
        Both
      </span>
      <span
        className={`border px-2 py-1 text-[14px] rounded-r cursor-pointer font-medium min-w-20 text-center ${
          layout === "canvas"
            ? "bg-cyan-700 text-white" 

            : "border-gray-200 hover:bg-cyan-100"
        }`}
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
          

            <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button className="text-[12px] bg-cyan-600 hover:bg-cyan-700 cursor-pointer h-8"
          onClick={copyToClipboard}
          >
            Share <Link2 />
          </Button>

                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {/* Archive and Delete options */}
                      <DropdownMenuItem>
                            <input type="text" value={window.location.href} className="w-full" disabled/>
                            <Button className="text-[12px] bg-cyan-600 hover:bg-cyan-700 cursor-pointer h-8" onClick={copyToClipboard}><Copy className="text-white" /></Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
        </div>
      </div>

      {/* Content Area (Document and Canvas) */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction={orientation} className="h-full border-r">
          {layout === "both" && (
            <>
              <ResizablePanel
                minSize={20}
                className="h-full bg-[#E5F4FF]"
                defaultSize={30}
                
              >
                <Document
                  onSaveTrigger={save}
                  onSaveHandled={() => setSave(false)}
                  fileId={params.fileId}
                  fileData={fileData}
                />
              </ResizablePanel>
              <ResizableHandle  withHandle className="bg-gray-400 w-0.5" />
              <ResizablePanel minSize={20} 
              className="h-full bg-[#E5F4FF]"
              >
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
                className="h-full"
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
                  <ExcalidrawClient onSaveTrigger={save} onSaveHandled={() => setSave(false)}
                  fileId={params.fileId}
                  fileData={fileData}/>
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
