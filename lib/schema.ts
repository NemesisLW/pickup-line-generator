import { z } from "zod";

// Zod validation schema for form data
export const FormSchema = z.object({
  crushDescription: z.string({
    required_error: "Please provide a description of your crush",
  }),
  style: z.string({ required_error: "Style is required" }),
});

export type FormSchemaType = z.infer<typeof FormSchema>;

// Zod validation schema for Structured Output from Mixtral (LLM)
export const OutputSchema = z.object({
  pickupLines: z
    .array(
      z.object({
        id: z.number(),
        text: z.string().describe("The requested pickup line"),
      }),
    )
    .length(2)
    .describe("Pickup lines"),
});

export type OutputSchemaType = z.infer<typeof OutputSchema>;

export const FallbackOutputSchema = z.object({
  pickupLines: z.array(z.string()).length(2),
});

export type FallbackOutputSchemaType = z.infer<typeof FallbackOutputSchema>;
