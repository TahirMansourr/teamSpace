import { UserDto } from "@/Utils/types";
import React from "react";
import WorkSpaceProvider from "../Contexts/WorkSpaceContext";
import SideBar from "./sideBar";
import { SelectedItemToRenderOnScreen } from "@/utils";

const EntirePage = ({
  user,
  projectInfo,
  selectedItemInSideBar,
  setSelectedItemInSideBar,
  setOpened,
  opened,
}: {
  user: UserDto | null;
  projectInfo: any | null;
  selectedItemInSideBar: string;
  setSelectedItemInSideBar: React.Dispatch<React.SetStateAction<string>>;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  opened: boolean;
}) => {
  {
    return (
      <>
        {user && projectInfo ? (
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
        ) : (
          <div>Loading...</div>
        )}
      </>
    );
  }
};

export default EntirePage;
