import { Modal } from "@mantine/core";
import React from "react";
import { BackLogItemDto } from "@/Utils/types";
import CreateBackLogItemForm from "@/components/Forms/CreateBackLogItemForm";

const CreateBackLogItemModal = ({
  opened,
  close,
  initialValues,
}: {
  opened: boolean;
  close: () => void;
  initialValues?: BackLogItemDto;
}) => {
  return (
    <Modal opened={opened} onClose={close}  size="xl">
      <CreateBackLogItemForm close={close} initialValues={initialValues} />
    </Modal>
  );
};

export default CreateBackLogItemModal;
