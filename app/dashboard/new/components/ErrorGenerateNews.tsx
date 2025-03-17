import { Close } from "flowbite-react-icons/outline";
import React from "react";

interface ErrorGenerateNewsProps {
  message: string;
}
const ErrorGenerateNews = ({ message }: ErrorGenerateNewsProps) => {
  return (
    <div className="flex flex-col items-center gap-8 h-full w-full justify-center">
      <div className="rounded-full border-2 border-red-600 p-1.5 grid place-content-center">
        <Close size={36} color="red" />
      </div>
      <span className="text-zinc-400 font-medium max-w-[500px] text-center">{message}</span>
    </div>
  );
};

export default ErrorGenerateNews;
