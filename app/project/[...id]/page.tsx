"use client";
import WorkSpaceProvider from "@/components/Contexts/WorkSpaceContext";
import SideBar from "@/components/TeamWorkSpaceComponents/sideBar";
import { SelectedItemToRenderOnScreen } from "@/utils";
import { useGetProjectPopulated } from "@/Utils/Hooks/GetUserAndPopulate";
import useGetUserInfo from "@/Utils/Hooks/GetUserInfo";

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
  // const client = new Ably.Realtime({key :process.env.NEXT_PUBLIC_ABLY_KEY})
  return (
    <main className={`flex w-full h-screen p-2`}>
      {user && projectInfo && (
        <WorkSpaceProvider projectInfo={projectInfo} userInfo={user}>
          {/* <AblyProvider client={client}> */}
          {/* <ChannelProvider channelName="get-started"> */}
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
          {/* </ChannelProvider> */}
          {/* </AblyProvider> */}
        </WorkSpaceProvider>
      )}
    </main>
  );
}
