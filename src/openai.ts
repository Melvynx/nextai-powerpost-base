import OpenAI from "openai";

export const AI_MODEL = "accounts/fireworks/models/mistral-7b-instruct-4k";

export const openai = new OpenAI({
  apiKey: process.env.FIREWORK_API_KEY,
  baseURL: "https://api.fireworks.ai/inference/v1",
});
