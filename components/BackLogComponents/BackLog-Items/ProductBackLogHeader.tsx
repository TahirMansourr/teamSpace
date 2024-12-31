"use client";
import React, { useState } from "react";
import { FiArrowDown, FiFilter, FiPlus, FiSearch } from "react-icons/fi";
import { IoArrowBackOutline } from "react-icons/io5";
import { RiRobot2Line } from "react-icons/ri";
import { useBackLogContext } from "../../Contexts/BackLogContext";
import { useDisclosure } from "@mantine/hooks";
import FullScreenLoading from "@/Utils/FullScreenLoading";
import CreateBackLogItemModal from "./createBackLogItemModal";
import AiGeneratorModal from "./AiGeneratorModal";

const ProductBackLogHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { setSelectedBackLog, selectedBackLog: backlog } = useBackLogContext();
  const [opened, { open, close }] = useDisclosure();
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [aiModalOpened, { open: openAiModal, close: closeAiModal }] =
    useDisclosure();

  if (!backlog) return <FullScreenLoading />;
  else
    return (
      <div className="flex flex-col lg:flex-row justify-between gap-4 p-4 px-4 lg:px-14 items-start lg:items-center">
        <CreateBackLogItemModal opened={opened} close={close} />
        <AiGeneratorModal opened={aiModalOpened} close={closeAiModal} />

        <div className="flex items-center gap-4 w-full lg:w-auto">
          <button onClick={() => setSelectedBackLog(null)}>
            <IoArrowBackOutline size={30} />
          </button>
          <div className="flex justify-between items-center">
            <h1 className="text-xl lg:text-2xl font-bold">{backlog.name}</h1>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full lg:w-auto">
          <div className="relative w-full sm:w-64 lg:w-auto">
            <FiSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search backlog items..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
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
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      High
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Medium
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Low
                    </button>

                    <div className="border-t my-2"></div>

                    <div className="px-4 py-2 text-sm text-gray-700 font-semibold">
                      Status
                    </div>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      To Do
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      In Progress
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Done
                    </button>

                    <div className="border-t my-2"></div>

                    <div className="px-4 py-2 text-sm text-gray-700 font-semibold">
                      Type
                    </div>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Feature
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Bug
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Task
                    </button>
                  </div>
                </div>
              )}
            </div>
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
            <button
              className="flex items-center gap-2 bg-purple-600 text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-purple-700 text-sm lg:text-base"
              onClick={openAiModal}
            >
              <RiRobot2Line size={20} />
            </button>
            <button
              className="flex items-center gap-2 bg-blue-600 text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-blue-700 text-sm lg:text-base"
              onClick={open}
            >
              <FiPlus size={20} />
              <span className="hidden sm:inline">Add Item</span>
            </button>
          </div>
        </div>
      </div>
    );
};

export default ProductBackLogHeader;
