import prisma from "@/lib/db";
import { inngest } from "./client";
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
const google = createGoogleGenerativeAI();
export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    await step.sleep("pretend", "5s")
    const { steps } = await step.ai.wrap
    ("gemini-generate-text",
    generateText, {
      model: google("gemini-2.5-flash"),
      // system: "You are an expert workflow automation AI. Your task is to help create workflows based on user requirements. Respond in concise JSON format.",
      system: "You are a helpful assistant.",
      // prompt: `Create a workflow based on the following user requirements: ${event.data.requirements}. The workflow should include steps for data input, processing, and output. Ensure the workflow is efficient and easy to understand.`
      prompt: "What is 2 + 2?",
    });
    return steps;
  }
);
