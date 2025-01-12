"use client";
import { GetProjectByIdAndPopulate } from "@/lib/actions/ProjectActions";
import { useEffect, useMemo, useState } from "react";

export const useGetProjectPopulated = ({
  projectId,
}: Readonly<{ projectId: string }>) => {
  const [selectedItemInSideBar, setSelectedItemInSideBar] =
    useState<string>("Product Backlogs");
  const [opened, setOpened] = useState<boolean>(false);
  const [projectInfo, setProjectInfo] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const startTime = performance.now();
      try {
        setLoading(true);
        const project = await GetProjectByIdAndPopulate({ id: projectId });
        setProjectInfo(project);
        console.log(
          `Total execution time: ${performance.now() - startTime} milliseconds`
        );
      } catch (error: any) {
        console.error(`Error in UseGetUserAndPopulate: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const memoizedValues = useMemo(
    () => ({
      selectedItemInSideBar,
      setSelectedItemInSideBar,
      opened,
      setOpened,
      projectInfo,
      loading,
    }),
    [selectedItemInSideBar, opened, projectInfo, loading]
  );

  return memoizedValues;
};
