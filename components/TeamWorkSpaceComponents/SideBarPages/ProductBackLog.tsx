"use client";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { TransitionWrapper } from "../TransitionWrapper";
import ProductBackLogTable from "@/components/BackLogComponents/ProductBackLogTable";
import ProductBackLogHeader from "@/components/BackLogComponents/ProductBackLogHeader";

const ProductBackLog = ({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    setOpened(true);
    return () => setOpened(false);
  }, []);

  return (
    <TransitionWrapper opened={opened}>
      <section className="w-full h-screen flex flex-col bg-white dark:bg-gray-900  rounded-md gap-4">
        <ProductBackLogHeader />
        <ProductBackLogTable />
      </section>
    </TransitionWrapper>
  );
};

export default ProductBackLog;
