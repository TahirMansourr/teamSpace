"use client";
import { ScrollArea } from "@mantine/core";
import React from "react";
import { useBackLogContext } from "../Contexts/BackLogContext";
import { BackLogItemDto } from "@/Utils/types";

const ProductBackLogTable = () => {
  const { selectedBackLog: backLog } = useBackLogContext();
  return (
    <ScrollArea className="flex-1 overflow-auto mx-auto  bg-white dark:bg-gray-900 rounded-md w-[90%]">
      <table className="w-full border-collapse">
        <thead className="bg-gray-50 mb-2">
          <tr>
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
              Priority
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Points
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Assignee(s)
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {backLog?.backlogItems?.map((item: BackLogItemDto, index) => (
            <tr className="hover:bg-gray-50 cursor-pointer">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {item.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {item.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                  {item.priority}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.assignee.map((assignee) => (
                  <span
                    key={assignee._id}
                    className="inline-block px-2 py-1 mr-2 mb-2 text-xs font-semibold text-gray-700 bg-gray-200 rounded-full"
                  >
                    {assignee.username}
                  </span>
                ))}
              </td>
            </tr>
          ))}
          {/* Placeholder row - Replace with actual data mapping */}
        </tbody>
      </table>
    </ScrollArea>
  );
};

export default ProductBackLogTable;
