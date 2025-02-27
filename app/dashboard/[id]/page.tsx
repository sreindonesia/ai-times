"use client";

import DocumentForm from "../new/components/DocumentForm";
import DocumentHeader from "../new/components/DocumentHeader";
import WYSIWYG from "@/app/components/WYSIWYG";
import { useNewsDetail } from "../queries/news";
import AiTimesLoader from "@/app/components/AiTimesLoader";
import { useState } from "react";
import { useParams } from "next/navigation";
import DocumentSidebar from "../new/components/Sidebar/DocumentSidebar";

export default function Page() {
  const params = useParams<{ id: string }>();
  const { data } = useNewsDetail(params.id);
  const [isEditingNews, setIsEditingNews] = useState(false);
  return (
    <>
      {data ? (
        <div className="flex">
          <div className="w-[300px] border-r border-zinc-300 h-screen overflow-auto shrink-0">
            <DocumentForm onSubmit={() => console.log("hello")} />
          </div>
          <div className="flex flex-col gap-5 p-5 w-full">
            <DocumentHeader onEdit={() => setIsEditingNews((prev) => !prev)} />
            <WYSIWYG initialContent={data.rawContent} readonly={!isEditingNews} />
          </div>
          <div className="shrink-0">
            <DocumentSidebar plagiarismPercentage={"0%"} />
          </div>
        </div>
      ) : (
        <div className="h-screen w-screen">
          <AiTimesLoader />
        </div>
      )}
    </>
  );
}
