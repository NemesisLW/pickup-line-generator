import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { OutputSchema, OutputSchemaType } from "./schema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const copyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success("Copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy!");
    });
};

// parse the pickup line texts from the data
export function parsePickupLineTexts(data: OutputSchemaType): string[] {
  // validatie using the schema
  const parsedData = OutputSchema.parse(data);

  const texts = parsedData.pickupLines.map((line) => line.text);

  return texts;
}
