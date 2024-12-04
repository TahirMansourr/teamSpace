import React from "react";
import AddUsers from "./AddUsers";

const MainSettingsComponent = () => {
  return (
    <div className="flex flex-col w-full">
      <h1 className="mx-auto">Main Settings</h1>
      <div>
        <AddUsers />
      </div>
    </div>
  );
};

export default MainSettingsComponent;
