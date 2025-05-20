import React, { useState } from "react";
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
import { CircleFadingPlus, MoreHorizontal, ArchiveIcon, Eraser, UsersRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useDashboardData } from "@/contexts/ActiveTeamContext"; // ✅ use your context
import Constant from "@/app/_constants/Constant";

const FileList = () => {
  const { files, activeTeam, refreshData } = useDashboardData(); // ✅ use context values
  const { user } = useKindeBrowserClient();
  const createFile = useMutation(api.files.createFile);
  const [fileName, setFileName] = useState("");
  const router = useRouter();
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
      refreshData(); // ✅ Refresh files list after creating
      setFileName(""); // Optional: clear input
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

  return (
    <>
      <div className="flex justify-start gap-6">
        {/* Create File Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex flex-col border-2 border-dashed border-gray-500 min-w-[200px] hover:border-gray-800 hover:shadow-lg w-[17vw] h-[15vh] cursor-pointer rounded-3xl bg-gray-100 justify-center items-center mb-5">
              <CircleFadingPlus className="w-5 h-5" />
              New File
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New File</DialogTitle>
              <DialogDescription>
                <p>Give your file a unique name</p>
              </DialogDescription>
              <Input
                placeholder="Enter File Name"
                className="my-5"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <div className="flex w-full">
                  <Button
                    className="bg-cyan-600 text-white hover:bg-cyan-700 justify-center cursor-pointer"
                    disabled={fileName.length < 4}
                    onClick={() => fileCreate(fileName)}
                  >
                    Add File
                  </Button>
                </div>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Create Team Button */}
        <div
          className="flex flex-col border-2 border-dashed border-gray-500 min-w-[200px] hover:border-gray-800 hover:shadow-lg w-[17vw] h-[15vh] cursor-pointer rounded-3xl bg-gray-100 justify-center items-center mb-5"
          onClick={() => router.push("/teams/create")}
        >
          <UsersRound className="w-5 h-5" />
          Create Team
        </div>
      </div>

      {/* Files Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableCaption>A list of your recent files.</TableCaption>
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
              <TableRow key={file._id} className="cursor-pointer"
              onClick={() => router.push(`/workspace/${file._id}`)}
              >
                <TableCell>{file.name}</TableCell>
                <TableCell className="text-center">{file.createdBy}</TableCell>
                <TableCell>{getTimeAgo(file._creationTime)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreHorizontal className="text-gray-700 w-4 h-4 cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {/* Archive and Delete options */}
                      <DropdownMenuItem>
                        <ArchiveIcon className="w-4 h-4 mr-2" /> Archive
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eraser className="w-4 h-4 mr-2 text-red-500" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {files?.length === 0 && (
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
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default FileList;
