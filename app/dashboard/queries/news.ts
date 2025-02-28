import { useMutation, useQuery } from "@tanstack/react-query";
import { News } from "../types";
import { request } from "@/services/request";
import {
  GenerateNewsRequestPayload,
  GenerateNewsResponse,
  ProcessedGenerateNewsResponse,
} from "../new/types";
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

const processGenerateNewsResponse = (res: GenerateNewsResponse): ProcessedGenerateNewsResponse => {
  const result = res.results[0];
  if (result.plagiarism_check.status === "No plagiarism detected") {
    return {
      cleaned_content: result.cleaned_content,
      generated_content: result.generated_content,
      overall_plagiarism_percentage: "0%",
      plagiarism_cost: result.plagiarism_cost,
      plagiarism_check: [],
    };
  }

  const percentMatchedSum = result.plagiarism_check.matches.reduce(
    (acc, curr) => acc + (curr.percentmatched || 0),
    0
  );
  const percentMatchedAvg = percentMatchedSum / result.plagiarism_check.matches.length;
  return {
    cleaned_content: result.cleaned_content,
    generated_content: result.generated_content,
    overall_plagiarism_percentage: `${percentMatchedAvg}%`,
    plagiarism_cost: result.plagiarism_cost,
    plagiarism_check: result.plagiarism_check.matches.map((match) => ({
      percentageMatched: `${match.percentmatched}%`,
      textmatched: match.textmatched || "",
      url: match.url,
    })),
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
      return processGenerateNewsResponse(res);
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
