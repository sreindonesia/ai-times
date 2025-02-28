//import AiTimesButton from '@/app/components/Button'
//import { Refresh } from 'flowbite-react-icons/outline'
import React from "react";
import SimilarityCard from "./SimilarityCard";
import { PlagiarismCardProps } from "../../types";

interface SimilarityDetailsProps {
  plagiarismPercentage: string;
  plagiarismCheck: PlagiarismCardProps[];
}
const SimilarityDetails = ({ plagiarismPercentage, plagiarismCheck }: SimilarityDetailsProps) => {
  return (
    <div className="flex flex-col gap-[30px] px-5">
      {/* PERCENTAGE AND REFRESH BUTTON */}
      <div className="flex items-center justify-between gap-[30px]">
        <div className="flex flex-col gap-3">
          <span
            className={`text-4xl font-medium ${
              plagiarismPercentage === "N/A" ? "text-gray-500" : "text-primary"
            }`}
          >
            {plagiarismPercentage}
          </span>
          <span className="font-bold">Overall Similarity</span>
        </div>

        {/*<AiTimesButton color='primary' size='md'>
					<div className="flex items-center">
						<Refresh color='white'/>
						Refresh
					</div>
				</AiTimesButton>*/}
      </div>
      {plagiarismCheck.map((details) => (
        <SimilarityCard {...details} key={details.url} />
      ))}
    </div>
  );
};

export default SimilarityDetails;
