"use client";

import FormText from "@/app/components/Forms/FormText";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bars } from "flowbite-react-icons/outline";
import React from "react";
import { useForm } from "react-hook-form";
import { addDocumentSchema, AddDocumentType } from "../types";
import FormDropdownSingle from "@/app/components/Forms/Dropdown/FormDropdownSingle";
import { TONE_OPTIONS } from "../constants";
import FormTextAreaWithChip from "@/app/components/Forms/TextArea/FormTextAreaWithChip";
import AiTimesButton from "@/app/components/Button";

const DocumentForm = () => {
  const { control, setValue, watch } = useForm<AddDocumentType>({
    resolver: zodResolver(addDocumentSchema),
  });

  console.log(watch());
  return (
    <div className="flex flex-col h-full pr-[30px] py-5 pl-5 gap-5 justify-between">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2.5">
          <Bars size={32} />
          <div className="w-full">
            <FormText label="" name="title" control={control} placeholder="Untitled Document" />
          </div>
        </div>
        <FormText label="Topic" name="topic" control={control} placeholder="Topik dokumen" />
        <FormDropdownSingle
          name="category"
          options={[]}
          addOptionLabel="Tambah kategori baru"
          placeholder="Pilih kategori"
          addOptionPlaceholder=""
          label="Content Category"
          setValue={
            setValue as (
              name: string,
              value: string | number,
              config?: Record<string, unknown>
            ) => void
          }
          value={watch().category}
        />
        <FormDropdownSingle
          name="tone"
          options={TONE_OPTIONS}
          placeholder="Tone berita"
          label="Set tone"
          setValue={
            setValue as (
              name: string,
              value: string | number,
              config?: Record<string, unknown>
            ) => void
          }
          value={watch().tone}
        />
        <FormTextAreaWithChip
          label="Keywords (up to 5 words)"
          name="keywords"
          setValue={setValue as (name: string, value: string[]) => void}
          value={watch().keywords || []}
          placeholder="Separate by new line"
        />
        <FormTextAreaWithChip
          label="References (up to 3 links)"
          name="references"
          setValue={setValue as (name: string, value: string[]) => void}
          value={watch().references || []}
          placeholder="Separate by new line"
          max={3}
        />
      </div>
      <AiTimesButton color="primary" size="lg" className="mb-5">
        Generate
      </AiTimesButton>
    </div>
  );
};

export default DocumentForm;
