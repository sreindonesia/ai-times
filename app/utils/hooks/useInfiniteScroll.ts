import { noAuthRequest, request } from "@/services/request";
import { useInfiniteQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Pagination } from "@/app/dashboard/types";

interface UseInfiniteScrollArgs {
  /**
   * Include query params in url
   */
  url: string;
  withAuth?: boolean;
  filterParams?: Record<string, string>;
}
export const useInfiniteScroll = <T extends Pagination>({
  url,
  withAuth = true,
}: UseInfiniteScrollArgs) => {
  const { ref: nextRef, inView: nextInView } = useInView();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasPreviousPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [url, searchParams.toString()],
    queryFn: async ({ pageParam }): Promise<T> => {
			console.log("current page params", pageParam);
      let response;
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set("page", pageParam.toString());
      if (withAuth) {
        response = await request<T>(
          `${url}?${newSearchParams.toString()}`,
          "GET",
        );
      } else {
        response = await noAuthRequest<T>(
          `${url}?${newSearchParams.toString()}`,
          "GET",
        );
      }
      if (response.isError || response.res === null) {
        throw new Error(response.message);
      }
      return response.res;
    },
    initialPageParam: 1,
    getPreviousPageParam: (firstPage) =>
      firstPage.currentPage <= 1
        ? undefined
        : firstPage.currentPage - 1,
    getNextPageParam: (nextPage) =>
      nextPage.currentPage >= nextPage.totalPages
        ? undefined
        : nextPage.currentPage + 1,
  });

  useEffect(() => {
    if (nextInView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [
    fetchNextPage,
    nextInView,
    router,
    searchParams,
    pathname,
    isFetchingNextPage,
  ]);

  return {
    nextRef,
    data,
    error,
    isLoading: isFetching,
    hasNextPage,
    hasPreviousPage,
  };
};
