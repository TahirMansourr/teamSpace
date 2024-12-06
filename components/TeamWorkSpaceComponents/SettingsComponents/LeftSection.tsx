import React from "react";
import AddUsers from "./AddUsers";
import { Button, ScrollArea } from "@mantine/core";
import RemoveUserComponent from "./RemoveUserComponent";
import AddUsersComponent from "./AddUsersComponent";

const LeftSection = () => {
  return (
    <div className=" w-[50%]  h-[90%] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-[3vh] space-y-[2vh]">
      <ScrollArea>
        <div className="space-y-[2vh]">
          {/* <h2 className="text-[clamp(1.2rem,2vw,1.8rem)] font-semibold text-gray-800 dark:text-white">
            Team Settings
          </h2> */}

          <nav className="space-y-[2vh]">
            <div className="p-[3%] bg-gray-50 dark:bg-gray-700 rounded-lg transition-all duration-200 hover:shadow-lg space-y-3">
              <h3 className="text-[clamp(0.9rem,1.5vw,1.2rem)] font-medium text-gray-600 dark:text-gray-300 mb-[2vh]">
                User Management
              </h3>
              <AddUsersComponent />
              <RemoveUserComponent />
            </div>

            <div className="p-[3%] bg-gray-50 dark:bg-gray-700 rounded-lg transition-all duration-200 hover:shadow-lg flex justify-between">
              <h3 className="text-[clamp(0.9rem,1.5vw,1.2rem)] font-medium text-gray-600 dark:text-gray-300">
                Team Permissions
              </h3>
              <Button variant="outline" color="black">
                comming soon
              </Button>
            </div>

            <div className="p-[3%] bg-gray-50 dark:bg-gray-700 rounded-lg transition-all duration-200 hover:shadow-lg">
              <h3 className="text-[clamp(0.9rem,1.5vw,1.2rem)] font-medium text-gray-600 dark:text-gray-300">
                Workspace Settings
              </h3>
            </div>
          </nav>
        </div>
      </ScrollArea>
    </div>
  );
};

export default LeftSection;
