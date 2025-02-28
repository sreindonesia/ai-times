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
  plagiarism_check: PlagiarismCheck;
  /**
   * Copyscape API cost in USD
   */
  plagiarism_cost: number;
}

export interface PlagiarismCheck {
  status: string;
  matches: Match[];
}

export interface Match {
  url: string;
  text_matched: string;
  percentage_matched: number;
}

export interface ProcessedGenerateNewsResponse {
  /**
   * 
  HTML string
 */
  generated_content: string;
  overall_plagiarism_percentage: string;
  plagiarism_check: PlagiarismCardProps[];
  /**
   * The text content without HTML
   */
  cleaned_content: string;
  /**
   * Copyscape API cost in USD
   */
  plagiarism_cost: number;
}

export interface PlagiarismCardProps {
  textmatched: string;
  url: string;
  percentageMatched: string;
}
