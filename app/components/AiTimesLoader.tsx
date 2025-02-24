import { Spinner } from "flowbite-react";
import React from "react";

const AiTimesLoader = () => {
  return (
    <div className="flex flex-col items-center gap-8 h-full w-full justify-center">
      <Spinner size="xl" color="success" />
      <span className="text-zinc-400 font-medium">Working behind the scene..</span>
    </div>
  );
};

export default AiTimesLoader;
