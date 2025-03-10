"use client";

import DocumentForm from "../new/components/DocumentForm";
import DocumentHeader from "../new/components/DocumentHeader";
import WYSIWYG from "@/app/components/WYSIWYG";
import { useGenerateNews, useNewsDetail } from "../queries/news";
import AiTimesLoader from "@/app/components/AiTimesLoader";
import { useState } from "react";
import { useParams } from "next/navigation";
import DocumentSidebar from "../new/components/Sidebar/DocumentSidebar";
import Link from "next/link";
import { ArrowLeft } from "flowbite-react-icons/outline";
import { AddDocumentType } from "../new/types";

export default function Page() {
  const params = useParams<{ id: string }>();
  const { data } = useNewsDetail(params.id);
  const [isEditingNews, setIsEditingNews] = useState(false);

  const { data: generatedData, isPending, mutate } = useGenerateNews();

  const onSubmitForm = async (data: AddDocumentType) => {
    const createNewsPayload = {
      references: data.references,
      topic: data.topic,
      tone: data.tone,
      language: data.language,
      writing_style: data.writing_style,
      keys: data.keywords,
    };
    mutate(createNewsPayload);
  };

  return (
    <>
      {data && !isPending ? (
        <div className="flex">
          <div className="w-[300px] border-r border-zinc-300 h-screen overflow-auto pr-[30px]  py-5 pl-5 shrink-0">
            <Link href={"/dashboard"} className="flex items-center gap-2.5 mb-5">
              <ArrowLeft size={32} />
              Back to home
            </Link>
            <DocumentForm
              defaultValues={{
                ...data,
                keywords: data.keys,
                additional_info: "",
                writing_style: data.writingStyle,
              }}
              onSubmit={onSubmitForm}
            />
          </div>
          <div className="flex flex-col gap-5 p-5 w-full">
            <DocumentHeader onEdit={() => setIsEditingNews((prev) => !prev)} />
            <WYSIWYG
              initialContent={generatedData?.generatedContent || data.rawContent}
              readonly={!isEditingNews}
            />
          </div>
          <div className="shrink-0">
            <DocumentSidebar
              plagiarismPercentage={
                generatedData?.overallPlagiarismPercentage ||
                data?.overallPlagiarismPercentage ||
                "N/A"
              }
              plagiarismCheck={generatedData?.plagiarismCheck || data?.plagiarismCheck || []}
            />
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
