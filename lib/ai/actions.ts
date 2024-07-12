"use server";

import Instructor from "@instructor-ai/instructor";
import { OpenAI } from "openai";
import { OutputSchema } from "../schema";
import { parseFormData, parsePickupLineTexts } from "../utils";
import { promptInstructions } from "./instructions";

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

async function generatePickupLines(
  formData: FormInputProps,
): Promise<string[]> {
  // call the Mixtral API to generate the pickup lines

  const PickupLines = await client.chat.completions.create({
    model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
    messages: [
      { role: "system", content: promptInstructions },
      {
        role: "user",
        content: `Description of my crush: ${formData.crushDescription}\nStyle of pickup lines: ${formData.style}`,
      },
    ],
    response_model: { schema: OutputSchema, name: "PickupLines" },
    max_tokens: 1000,
    max_retries: 3,
    temperature: 1,
  });

  // parse the pickup line texts from the data
  return parsePickupLineTexts(PickupLines);
}

export async function generateOutput(
  prevState: GenerateOutputState,
  formData: FormData,
): Promise<GenerateOutputState> {
  // validate the form data using the schema
  const validatedInputs = parseFormData(formData);

  // Return early if the form data is invalid
  if (!validatedInputs.success) {
    return {
      message: "Invalid form data",
      errors: validatedInputs.error.flatten().fieldErrors,
    };
  }

  try {
    const listPickupLines = await generatePickupLines(validatedInputs.data);
    return {
      message: "success",
      pickupLines: listPickupLines,
      InitialFormState: validatedInputs.data,
    };
  } catch (e) {
    return {
      message: "Error generating output.",
      errors: e,
    };
  }
}
export async function regenerateOutput(
  prevState: GenerateOutputState,
  formData: FormData,
): Promise<GenerateOutputState> {
  try {
    if (!prevState.InitialFormState) {
      throw new Error("Initial form state is missing");
    }

    const listPickupLines = await generatePickupLines(
      prevState.InitialFormState,
    );

    return {
      message: "success",
      pickupLines: listPickupLines,
      InitialFormState: prevState.InitialFormState,
    };
  } catch (e) {
    console.error(e);
    return {
      message: "error",
      pickupLines: prevState.pickupLines, // Keep the previous pickup lines
      InitialFormState: prevState.InitialFormState,
      errors: e instanceof Error ? e.message : "Unknown error occurred",
    };
  }
}
