import { ScrollArea } from "@mantine/core";
import React from "react";

const ProductBackLogTable = () => {
  return (
    <ScrollArea className="flex-1 overflow-auto mx-auto  bg-white dark:bg-gray-900 rounded-md w-[90%]">
      <table className="w-full border-collapse">
        <thead className="bg-gray-50 mb-2">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
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
          {/* Placeholder row - Replace with actual data mapping */}
          <tr className="hover:bg-gray-50 cursor-pointer">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              PBI-001
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              User Authentication Feature
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              As a user i would like to have a product that let's users login
              and register
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                High
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                In Progress
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              8
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              John Doe
            </td>
          </tr>
        </tbody>
      </table>
    </ScrollArea>
  );
};

export default ProductBackLogTable;
