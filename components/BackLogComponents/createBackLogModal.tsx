import { Modal } from "@mantine/core";
import React from "react";
import CreateBackLogForm from "../Forms/createBackLog";

const CreateBackLogModal = ({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) => {
  return (
    <Modal opened={opened} onClose={close} title="Create a new Backlog">
      <CreateBackLogForm close={close} />
    </Modal>
  );
};

export default CreateBackLogModal;
