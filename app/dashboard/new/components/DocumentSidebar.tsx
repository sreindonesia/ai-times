import useClickOutside from "@/app/utils/hooks/useClickOutside";
import React from "react";

interface DocumentSidebarProps {
  setOpenSidebar: (arg: boolean) => void;
}
const DocumentSidebar = ({ setOpenSidebar }: DocumentSidebarProps) => {
  const sidebarRef = useClickOutside(() => setOpenSidebar(false));
  return (
    <div className="w-[350px] h-screen border-l border-zinc-500" ref={sidebarRef}>
      DocumentSidebar
    </div>
  );
};

export default DocumentSidebar;
