import { Home } from "flowbite-react-icons/outline";
import Link from "next/link";
import React from "react";

const SidebarMenu = () => {
  return (
    <Link href={""} passHref className="flex items-center bg-primary gap-5 hover:text-opacity-25">
      <Home color="white" />
      <span className="text-2xl text-white">Home</span>
    </Link>
  );
};
const Sidebar = () => {
  return (
    <div className="flex flex-col w-[360px] p-[50px] gap-[161px] bg-primary h-screen">
      <p className="text-6xl font-bold text-opacity-40 text-white">AITimes</p>

      <div className="flex flex-col justify-between h-full">
        {/* Menu */}
        <nav className="flex flex-col gap-5">
          <SidebarMenu></SidebarMenu>
          <SidebarMenu></SidebarMenu>
        </nav>

        {/* Signout */}
        <div className="flex flex-col gap-2.5">
          <button className="text-xl text-zinc-200 w-max">Sign out</button>
          <p className="text-xs text-white">Super Admin GenAI</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
