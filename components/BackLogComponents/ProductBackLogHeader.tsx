"use client";
import React, { useState } from "react";
import { FiArrowDown, FiFilter, FiPlus, FiSearch } from "react-icons/fi";
import { IoArrowBackOutline } from "react-icons/io5";
import { useBackLogContext } from "../Contexts/BackLogContext";
import { BackLogDto } from "@/Utils/types";
import { useDisclosure } from "@mantine/hooks";
import CreateBackLogItemModal from "./createBackLogItemModal";
import { Loader } from "@mantine/core";
import FullScreenLoading from "@/Utils/FullScreenLoading";

const ProductBackLogHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { setSelectedBackLog, selectedBackLog: backlog } = useBackLogContext();
  const [opened, { open, close }] = useDisclosure();
  if (!backlog) return <FullScreenLoading />;
  else
    return (
      <div className="flex justify-between gap-4 p-4 px-14 items-center">
        <CreateBackLogItemModal opened={opened} close={close} />
        <button onClick={() => setSelectedBackLog(null)}>
          <IoArrowBackOutline size={30} />
        </button>
        <div className="flex justify-between items-center ">
          <h1 className="text-2xl font-bold">{backlog.name}</h1>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
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
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <FiFilter size={20} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <FiArrowDown size={20} />
            Sort
          </button>
          <button
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={open}
          >
            <FiPlus size={20} />
            Add Item
          </button>
        </div>
      </div>
    );
};

export default ProductBackLogHeader;
