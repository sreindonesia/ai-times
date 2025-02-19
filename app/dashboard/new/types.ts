import { z } from "zod";

export const addDocumentSchema = z.object({
  title: z.string(),
  topic: z.string(),
  category: z.string(),
  tone: z.string(),
  keywords: z.array(
    z.string().refine((value) => value.split(" ").length <= 5, {
      message: "Each keyword must contain up to 5 words",
    })
  ).min(1, "Harus ada keyword"),
  references: z.array(z.string()).max(5, "Maksimal 5 referensi").min(1, "Harus ada referensi")
});

export type AddDocumentType = z.infer<typeof addDocumentSchema>;
