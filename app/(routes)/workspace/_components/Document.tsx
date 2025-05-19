"use client";
import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
// @ts-ignore
import LinkTool from "@editorjs/link";
// @ts-ignore
import RawTool from "@editorjs/raw";
// @ts-ignore
import Checklist from "@editorjs/checklist";
import EditorjsList from "@editorjs/list";
// @ts-ignore
import Embed from "@editorjs/embed";
import Quote from "@editorjs/quote";
// @ts-ignore
import editorjsCodeflask from "@calumk/editorjs-codeflask";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const defaultData = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "header",
      data: {
        text: "New Document",
        level: 1,
      },
      id: "123",
    },
  ],
};

const Document = ({
  onSaveTrigger,
  onSaveHandled,
  fileId,
  fileData,
}: {
  onSaveTrigger: boolean;
  onSaveHandled: () => void;
  fileId: string;
  fileData: any;
}) => {
  const ref = useRef<EditorJS | null>(null);
  const updateDocument = useMutation(api.files.updateDocument);

  // Initialize Editor only when fileData is ready
  useEffect(() => {
    if (fileData) {
      const parsedData = JSON.parse(fileData.document || JSON.stringify(defaultData));
      initEditor(parsedData);
    }

    return () => {
      // Clean up editor on unmount
      if (ref.current) {
        ref.current.destroy();
        ref.current = null;
      }
    };
  }, [fileData]);

  // Handle external save trigger
  useEffect(() => {
    if (onSaveTrigger) {
      onSaveDocument();
      onSaveHandled();
    }
  }, [onSaveTrigger]);

  // Editor initialization
  const initEditor = async (editorData: any) => {
    // Clean up previous instance if exists
    if (ref.current) {
      await ref.current.destroy();
      ref.current = null;
    }

    const editor = new EditorJS({
      holder: "editorjs",
      autofocus: true,
      data: editorData,
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: "Enter a title",
            levels: [1, 2, 3, 4, 5, 6],
            defaultLevel: 1,
          },
        },
        link: LinkTool,
        raw: RawTool,
        checklist: Checklist,
        list: EditorjsList,
        embed: Embed,
        quote: {
          class: Quote,
          inlineToolbar: true,
          config: {
            quotePlaceholder: "Enter a quote",
            captionPlaceholder: "Quote's author",
          },
        },
        code: editorjsCodeflask,
      },
    });

    ref.current = editor;
  };

  // Save handler
  const onSaveDocument = () => {
    if (ref.current) {
      ref.current
        .save()
        .then((outputData) => {
          updateDocument({
            _id: fileId,
            document: JSON.stringify(outputData),
          })
            .then(() => {
              toast.success("Document Saved Successfully");
            })
            .catch(() => {
              toast.error("Something went wrong");
            });
        })
        .catch((error) => {
          console.error("Saving failed: ", error);
        });
    }
  };

  return (
    <div className="h-full overflow-hidden bg-[#E5F4FF]">
      <div id="editorjs" className="h-full max-h-full overflow-y-auto pl-14" />
    </div>
  );
};

export default Document;
