import { OpenAI } from "openai";
import { z } from "zod";

type ChatCompletionCreateParamsWithModel<T extends z.ZodType> =
  OpenAI.ChatCompletionCreateParams & {
    response_model: { schema: T; name: string };
    max_retries?: number;
  };

class CustomInstructor {
  private client: OpenAI;

  constructor(client: OpenAI) {
    this.client = client;
  }

  async chatCompletion<T extends z.ZodType>(
    params: ChatCompletionCreateParamsWithModel<T>,
  ): Promise<z.infer<T>> {
    const { response_model, max_retries = 3, ...chatParams } = params;
    let attempts = 0;

    while (attempts <= max_retries) {
      console.log("calling chat completion");
      try {
        const completion = await this.client.chat.completions.create({
          ...chatParams,
          response_format: { type: "json_object" },
          stream: false,
        });

        const content = completion.choices[0]?.message?.content;
        if (!content) {
          console.log("no content");
          throw new Error("No content in response");
        }

        console.log("content", content);
        const parsedContent = JSON.parse(content);
        const validatedContent = response_model.schema.parse(parsedContent);
        return validatedContent;
      } catch (error) {
        if (attempts === max_retries) {
          throw error;
        }
        attempts++;
      }
    }

    throw new Error("Max retries reached");
  }
}

function createCustomInstructor(client: OpenAI): CustomInstructor {
  return new CustomInstructor(client);
}

export { createCustomInstructor, CustomInstructor };
