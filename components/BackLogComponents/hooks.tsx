"use client";

import { BackLogDto } from "@/Utils/types";
import { useEffect, useMemo, useState } from "react";
import { useWorkSpaceContext } from "../Contexts/WorkSpaceContext";
import { GetProductBackLogAndPopulate } from "@/lib/actions/ProductBackLogActions";

export const useGetMyProductBackLogs = () => {
  const [myBackLogs, setMyBackLogs] = useState<BackLogDto[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { projectInfo } = useWorkSpaceContext();

  useEffect(() => {
    async function FetchMyBackLogs() {
      try {
        setLoading(true);
        const result = await GetProductBackLogAndPopulate(
          projectInfo.project._id
        );
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

  const value = useMemo(() => ({ myBackLogs, loading }), [myBackLogs, loading]);

  return value;
};
