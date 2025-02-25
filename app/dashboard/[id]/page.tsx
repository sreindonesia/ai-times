"use client";

import DocumentForm from "../new/components/DocumentForm";
import DocumentHeader from "../new/components/DocumentHeader";
import WYSIWYG from "@/app/components/WYSIWYG";
import DocumentSimilarity from "../new/components/DocumentSimilarity";
import { useNewsDetail } from "../queries/news";
import AiTimesLoader from "@/app/components/AiTimesLoader";
import { useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const { data } = useNewsDetail(params.id);
  const [isEditingNews, setIsEditingNews] = useState(false);
  return (
    <>
      {data ? (
        <div className="flex">
          <div className="w-[350px] border-r border-zinc-300 h-screen overflow-auto shrink-0">
            <DocumentForm defaultValues={data} />
          </div>
          <div className="flex flex-col gap-5 p-5 w-full">
            <DocumentHeader onEdit={() => setIsEditingNews((prev) => !prev)} />
            <WYSIWYG initialContent={data.rawContent} readonly={!isEditingNews} />
          </div>
          <div className="shrink-0">
            <DocumentSimilarity />
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
