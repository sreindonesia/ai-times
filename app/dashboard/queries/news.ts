import { useQuery } from "@tanstack/react-query";
import { News } from "../types";
import { request } from "@/services/request";

export const useNewsDetail = (id: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["news", id],
    queryFn: async ({ queryKey }) => {
      if (!queryKey[1]) {
        throw new Error("No id provided");
      }
      const { res, isError, message } = await request<News>(
        `/news/${queryKey[1]}`,
        "GET",
      );
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