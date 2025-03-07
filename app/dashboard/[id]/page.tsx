"use client";

import DocumentForm from "../new/components/DocumentForm";
import DocumentHeader from "../new/components/DocumentHeader";
import WYSIWYG from "@/app/components/WYSIWYG";
import { useNewsDetail } from "../queries/news";
import AiTimesLoader from "@/app/components/AiTimesLoader";
import { useState } from "react";
import { useParams } from "next/navigation";
import DocumentSidebar from "../new/components/Sidebar/DocumentSidebar";
import Link from "next/link";
import { ArrowLeft } from "flowbite-react-icons/outline";

export default function Page() {
  const params = useParams<{ id: string }>();
  const { data } = useNewsDetail(params.id);
  const [isEditingNews, setIsEditingNews] = useState(false);
  return (
    <>
      {data ? (
        <div className="flex">
          <div className="w-[300px] border-r border-zinc-300 h-screen overflow-auto pr-[30px]  py-5 pl-5 shrink-0">
            <Link href={"/dashboard"} className="flex items-center gap-2.5 mb-5">
              <ArrowLeft size={32} />
              Back to home
            </Link>
            <DocumentForm onSubmit={() => console.log("docs")} />
          </div>
          <div className="flex flex-col gap-5 p-5 w-full">
            <DocumentHeader onEdit={() => setIsEditingNews((prev) => !prev)} />
            <WYSIWYG initialContent={data.rawContent} readonly={!isEditingNews} />
          </div>
          <div className="shrink-0">
            <DocumentSidebar plagiarismPercentage={"0%"} plagiarismCheck={[]} />
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
