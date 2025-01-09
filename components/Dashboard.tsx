"use client";

import React, { useEffect, useState } from "react";
import DashBoardSideBar from "./dashBoardSideBar";
import { SelectedItemInSideBarToRenderOnScreen } from "@/utils";
import WorkSpaceProvider from "./Contexts/WorkSpaceContext";
import useGetUserInfo from "@/Utils/Hooks/GetUserInfo";

const Dashboard = () => {
  const [selectedItemInSideBar, setSelectedItemInSideBar] =
    useState<string>("projects");
  const [opened, setOpened] = useState<boolean>(false);
  const { user, loading } = useGetUserInfo();
  console.log("🚀 ~ Dashboard ~ user:", user);
  const [isWindows, setIsWindows] = useState(false);
  useEffect(() => {
    setIsWindows(
      navigator.userAgent.includes("Windows") ||
        navigator.platform.includes("Win")
    );
  }, []);

  const scaleStyle = isWindows ? { transform: "scale(0.95)" } : {};
  return (
    <main className=" flex h-screen w-screen ">
      {user && !loading && (
        <WorkSpaceProvider userInfo={user}>
          <div style={scaleStyle} className="flex w-full">
            <DashBoardSideBar
              setSelectedItemInSideBar={setSelectedItemInSideBar}
              SelectedItemInSideBar={selectedItemInSideBar}
              setOpened={setOpened}
            />

            <SelectedItemInSideBarToRenderOnScreen
              selectedItemInSideBar={selectedItemInSideBar}
              setOpened={setOpened}
              opened={opened}
              user={user}
            />
          </div>
        </WorkSpaceProvider>
      )}
    </main>
  );
};

export default Dashboard;
