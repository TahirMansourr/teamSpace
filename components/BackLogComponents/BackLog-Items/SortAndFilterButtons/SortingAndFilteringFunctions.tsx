import { BackLogItemDto } from "@/Utils/types";

type priority = "High" | "Medium" | "Low";
type status = "To Do" | "In Progress" | "Done";
type type = "Feature" | "Bug" | "Technical Debt" | "Improvement" | "Spike";

type FilterProps = {
  backLogItems: BackLogItemDto[];
} & (
  | { filterFor: "priority"; filterValue: priority }
  | { filterFor: "status"; filterValue: status }
  | { filterFor: "type"; filterValue: type }
);

const filterBacklogItems = ({
  filterFor,
  filterValue,
  backLogItems,
}: FilterProps) => {
  return backLogItems.filter((item) => item[filterFor] === filterValue);
};

export default filterBacklogItems;
