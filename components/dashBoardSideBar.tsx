"use client";
import React, { Dispatch, SetStateAction } from "react";
import UserButton from "./user-button/UserButton";

const DashBoardSideBar = ({
  setSelectedItemInSideBar,
  SelectedItemInSideBar,
  setOpened,
}: {
  setSelectedItemInSideBar: Dispatch<SetStateAction<string>>;
  SelectedItemInSideBar: string;
  setOpened: Dispatch<SetStateAction<boolean>>;
}) => {
  const dataForSideBar = ["projects"];
  //, "meetings", "notifications", "messages"

  return (
    <div className="flex flex-col h-full bg-white min-w-[280px]">
      <div className="p-4 border-b border-gray-100">
        <div className="flex flex-col rounded-lg shadow-md border border-gray-100 p-3 bg-gradient-to-br from-gray-50 to-white">
          <UserButton />
        </div>
      </div>

      <nav className="flex-grow p-4">
        <ul className="space-y-2 list-none">
          {dataForSideBar.map((item: string) => (
            <li key={item}>
              <button
                onClick={() => {
                  setSelectedItemInSideBar("projects");
                  setOpened(false);
                }}
                className={`w-full px-6 py-4 rounded-lg text-left capitalize transition-all text-lg
                  ${
                    SelectedItemInSideBar != item
                      ? "hover:cursor-not-allowed"
                      : null
                  }
                  ${
                    SelectedItemInSideBar === item
                      ? "bg-blue-50 text-blue-600 font-medium shadow-sm"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default DashBoardSideBar;
