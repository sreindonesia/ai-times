import { ArrowUpRightFromSquare } from "flowbite-react-icons/outline";
import React from "react";
import { PlagiarismCardProps } from "../../types";
import Link from "next/link";

const SimilarityCard = ({ percentageMatched, textmatched, url }: PlagiarismCardProps) => {
  return (
    <div className="p-4 rounded-lg border-zinc-300 border shadow-md">
      <span className="font-medium bg-[#E500004D] bg-opacity-30 text-zinc-500">{textmatched}</span>

      <hr className="my-2" />

      <div className="flex items-center justify-between">
        <Link passHref href={url} className="hover:underline flex items-center gap-2">
          <span className="">{url}</span>
          <ArrowUpRightFromSquare size={16} color="#DEDEDE" />
        </Link>

        <span className="font-bold">{percentageMatched}</span>
      </div>
    </div>
  );
};

export default SimilarityCard;
