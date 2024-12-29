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
  const [aiModalOpened, { open: openAiModal, close: closeAiModal }] = useDisclosure();

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

        {/* Search and Filter Bar */}
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
            <button className="flex items-center gap-2 px-3 lg:px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm lg:text-base">
              <FiFilter size={20} />
              <span className="hidden sm:inline">Filter</span>
            </button>
            <button className="flex items-center gap-2 px-3 lg:px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm lg:text-base">
              <FiArrowDown size={20} />
              <span className="hidden sm:inline">Sort</span>
            </button>
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
