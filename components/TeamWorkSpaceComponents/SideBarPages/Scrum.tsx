"use client";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { TransitionWrapper } from "../TransitionWrapper";
import MainPage from "@/components/SprintComponents/MainPage";
import BackLogProvider from "@/components/Contexts/BackLogContext";
import SprintProvider from "@/components/Contexts/SprintContext";
import TaskProvider from "@/components/Contexts/TasksContext";
import { useWorkSpaceContext } from "@/components/Contexts/WorkSpaceContext";

const Scrum = ({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    setOpened(true);
    return () => setOpened(false);
  });

  const {userInfo , projectInfo} = useWorkSpaceContext()

  return (
    <TransitionWrapper opened={opened}>
      <section className=" w-full h-screen">
        <div className="  flex flex-col h-full w-full  gap-2 rounded-xl   items-center p-3">
          <section className="w-full h-full px-8">
            <BackLogProvider>
              <SprintProvider>
                <TaskProvider user={userInfo} project={projectInfo}>
                <MainPage />
                </TaskProvider>
              </SprintProvider>
            </BackLogProvider>
          </section>
        </div>
      </section>
    </TransitionWrapper>
  );
};

export default Scrum;
