import SideBar from "@/components/sideBar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex w-full min-h-screen">
      <SideBar/>
      <section className=" transition ease-in-out delay-200 flex w-full m-5 rounded-xl shadow-2xl bg-[#bcbcc1]  items-center justify-center p-3  ">
      <div className=" bg-gradient-to-tr from-[#B4B4B8] to-[#d4d5da]  rounded-xl shadow-xl h-full w-full">

      </div>
      </section>
      
    </main>
  );
}
