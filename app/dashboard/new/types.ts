import { z } from "zod";

export const addDocumentSchema = z.object({
  topic: z.string().min(1),
  language: z.string().min(2, "Bahasa harus berupa EN atau ID"),
  tone: z.string().min(1),
  keywords: z
    .array(
      z.string().refine((value) => value.split(" ").length <= 5, {
        message: "Each keyword must contain up to 5 words",
      })
    )
    .min(1, "Harus ada keyword"),
  additional_info: z.string(),
  references: z.array(z.string()).max(5, "Maksimal 5 referensi").min(1, "Harus ada referensi"),
  writing_style: z.string().min(1),
});

export type AddDocumentType = z.infer<typeof addDocumentSchema>;

export interface GenerateNewsRequestPayload {
  references: string[];
  topic: string;
  tone: string;
  language: string;
  writing_style: string;
  keys: string[];
}
export interface GenerateNewsResponse {
  results: Array<GenerateNewsResult>;
}

export interface GenerateNewsResult {
  cleaned_content: string;
  generated_content: string;
  plagiarism_check: string;
  /**
   * plagiarism percentage in float (e.g. 0.0345123)
   */
  plagiarism_cost: number;
}
