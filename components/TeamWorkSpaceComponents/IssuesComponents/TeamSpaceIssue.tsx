import { useIssuesContext } from "@/components/Contexts/IssuesContext";
import { IssueDto } from "@/Utils/types";
import React from "react";
import IssueCard from "./IssuesCard";

const TeamSpaceIssue = () => {
  const { allIssues } = useIssuesContext();
  return (
    <main className="flex flex-col  w-fit">
      {allIssues.length > 0 ? (
        allIssues.map((Issue: IssueDto) => (
          <IssueCard Issue={Issue} key={Issue._id} />
        ))
      ) : (
        <h1>No Issues </h1>
      )}
    </main>
  );
};

export default TeamSpaceIssue;
