import { Modal, Text } from "@mantine/core";
import React from "react";
import CreateProjectForm from "../Forms/createProjectForm";

type createModalProps = {
  modalOpened: boolean;
  closeModal: () => void;
  userId: string;
};

const CreateProjectModal = ({
  modalOpened,
  closeModal,
  userId,
}: createModalProps) => {
  return (
    <Modal
      opened={modalOpened}
      onClose={closeModal}
      title={
        <Text className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Create New Project
        </Text>
      }
      size="lg"
      radius="md"
      padding="xl"
      withCloseButton={false}
      overlayProps={{
        backgroundOpacity: 0.2,
        blur: 6,
      }}
      className="shadow-xl"
    >
      <CreateProjectForm close={closeModal} userId={userId} />
    </Modal>
  );
};

export default CreateProjectModal;
