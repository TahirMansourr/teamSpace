"use client";
import WorkSpaceProvider from "@/components/Contexts/WorkSpaceContext";
import SideBar from "@/components/TeamWorkSpaceComponents/sideBar";
import { JoinRoom, socket } from "@/socket";
import { SelectedItemToRenderOnScreen } from "@/utils";
import { useGetProjectPopulated } from "@/Utils/Hooks/GetUserAndPopulate";
import useGetUserInfo from "@/Utils/Hooks/GetUserInfo";
import { notifications } from "@mantine/notifications";
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
    if (user.username) {
      try {
        JoinRoom(params.id[0], user.username);
        console.log("🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱Joining Room");
        socket.emit("messageToRoom", {
          room: params.id[0],
          message: `${user._id} has joined the room`,
        });
        socket.on("messageToRoom", (message: any) => {
          // notifications.show({ message: message.message, color: "blue" })
        });
      } catch (e) {
        notifications.show({
          message: ` Oops unable to connect to your room please check you connection`,
          color: "red",
        });
      }
    } else {
      notifications.show({
        message: ` Connecting to your room `,
        color: "red",
      });
    }

    return () => {
      socket.off("messageToRoom");
    };
  }, [user]);

  const scaleStyle = isWindows ? { transform: "scale(0.98)" } : {};
  return (
    <main className={`flex w-full  `}>
      {user && projectInfo && (
        <WorkSpaceProvider projectInfo={projectInfo} userInfo={user}>
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
        </WorkSpaceProvider>
      )}
    </main>
  );
}
