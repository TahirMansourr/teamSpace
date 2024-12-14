import React from "react";
import { Title, Text } from "@mantine/core";
import Image from "next/image";
import emptybacklog from "@/public/emptybacklog.png";
import CreateBackLogForm from "../Forms/createBackLog";

const FirstBackLog = () => {
  return (
    <div className="w-full h-screen flex  bg-white dark:bg-gray-900 justify-center  rounded-md gap-12">
      <div className="flex flex-col items-center justify-center">
        <Image
          src={emptybacklog}
          alt="No backlogs"
          width={800}
          height={500}
          priority
        />

        <Title order={2}>No Backlogs Yet</Title>
        <Text c="dimmed">
          Create your first product backlog to start organizing your project
          items
        </Text>
      </div>
      <CreateBackLogForm />
    </div>
  );
};

export default FirstBackLog;
