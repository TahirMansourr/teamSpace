"use client";

import { useState } from "react";
import { FiArrowDown } from "react-icons/fi";

const SortButton = ({
  showSortMenu,
  setShowSortMenu,
}: {
  showSortMenu: boolean;
  setShowSortMenu: (showSortMenu: boolean) => void;
}) => {
  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-3 lg:px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm lg:text-base"
        onClick={() => setShowSortMenu(!showSortMenu)}
      >
        <FiArrowDown size={20} />
        <span className="hidden sm:inline">Sort</span>
      </button>

      {showSortMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
          <div className="py-2">
            <div className="px-4 py-2 text-sm text-gray-700 font-semibold">
              Priority
            </div>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Highest to Lowest
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Lowest to Highest
            </button>

            <div className="border-t my-2"></div>

            <div className="px-4 py-2 text-sm text-gray-700 font-semibold">
              Date
            </div>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Newest First
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Oldest First
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortButton;
