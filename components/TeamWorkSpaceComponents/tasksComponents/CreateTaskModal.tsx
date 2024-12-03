import CreateOrUpdateTaskForm, {
  createTaskFormDto,
} from "@/components/Forms/createTaskForm";
import { TaskDto } from "@/Utils/types";
import { Modal } from "@mantine/core";
import React from "react";

const CreateOrUpdateTaskModal = ({
  modalOpened,
  closeModal,
  initialValues,
  featureId,
}: {
  modalOpened: boolean;
  closeModal: () => void;
  initialValues?: TaskDto;
  featureId?: string;
}) => {
  return (
    <Modal
      opened={modalOpened}
      onClose={closeModal}
      title={initialValues ? `Update ${initialValues.name}` : "Create Task"}
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
    >
      <CreateOrUpdateTaskForm
        close={closeModal}
        updateFormInput={initialValues as unknown as createTaskFormDto}
        featureId={featureId}
      />
    </Modal>
  );
};

export default CreateOrUpdateTaskModal;
