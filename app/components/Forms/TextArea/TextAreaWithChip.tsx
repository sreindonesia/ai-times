import { Badge } from "flowbite-react";
import { Close } from "flowbite-react-icons/outline";
import React, { useState } from "react";

interface TextAreaWithChipProps {
  currentValues: string[];
  onClickEnter: (textAreaValue: string) => void;
  onDelete: (text: string) => void;
  max?: number;
  placeholder?: string;
}
const TextAreaWithChip = ({
  currentValues,
  onClickEnter,
  onDelete,
  max,
  placeholder,
}: TextAreaWithChipProps) => {
  const [textAreaValue, setTextAreaValue] = useState("");

  const clickEnterHandler = () => {
    onClickEnter(textAreaValue);
    setTextAreaValue("");
  };

  const deleteValuesHandler = (text: string) => {
    onDelete(text);
  };
  return (
    <div className="flex flex-col border border-[#D9D9D9] rounded-lg pt-3 px-4 pb-4 gap-2">
      {currentValues.map((val, index) => (
        <Badge key={`${val}-${index}-${Date.now()}`} className="w-max max-w-full px-3 py-2" size="sm" color="success">
          <div className="flex items-center gap-2">
            <span className="break-all">{val}</span>
            <Close
              size={18}
              onClick={() => deleteValuesHandler(val)}
              className="hover:cursor-pointer shrink-0"
            />
          </div>
        </Badge>
      ))}
      {max && currentValues.length === max ? (
        <></>
      ) : (
        <input
          value={textAreaValue}
          onChange={(e) => setTextAreaValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              clickEnterHandler();
            }
          }}
          
          placeholder={placeholder}
          className="focus:outline-none focus:border-none border-none focus:ring-0 text-sm text-gray-900 mt-1 overflow-hidden min-h-0 resize-none"
        />
      )}
    </div>
  );
};

export default TextAreaWithChip;
