import React from "react";
import DocumentForm from "./components/DocumentForm";
import WYSIWYG from "@/app/components/WYSIWYG";

const Page = () => {
  return (
    <div className="flex">
      <div className="w-1/4 border-r border-zinc-300 h-screen overflow-auto">
        <DocumentForm />
      </div>
      <div className="flex flex-col gap-5 p-5 w-full">
        <WYSIWYG />
      </div>
    </div>
  );
};

export default Page;
