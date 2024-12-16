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
    <Modal opened={opened} onClose={close} title="Authentication">
      <CreateBackLogForm close={close} />
    </Modal>
  );
};

export default CreateBackLogModal;