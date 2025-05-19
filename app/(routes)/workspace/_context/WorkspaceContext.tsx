import { createContext, useContext } from "react";


type WorkspaceDataContextType = {
    workspaceId: string,
    setWorkspaceId: (workspaceId: string) => void,
    layout:string,
    setLayout:(layout:string) => void,
}


export const WorkspaceDataContext = createContext<WorkspaceDataContextType | undefined>(undefined);

export const useWorkspaceData = () => {
    const context = useContext(WorkspaceDataContext);
    if (context === undefined) {
      throw new Error('useWorkspaceData must be used within a WorkspaceDataProvider');
    }
    return context;
  };