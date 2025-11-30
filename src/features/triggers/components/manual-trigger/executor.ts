import type { NodeExecutor } from "@/features/executions/types";

type ManualTriggerData = Record<string, unknown>;

export const manualTriggerExecutor: NodeExecutor<ManualTriggerData> = async ({
  nodeId,
  context,
  step,
}) => {
  // For manual trigger, we simply return the existing context
  const result  = await  step.run("manual-trigger", async () => context);
  return result;
};
