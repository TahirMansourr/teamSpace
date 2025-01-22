import { useBackLogContext } from "@/components/Contexts/BackLogContext";
import React from "react";

const BackLogTableHead = ({
  aiGeneratedBackLogs,
  isSelectingForSprint,
}: {
  aiGeneratedBackLogs?: boolean;
  isSelectingForSprint: boolean;
}) => {
  const { isGrouping } = useBackLogContext();
  return (
    <thead className="bg-gray-50 mb-2">
      <tr>
        {isGrouping ||
          (isSelectingForSprint && (
            <th className="p-0 m-0 w-8 min-w-[2rem] hover:cursor-pointer">
              Select
            </th>
          ))}
        {!aiGeneratedBackLogs && !isSelectingForSprint && (
          <th className="p-0 m-0 w-4"></th>
        )}
        {!isSelectingForSprint && (
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Rank
          </th>
        )}
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Title
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          description
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Type
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Priority
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Status
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Acceptance Criteria
        </th>
        {!aiGeneratedBackLogs && (
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Assignee(s)
          </th>
        )}
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
  );
};

export default BackLogTableHead;
