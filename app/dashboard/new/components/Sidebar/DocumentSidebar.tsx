//import useClickOutside from "@/app/utils/hooks/useClickOutside";
import React from "react";
import { Tabs } from "flowbite-react";
import SimilarityDetails from "./SimilarityDetails";

interface DocumentSidebarProps {
  plagiarismPercentage: string;
}
const DocumentSidebar = ({ plagiarismPercentage }: DocumentSidebarProps) => {
  return (
    <div className="w-[300px] h-screen border-l border-zinc-300">
      <Tabs
        aria-label="Default tabs"
        variant="underline"
        theme={{
          tablist: {
            variant: {
              underline: "-mb-px flex-wrap w-full",
            },
            tabitem: {
              base: "flex w-full items-center justify-center rounded-t-lg p-4 text-sm font-medium first:ml-0 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-400 ",
              variant: {
                underline: {
                  active: {
                    on: "active rounded-t-lg border-b-2 border-primary text-primary ",
                  },
                },
              },
            },
          },
        }}
      >
        <Tabs.Item active title="Overview">
          <SimilarityDetails plagiarismPercentage={plagiarismPercentage} />
        </Tabs.Item>
        {/*<Tabs.Item title="Version History" >
        Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
        control the content visibility and styling.
      </Tabs.Item>*/}
      </Tabs>
    </div>
  );
};

export default DocumentSidebar;
