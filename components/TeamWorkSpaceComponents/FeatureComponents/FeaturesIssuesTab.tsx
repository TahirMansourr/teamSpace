"use client";
import { useIssuesContext } from "@/components/Contexts/IssuesContext";
import { IssueDto } from "@/Utils/types";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import IssueCard from "../IssuesComponents/IssuesCard";
import CreateOrUpdateIssuesModal from "../IssuesComponents/CreateOrUpdateIssueModal";
import { MdOutlineAddCard } from "react-icons/md";

const FeaturesIssuesTab = ({ featureId }: { featureId: string }) => {
  const [modalOpened, { open, close: closeModal }] = useDisclosure(false);
  const { allFeatureIssues } = useIssuesContext();
  return (
    <section className="flex flex-col w-full">
      <MdOutlineAddCard
        onClick={open}
        className=" ml-auto hover:cursor-pointer hover:scale-105 shadow-sm"
        size={30}
        color="blue"
      />
      <CreateOrUpdateIssuesModal
        modalOpened={modalOpened}
        closeModal={closeModal}
        FeatureId={featureId}
      />
      <div className="grid grid-cols-3 mt-4">
        {allFeatureIssues.length > 0 ? (
          allFeatureIssues.map((issue: IssueDto) => <IssueCard Issue={issue} />)
        ) : (
          <h1>No Issues yet</h1>
        )}
      </div>
    </section>
  );
};

export default FeaturesIssuesTab;
