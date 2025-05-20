'use client';
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CircleFadingPlus, MoreHorizontal, ArchiveIcon, Eraser, UsersRound, ArchiveX, ArchiveRestore } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useDashboardData } from "@/contexts/ActiveTeamContext"; 
import Constant from "@/app/_constants/Constant";
import Header from "../_components/header";

const FileList = () => {
  const {  activeTeam, refreshData,loading } = useDashboardData(); 
  const [files, setFiles] = useState<any>();
  const { user } = useKindeBrowserClient();
  const createFile = useMutation(api.files.createFile);
  const [fileName, setFileName] = useState("");
  const router = useRouter();


    const archivedFiles = async () => {
      const result = await convex.query(api.files.archived, {
        email: user?.email!
      });
      setFiles(result);
      console.log(result);
    };

    useEffect(() => {
      user&&archivedFiles();
    },[user]);
  // Function to create a file
  const fileCreate = async (name: string) => {
    if (!activeTeam) {
      router.push("/teams/create");
      return;
    }
    if(files.length >= Constant.MAX_FREE_COUNTS){
      toast.error(`You can't create more than ${Constant.MAX_FREE_COUNTS} files for this team.`);
      return;
    }
    try {
      
      await createFile({
        name: fileName,
        teamId: activeTeam._id,
        createdBy: user?.email!,
        document:"",
        canvas:"",
        archive:false
      });
      toast.success("File Created Successfully");
      refreshData(); 
      setFileName("");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // Function to format time ago
  const getTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days >= 1) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours >= 1) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes >= 1) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  };
  const convex = useConvex();
const archiveFile =useMutation(api.files.archiveFile);
const deleteFile =useMutation(api.files.deleteFile);
const handleArchive = async (fileId: any) => {
  archiveFile({
    _id: fileId,
    archive: false
  }).then(() => {
    toast.success("File Restored Successfully");
    refreshData();
  }).catch((e) => {
    toast.error("An error occurred while restoring");
    console.error(e);
  });
} 

const handleDelete = async(fileId:any) => {
  deleteFile({
    _id: fileId
  }).then(() => {
    toast.success("File Deleted Successfully");
    refreshData();
  }).catch((e) => {
    toast.error("An error occurred while deleting");
    console.error(e);
  });
}

  return (
    <>
    
    <div className="flex justify-end">
        <Header /> 
    </div>
 

      {/* Files Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableCaption>List of Files from {activeTeam?.name}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">File Name</TableHead>
              <TableHead className="text-center">Owner</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Options</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files?.map((file: any) => (
              <TableRow key={file._id} 
              >
                <TableCell 
                className="cursor-pointer"
                onClick={() => router.push(`/workspace/${file._id}`)}

                >{file.name}</TableCell>
                <TableCell className="text-center">{file.createdBy}</TableCell>
                <TableCell>{getTimeAgo(file._creationTime)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreHorizontal className="text-gray-700 w-4 h-4 cursor-pointer  hover:scale-120 hover:text-cyan-500" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {/* Archive and Delete options */}
                      <DropdownMenuItem onClick={() => handleArchive(file._id)}>
                        <ArchiveRestore className="w-4 h-4 mr-2" /> Restore
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(file._id)}>
                        <Eraser className="w-4 h-4 mr-2 text-red-500" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {loading&& (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  <div className=" p-4">
  <div className="animate-pulse">
    <div className="flex cursor-pointer py-2">
      <div className="flex-1 bg-gray-200 h-6 rounded-md"></div>
      <div className="flex-1 text-center bg-gray-200 h-6 rounded-md mx-2"></div>
      <div className="flex-1 bg-gray-200 h-6 rounded-md"></div>
      <div className="flex-1 bg-gray-200 h-6 rounded-md"></div>
    </div>
  </div>
  <div className="animate-pulse">
    <div className="flex cursor-pointer py-2">
      <div className="flex-1 bg-gray-200 h-6 rounded-md"></div>
      <div className="flex-1 text-center bg-gray-200 h-6 rounded-md mx-2"></div>
      <div className="flex-1 bg-gray-200 h-6 rounded-md"></div>
      <div className="flex-1 bg-gray-200 h-6 rounded-md"></div>
    </div>
  </div>
  <div className="animate-pulse">
    <div className="flex cursor-pointer py-2">
      <div className="flex-1 bg-gray-200 h-6 rounded-md"></div>
      <div className="flex-1 text-center bg-gray-200 h-6 rounded-md mx-2"></div>
      <div className="flex-1 bg-gray-200 h-6 rounded-md"></div>
      <div className="flex-1 bg-gray-200 h-6 rounded-md"></div>
    </div>
  </div>
</div>
                </TableCell>
              </TableRow>
            )}
            {!loading && files.length === 0&&  (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  <strong className="text-gray-400">No Files Found</strong>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default FileList;
