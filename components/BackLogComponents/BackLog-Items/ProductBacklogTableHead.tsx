import { useBackLogContext } from "@/components/Contexts/BackLogContext";
import React from "react";

const ProductBacklogTableHead = ({aiGeneratedBackLogs} : {aiGeneratedBackLogs? : boolean}) => {
  const { isGrouping } = useBackLogContext();
  return (
    <thead className="bg-gray-50 mb-2">
      <tr>
        {isGrouping && (
         <th className="p-0 m-0 w-12 min-w-[3rem] hover:cursor-pointer">Select</th>
        )}
        {!aiGeneratedBackLogs && <th className="p-0 m-0 w-8"></th>}
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Rank
        </th>
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
        {!aiGeneratedBackLogs && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Assignee(s)
        </th>}
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
  );
};

export default ProductBacklogTableHead;
