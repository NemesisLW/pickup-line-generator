"use server";
import { z } from "zod";
import { OpenAI } from "openai";

const formSchema = z.object({
  crushDescription: z.string({
    required_error: "Please provide a description of your crush",
  }),
  style: z.string({ required_error: "Style is required" }),
});

const anyscale = new OpenAI({
  baseURL: "https://api.endpoints.anyscale.com/v1",
  apiKey: process.env.ANYSCALE_API_KEY!,
});

export async function generateOutput(
  prevState: { message: string },
  formData: FormData,
) {
  const validatedInputs = formSchema.safeParse({
    crushDescription: formData.get("crushDescription"),
    style: formData.get("style"),
  });

  // Return early if the form data is invalid
  if (!validatedInputs.success) {
    return {
      message: "Invalid form data",
      errors: validatedInputs.error.flatten().fieldErrors,
    };
  }
  const completion = await anyscale.completions.create({
    model: "mistralai/Mixtral-8x22B-Instruct-v0.1",
    prompt: "Generate a lasagna recipe.",
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
  });
  console.log(completion);

  return {
    message: "success",
    Data: validatedInputs.data,
  };
}
