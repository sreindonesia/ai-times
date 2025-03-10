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
      return processNewsPlagiarism(res);
    },
  });
  return {
    data,
    error,
    isLoading,
  };
};

export const processNewsPlagiarism = (news: News) => {
  if (news.plagiarismCheck.status === "No plagiarism detected") {
    return {
      ...news,      
      overallPlagiarismPercentage: "0%",
      plagiarismCheck: [],
    };
  }

  const percentMatchedSum = news.plagiarismCheck.matches.reduce(
    (acc, curr) => acc + (curr.percentage_matched || 0),
    0
  );
  const percentMatchedAvg = percentMatchedSum / news.plagiarismCheck.matches.length;
  return {    
    ...news,
    overallPlagiarismPercentage: `${percentMatchedAvg}%`,
    plagiarismCheck: news.plagiarismCheck.matches.map((match) => ({
      percentageMatched: `${match.percentage_matched}%`,
      textmatched: match.text_matched || "",
      url: match.url,
    })),
  };
}

const processGenerateNewsResponse = (res: GenerateNewsResponse): ProcessedGenerateNewsResponse => {
  const result = res.results[0];
  if (result.plagiarism_check.status === "No plagiarism detected") {
    return {
      cleanedContent: result.cleaned_content,
      generatedContent: result.generated_content,
      overallPlagiarismPercentage: "0%",
      plagiarismCost: result.plagiarism_cost,
      plagiarismCheck: [],
    };
  }

  const percentMatchedSum = result.plagiarism_check.matches.reduce(
    (acc, curr) => acc + (curr.percentage_matched || 0),
    0
  );
  const percentMatchedAvg = percentMatchedSum / result.plagiarism_check.matches.length;
  return {
    cleanedContent: result.cleaned_content,
    generatedContent: result.generated_content,
    overallPlagiarismPercentage: `${percentMatchedAvg}%`,
    plagiarismCost: result.plagiarism_cost,
    plagiarismCheck: result.plagiarism_check.matches.map((match) => ({
      percentageMatched: `${match.percentage_matched}%`,
      textmatched: match.text_matched || "",
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
