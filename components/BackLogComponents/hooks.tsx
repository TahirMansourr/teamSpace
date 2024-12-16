"use client";

import { BackLogDto } from "@/Utils/types";
import { useEffect, useMemo, useState } from "react";
import { GetProductBackLogAndPopulate } from "@/lib/actions/ProductBackLogActions";

export const useGetMyProductBackLogs = ({
  projectId,
}: {
  projectId: string;
}) => {
  const [myBackLogs, setMyBackLogs] = useState<BackLogDto[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function FetchMyBackLogs() {
      try {
        setLoading(true);
        const result = await GetProductBackLogAndPopulate(projectId);
        if (result) {
          setMyBackLogs(result.result);
        } else {
          setMyBackLogs(null);
        }
      } catch (error) {
        throw new Error(`"Error in useGetMyProductBackLogs" ${error}`);
      } finally {
        setLoading(false);
      }
    }
    FetchMyBackLogs();
  }, []);

  const value = useMemo(
    () => ({ myBackLogs, loading, setMyBackLogs }),
    [myBackLogs, loading, setMyBackLogs]
  );

  return value;
};
