"use client";

import { BackLogDto } from "@/Utils/types";
import { createContext, useContext, useMemo, useState } from "react";
import { useGetMyProductBackLogs } from "../BackLogComponents/hooks";

const BackLogContext = createContext(
  {} as {
    myBackLogs: BackLogDto[] | null;
    backLogLoading: boolean;
  }
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
  const { myBackLogs, loading: backLogLoading } = useGetMyProductBackLogs();

  const value = useMemo(
    () => ({
      myBackLogs,
      backLogLoading,
    }),
    [myBackLogs, backLogLoading]
  );
  return (
    <BackLogContext.Provider value={value}>{children}</BackLogContext.Provider>
  );
};

export default BackLogProvider;
