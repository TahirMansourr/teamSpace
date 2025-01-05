import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { IoMdAdd } from "react-icons/io";
import CreateSprintForm from "../Forms/createOrUpdateSprintForm";

export function CreateOrUpdateSprintModal() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="create or update sprint"
        fullScreen
      >
        <CreateSprintForm close={close} />
      </Modal>

      <button
        className="flex items-center gap-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-bold"
        onClick={open}
      >
        <IoMdAdd size={20} />
        Create Sprint
      </button>
    </>
  );
}
