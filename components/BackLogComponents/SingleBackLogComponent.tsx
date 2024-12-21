import ProductBackLogTable from "./BackLog-Items/ProductBackLogTable";
import ProductBackLogHeader from "./BackLog-Items/ProductBackLogHeader";

export function SingleBackLogComponent() {
  return (
    <section className="w-full h-screen flex flex-col bg-white dark:bg-gray-900  rounded-md gap-4">
      <ProductBackLogHeader />
      <ProductBackLogTable />
    </section>
  );
}
