import React from "react";
import DocumentForm from "./components/DocumentForm";
import WYSIWYG from "@/app/components/WYSIWYG";
import DocumentHeader from "./components/DocumentHeader";
import DocumentSimilarity from "./components/DocumentSimilarity";

const Page = () => {
  return (
    <div className="flex">
      <div className="w-[350px] border-r border-zinc-300 h-screen overflow-auto shrink-0">
        <DocumentForm />
      </div>
      <div className="flex flex-col gap-5 p-5 w-full">
        <DocumentHeader />
        <WYSIWYG />
      </div>
      <div className="shrink-0">
        <DocumentSimilarity />
      </div>
    </div>
  );
};

export default Page;
