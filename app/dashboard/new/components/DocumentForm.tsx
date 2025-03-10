"use client";

import FormText from "@/app/components/Forms/FormText";
import { zodResolver } from "@hookform/resolvers/zod";
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
import FormTextArea from "@/app/components/Forms/TextArea/FormTextArea";

interface DocumentFormProps {
  onSubmit: (data: AddDocumentType) => void;
  defaultValues?: AddDocumentType
}
const DocumentForm = ({ onSubmit, defaultValues }: DocumentFormProps) => {
  const {
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { isValid },
  } = useForm<AddDocumentType>({
    resolver: zodResolver(addDocumentSchema),
    defaultValues: defaultValues || DEFAULT_ADD_DOCUMENT,
    mode: "onChange",
  });

  //console.log(watch());

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col h-full w-full gap-5 justify-between"
    >
      <div className="flex flex-col gap-5">
        <FormText
          label="Topic"
          name="topic"
          control={control}
          placeholder="Topik dokumen"
          required
        />

        <FormDropdownSingle
          name="tone"
          required
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
          required
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
          required
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
        <FormTextAreaWithChip
          label="References (up to 3 links)"
          required
          name="references"
          setValue={setValue as (name: string, value: string[]) => void}
          value={watch().references || []}
          placeholder="Separate by new line"
          max={3}
        />
        <FormTextAreaWithChip
          label="Keywords (up to 5 keywords, with 5 word max for each keyword)"
          name="keywords"
          setValue={setValue as (name: string, value: string[]) => void}
          value={watch().keywords || []}
          placeholder="Separate by new line"
        />

        <FormTextArea
          label="Additional Info"
          name="additional_info"
          control={control}
          placeholder="Masukkan info tambahan"
        />
      </div>
      <div className=" w-full">
        <AiTimesButton
          color="primary"
          size="lg"
          className="mb-8 w-full"
          disabled={!isValid}
          type="button"
          onClick={handleSubmit(onSubmit)}
        >
          Generate
        </AiTimesButton>
      </div>
    </form>
  );
};

export default DocumentForm;
