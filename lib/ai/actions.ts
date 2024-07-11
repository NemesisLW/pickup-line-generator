"use server";

import { generateObject, streamObject } from "ai";
import { z } from "zod";
import { createStreamableValue } from "ai/rsc";
import { CoreMessage, streamText } from "ai";
import { OpenAI } from "openai";
import { openai } from "@ai-sdk/openai";

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

async function chat_complete(formData: FormData) {
  const completion = await anyscale.completions.create({
    model: "mistralai/Mixtral-8x22B-Instruct-v0.1",
    prompt: "Generate a lasagna recipe.",
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
  });
  console.log(completion);
}

export async function Generate(
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

  // const { object } = await generateObject({
  //   model: openai("mistralai/Mixtral-8x22B-Instruct-v0.1"),
  //   schema: z.object({
  //     recipe: z.object({
  //       name: z.string(),
  //       ingredients: z.array(
  //         z.object({ name: z.string(), amount: z.string() }),
  //       ),
  //       steps: z.array(z.string()),
  //     }),
  //   }),
  //   prompt: "Generate a lasagna recipe.",
  // });

  // const { partialObjectStream } = await streamObject({
  //   model: openai("gpt-4-turbo"),
  //   schema: z.object({
  //     recipe: z.object({
  //       name: z.string(),
  //       ingredients: z.array(z.string()),
  //       steps: z.array(z.string()),
  //     }),
  //   }),
  //   prompt: "Generate a lasagna recipe.",
  // });

  // for await (const partialObject of partialObjectStream) {
  //   console.clear();
  //   console.log(partialObject);
  // }

  return {
    message: "Generated recipe",
    Data: validatedInputs.data,
  };
}
