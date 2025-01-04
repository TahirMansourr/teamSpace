"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
} from "react";
import { useBackLogContext } from "./BackLogContext";
import { BackLogDto } from "@/Utils/types";

type SprintContextDTO = {
  selectedBackLog: BackLogDto | null;
  setSelectedBackLog: Dispatch<SetStateAction<BackLogDto | null>>;
  myBackLogs: BackLogDto[] | null;
};

const SprintContext = createContext<SprintContextDTO>({} as SprintContextDTO);

export const useSprintContext = () => {
  if (SprintContext === undefined) {
    throw new Error(
      `Error at BackLogContext, You probably forgot to wrap the consumer component with the Issues Context`
    );
  } else {
    return useContext(SprintContext);
  }
};

const SprintProvider = ({ children }: { children: React.ReactNode }) => {
  const { selectedBackLog, setSelectedBackLog, myBackLogs } =
    useBackLogContext();
  const value = useMemo(
    () => ({
      selectedBackLog,
      setSelectedBackLog,
      myBackLogs,
    }),
    [selectedBackLog]
  );
  return (
    <SprintContext.Provider value={value}>{children}</SprintContext.Provider>
  );
};
export default SprintProvider;
