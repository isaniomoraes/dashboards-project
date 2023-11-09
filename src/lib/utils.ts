import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to replace * with <strong> and _ with <em>
// Example: formatText("Hello *world* _this_ is a test") => "Hello <strong>world</strong> <em>this</em> is a test"
// Only use this function for sanitized text
export const formatText = (text: string) => {
  return text
    .replace(/\*(.*?)\*/g, "<strong>$1</strong>")
    .replace(/_(.*?)_/g, "<em>$1</em>");
};
