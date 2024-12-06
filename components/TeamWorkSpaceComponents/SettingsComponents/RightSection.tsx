import React from "react";

const RightSection = () => {
  return (
    <div className="flex-grow h-[90%] bg-white dark:bg-gray-800 p-[3vh] rounded-lg">
      <div className="h-full w-full bg-gray-50 dark:bg-gray-700 rounded-lg p-[3vh] transition-all duration-200">
        {/* Content will be dynamically rendered here */}
      </div>
    </div>
  );
};

export default RightSection;
