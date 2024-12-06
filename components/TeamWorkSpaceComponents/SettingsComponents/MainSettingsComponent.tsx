import React from "react";
import AddUsers from "./AddUsers";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

const MainSettingsComponent = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center h-full">
      <h1 className="mx-auto">Main Settings</h1>
      <div className="flex w-full h-full gap-2 items-center justify-center ">
        <LeftSection />
        {/* <RightSection /> */}
      </div>
    </div>
  );
};

export default MainSettingsComponent;
