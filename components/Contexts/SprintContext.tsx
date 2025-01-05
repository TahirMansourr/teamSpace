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
import { BackLogDto, SprintDto, UserDto } from "@/Utils/types";
import { CreateSprint } from "@/lib/actions/SprintActions";
import { useWorkSpaceContext } from "./WorkSpaceContext";

type SprintContextDTO = {
  handleCreateSprint: (sprint: SprintDto) => void;
  loading: boolean;
};

const SprintContext = createContext<SprintContextDTO>({
  handleCreateSprint: () => {},
  loading: false,
});

export const useSprintContext = () => {
  const context = useContext(SprintContext);
  if (!context) {
    throw new Error(
      "Error in useSprintContext: Make sure to wrap the consumer component with <SprintProvider>"
    );
  }
  return context;
};

const SprintProvider = ({
  children,
  selectedBackLog,
  setSelectedBackLog,
}: {
  children: React.ReactNode;
  selectedBackLog: BackLogDto | null;
  setSelectedBackLog: Dispatch<SetStateAction<BackLogDto | null>>;
}) => {
  // const { userInfo } = useWorkSpaceContext();
  const userInfo = {} as UserDto;
  const [loading, setLoading] = useState(false);

  const handleCreateSprint = useCallback(
    async (sprint: SprintDto) => {
      const newSprint = {
        ...sprint,
        backlog: selectedBackLog ? selectedBackLog._id : "",
        createdBy: userInfo?._id,
      };
      try {
        setLoading(true);
        const response = await CreateSprint(newSprint);
        if (response.success && selectedBackLog) {
          setSelectedBackLog({
            ...selectedBackLog,
            sprints: [
              ...(selectedBackLog?.sprints || []),
              { ...newSprint, _id: response.data._id, createdBy: userInfo },
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
      handleCreateSprint,
      loading,
    }),
    [handleCreateSprint, loading]
  );

  return (
    <SprintContext.Provider value={value}>{children}</SprintContext.Provider>
  );
};

export default SprintProvider;
