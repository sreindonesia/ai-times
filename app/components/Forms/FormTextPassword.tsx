"use client";

import { Label, TextInput } from "flowbite-react";
import { Eye, EyeSlash } from "flowbite-react-icons/solid";
import React, { useState } from "react";
import { Controller, FieldValues, useController, UseControllerProps } from "react-hook-form";

interface TextProps {
  label: string;
  /**
   * The name property of HTML input
   */
  name: string;
  inputClassName?: string;
  helperText?: string;
}

type FormTextPasswordProps<T extends FieldValues> = TextProps & UseControllerProps<T>;
const FormTextPassword = <T extends FieldValues>({
  control,
  label,
  name,
  inputClassName,
  helperText,
}: FormTextPasswordProps<T>) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const {
    formState: { errors },
  } = useController<T>({ name, control });

  return (
    <div className="flex flex-col">
      <Label htmlFor="password" className="mb-2 font-medium text-sm text-gray-500">
        {label}
      </Label>
      <div>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              className={`w-full ${inputClassName}`}
              name="password"
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
              type={isPasswordShown ? "text" : "password"}
              color={errors[name] ? "failure" : "gray"}
              rightIcon={() => (
                <button onClick={() => setIsPasswordShown((prev) => !prev)} tabIndex={-1} type="button">
                  {isPasswordShown ? <EyeSlash /> : <Eye />}
                </button>
              )}
              helperText={
                errors[name] ? (
                  <span>{errors[name]?.message as string}</span>
                ) : (
                  <span>{helperText}</span>
                )
              }
            />
          )}
        />
      </div>
    </div>
  );
};

export default FormTextPassword;
