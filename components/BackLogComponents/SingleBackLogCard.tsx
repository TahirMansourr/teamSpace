"use client";
import { BackLogDto } from "@/Utils/types";
import React from "react";
import { MdOpenInBrowser } from "react-icons/md";
import { useBackLogContext } from "../Contexts/BackLogContext";

const SingleBackLogCard = ({ backlog }: { backlog: BackLogDto }) => {
  const { setSelectedBackLog } = useBackLogContext();
  return (
    <div
      key={backlog._id}
      className="border rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
    >
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-lg font-semibold text-indigo-600">
          {backlog.name}
        </h2>
        <button
          className=" hover:bg-gray-100 rounded-md hover:scale-110"
          onClick={() => setSelectedBackLog(backlog)}
        >
          <MdOpenInBrowser size={25} className="text-blue-600" />
        </button>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {backlog.description}
      </p>

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            {backlog.backlogItems?.length} Items
          </span>
          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
            {
              backlog.backlogItems?.filter((item) => item.status === "Done")
                .length
            }{" "}
            Done
          </span>
        </div>
        <span className="text-xs text-gray-500">
          {new Date(backlog.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default SingleBackLogCard;
