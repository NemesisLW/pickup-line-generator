"use server";

import { setTimeout } from "timers/promises";
import Instructor from "@instructor-ai/instructor";
import { OpenAI } from "openai";
import { FallbackOutputSchema, OutputSchema } from "../schema";
import { rateLimiter } from "../upstash";
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
      {
        role: "system",
        content:
          "\n" +
          "          Given a user prompt, you will return fully valid JSON based on the following description.\n" +
          "          You will return no other prose. You will take into account any descriptions or required parameters within the schema\n" +
          "          and return a valid and fully escaped JSON object that matches the schema and those instructions.\n" +
          "\n" +
          "          description: \n" +
          "        ",
      },
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
    temperature: 1.5,
    top_p: 1,
    frequency_penalty: 0.6,
  });
  try {
    const parsedJson = JSON.parse(response.choices[0].message.content!);
    const pickupLines = FallbackOutputSchema.parse(parsedJson);
    return pickupLines.pickupLines;
  } catch (error) {
    throw new Error(
      "Try Again - Error parsing JSON response from fallback API",
    );
  }
}

// Generate pickup lines with fallback
async function generatePickupLinesWithFallback(
  params: GenerationParams,
): Promise<string[]> {
  const timeoutPromise = setTimeout(5000).then(() => {
    throw new Error(
      "Request timed out - Third party API Endpoints may be experiencing issues",
    );
  });

  const generatePromise = generatePickupLines(params.initialFormState);
  const fallbackPromise = fallbackGeneratePickupLines(params.initialFormState);

  try {
    // First, try to get results from the main function
    const result = await Promise.race([generatePromise, timeoutPromise]);
    if (Array.isArray(result) && result.length > 0) {
      return result;
    }
  } catch (error) {
    // If main function fails or times out, we'll continue to the fallback
    console.log("Main function failed or timed out, trying fallback");
  }

  // If we're here, it means the main function didn't succeed, so we'll use the fallback
  const fallbackResult = await Promise.race([fallbackPromise, timeoutPromise]);

  if (
    !fallbackResult ||
    !Array.isArray(fallbackResult) ||
    fallbackResult.length === 0
  ) {
    throw new Error("No pickup lines were generated");
  }

  return fallbackResult;
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

    // Apply Rate Limiting
    const { success, reset, error } = await rateLimiter();

    if (!success) {
      return {
        message: "error",
        pickupLines: prevState.pickupLines,
        InitialFormState: prevState.InitialFormState,
        errors: `${error}. Try again at ${new Date(reset).toLocaleTimeString()}`,
      };
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
