//import useClickOutside from "@/app/utils/hooks/useClickOutside";
import React from "react";
import SidebarTab from "./SidebarTab";

//interface DocumentSidebarProps {
//  setOpenSidebar: (arg: boolean) => void;
//}
const DocumentSidebar = ({  }) => {
  //const sidebarRef = useClickOutside(() => setOpenSidebar(false));
  return (
    <div className="w-[300px] h-screen border-l border-zinc-300" >
      <SidebarTab />
    </div>
  );
};

export default DocumentSidebar;
