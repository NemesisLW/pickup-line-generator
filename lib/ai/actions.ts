"use server";

import { setTimeout } from "timers/promises";
import Instructor from "@instructor-ai/instructor";
import { OpenAI } from "openai";
import { FallbackOutputSchema, OutputSchema } from "../schema";
import { parseFormData, parsePickupLineTexts } from "../utils";
import { experimentPrompt, promptInstructions } from "./instructions";

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

// OpenAI Server Did not respond with JSON-Mode On
async function fallbackGeneratePickupLines(
  formData: FormInputProps,
): Promise<string[]> {
  // const jsonSchema = zodToJsonSchema(OutputSchema, "mySchema");
  const response = await togetherai.chat.completions.create({
    model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
    messages: [
      { role: "system", content: experimentPrompt },
      {
        role: "user",
        content: `Description of my crush: ${formData.crushDescription}\nStyle of pickup lines: ${formData.style}`,
      },
    ],
    // OpenAI not responding to "json_object" response format
    // @ts-ignore – Together.ai supports schema while OpenAI does not
    // response_format: { type: "json_object", schema: jsonSchema },
    max_tokens: 1000,
  });
  const parsedJson = JSON.parse(response.choices[0].message.content!);
  const pickupLines = FallbackOutputSchema.parse(parsedJson);
  console.log("pickupLines", pickupLines.pickupLines);
  return pickupLines.pickupLines;
}

// Generate pickup lines with fallback
async function generatePickupLinesWithFallback(
  params: GenerationParams,
): Promise<string[]> {
  const timeoutPromise = setTimeout(7000).then(() => {
    throw new Error(
      "Request timed out - Third party API Endpoints may be experiencing issues",
    );
  });

  const generatePromise = generatePickupLines(params.initialFormState);
  const fallbackPromise = fallbackGeneratePickupLines(params.initialFormState);

  const listPickupLines = await Promise.race([
    generatePromise,
    timeoutPromise,
    fallbackPromise,
  ]);

  if (!listPickupLines || listPickupLines.length === 0) {
    throw new Error("No pickup lines were generated");
  }

  return listPickupLines;
}

// Handle Generation Requests
export async function generateOutput(
  prevState: GenerateOutputState,
  formData: FormData,
): Promise<GenerateOutputState> {
  // validate the form data using the schema
  const validatedInputs = parseFormData(formData);

  // Return early if the form data is invalid
  if (!validatedInputs.success) {
    return {
      message: "error",
      errors: validatedInputs.error.flatten().fieldErrors,
    };
  }

  try {
    const listPickupLines = await generatePickupLinesWithFallback({
      initialFormState: validatedInputs.data,
    });
    return {
      message: "success",
      pickupLines: listPickupLines,
      InitialFormState: validatedInputs.data,
    };
  } catch (e) {
    console.error(e);
    return {
      message: "error",
      errors: e instanceof Error ? e.message : "Unknown error occurred",
    };
  }
}

// Handle Regeeration Requests
export async function regenerateOutput(
  prevState: GenerateOutputState,
  formData: FormData,
): Promise<GenerateOutputState> {
  try {
    if (!prevState.InitialFormState) {
      throw new Error("Initial form state is missing");
    }

    const listPickupLines = await generatePickupLinesWithFallback({
      initialFormState: prevState.InitialFormState,
    });

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
