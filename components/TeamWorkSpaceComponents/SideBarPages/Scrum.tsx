"use client";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { TransitionWrapper } from "../TransitionWrapper";
import MainPage from "@/components/SprintComponents/MainPage";
import BackLogProvider from "@/components/Contexts/BackLogContext";
import SprintProvider from "@/components/Contexts/SprintContext";
import TaskProvider from "@/components/Contexts/TasksContext";
import { useWorkSpaceContext } from "@/components/Contexts/WorkSpaceContext";
import IssuesProvider from "@/components/Contexts/IssuesContext";
import NotesProvider from "@/components/Contexts/NotesContext";

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

  const { userInfo, projectInfo } = useWorkSpaceContext();

  return (
    <TransitionWrapper opened={opened}>
      <section className=" w-full h-screen p-10">
        <BackLogProvider>
          <SprintProvider>
            <TaskProvider user={userInfo} project={projectInfo}>
              <IssuesProvider project={projectInfo.project} user={userInfo}>
                <NotesProvider project={projectInfo.project} user={userInfo}>
                  <MainPage />
                </NotesProvider>
              </IssuesProvider>
            </TaskProvider>
          </SprintProvider>
        </BackLogProvider>
      </section>
    </TransitionWrapper>
  );
};

export default Scrum;
