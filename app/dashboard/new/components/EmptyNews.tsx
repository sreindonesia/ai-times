import React from "react";

const EmptyNews = () => {
  return (
    <div className="flex flex-col items-center gap-8 h-full w-full justify-center">
      <img src="/icons/avatar.svg" alt="No data" width={40} height={40} />
      <span className="text-zinc-400 font-medium">Oops, nothing to see here...</span>
    </div>
  );
};

export default EmptyNews;
