"use server";

import { OpenAI } from "openai";
import { FormSchema, OutputSchema } from "../schema";
import Instructor from "@instructor-ai/instructor";

// Anyscale Inference for Mixtral (LLM)
const anyscale = new OpenAI({
  baseURL: "https://api.endpoints.anyscale.com/v1",
  apiKey: process.env.ANYSCALE_API_KEY!,
});

// Together Inference for Mixtral (LLM)
const togetherai = new OpenAI({
  baseURL: "https://api.together.xyz/v1",
  apiKey: process.env.TOGETHERAI_API_KEY!,
});

//  Instructor for returning structured JSON
const client = Instructor({
  client: togetherai,
  mode: "JSON_SCHEMA",
});

export async function generateOutput(
  prevState: { message: string },
  formData: FormData,
) {
  // validate the form data using the schema
  const validatedInputs = FormSchema.safeParse({
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

  const promptInstructions =
    "The user will provide you with the description of their crush and the style of the pickup lines they are looking for. Based on the those information, generate a survey object with 1 field: a pickup lines array of two elements, where every element has 2 fields: 'id' and 'text' and return it in json format.";

  try {
    // call the Mixtral API to generate the pickup lines
    const PickupLines = await client.chat.completions.create({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "system", content: promptInstructions },
        {
          role: "user",
          content: `Description of my crush: ${validatedInputs.data.crushDescription}\nStyle of pickup lines: ${validatedInputs.data.style}`,
        },
      ],
      response_model: { schema: OutputSchema, name: "PickupLines" },
      max_tokens: 1000,
      max_retries: 3,
    });

    return {
      message: "success",
      pickupLines: PickupLines,
    };
  } catch (e) {
    console.log(e);
    return {
      message: "error generating output...",
      error: e,
    };
  }
}
