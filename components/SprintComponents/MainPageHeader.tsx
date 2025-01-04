import React, { useState } from "react";
import { useBackLogContext } from "../Contexts/BackLogContext";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useSprintContext } from "../Contexts/SprintContext";

const MainPageHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const {
    selectedBackLog,
    setSelectedBackLog,
    myBackLogs: backlogs,
  } = useSprintContext();
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50"
        >
          <span>Select Product Backlog</span>
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
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
              >
                {backlog.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        <IoMdAdd />
        Create Sprint
      </button>
    </div>
  );
};

export default MainPageHeader;
