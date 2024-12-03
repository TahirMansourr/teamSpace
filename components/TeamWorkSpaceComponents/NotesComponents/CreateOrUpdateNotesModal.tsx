import CreateOrUpdateNote from "@/components/Forms/createOrUpdateNote";
import { NotesDto } from "@/Utils/types";
import { Modal } from "@mantine/core";
import React from "react";

const CreateOrUpdateNotesModal = ({
  modalOpened,
  closeModal,
  initialValues,
}: {
  modalOpened: boolean;
  closeModal: () => void;
  initialValues?: NotesDto;
}) => {
  return (
    <Modal
      opened={modalOpened}
      bg={"cyan"}
      onClose={closeModal}
      withCloseButton={false}
      size="xl"
      styles={{
        inner: { padding: "20px" },
        body: { height: "100%" },
      }}
      overlayProps={{
        backgroundOpacity: 0.2,
        blur: 4,
      }}
      className="bg-transparent"
    >
      <CreateOrUpdateNote
        existingNoteContent={initialValues}
        close={closeModal}
      />
    </Modal>
  );
};

export default CreateOrUpdateNotesModal;
