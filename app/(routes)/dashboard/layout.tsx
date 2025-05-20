"use client";

import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useConvex } from "convex/react";
import LowerSidebar from "./_components/lowerSidebar";
import UpperSidebar from "./_components/upperSidebar";
import MiddleSidebar from "./_components/middleSidebar";
import { DashboardDataProvider } from "@/contexts/ActiveTeamContext";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();
  const convex = useConvex();

  useEffect(() => {
    user && checkTeam();
  }, [user]);

  const checkTeam = async () => {
    const result = await convex.query(api.teams.getTeams, {
      email: user?.email,
    });
    if (!result?.length) {
      router.push("/teams/create");
    }
  };

  return (
    <DashboardDataProvider> 
      <div className="flex h-full min-h-screen">
        {/* Sidebar */}
       <div className="hidden md:flex flex-col justify-between bg-[#a9daff] p-4 h-screen w-64 top-0 z-10 border border-gray-300">
  <UpperSidebar />
  <MiddleSidebar />
  <LowerSidebar />
</div>


        {/* Main Content */}
        <div className="flex-1 bg-[#E5F4FF] p-4 overflow-auto">
          {children}
        </div>
      </div>
    </DashboardDataProvider>
  );
};

export default DashboardLayout;
