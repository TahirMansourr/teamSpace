"use client";
import { useBackLogContext } from "@/components/Contexts/BackLogContext";
import { BackLogItemDto } from "@/Utils/types";
import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import filterBacklogItems from "./SortingAndFilteringFunctions";
import { log } from "console";

const FilterButton = ({
  backLogItems,
  showFilterMenu,
  setShowFilterMenu,
}: {
  showFilterMenu: boolean;
  setShowFilterMenu: (showFilterMenu: boolean) => void;
  backLogItems: BackLogItemDto[];
}) => {
  const { setFilteredBacklogs } = useBackLogContext();
  console.log("backLogItems", backLogItems);
  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-3 lg:px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm lg:text-base"
        onClick={() => setShowFilterMenu(!showFilterMenu)}
      >
        <FiFilter size={20} />
        <span className="hidden sm:inline">Filter</span>
      </button>

      {showFilterMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
          <div className="py-2">
            <div className="px-4 py-2 text-sm text-gray-700 font-semibold">
              Priority
            </div>
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                console.log("Now sorting by priority to high");
                const filteredBacklogs = filterBacklogItems({
                  filterFor: "priority",
                  filterValue: "High",
                  backLogItems: backLogItems,
                });
                setFilteredBacklogs(filteredBacklogs);
                console.log(
                  "completed sorting by priority to high",
                  filteredBacklogs
                );
              }}
            >
              High
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                const filteredBacklogs = filterBacklogItems({
                  filterFor: "priority",
                  filterValue: "Medium",
                  backLogItems: backLogItems,
                });
                setFilteredBacklogs(filteredBacklogs);
              }}
            >
              Medium
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                const filteredBacklogs = filterBacklogItems({
                  filterFor: "priority",
                  filterValue: "Low",
                  backLogItems: backLogItems,
                });
                setFilteredBacklogs(filteredBacklogs);
              }}
            >
              Low
            </button>

            <div className="border-t my-2"></div>

            <div className="px-4 py-2 text-sm text-gray-700 font-semibold">
              Status
            </div>
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                const filteredBacklogs = filterBacklogItems({
                  filterFor: "status",
                  filterValue: "To Do",
                  backLogItems: backLogItems,
                });
                setFilteredBacklogs(filteredBacklogs);
              }}
            >
              To Do
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                const filteredBacklogs = filterBacklogItems({
                  filterFor: "status",
                  filterValue: "In Progress",
                  backLogItems: backLogItems,
                });
                setFilteredBacklogs(filteredBacklogs);
              }}
            >
              In Progress
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                const filteredBacklogs = filterBacklogItems({
                  filterFor: "status",
                  filterValue: "Done",
                  backLogItems: backLogItems,
                });
                setFilteredBacklogs(filteredBacklogs);
              }}
            >
              Done
            </button>

            <div className="border-t my-2"></div>

            <div className="px-4 py-2 text-sm text-gray-700 font-semibold">
              Type
            </div>
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                const filteredBacklogs = filterBacklogItems({
                  filterFor: "type",
                  filterValue: "Feature",
                  backLogItems: backLogItems,
                });
                setFilteredBacklogs(filteredBacklogs);
              }}
            >
              Feature
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                const filteredBacklogs = filterBacklogItems({
                  filterFor: "type",
                  filterValue: "Bug",
                  backLogItems: backLogItems,
                });
                setFilteredBacklogs(filteredBacklogs);
              }}
            >
              Bug
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                const filteredBacklogs = filterBacklogItems({
                  filterFor: "type",
                  filterValue: "Technical Debt",
                  backLogItems: backLogItems,
                });
                setFilteredBacklogs(filteredBacklogs);
              }}
            >
              Technical Debt
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                const filteredBacklogs = filterBacklogItems({
                  filterFor: "type",
                  filterValue: "Improvement",
                  backLogItems: backLogItems,
                });
                setFilteredBacklogs(filteredBacklogs);
              }}
            >
              Improvement
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                const filteredBacklogs = filterBacklogItems({
                  filterFor: "type",
                  filterValue: "Spike",
                  backLogItems: backLogItems,
                });
                setFilteredBacklogs(filteredBacklogs);
              }}
            >
              Spike
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
