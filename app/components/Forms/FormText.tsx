"use client"

import { Label, TextInput, TextInputProps } from "flowbite-react";
import React from "react";
import { Controller, FieldValues, useController, UseControllerProps } from "react-hook-form";

interface TextProps {
  label: string;
  /**
   * The name property of HTML input
   */
  name: string;
  placeholder?: string;
  inputClassName?: string;
  required?: boolean;
}

type FormTextProps<T extends FieldValues> = TextProps & UseControllerProps<T> & TextInputProps;
const FormText = <T extends FieldValues>({
  control,
  label,
  name,
  placeholder,
  inputClassName,
  disabled,
  required,
  ...props
}: FormTextProps<T>) => {
  const {
    formState: { errors },
  } = useController<T>({ name, control });
  return (
    <div className="flex flex-col">
      {label && (
        <Label htmlFor={name} className="mb-2 font-medium text-sm text-gray-500">
          {label}{required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextInput
            {...props}
            {...field}
            disabled={disabled}
            className={`w-full ${inputClassName}`}
            placeholder={placeholder}
            color={errors[name] ? "failure" : "gray"}
            helperText={errors[name] && <span>{errors[name]!.message as string}</span>}
          />
        )}
      />
    </div>
  );
};

export default FormText;
