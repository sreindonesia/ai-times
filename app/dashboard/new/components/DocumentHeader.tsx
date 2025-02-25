import AiTimesButton from "@/app/components/Button";
import React from "react";

interface DocumentHeaderProps {
  onEdit: VoidFunction;
}
const DocumentHeader = ({ onEdit }: DocumentHeaderProps) => {
  return (
    <div className="flex w-full justify-between items-center">
      <div className="flex flex-col gap-1">
        <span className="font-medium text-zinc-800">V1</span>
        <div className="flex items-center gap-1 italic text-zinc-400 text-xs">
          <span>15/01/2025</span>
          <span>03:07 PM</span>
          <span>AUtosave</span>
        </div>
      </div>

      <AiTimesButton color="primary" size="md" onClick={onEdit}>
        EDIT
      </AiTimesButton>
    </div>
  );
};

export default DocumentHeader;
