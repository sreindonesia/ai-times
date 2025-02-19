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
  setValue: (name: string, value: string[]) => void;
  placeholder?: string;
}

const FormTextAreaWithChip = ({ setValue, value, label, name, max, placeholder }: TextProps) => {
  const onClickEnterHandler = (text: string) => {
    setValue(name, [...value, text]);
  };

  const onDeleteHandler = (text: string) => {
    setValue(
      name,
      value.filter((val) => val !== text)
    );
  };

  return (
    <div className="flex flex-col">
      {label && (
        <Label htmlFor={name} className="mb-2 font-medium text-sm text-gray-500">
          {label}
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
