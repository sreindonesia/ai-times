import { TextInput } from "flowbite-react";
import { Plus, TrashBin } from "flowbite-react-icons/outline";
import { CheckCircle } from "flowbite-react-icons/solid";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

interface AddDropdownOption {
  label: string;
  placeholder?: string;
  setOptions: React.Dispatch<React.SetStateAction<{ label: string; value: string | number }[]>>;
  isSingleDropdown?: boolean;
}
const AddDropdownOption = ({
  label,
  placeholder,
  setOptions,
  isSingleDropdown,
}: AddDropdownOption) => {
  const [isAdding, setIsAdding] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const addOptionHandler = () => {
    setIsAdding(false);
    setOptions((prev) => [...prev, { label: inputValue, value: inputValue }]);
    setInputValue("");
  };

  const deleteHandler = () => {
    setIsAdding(false);
    setInputValue("");
  };
  return (
    <div className="w-full py-2 px-3 items-center">
      {isAdding ? (
        <div className={twMerge("flex items-center gap-1", isSingleDropdown && "flex-col")}>
          <TextInput
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full"
            placeholder={placeholder}
          />
          {isSingleDropdown ? (
            <button
              className="rounded-lg p-2 border border-gray-200 hover:bg-gray-200 w-full text-xs font-medium"
              onClick={addOptionHandler}
            >
              Simpan
            </button>
          ) : (
            <>
              <button
                className="rounded-lg p-2 border border-gray-200 hover:bg-gray-200"
                onClick={addOptionHandler}
              >
                <CheckCircle size={24} />
              </button>
              <button className="rounded-lg p-2 hover:bg-gray-200" onClick={deleteHandler}>
                <TrashBin size={24} />
              </button>
            </>
          )}
        </div>
      ) : (
        <button
          className="max-w-[325px] mx-auto py-2 px-3 flex items-center justify-center border border-gray-200 rounded-lg"
          onClick={() => setIsAdding(true)}
        >
          <Plus size={16} />
          <span className="font-medium text-xs">{label}</span>
        </button>
      )}
    </div>
  );
};

export default AddDropdownOption;
