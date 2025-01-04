"use client";

import { useState } from "react";
import MainPageHeader from "./MainPageHeader";

const MainPage = () => {
  const [sprints, setSprints] = useState([]);

  return (
    <div className="container mx-auto p-6">
      <MainPageHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sprints.map((sprint: any) => (
          <div
            key={sprint._id}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">{sprint.name}</h3>
              <span className="px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-600">
                {sprint.status}
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-600">Goal: {sprint.goal}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>
                  Start: {new Date(sprint.startDate).toLocaleDateString()}
                </span>
                <span>
                  End: {new Date(sprint.endDate).toLocaleDateString()}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium">
                  Items: {sprint.backlogItems?.length || 0}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MainPage;
