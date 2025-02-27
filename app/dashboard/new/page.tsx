"use client";

import React, { useState } from "react";
import DocumentForm from "./components/DocumentForm";
import DocumentHeader from "./components/DocumentHeader";
import EmptyNews from "./components/EmptyNews";
import DocumentSidebar from "./components/Sidebar/DocumentSidebar";
import { AddDocumentType } from "./types";
import WYSIWYG from "@/app/components/WYSIWYG";
import { useGenerateNews } from "../queries/news";
import AiTimesLoader from "@/app/components/AiTimesLoader";

const Page = () => {
  const [isEditingNews, setIsEditingNews] = useState(false);

  const { data, isPending, mutate } = useGenerateNews();

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

  const renderMainContent = () => {
    if (isPending) {
      return <AiTimesLoader />;
    }
    if (data) {
      return (
        <>
          <DocumentHeader onEdit={() => setIsEditingNews((prev) => !prev)} />
          <WYSIWYG readonly={!isEditingNews} initialContent={data.results[0].generated_content} />
        </>
      );
    }
    return <EmptyNews />;
  };

  return (
    <div className="flex">
      <div className="w-[300px] border-r border-zinc-300 h-screen overflow-auto shrink-0">
        <DocumentForm onSubmit={onSubmitForm} />
      </div>
      <div className="flex flex-col gap-5 p-5 w-full">{renderMainContent()}</div>
      <div className="shrink-0">
        <DocumentSidebar
          plagiarismPercentage={
            data ? (data.results[0].plagiarism_cost * 100).toFixed(0) + "%" : "N/A"
          }
        />
      </div>
    </div>
  );
};

export default Page;
