import { PlagiarismCheck } from "./new/types";

export interface News {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  title: string;
  content: string;
  rawContent: string;
  author: string;
  references: string[];
  topic: string;
  tone: string;
  language: string;
  writingStyle: string;
  plagiarismCheck: PlagiarismCheck;
  keys: string[];
  contentType: string;
}

export interface Pagination {
  currentPage: number;
  total: number;
  totalPages: number;
}

export interface GetListNewsResponse extends Pagination {
  items: News[];
}
