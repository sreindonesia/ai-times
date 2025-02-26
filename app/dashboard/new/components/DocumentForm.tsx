"use client";

import FormText from "@/app/components/Forms/FormText";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bars } from "flowbite-react-icons/outline";
import React from "react";
import { useForm } from "react-hook-form";
import { addDocumentSchema, AddDocumentType } from "../types";
import FormDropdownSingle from "@/app/components/Forms/Dropdown/FormDropdownSingle";
import {
  DEFAULT_ADD_DOCUMENT,
  LANG_OPTIONS,
  TONE_OPTIONS,
  WRITING_STYLE_OPTIONS,
} from "../constants";
import FormTextAreaWithChip from "@/app/components/Forms/TextArea/FormTextAreaWithChip";
import AiTimesButton from "@/app/components/Button";
import { News } from "../../types";
import FormTextArea from "@/app/components/Forms/TextArea/FormTextArea";

const DocumentForm = ({}: { defaultValues?: News }) => {
  const {
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { isValid },
  } = useForm<AddDocumentType>({
    resolver: zodResolver(addDocumentSchema),
    defaultValues: DEFAULT_ADD_DOCUMENT,
    mode: "onChange",
  });

  const onSubmitForm = (data: AddDocumentType) => {
    console.log(data);
  };

  console.log(watch());

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="flex flex-col h-full pr-[30px] w-full py-5 pl-5 gap-5 justify-between"
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2.5">
          <Bars size={32} />
        </div>
        <FormText label="Topic" name="topic" control={control} placeholder="Topik dokumen" />

        <FormDropdownSingle
          name="tone"
          options={TONE_OPTIONS}
          placeholder="Tone berita"
          label="Tone"
          setValue={
            setValue as (
              name: string,
              value: string | number,
              config?: Record<string, unknown>
            ) => void
          }
          value={watch().tone}
        />
        <FormDropdownSingle
          name="language"
          options={LANG_OPTIONS}
          placeholder="Pilih bahasa"
          label="Bahasa"
          setValue={
            setValue as (
              name: string,
              value: string | number,
              config?: Record<string, unknown>
            ) => void
          }
          value={watch().language}
        />
        <FormDropdownSingle
          name="writing_style"
          options={WRITING_STYLE_OPTIONS}
          placeholder="Pilih cara penulisan"
          label="Writing Style"
          setValue={
            setValue as (
              name: string,
              value: string | number,
              config?: Record<string, unknown>
            ) => void
          }
          value={watch().writing_style}
        />
        <FormTextArea
          label="Additional Info"
          name="additional_info"
          control={control}
          placeholder="Masukkan info tambahan"
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
      <div className=" w-full">
        <AiTimesButton color="primary" size="lg" className="mb-8 w-full" disabled={!isValid} type="submit">
          Generate
        </AiTimesButton>
      </div>
    </form>
  );
};

export default DocumentForm;
