"use client";
import { ScrollArea } from "@mantine/core";
import React from "react";
import { useWorkSpaceContext } from "../../Contexts/WorkSpaceContext";
import TeamSpaceNotes from "./TeamSpaceNotes";
import NotesProvider from "../../Contexts/NotesContext";
import { useDisclosure } from "@mantine/hooks";
import CreateOrUpdateNotesModal from "./CreateOrUpdateNotesModal";
import ComponentWrapper from "../MultiTabsComponentWrapper";

const NotesComponent = () => {
  const {
    notesComponentExpandState,
    setNotesComponentExpandState,
    projectInfo,
    userInfo,
  } = useWorkSpaceContext();
  const [modalOpened, { open, close: closeModal }] = useDisclosure(false);

  return (
    <ComponentWrapper
      componentExpandState={notesComponentExpandState}
      componentName="Notes"
      stateSetter={setNotesComponentExpandState}
      modalOpener={open}
      className="w-fit"
    >
      <section className=" flex w-full h-full">
        <NotesProvider project={projectInfo.project} user={userInfo}>
          <CreateOrUpdateNotesModal
            modalOpened={modalOpened}
            closeModal={closeModal}
          />
          <TeamSpaceNotes />
        </NotesProvider>
      </section>
    </ComponentWrapper>
  );
};

export default NotesComponent;
