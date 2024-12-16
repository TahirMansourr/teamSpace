import { Modal } from "@mantine/core";
import React from "react";
import CreateBackLogItemForm from "../Forms/CreateBackLogItemForm";

const CreateBackLogItemModal = ({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) => {
  return (
    <Modal opened={opened} onClose={close} title="Create Backlog Item">
      <CreateBackLogItemForm close={close} />
    </Modal>
  );
};

export default CreateBackLogItemModal;
