"use client"

import React from "react";
import DocumentForm from "./components/DocumentForm";
//import WYSIWYG from "@/app/components/WYSIWYG";
import DocumentHeader from "./components/DocumentHeader";
//import DocumentSimilarity from "./components/DocumentSimilarity";
import EmptyNews from "./components/EmptyNews";
import DocumentSidebar from "./components/Sidebar/DocumentSidebar";

const Page = () => {
  //const [isEditingNews] = useState(false);
  
  return (
    <div className="flex">
      <div className="w-[300px] border-r border-zinc-300 h-screen overflow-auto shrink-0">
        <DocumentForm />
      </div>
      <div className="flex flex-col gap-5 p-5 w-full">
        <DocumentHeader />
        <EmptyNews/>
        {/*<WYSIWYG readonly={!isEditingNews} />*/}
      </div>
      <div className="shrink-0">
        <DocumentSidebar  />
      </div>
    </div>
  );
};

export default Page;
