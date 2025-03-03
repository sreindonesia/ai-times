import { Label, Textarea } from "flowbite-react";
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

type FormTextAreaProps<T extends FieldValues> = TextProps & UseControllerProps<T>;
const FormTextArea = <T extends FieldValues>({
  control,
  label,
  name,
  placeholder,
  inputClassName,
  disabled,
  required,
}: FormTextAreaProps<T>) => {
  const {
    formState: { errors },
  } = useController<T>({ name, control });
  return (
    <div className="flex flex-col">
      <Label htmlFor={name} className="mb-2 font-medium text-sm text-gray-500">
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            disabled={disabled}
            rows={4}
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

export default FormTextArea;
