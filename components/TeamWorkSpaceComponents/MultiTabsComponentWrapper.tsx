import { ScrollArea, Text, Tooltip } from "@mantine/core";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const ComponentWrapper = ({
  children,
  componentExpandState,
  className,
  stateSetter,
  componentName,
  modalOpener,
}: {
  children: React.ReactNode;
  componentExpandState: boolean;
  className?: string;
  stateSetter: React.Dispatch<React.SetStateAction<boolean>>;
  componentName: string;
  modalOpener?: () => void;
}) => {
  return (
    <article
      className={`transition-all ease-in-out duration-200 border flex flex-col bg-white rounded-md shadow-xl gap-2 ${className}
                ${
                  componentExpandState
                    ? "opacity-0 overflow-hidden"
                    : "opacity-100 flex-grow"
                }`}
      style={{
        width: componentExpandState ? "0" : "100%",
        height: componentExpandState ? "0" : "96%",
        padding: componentExpandState ? "0" : "0.5rem",
      }}
    >
      <header className="flex justify-between items-center  border-b">
        <Text
          size="xl"
          fw={600}
          className="text-slate-700 flex items-center gap-2"
        >
          {componentName}
        </Text>
        <div className="flex items-center gap-3">
          <Tooltip label="Create New" color="blue">
            <button
              onClick={modalOpener}
              className="p-2 hover:bg-blue-50 rounded-full transition-colors group"
            >
              <IoAddCircleOutline
                size={24}
                className="text-blue-500 group-hover:scale-110 transition-transform"
              />
            </button>
          </Tooltip>
          <button
            onClick={() => stateSetter(true)}
            className="p-2 hover:bg-red-50 rounded-full transition-colors group"
          >
            <IoClose
              size={24}
              className="text-red-500 group-hover:scale-110 transition-transform"
            />
          </button>
        </div>
      </header>
      <ScrollArea className="flex-1 w-full" w={"100%"}>
        {children}
      </ScrollArea>
    </article>
  );
};

export default ComponentWrapper;
