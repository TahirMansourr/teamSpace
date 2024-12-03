"use client";
import { NotesDto } from "@/Utils/types";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import CreateOrUpdateNotesModal from "./CreateOrUpdateNotesModal";

const NotesModal = ({
  note,
  opened,
  closeFirsModal,
}: {
  note: NotesDto;
  opened: boolean;
  closeFirsModal: () => void;
}) => {
  const [modalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  return (
    <Modal
      opened={opened}
      onClose={closeFirsModal}
      title="press ESC to exit this note"
      withCloseButton={false}
      size="xl"
      styles={{
        inner: { padding: "20px" },
        body: { height: "100%" },
      }}
    >
      <div className="flex w-full h-full flex-col">
        <div
          className="flex w-full h-full"
          dangerouslySetInnerHTML={{ __html: note.body }}
        ></div>
        <Button onClick={openModal}>Edit</Button>
      </div>
      <CreateOrUpdateNotesModal
        modalOpened={modalOpened}
        initialValues={note}
        closeModal={closeModal}
      />
    </Modal>
  );
};

export default NotesModal;
