"use client";

import AiTimesButton from "@/app/components/Button";
import React, { useState } from "react";
import DocumentSidebar from "./Sidebar/DocumentSidebar";

const DocumentSimilarity = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <>
      {openSidebar ? (
        <DocumentSidebar setOpenSidebar={setOpenSidebar} />
      ) : (
        <div className="pt-5 px-10 flex flex-col justify-end gap-1 w-[350px]">
          <span className="text-right text-4xl text-primary font-medium">2%</span>
          <span className="font-bold whitespace-nowrap text-right">Overall Similarity</span>
          <AiTimesButton color="primary" size="md" onClick={() => setOpenSidebar(true)} className="w-[137px] ml-auto">
            Details
          </AiTimesButton>
        </div>
      )}
    </>
  );
};

export default DocumentSimilarity;
