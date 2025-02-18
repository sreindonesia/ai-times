import { Plus } from "flowbite-react-icons/outline";
import Link from "next/link";
import React from "react";

const CreateNewDocumentCard = () => {
  return (
    <Link href={"/dashboard/new"}>
      <div className="w-[150px] h-[200px] grid place-content-center bg-white shadow-md hover:bg-gray-50">
        <div className="flex flex-col items-center gap-2.5">
          <Plus size={48} />
          <p className="text-2xl font-medium">New</p>
        </div>
      </div>
    </Link>
  );
};

export default CreateNewDocumentCard;
