import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { FormSchema, OutputSchema, OutputSchemaType } from "./schema";

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

export function parseFormData(formData: FormData) {
  return FormSchema.safeParse({
    crushDescription: formData.get("crushDescription"),
    style: formData.get("style"),
  });
}

// parse the pickup line texts from the data
export function parsePickupLineTexts(data: OutputSchemaType): string[] {
  // validatie using the schema
  const parsedData = OutputSchema.parse(data);
  const texts = parsedData.pickupLines.map((line) => line.text);

  return texts;
}

export function formatWaitTime(resetTimestamp: number): string {
  const now = Date.now();
  const waitTime = resetTimestamp - now;

  if (waitTime <= 0) {
    return "a moment";
  }

  const seconds = Math.floor(waitTime / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  } else {
    return `${seconds} second${seconds > 1 ? "s" : ""}`;
  }
}
