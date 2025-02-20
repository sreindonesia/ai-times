import { ArrowUpRightFromSquare } from "flowbite-react-icons/outline";
import React from "react";

const SimilarityCard = () => {
  return (
    <div className="p-4 rounded-lg border-zinc-300 border shadow-md">
      <span className="font-medium bg-[#E500004D] bg-opacity-30 text-zinc-500">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est laboriosam voluptatem
        assumenda excepturi neque dicta beatae illum accusantium amet voluptate. Quidem aliquam quis
        possimus dicta perspiciatis doloremque, ducimus nostrum tenetur?
      </span>

      <hr className="my-2" />

      <div className="flex items-center justify-between">
          <a href="https://google.com" className="hover:underline flex items-center gap-2">
					<span className="">www.kompas.com</span>
          <ArrowUpRightFromSquare size={16} color="#DEDEDE" />
					</a>

				<span className="font-bold">1%</span>
      </div>
    </div>
  );
};

export default SimilarityCard;
