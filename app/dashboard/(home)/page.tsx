import React from "react";
import Sidebar from "./components/Sidebar";
import CreateNewDocumentCard from "./components/CreateNewDocumentCard";
import DocumentCard from "./components/DocumentCard";

const dummyData = [
  {
    title: "The Impact of Climate Change",
    body: "Climate change is one of the most pressing issues of our time, affecting ecosystems and economies worldwide. Climate change is one of the most pressing issues of our time, affecting ecosystems and economies worldwide. Climate change is one of the most pressing issues of our time, affecting ecosystems and economies worldwide. Climate change is one of the most pressing issues of our time, affecting ecosystems and economies worldwide. Climate change is one of the most pressing issues of our time, affecting ecosystems and economies worldwide.",
    similarity: "15%",
    updatedAt: "2023-10-05T14:48:00Z",
  },
  {
    title: "Artificial Intelligence in Healthcare",
    body: "AI technologies are revolutionizing healthcare by improving diagnostics, treatment plans, and patient outcomes.",
    similarity: "5%",
    updatedAt: "2023-10-04T09:20:00Z",
  },
  {
    title: "The Future of Renewable Energy",
    body: "Renewable energy sources like solar and wind power are key to reducing carbon emissions and combating global warming.",
    similarity: "25%",
    updatedAt: "2023-10-03T16:30:00Z",
  },
  {
    title: "Blockchain Technology Explained",
    body: "Blockchain is a decentralized ledger technology that ensures transparency and security in transactions.",
    similarity: "10%",
    updatedAt: "2023-10-02T11:15:00Z",
  },
  {
    title: "The Evolution of Remote Work",
    body: "Remote work has transformed the traditional workplace, offering flexibility and new opportunities for employees and employers alike.",
    similarity: "8%",
    updatedAt: "2023-10-01T13:50:00Z",
  },
];
const Page = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="bg-slate-100 p-9 flex flex-col gap-6 w-full">
        <p>Searchbar</p>
        <p>Sort</p>
        <div className="flex flex-wrap gap-8">
          <CreateNewDocumentCard />
          {dummyData.map((data) => (
            <DocumentCard {...data} key={data.title} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
