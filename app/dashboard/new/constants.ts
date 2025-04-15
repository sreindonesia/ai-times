import { AddDocumentType } from "./types";

export const TONE_OPTIONS = [
  {
    label: "Neutral",
    value: "Netral",
  },
  {
    label: "Negative",
    value: "Negative",
  },
  {
    label: "Positive",
    value: "Positif",
  },
];

export const LANG_OPTIONS = [
  {
    label: "English",
    value: "English",
  },
  {
    label: "Bahasa Indonesia",
    value: "Indonesia",
  },
];

export const WRITING_STYLE_OPTIONS = [
  {
    label: "Casual",
    value: "kasual",
  },
  {
    label: "Semi-Formal",
    value: "semi-formal",
  },
  {
    label: "Formal",
    value: "formal",
  },
];

export const CONTENT_TYPE_OPTIONS = [
  {
    label: "News",
    value: "berita",
  },
  {
    label: "Caption",
    value: "caption",
  },
  {
    label: "Short News",
    value: "berita pendek"
  }
];

export const DEFAULT_ADD_DOCUMENT: AddDocumentType = {
  additional_info: "",
  keywords: [],
  language: "",
  references: [],
  tone: "",
  topic: "",
  writing_style: "",
  content_type: "",
};
