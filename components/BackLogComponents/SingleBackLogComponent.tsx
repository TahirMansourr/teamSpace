import { BackLogDto } from "@/Utils/types";
import ProductBackLogHeader from "./ProductBackLogHeader";
import ProductBackLogTable from "./ProductBackLogTable";

export function SingleBackLogComponent({
  backlog,
}: Readonly<{ backlog: BackLogDto }>) {
  return (
    <section className="w-full h-screen flex flex-col bg-white dark:bg-gray-900  rounded-md gap-4">
      <ProductBackLogHeader backlog={backlog} />
      <ProductBackLogTable />
    </section>
  );
}
