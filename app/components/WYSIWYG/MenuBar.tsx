"use client"

import React, { useCallback, useEffect } from "react";
import {
  LetterBold,
  LetterItalic,
  LetterUnderline,
  Link,
  List,
  OrderedList,
} from "flowbite-react-icons/outline";
import { FileImage } from "flowbite-react-icons/solid";
import { useCurrentEditor } from "@tiptap/react";

const MenuBar = ({ initialContent }: { initialContent: string }) => {
  const { editor } = useCurrentEditor();

  useEffect(() => {
    if (editor && initialContent) {
      const initialJSON = JSON.parse(initialContent);
      editor.commands.setContent(initialJSON);
    }
  }, [initialContent, editor]);

  const setLink = useCallback(() => {
    if (editor) {
      const previousUrl = editor.getAttributes("link").href;
      const url = window.prompt("URL", previousUrl);

      // cancelled
      if (url === null) {
        return;
      }

      // empty
      if (url === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();

        return;
      }

      // update link
      try {
        editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: url })
          .run();
      } catch (e) {
        alert((e as Error).message);
      }
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  const addImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) {
      return;
    }
    const url = URL.createObjectURL(files[0]);
    editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div className="flex flex-wrap items-center space-x-1 border-b border-gray-200 px-4 py-3 rtl:space-x-reverse">
      <button
        id="toggleBoldButton"
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`cursor-pointer rounded p-1.5 ${editor.isActive("bold") ? "text-gray-900" : "text-gray-500"} hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white `}
      >
        <LetterBold />
      </button>

      <button
        id="toggleUnderlineButton"
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={`cursor-pointer rounded p-1.5 ${editor.isActive("underline") ? "text-gray-900" : "text-gray-500"} hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white`}
      >
        <LetterUnderline />
      </button>
      <button
        id="toggleItalicButton"
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`cursor-pointer rounded p-1.5 ${editor.isActive("italic") ? "text-gray-900" : "text-gray-500"} hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white`}
      >
        <LetterItalic />
      </button>
      <label
        htmlFor="wysiwyg-image"
        className="cursor-pointer rounded p-1.5 text-gray-500  hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <input
          type="file"
          id="wysiwyg-image"
          className="hidden size-full"
          onChange={addImageHandler}
        />
        <FileImage />
      </label>
      <button
        id="addLinkButton"
        type="button"
        onClick={setLink}
        className={`cursor-pointer rounded p-1.5 ${editor.isActive("link") ? "text-gray-900" : "text-gray-500"} hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white`}
      >
        <Link />
      </button>
      <button
        id="addListButton"
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`cursor-pointer rounded p-1.5 ${editor.isActive("bulletList") ? "text-gray-900" : "text-gray-500"} hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white`}
      >
        <List />
      </button>
      <button
        id="addOrderedListButton"
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`cursor-pointer rounded p-1.5 ${editor.isActive("orderedList") ? "text-gray-900" : "text-gray-500"} hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white`}
      >
        <OrderedList />
      </button>
    </div>
  );
};

export default MenuBar;
