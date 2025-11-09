import prisma from "@/lib/db";
import { inngest } from "./client";
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createXai } from "@ai-sdk/xai";
import * as Sentry from "@sentry/nextjs";

const google = createGoogleGenerativeAI();
const openai = createOpenAI();
const anthropic = createAnthropic();
const xai = createXai({
  apiKey: process.env.XAI_API_KEY!,
});
export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    await step.sleep("pretend", "5s");
    Sentry.logger.info("User triggered test log", {
      log_source: "sentry_test",
    });
    const { steps: geminiSteps } = await step.ai.wrap(
      "gemini-generate-text",
      generateText,
      {
        model: google("gemini-2.5-flash"),
        // system: "You are an expert workflow automation AI. Your task is to help create workflows based on user requirements. Respond in concise JSON format.",
        system: "You are a helpful assistant.",
        // prompt: `Create a workflow based on the following user requirements: ${event.data.requirements}. The workflow should include steps for data input, processing, and output. Ensure the workflow is efficient and easy to understand.`
        prompt: "What is 2 + 2?",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      }
    );

    const { steps: openAISteps } = await step.ai.wrap(
      "openai-generate-text",
      generateText,
      {
        model: openai("gpt-4"),
        // system: "You are an expert workflow automation AI. Your task is to help create workflows based on user requirements. Respond in concise JSON format.",
        system: "You are a helpful assistant.",
        // prompt: `Create a workflow based on the following user requirements: ${event.data.requirements}. The workflow should include steps for data input, processing, and output. Ensure the workflow is efficient and easy to understand.`
        prompt: "What is 2 + 2?",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      }
    );

    const { steps: anthropicSteps } = await step.ai.wrap(
      "anthropic-generate-text",
      generateText,
      {
        model: anthropic("claude-sonnet-4-5"),
        // system: "You are an expert workflow automation AI. Your task is to help create workflows based on user requirements. Respond in concise JSON format.",
        system: "You are a helpful assistant.",
        // prompt: `Create a workflow based on the following user requirements: ${event.data.requirements}. The workflow should include steps for data input, processing, and output. Ensure the workflow is efficient and easy to understand.`
        prompt: "What is 2 + 2?",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      }
    );

    const { steps: XAISteps } = await step.ai.wrap(
      "xai-generate-text",
      generateText,
      {
        model: xai("grok-3"),
        // system: "You are an expert workflow automation AI. Your task is to help create workflows based on user requirements. Respond in concise JSON format.",
        system: "You are a helpful assistant.",
        // prompt: `Create a workflow based on the following user requirements: ${event.data.requirements}. The workflow should include steps for data input, processing, and output. Ensure the workflow is efficient and easy to understand.`
        prompt: "What is 2 + 2?",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      }
    );
    return {
      geminiSteps,
      openAISteps,
      anthropicSteps,
      XAISteps,
    };
  }
);
