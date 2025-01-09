"use client";
import WorkSpaceProvider from "@/components/Contexts/WorkSpaceContext";
import SideBar from "@/components/TeamWorkSpaceComponents/sideBar";
import { SelectedItemToRenderOnScreen } from "@/utils";
import { useGetProjectPopulated } from "@/Utils/Hooks/GetUserAndPopulate";
import useGetUserInfo from "@/Utils/Hooks/GetUserInfo";
import { useEffect, useState } from "react";

export default function WorkSpace({
  params,
}: Readonly<{
  params: Readonly<{ id: readonly string[] }>;
}>) {
  const { user } = useGetUserInfo();
  const {
    selectedItemInSideBar,
    setSelectedItemInSideBar,
    opened,
    setOpened,
    projectInfo,
  } = useGetProjectPopulated({ projectId: params.id[0] });
  const [isWindows, setIsWindows] = useState(false);
  useEffect(() => {
    setIsWindows(
      navigator.userAgent.includes("Windows") ||
        navigator.platform.includes("Win")
    );
  }, []);

  const scaleStyle = isWindows
    ? { transform: "scale(0.8)", transformOrigin: "top left" }
    : {};
  // const client = new Ably.Realtime({key :process.env.NEXT_PUBLIC_ABLY_KEY})
  return (
    <main className={`flex w-full h-screen p-2`}>
      {user && projectInfo && (
        <WorkSpaceProvider projectInfo={projectInfo} userInfo={user}>
          {/* <AblyProvider client={client}> */}
          {/* <ChannelProvider channelName="get-started"> */}
          <div style={scaleStyle} className="flex w-full">
            <SideBar
              SelectedItemInSideBar={selectedItemInSideBar}
              setSelectedItemInSideBar={setSelectedItemInSideBar}
              setOpened={setOpened}
              projectName={projectInfo.project.name}
            />
            <SelectedItemToRenderOnScreen
              selectedItemInSideBar={selectedItemInSideBar}
              setOpened={setOpened}
              opened={opened}
            />
          </div>
          {/* </ChannelProvider> */}
          {/* </AblyProvider> */}
        </WorkSpaceProvider>
      )}
    </main>
  );
}
