"use client";

import { BackLogItemDto } from "@/Utils/types";
import { Button, Loader, Modal, Textarea } from "@mantine/core";
import { RiRobot2Line } from "react-icons/ri";
import ProductBackLogTable from "./ProductBackLogTable";

export default function GenerateWithAIModal({
  opened,
  close,
  projectDescription,
  setProjectDescription,
  handleGenerate,
  isLoading,
  output,
  backlog,
  isBacklogVisible,
  error,
  setAiGeneratedBacklog
}: {
  opened: boolean;
  close: () => void;
  projectDescription: string;
  setProjectDescription: (value: string) => void;
  handleGenerate: () => void;
  isLoading: boolean;
  output: string;
  backlog: BackLogItemDto[];
  isBacklogVisible: boolean;
  error: string | null;
  setAiGeneratedBacklog: (value: BackLogItemDto[]) => void;
}) {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="AI Backlog Generator"
      fullScreen
      overlayProps={{
        blur: 8,
        opacity: 0.6,
      }}
      styles={{
        root: { backgroundColor: "transparent", width: "100%" },
        header: {
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
          padding: "1rem 1.5rem",
        },
        title: {
          color: "#374151",
          fontSize: "1.25rem",
          fontWeight: 600,
        },
        body: {
          backgroundColor: "#ffffff",
          padding: "1.5rem",
        },
      }}
    >
      <div className="flex flex-col gap-4  mx-auto">
        {isLoading && <div className="flex justify-center items-center transition-all duration-300 ease-in-out "> <Loader type="bars" size="lg"  /> </div>}
        {output && !backlog.length && (
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
            <p className="whitespace-pre-wrap text-gray-700">{output}</p>
          </div>
        )}
        {isBacklogVisible && backlog.length > 0 && (
            isLoading ?  <div className="flex justify-center items-center "> <Loader type="bars" size="lg"  /> </div> :
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="font-bold text-lg mb-4 text-gray-800">
              Generated Backlog Items:
            </h3>
            <ProductBackLogTable aiGeneratedBackLogs={backlog} setAiGeneratedBacklog={setAiGeneratedBacklog}/>
          </div>
        )}
        {error && (
          <div className="p-6 bg-red-50 rounded-xl border border-red-200">
            <p className="text-red-600">{error}</p>
          </div>
        )}
        <div className="flex flex-col gap-4 w-[80%] mx-auto">
        <Textarea
          placeholder="Describe your project and what you want to achieve..."
          minRows={2}
          autosize
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          classNames={{
            input:
              "bg-white border border-gray-200 text-gray-700 placeholder:text-gray-400 rounded-xl p-4",
            wrapper:
              "focus-within:ring-2 focus-within:ring-blue-500/50 rounded-xl",
          }}
        //   className="w-[80%] mx-auto"
        />
        <div className="flex justify-end gap-4">
          <Button
            variant="subtle"
            onClick={close}
            className="text-gray-600 hover:bg-gray-100 px-6"
          >
            Cancel
          </Button>
          <Button
            onClick={handleGenerate}
            loading={isLoading}
            className="bg-blue-600 hover:bg-blue-700 px-6 transition-colors duration-200 text-white"
            leftSection={<RiRobot2Line size={20} />}
            title="Generate with AI"
          >
            Generate
          </Button>
        </div>
       
        </div>
      </div>
    </Modal>
  );
}
