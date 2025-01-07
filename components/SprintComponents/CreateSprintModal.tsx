import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { IoMdAdd } from "react-icons/io";
import CreateSprintForm from "../Forms/createOrUpdateSprintForm";
import { BackLogDto } from "@/Utils/types";
import { notifications } from "@mantine/notifications";

export function CreateOrUpdateSprintModal({
  selectedBackLog,
}: {
  selectedBackLog: BackLogDto | null;
}) {
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
        onClick={() => {
          if (!selectedBackLog) {
            notifications.show({
              title:
                "Oops! You have to select a backlog first to create a sprint on",
              message: "Please select a backlog first",
              color: "red",
            });
            return;
          }
          open();
        }}
      >
        <IoMdAdd size={20} />
        Create Sprint
      </button>
    </>
  );
}
