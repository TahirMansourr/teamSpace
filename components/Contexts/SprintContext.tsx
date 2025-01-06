"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useBackLogContext } from "./BackLogContext";
import { BackLogDto } from "@/Utils/types";
import { CreateSprint, PopulateSprints } from "@/lib/actions/SprintActions";
import { useWorkSpaceContext } from "./WorkSpaceContext";
import { notifications } from "@mantine/notifications";

type SprintContextDTO = {
  selectedBackLog: BackLogDto | null;
  setSelectedBackLog: Dispatch<SetStateAction<BackLogDto | null>>;
  myBackLogs: BackLogDto[] | null;
  handleCreateSprint: (sprint: CreateOrUpdateSprint) => void;
  loading: boolean;
};

type CreateOrUpdateSprint = {
  _id?: string;
  name: string;
  startDate: Date;
  endDate: Date;
  goal: string;
  status: "planned" | "active" | "completed" | "cancelled";
  backlog: string;
  createdBy?: string;
  backlogItems?: string[];
};

const SprintContext = createContext<SprintContextDTO>({} as SprintContextDTO);

export const useSprintContext = () => {
  const context = useContext(SprintContext);
  if (!context) {
    throw new Error(
      "Error in useSprintContext: Make sure to wrap the consumer component with <SprintProvider>"
    );
  }
  return context;
};

const SprintProvider = ({ children }: { children: React.ReactNode }) => {
  const { selectedBackLog, setSelectedBackLog, myBackLogs } =
    useBackLogContext();
  const { userInfo } = useWorkSpaceContext();
  const [loading, setLoading] = useState(false);

  const handleCreateSprint = useCallback(
    async (sprint: CreateOrUpdateSprint) => {
      if (!selectedBackLog) {
        notifications.show({
          title: "Error",
          message: "Please select a backlog to create a sprint",
          color: "red",
        });
        return;
      }
      const selectedBackLogItemsIds = selectedBackLog?.backlogItems?.map(
        (item) => item._id
      );
      const selectedBackLogItems = selectedBackLog.backlogItems?.filter(
        (item) => selectedBackLogItemsIds?.includes(item._id)
      );
      const newSprint = {
        ...sprint,
        backlog: selectedBackLog ? selectedBackLog._id : "",
        createdBy: userInfo?._id,
        backlogItems: selectedBackLogItemsIds,
      };
      try {
        setLoading(true);
        const response = await CreateSprint(newSprint);
        if (response.success && selectedBackLog) {
          setSelectedBackLog({
            ...selectedBackLog,
            sprints: [
              ...(selectedBackLog?.sprints || []),
              {
                ...newSprint,
                _id: response.data._id,
                createdBy: userInfo,
                createdAt: response.data.createdAt,
                updatedAt: response.data.updatedAt,
                backlogItems: selectedBackLogItems,
              },
            ],
          });
        }
      } catch (error: any) {
        console.error("Failed to create sprint", error);
        throw new Error("Failed to create sprint");
      } finally {
        setLoading(false);
      }
    },
    [selectedBackLog, userInfo, setSelectedBackLog]
  );

  const value = useMemo(
    () => ({
      selectedBackLog,
      setSelectedBackLog,
      myBackLogs,
      handleCreateSprint,
      loading,
    }),
    [selectedBackLog, myBackLogs, handleCreateSprint, loading]
  );

  return (
    <SprintContext.Provider value={value}>{children}</SprintContext.Provider>
  );
};

export default SprintProvider;
