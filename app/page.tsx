import Dashboard from "@/components/Dashboard";
import SideBar from "@/components/sideBar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex w-full min-h-screen">
      <Dashboard/>
    </main>
  );
}
