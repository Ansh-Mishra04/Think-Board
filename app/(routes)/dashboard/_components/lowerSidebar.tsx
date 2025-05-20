'use client';
import { Separator } from "@/components/ui/separator";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { ArchiveIcon, File, Flag, Github, Plus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDashboardData } from "@/contexts/ActiveTeamContext"; // Import the context hook
import Constant from "@/app/_constants/Constant";

// Define TEAM type (if not imported from elsewhere)
interface TEAM {
  name: string;
  createdBy: string;
  members: string[];
  _id: string;
}

const LowerSidebar = () => {
  const { user }: any = useKindeBrowserClient();
  const { activeTeam, files, refreshData } = useDashboardData(); // Using context to get activeTeam and files
  const [fileName, setFileName] = useState("");
  const createFile = useMutation(api.files.createFile);
  const router = useRouter();

  const handleFileCreate = async () => {
    if (!activeTeam) {
      toast.error("No active team selected.");
      router.push("/teams/create");
      return;
    }

    if (!files) {
      toast.loading("Checking existing files...");
      return;
    }

    if (files.length >= Constant.MAX_FREE_COUNTS) {
      toast.error(`You can't create more than ${Constant.MAX_FREE_COUNTS} files for this team.`);
      return;
    }

    try {
      await createFile({
        name: fileName,
        teamId: activeTeam._id,
        createdBy: user?.email,
        document: "",
        canvas: "",
        archive: false
      });

      toast.success("File created successfully");
      setFileName("");
      refreshData(); // Refresh data after file is created
    } catch (err) {
      toast.error("Something went wrong while creating the file");
    }
  };

  const menuList = [
    {
      id: 1,
      name: "Getting Started",
      path: "/",
      icon: Flag,
    },
    {
      id: 2,
      name: "Github",
      path: "https://github.com/Ansh-Mishra04/Think-Board",
      icon: Github,
    },
    {
      id: 3,
      name: "Archive",
      path: "/archived",
      icon: ArchiveIcon,
    },
  ];

  return (
    <div className="">
      {/* Create File Dialog */}
      <Dialog>
        <DialogTrigger className="w-full">
          <Button className="w-full justify-start bg-cyan-600 text-white hover:bg-cyan-700 hover:text-white">
            <File />
            New File
            <Plus className="ml-auto" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New File</DialogTitle>
            <DialogDescription>
              <p>Give your file a unique name.</p>
            </DialogDescription>
            <Input
              placeholder="Enter file name"
              className="my-5"
              onChange={(e) => setFileName(e.target.value)}
            />
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <div className="flex w-full">
                <Button
                  className="bg-cyan-600 text-white hover:bg-cyan-700 hover:text-white justify-center cursor-pointer"
                  disabled={!fileName || fileName.length < 3}
                  onClick={handleFileCreate}
                >
                  Add File
                </Button>
              </div>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Separator className="my-2 bg-gray-200" />

      {/* Menu List */}
      <div>
        {menuList.map((menu) => (
          <div
            key={menu.id}
            className="flex flex-row items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer text-sm rounded-lg"
          >
            <menu.icon size={20} />
            <div>{menu.name}</div>
          </div>
        ))}
      </div>

      <Separator className="my-2 bg-gray-200" />

      {/* User Info */}
      {user && (
        <div
          className="flex flex-row items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer text-sm rounded-lg"
          key="user"
        >
          {user.picture && (
            <Image
              src={user.picture}
              alt="User"
              width={30}
              height={30}
              className="rounded-full mr-2"
            />
          )}
          <div>
            {user?.given_name} {user?.family_name}
            <div className="text-xs text-gray-500">{user?.email}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LowerSidebar;
