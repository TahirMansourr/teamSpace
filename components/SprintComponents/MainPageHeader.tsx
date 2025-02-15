import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { CreateOrUpdateSprintModal } from "./CreateSprintModal";
import { useBackLogContext } from "../Contexts/BackLogContext";
import { BackLogDto } from "@/Utils/types";

const MainPageHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const {
    selectedBackLog,
    setSelectedBackLog,
    myBackLogs: backlogs,
    setFilteredBacklogs,
  } = useBackLogContext();
  return (
    <div className="flex justify-between items-center mb-8 mx-11">
      <div className="relative flex items-center gap-4">
        <span className="text-xl font-bold">
          {selectedBackLog ? selectedBackLog.name : "All Sprints"}
        </span>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50"
        >
          <MdKeyboardArrowDown
            className={`transition-transform  duration-300 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full mt-1 w-full bg-white border rounded-md shadow-lg z-10">
            <button
              onClick={() => {
                setSelectedBackLog(null);
                setFilteredBacklogs([]);
                setIsDropdownOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-50 cursor-pointer w-full text-center"
            >
              Show All Sprints
            </button>

            {backlogs?.map((backlog: BackLogDto) => (
              <button
                key={backlog._id}
                onClick={() => {
                  setSelectedBackLog(backlog);
                  setFilteredBacklogs(backlog.backlogItems || []);
                  setIsDropdownOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer w-full text-center"
              >
                {backlog.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <CreateOrUpdateSprintModal/>
    </div>
  );
};

export default MainPageHeader;
