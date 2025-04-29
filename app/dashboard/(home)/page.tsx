"use client";

import React, { Suspense, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import CreateNewDocumentCard from "./components/CreateNewDocumentCard";
import DocumentCard from "./components/DocumentCard";
import { GetListNewsResponse } from "../types";
import AiTimesLoader from "@/app/components/AiTimesLoader";
import { useToast } from "@/app/components/Toast/useToast";
import { useInfiniteScroll } from "@/app/utils/hooks/useInfiniteScroll";
import { processNewsPlagiarism } from "../queries/news";

const PageContent = () => {
  const toast = useToast();

  const { data, error, hasNextPage, isLoading, nextRef } = useInfiniteScroll<GetListNewsResponse>({
    url: "/news",
    withAuth: true,
  });

  useEffect(() => {
    if (error) {
      toast({
        message: error.message || "Something went wrong, please try again later",
        type: "error",
      });
    }
  }, [error, toast]);

  return (
    <div className="bg-slate-100 p-9 flex flex-col gap-6 w-full h-screen overflow-y-auto">
      <p>Searchbar</p>
      <p>Sort</p>
      <div className="flex flex-wrap gap-8 h-full mb-8">
        {data ? (
          <>
            <CreateNewDocumentCard />
            {data.pages.map((page, index) => (
              <React.Fragment key={index}>
                {page.items.map((article) => (
                  <DocumentCard {...processNewsPlagiarism(article)} key={article.id} />
                ))}
              </React.Fragment>
            ))}
            {hasNextPage ? (
              <div className="w-full" ref={nextRef}>
                Load more
              </div>
            ) : (
              <></>
            )}
          </>
        ) : isLoading ? (
          <AiTimesLoader />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Suspense>
        <PageContent />
      </Suspense>
    </div>
  );
};

export default Page;
