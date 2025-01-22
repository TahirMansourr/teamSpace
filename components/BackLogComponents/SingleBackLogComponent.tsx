import BackLogTable from "./BackLog-Items/ProductBackLogTable";
import BackLogHeader from "./BackLog-Items/ProductBackLogHeader";

export function SingleBackLogComponent() {
  return (
    <section className="w-full h-screen flex flex-col bg-white a  rounded-md gap-4">
      <BackLogHeader />
      <BackLogTable />
    </section>
  );
}
