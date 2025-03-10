import CreateOrUpdateIssueForm from "@/components/Forms/createOrUpdateIssue";
import CreateOrUpdateTaskForm, {
  createTaskFormDto,
} from "@/components/Forms/createTaskForm";
import { IssueDto, TaskDto } from "@/Utils/types";
import { Modal } from "@mantine/core";
import React from "react";

const CreateOrUpdateIssuesModal = ({
  modalOpened,
  closeModal,
  initialValues,
  backlogItemId,
  backlogtitle,
  FeatureId,
}: {
  modalOpened: boolean;
  closeModal: () => void;
  initialValues?: IssueDto;
  FeatureId?: string;
  backlogItemId?: string;
  backlogtitle?: string;
}) => {
  return (
    <Modal
      opened={modalOpened}
      onClose={closeModal}
      title="Create New Task"
      withCloseButton={true}
      overlayProps={{
        backgroundOpacity: 0.2,
        blur: 4,
      }}
      size="lg"
      styles={{
        inner: { padding: "20px" },
        body: { height: "100%" },
      }}
    >
      <div className="h-full w-full">
        <CreateOrUpdateIssueForm
          close={closeModal}
          updateFormInput={initialValues}
          featureId={FeatureId}
          backlogItemId={backlogItemId}
          backlogtitle={backlogtitle}
        />
      </div>
    </Modal>
  );
};

export default CreateOrUpdateIssuesModal;
