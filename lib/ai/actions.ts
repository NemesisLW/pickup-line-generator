"use server";

import { generateObject } from "ai";
import { z } from "zod";
import { createStreamableValue } from "ai/rsc";
import { CoreMessage, streamText } from "ai";
import { OpenAI } from "openai";
import { openai } from "@ai-sdk/openai";

const anyscale = new OpenAI({
  baseURL: "https://api.endpoints.anyscale.com/v1",
  apiKey: process.env.ANYSCALE_API_KEY!,
});

async function chat_complete() {
  const completion = await anyscale.chat.completions.create({
    model: "mistralai/Mixtral-8x22B-Instruct-v0.1",
    messages: [],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
  });
  console.log(completion);
}

export async function Generate(formData: FormData) {
  const { object } = await generateObject({
    model: openai("mistralai/Mixtral-8x22B-Instruct-v0.1"),
    schema: z.object({
      recipe: z.object({
        name: z.string(),
        ingredients: z.array(
          z.object({ name: z.string(), amount: z.string() }),
        ),
        steps: z.array(z.string()),
      }),
    }),
    prompt: "Generate a lasagna recipe.",
  });
}
