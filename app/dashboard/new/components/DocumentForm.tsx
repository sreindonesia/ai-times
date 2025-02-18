"use client";

import FormText from "@/app/components/Forms/FormText";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bars } from "flowbite-react-icons/outline";
import React from "react";
import { useForm } from "react-hook-form";
import { addDocumentSchema } from "../types";

const DocumentForm = () => {
  const { control } = useForm({
    resolver: zodResolver(addDocumentSchema),
  });
  return (
    <div className="flex flex-col gap-5 pr-[30px] pl-5">
      <div className="flex items-center gap-2.5">
        <Bars size={32} />
        <div className="w-full">
          <FormText label="" name="title" control={control} placeholder="Untitled Document" />
        </div>
      </div>
    </div>
  );
};

export default DocumentForm;
