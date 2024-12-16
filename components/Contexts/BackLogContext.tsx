"use client";

import { BackLogDto } from "@/Utils/types";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { useGetMyProductBackLogs } from "../BackLogComponents/hooks";
import { CreateProductBackLog } from "@/lib/actions/ProductBackLogActions";
import { useWorkSpaceContext } from "./WorkSpaceContext";
import { notifications } from "@mantine/notifications";

export type BackLogContextType = {
  myBackLogs: BackLogDto[] | null;
  backLogLoading: boolean;
  selectedBackLog: BackLogDto | null;
  setSelectedBackLog: Dispatch<SetStateAction<BackLogDto | null>>;
  handleCreateBackLog: (
    e: React.FormEvent,
    backlogName: string | undefined,
    description: string | undefined,
    close: () => void
  ) => Promise<void>;
  loading: boolean;
};

const BackLogContext = createContext<BackLogContextType>(
  {} as BackLogContextType
);

export const useBackLogContext = () => {
  if (BackLogContext === undefined) {
    throw new Error(
      `Error at BackLogContext, You probably forgot to wrap the consumer component with the Issues Context`
    );
  } else {
    return useContext(BackLogContext);
  }
};

const BackLogProvider = ({ children }: { children: React.ReactNode }) => {
  const { projectInfo } = useWorkSpaceContext();
  const {
    myBackLogs,
    loading: backLogLoading,
    setMyBackLogs,
  } = useGetMyProductBackLogs({ projectId: projectInfo.project._id });
  const [selectedBackLog, setSelectedBackLog] = useState<BackLogDto | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateBackLog = async (
    e: React.FormEvent,
    backlogName: string | undefined,
    description: string | undefined,
    close: () => void
  ): Promise<void> => {
    setLoading(true);
    e.preventDefault();
    try {
      const newBacklog = await CreateProductBackLog(
        projectInfo.project._id,
        backlogName,
        description
      );
      if (newBacklog) {
        setMyBackLogs((prevBackLogs) => [
          ...(prevBackLogs || []),
          newBacklog.backLog,
        ]);
      }
      notifications.show({ message: `${backlogName} created`, color: "green" });
    } catch (error) {
      console.error("Failed to create backlog:", error);
    } finally {
      setLoading(false);
      close();
    }
  };

  const value = useMemo(
    () => ({
      myBackLogs,
      backLogLoading,
      selectedBackLog,
      setSelectedBackLog,
      handleCreateBackLog,
      loading,
    }),
    [
      myBackLogs,
      backLogLoading,
      selectedBackLog,
      setSelectedBackLog,
      handleCreateBackLog,
      loading,
    ]
  );

  return (
    <BackLogContext.Provider value={value}>{children}</BackLogContext.Provider>
  );
};

export default BackLogProvider;
