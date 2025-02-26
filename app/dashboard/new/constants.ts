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
    value: "EN",
  },
  {
    label: "Bahasa Indonesia",
    value: "ID",
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

export const DEFAULT_ADD_DOCUMENT: AddDocumentType = {
  additional_info: "",
  keywords: [],
  language: "",
  references: [],
  tone: "",
  topic: "",
  writing_style: "",
};
