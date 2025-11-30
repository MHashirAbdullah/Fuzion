import Handlebars from "handlebars";
import type { NodeExecutor } from "@/features/executions/types";
import { NonRetriableError } from "inngest";
import ky, { type Options as KyOptions } from "ky";

Handlebars.registerHelper("json", (context) => {
  const jsonString = JSON.stringify(context, null, 2);
  const safeString = new Handlebars.SafeString(jsonString);
  return safeString;
});

type HttpRequestData = {
  variableName: string;
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: string;
};

export const httpRequestExecutor: NodeExecutor<HttpRequestData> = async ({
  data,
  nodeId,
  context,
  step,
}) => {
  if (!data.variableName) {
    throw new NonRetriableError(
      "HTTP Request node validation failed: 'variableName' is required but missing."
    );
  }

  if (!data.method) {
    throw new NonRetriableError(
      "HTTP Request node validation failed: 'method' is missing or invalid."
    );
  }

  if (!data.endpoint) {
    throw new NonRetriableError(
      "HTTP Request node is missing an endpoint. No endpoint configured."
    );
  }
  // For http  request, we simply return the existing context
  const result = await step.run("http-request", async () => {
    const endpoint = Handlebars.compile(data.endpoint)(context);
    const method = data.method;
    const options: KyOptions = { method };
    if (["POST", "PUT", "PATCH"].includes(method)) {
      const resolved = Handlebars.compile(data.body || "{}")(context);
      JSON.parse(resolved); // Validate JSON
      console.log("Resolved body:", resolved);
      options.body = resolved;
      options.headers = {
        "Content-Type": "application/json",
      };
    }
    const response = await ky(endpoint, options);
    const contentType = response.headers.get("content-type");
    const responseData = contentType?.includes("application/json")
      ? await response.json()
      : await response.text();

    const responsePayload = {
      httpResponse: {
        status: response.status,
        statusText: response.statusText,
        data: responseData,
      },
    };

    return {
      ...context,
      [data.variableName!]: responsePayload,
    };
  });
  return result;
};
