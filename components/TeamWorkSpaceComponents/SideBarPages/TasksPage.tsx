"use client";
import { Transition } from "@mantine/core";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import AllTasksPage from "../tasksComponents/allTasks";
import TaskProvider from "../../Contexts/TasksContext";
import { useWorkSpaceContext } from "../../Contexts/WorkSpaceContext";
import { TransitionWrapper } from "../TransitionWrapper";
import SprintProvider from "@/components/Contexts/SprintContext";

const TasksPageComponent = ({
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
      <section className=" w-full h-screen">
        <div className="  flex flex-col h-full w-full  gap-2 rounded-xl   items-center p-3">
          <section className="w-full h-full">
            <SprintProvider>
              <TaskProvider user={userInfo} project={projectInfo}>
                <AllTasksPage />
              </TaskProvider>
            </SprintProvider>
          </section>
        </div>
      </section>
    </TransitionWrapper>
  );
};

export default TasksPageComponent;
