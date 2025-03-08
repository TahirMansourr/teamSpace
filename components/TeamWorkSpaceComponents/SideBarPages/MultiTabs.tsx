"use client";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import NotesComponent from "../NotesComponents/Notes";
import TasksComponent from "../tasksComponents/Tasks";
import IssuesComponent from "../IssuesComponents/Issues";
import ChatSpaceComponent from "../ChatComponents/ChatSpace";
import NotificationsBar from "../NotificationsBar";
import { TransitionWrapper } from "../TransitionWrapper";
import FilterComponent from "../FilterComponent";

const MultiTabsComponent = ({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    setOpened(true);
    return () => setOpened(false);
  }, []);

  return (
    <TransitionWrapper opened={opened}>
      <section className=" flex flex-col w-full px-2 h-screen ">
        <div className="flex w-full h-fit justify-between items-center px-10 py-1 m-0">
          <FilterComponent />
          <NotificationsBar />
        </div>
        <section className=" flex w-full h-[95%]  gap-2  items-center m-0">
          <NotesComponent />
          <TasksComponent />
          <IssuesComponent />
          <ChatSpaceComponent />
        </section>
      </section>
    </TransitionWrapper>
  );
};

export default MultiTabsComponent;

{
  /* <Modal opened={Modalopened} onClose={close} title="New Feature !!"  overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
              }}>
                <FeatureProvider>
                  <CreateFeatureForm/>
                </FeatureProvider>
                
              </Modal> */
}
{
  /* <Button className="mr-0" onClick={open}>
            {" "}
            + new Feature
          </Button> */
}
