import { Loader } from "@mantine/core";
import React from "react";

const FullScreenLoading = () => {
  return (
    <div className=" w-full h-screen flex items-center justify-center">
      <Loader type="bars" size="xl" />
    </div>
  );
};

export default FullScreenLoading;
