import { useMutation, useQuery } from "@tanstack/react-query";
import { News } from "../types";
import { request } from "@/services/request";
import { GenerateNewsRequestPayload, GenerateNewsResponse } from "../new/types";
import { useToast } from "@/app/components/Toast/useToast";

export const useNewsDetail = (id: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["news", id],
    queryFn: async ({ queryKey }) => {
      if (!queryKey[1]) {
        throw new Error("No id provided");
      }
      const { res, isError, message } = await request<News>(`/news/${queryKey[1]}`, "GET");
      if (isError || res === null) {
        throw new Error(message);
      }
      return res;
    },
  });
  return {
    data,
    error,
    isLoading,
  };
};

export const useGenerateNews = () => {
  const toast = useToast();
  const { data, isPending, error, mutate } = useMutation({
    mutationFn: async (createNewsPayload: GenerateNewsRequestPayload) => {
      const { isError, message, res } = await request<GenerateNewsResponse>(
        "/news/generate",
        "POST",
        createNewsPayload as unknown as { [key: string]: unknown }
      );
      if (isError) {
        throw new Error(message);
      }
      return res;
    },
    onError: (err) => toast({ message: err.message, type: "error" }),
    onSuccess: () => {
      toast({ message: "Success generate news", type: "success" });
    },
  });
  return {
    data,
    isPending,
    error,
    mutate,
  };
};
