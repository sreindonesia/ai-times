import { Dropdown, TextInput } from "flowbite-react";
import { ChangeEvent, useEffect, useState } from "react";
import AddDropdownOption from "./AddDropdownOption";
import { DropdownOption } from "./types";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

const FormDropdownSingle = ({
  options,
  label,
  placeholder,
  name,
  value,
  setValue,
	onClick,
	withSearch = false,
  addOptionLabel,
  addOptionPlaceholder,
  errorMessage,
}: {
  options: DropdownOption[];
  placeholder?: string;
  value: string | number;
  label?: string;
  name: string;
  setValue: (name: string, value: string | number, config?: Record<string, unknown>) => void;
	onClick?: (option: DropdownOption) => void;
	withSearch?: boolean;
  addOptionLabel?: string;
  addOptionPlaceholder?: string;
  errorMessage?: string;
}) => {
  const [renderedOptions, setRenderedOptions] = useState(options);

	const [searchedValue, setSearchedValue] = useState("");

  const handleClick = (option: DropdownOption) => {
    setValue(name, option.value, { shouldValidate: true });
		if (onClick) {
			onClick(option)
		}
  };

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchedValue(e.target.value);
    if (e.target.value) {
      const newOptions = options.filter((option) =>
        option.label.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setRenderedOptions(newOptions);
      return;
    }
    setRenderedOptions(options);
    return;
  };

  useEffect(() => {
    setRenderedOptions(options);
  }, [options]);
  return (
    <div className={twMerge("flex flex-col gap-2 relative min-w-60")}>
      {label && <p className="text-gray-500 font-medium text-sm">{label}</p>}
      <Dropdown
        label={
          <span
            className={twMerge(
              "whitespace-nowrap text-ellipsis overflow-hidden max-w-[calc(100%-24px)]",
              errorMessage && "text-red-700"
            )}
          >
            {value || placeholder}
          </span>
        }
        inline
        theme={{
          floating: {
            target: "w-full",
          },
          content: "max-h-80 overflow-y-auto min-w-60",
          inlineWrapper: `flex justify-between w-full text-gray-900 py-3 px-4 bg-gray-50 leading-[16px] border ${
            errorMessage ? "border-red-500 bg-red-50" : "border-gray-300"
          } rounded-lg items-center text-sm`,
        }}
        enableTypeAhead={false}
      >
				{withSearch && (
          <Dropdown.Item
            className="hover:bg-white"
            theme={{
              base: "hover:bg-white w-full rounded-lg focus:outline-none",
            }}
          >
            <TextInput
              value={searchedValue}
              onClick={(e) => e.stopPropagation()}
              onChange={handleSearch}
              placeholder="Cari di sini"
              color="gray"
              theme={{
                base: "flex w-full py-[2px] border-b border-gray-200",
                addon: "",
                field: {
                  input: {
                    colors: {
                      gray: "",
                    },
                    base: "block w-full border-none disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:border-none focus:ring-0 rounded-lg",
                  },
                },
              }}
              icon={() => <Image src={"/icons/search.svg"} width={20} height={20} alt="Search" />}
            />
          </Dropdown.Item>
        )}
        {renderedOptions.map((option) => (
          <Dropdown.Item key={option.value} onClick={() => handleClick(option)}>
            <p className={`${value === option.value && "font-bold"} text-fg-default text-sm`}>
              {option.label}
            </p>
          </Dropdown.Item>
        ))}
        {addOptionLabel && (
          <AddDropdownOption
            isSingleDropdown
            label={addOptionLabel}
            placeholder={addOptionPlaceholder}
            setOptions={setRenderedOptions}
          />
        )}
      </Dropdown>
      {errorMessage && <p className="text-sm text-red-600 dark:text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default FormDropdownSingle;
