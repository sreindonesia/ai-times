"use client"
import { EditorProvider, Editor } from "@tiptap/react";
import MenuBar from "./MenuBar";
import { extensions } from "./extensions";
import { Transaction } from "@tiptap/pm/state";

interface WYSIWYGProps {
  initialContent?: string;
  onUpdate?: (args: { editor: Editor; transaction: Transaction }) => void;
  readonly?: boolean;
}
const WYSIWYG = ({ initialContent, onUpdate, readonly }: WYSIWYGProps) => {
  return (
    <div
      className={`w-full rounded-lg ${!readonly && "border border-gray-200"} flex flex-col h-full [&>div:first-child]:h-full`}
    >
      <EditorProvider
        slotAfter={
          !readonly && <MenuBar initialContent={initialContent || ""} />
        }
        extensions={extensions}
        content={initialContent}
        editorProps={{
          attributes: {
            class: ` ${!readonly && "h-full"} focus:outline-none bg-white overflow-y-auto`,
          },
        }}
        onUpdate={onUpdate}
        editable={!readonly}
      />
    </div>
  );
};

export default WYSIWYG;
