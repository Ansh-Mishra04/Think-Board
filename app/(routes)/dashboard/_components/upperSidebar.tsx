"use client";

import Image from "next/image";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ChevronDown,
  ChevronRight,
  Circle,
  Files,
  LayoutGrid,
  LogOutIcon,
  Settings,
  Users,
} from "lucide-react";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useDashboardData } from "@/contexts/ActiveTeamContext";
import { TEAM } from "@/contexts/ActiveTeamContext";

const UpperSidebar = () => {
  const { activeTeam, setActiveTeam, teams } = useDashboardData();
  const router = useRouter();
  const { user }: any = useKindeBrowserClient();

  const getRandomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  const menu = [
    {
      id: 1,
      name: "Create Team",
      path: "/teams/create",
      icon: Users,
    },
    {
      id: 2,
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  const onMenuClick = (item: any) => {
    if (item.path) router.push(item.path);
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex bg-gray-200 hover:bg-cyan-100 p-2 rounded-md cursor-pointer min-w-[220px] items-center">
            <Image src="/logo1.png" alt="logo" width={30} height={30} />
            <h2 className="font-medium w-full ml-2">
              {activeTeam?.name || "Select Team"}
            </h2>
            <ChevronDown className="ml-auto mt-1 size-5" />
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div>
            {teams.map((item: TEAM) => (
              <div
                key={item._id}
                onClick={() => setActiveTeam(item)}
                className={`flex flex-row items-center justify-between gap-2 p-2 my-2 cursor-pointer text-sm rounded-lg ${
                  activeTeam?._id === item._id
                    ? "bg-cyan-600 text-white font-bold hover:bg-cyan-700"
                    : "hover:bg-cyan-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Circle
                    className="size-2 mt-0.5 text-gray-800"
                    style={{ fill: getRandomColor() }}
                  />
                  {item.name}
                </div>
                <ChevronRight className="size-3 text-end" />
              </div>
            ))}
          </div>

          <Separator className="m-2" />

          {menu.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer text-sm rounded-lg"
              onClick={() => onMenuClick(item)}
            >
              <item.icon className="size-3" />
              {item.name}
            </div>
          ))}

          <LogoutLink>
            <div className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer text-sm rounded-lg">
              <LogOutIcon className="size-3" />
              LogOut
            </div>
          </LogoutLink>

          <Separator className="m-2" />

          {user && (
            <div className="flex items-center gap-2 p-2 text-sm rounded-lg">
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
                {user.given_name} {user.family_name}
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>

      <div className="mt-10">
        <Button
          className="w-full justify-start gap-4 font-bold bg-gray-100 cursor-pointer border border-white hover:border-black hover:text-cyan-800"
          variant="outline"
        >
          <LayoutGrid />
          All Files <Files className="ml-auto" />
        </Button>
      </div>
    </div>
  );
};

export default UpperSidebar;
