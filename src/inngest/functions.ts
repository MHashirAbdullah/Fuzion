import { NonRetriableError } from "inngest";
import { inngest } from "./client";
import prisma from "@/lib/db";
import { toplogicalSort } from "./utils";
import { NodeType } from "@/generated/prisma/enums";
import { getExecutor } from "@/features/executions/lib/executor-registry";

export const executeWorkflow = inngest.createFunction(
  { id: "execute-workflow" },
  { event: "workflows/execute.workflow" },
  async ({ event, step }) => {
    const workflowId = event.data.workflowId;
    if (!workflowId) {
      throw new NonRetriableError("No workflow ID provided");
    }
    const sortedNodes = await step.run("prepare-worflow", async () => {
      // Logic to prepare the workflow for execution
      const workflow = await prisma.workflow.findUniqueOrThrow({
        where: {
          id: workflowId,
        },
        include: {
          node: true,
          connections: true,
        },
      });
      return toplogicalSort(workflow.node, workflow.connections);
    });

    //initialize the context with any initial data from trigger
    let context = event.data.initialdata || {};

    for (const node of sortedNodes) {
      const executor = getExecutor(node.type as NodeType);
      context = await executor({
        data: node.data as Record<string, unknown>,
        nodeId: node.id,
        context,
        step,
      });
    }
    return {
      workflowId,
      result: context,
    };
  }
);
