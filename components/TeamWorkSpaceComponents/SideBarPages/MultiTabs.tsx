"use client";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import NotesComponent from "../NotesComponents/Notes";
import TasksComponent from "../tasksComponents/Tasks";
import IssuesComponent from "../IssuesComponents/Issues";
import ChatSpaceComponent from "../ChatComponents/ChatSpace";
import { Button, Modal } from "@mantine/core";
import NotificationsBar from "../NotificationsBar";
import { useDisclosure } from "@mantine/hooks";
import CreateFeatureForm from "../../Forms/createFeatureForm";
import FeatureProvider from "../../Contexts/featureContext";
import { TransitionWrapper } from "../TransitionWrapper";

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

  const [Modalopened, { open, close }] = useDisclosure(false);

  return (
    <TransitionWrapper opened={opened}>
      <section className=" flex flex-col w-full justify-center p-3 ">
        <div className="flex w-full">
          <NotificationsBar />
        </div>
        <section className=" flex w-full h-full  gap-2  items-center">
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
