"use client";

import { Label } from "flowbite-react";
import React from "react";
import TextAreaWithChip from "./TextAreaWithChip";

interface TextProps {
  label: string;
  /**
   * The name property of HTML input
   */
  name: string;
  value: string[];
  max?: number;
  setValue: (name: string, value: string[], config?: Record<string, unknown>) => void;
  required?: boolean;
  placeholder?: string;
}

const FormTextAreaWithChip = ({
  setValue,
  value,
  label,
  name,
  max,
  placeholder,
  required,
}: TextProps) => {
  const onClickEnterHandler = (text: string) => {
    setValue(name, [...value, text], { shouldValidate: true });
  };

  const onDeleteHandler = (text: string) => {
    setValue(
      name,
      value.filter((val) => val !== text),
      { shouldValidate: true }
    );
  };

  return (
    <div className="flex flex-col">
      {label && (
        <Label htmlFor={name} className="mb-2 font-medium text-sm text-gray-500">
          {label}
          {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <TextAreaWithChip
        currentValues={value}
        max={max}
        placeholder={placeholder}
        onClickEnter={onClickEnterHandler}
        onDelete={onDeleteHandler}
      />
    </div>
  );
};

export default FormTextAreaWithChip;
