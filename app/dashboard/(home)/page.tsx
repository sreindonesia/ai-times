"use client";

import React from "react";
import Sidebar from "./components/Sidebar";
import CreateNewDocumentCard from "./components/CreateNewDocumentCard";
import DocumentCard from "./components/DocumentCard";
import { useQuery } from "@tanstack/react-query";
import { request } from "@/services/request";
import { News } from "../types";
import AiTimesLoader from "@/app/components/AiTimesLoader";
import { useToast } from "@/app/components/Toast/useToast";

const Page = () => {
  const toast = useToast();
  const { data, isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const newsResponse = await request<News[]>("/news", "GET");
      if (newsResponse.isError) {
        toast({
          message: newsResponse.message || "Something went wrong, please try again later",
          type: "error",
        });
      }
			return newsResponse
    },
  });
  return (
    <div className="flex">
      <Sidebar />
      <div className="bg-slate-100 p-9 flex flex-col gap-6 w-full h-screen overflow-y-auto">
        <p>Searchbar</p>
        <p>Sort</p>
        <div className="flex flex-wrap gap-8 h-full">
          {isLoading ? (
            <AiTimesLoader />
          ) : (
            <>
              <CreateNewDocumentCard />
              {data?.res &&
                data.res.map((article) => <DocumentCard {...article} key={article.title} />)}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
