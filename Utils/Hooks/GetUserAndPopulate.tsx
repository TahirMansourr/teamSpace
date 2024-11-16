"use client";
import { GetProjectByIdAndPopulate } from "@/lib/actions/ProjectActions";
import { useEffect, useState } from "react";
import { GetUserInfo } from "../AuthenticationUtils";

export const UseGetUserAndPopulate = ({ projectId }: { projectId: string }) => {
  const [selectedItemInSideBar, setSelectedItemInSideBar] =
    useState<string>("projects");
  const [opened, setOpened] = useState<boolean>(false);
  const [projectInfo, setProjectInfo] = useState<any>();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    async function getProjectInfo() {
      const startTime = performance.now();
      const project = await GetProjectByIdAndPopulate({ id: projectId });
      const endTime = performance.now();
      console.log(`Project fetch took ${endTime - startTime} milliseconds`);
      setProjectInfo(project);
    }

    const getUserInfoAndSetState = async () => {
      const startTime = performance.now();
      const user = await GetUserInfo();
      const endTime = performance.now();
      console.log(`User fetch took ${endTime - startTime} milliseconds`);
      setUser(user);
    };

    const measureTotalTime = async () => {
      const totalStart = performance.now();
      await Promise.all([getUserInfoAndSetState(), getProjectInfo()]);
      const totalEnd = performance.now();
      console.log(
        `Total execution time: ${totalEnd - totalStart} milliseconds`
      );
    };

    measureTotalTime();
  }, []);

  return {
    selectedItemInSideBar,
    setSelectedItemInSideBar,
    opened,
    setOpened,
    projectInfo,
    setProjectInfo,
    user,
    setUser,
  };
};
