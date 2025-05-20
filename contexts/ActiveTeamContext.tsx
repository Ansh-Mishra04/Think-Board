'use client';
import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex } from 'convex/react';
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface TEAM {
  name: string;
  createdBy: string;
  members: string[];
  _id: string;
}

type DashboardDataContextType = {
  activeTeam: TEAM | null;
  setActiveTeam: (team: TEAM | null) => void;
  teams: TEAM[];
  files: any[];
  loading: boolean;
  refreshData: () => void;
};

export const DashboardDataContext = createContext<DashboardDataContextType | undefined>(undefined);

export const DashboardDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeTeam, setActiveTeam] = useState<TEAM | null>(null);
  const [teams, setTeams] = useState<TEAM[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const convex = useConvex();
  const { user }: any = useKindeBrowserClient();

  const fetchData = async () => {
    setLoading(true);
    try {
      const fetchedTeams: TEAM[] = user
        ? await convex.query(api.teams.getTeams, { email: user.email })
        : [];

      setTeams(fetchedTeams);

      const storedTeamId = localStorage.getItem('teamId');
      const matchedTeam = fetchedTeams.find((t) => t._id === storedTeamId);

      const selectedTeam = matchedTeam || fetchedTeams[0] || null;
      setActiveTeam(selectedTeam);

      if (selectedTeam) {
        const fetchedFiles = await convex.query(api.files.getFiles, { teamId: selectedTeam._id });
        setFiles(fetchedFiles);
        localStorage.setItem('teamId', selectedTeam._id);
      } else {
        setFiles([]);
        localStorage.removeItem('teamId');
      }
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  const setActiveTeamAndStore = (team: TEAM | null) => {
    setActiveTeam(team);
    if (team) {
      localStorage.setItem('teamId', team._id);
    } else {
      localStorage.removeItem('teamId');
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    if (activeTeam) {
      convex
        .query(api.files.getFiles, { teamId: activeTeam._id })
        .then(setFiles)
        .catch(console.error);
    }
  }, [activeTeam]);

  return (
    <DashboardDataContext.Provider
      value={{
        activeTeam,
        setActiveTeam: setActiveTeamAndStore,
        teams,
        files,
        loading,
        refreshData: fetchData,
      }}
    >
      {children}
    </DashboardDataContext.Provider>
  );
};

export const useDashboardData = () => {
  const context = useContext(DashboardDataContext);
  if (context === undefined) {
    throw new Error('useDashboardData must be used within a DashboardDataProvider');
  }
  return context;
};
