import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { CreateOrUpdateSprintModal } from "./CreateSprintModal";
import { useBackLogContext } from "../Contexts/BackLogContext";

const MainPageHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const {
    selectedBackLog,
    setSelectedBackLog,
    myBackLogs: backlogs,
  } = useBackLogContext();
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50"
        >
          <span>
            {selectedBackLog ? selectedBackLog.name : "Choose Backlog"}
          </span>
          <MdKeyboardArrowDown
            className={`transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full mt-1 w-full bg-white border rounded-md shadow-lg z-10">
            {backlogs?.map((backlog: any) => (
              <button
                key={backlog._id}
                onClick={() => {
                  setSelectedBackLog(backlog);
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

      <CreateOrUpdateSprintModal />
    </div>
  );
};

export default MainPageHeader;
