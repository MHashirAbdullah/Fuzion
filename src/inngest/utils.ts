import { Connection, Node } from "@/generated/prisma/client";
import toposort from "toposort";
import { inngest } from "./client";

export const toplogicalSort = (
  nodes: Node[],
  connections: Connection[]
): Node[] => {
  // if no connections, return nodes as is
  if (connections.length === 0) {
    return nodes;
  }

  //create edge array for toposort
  const edges: [string, string][] = connections.map((connection) => [
    connection.formNodeId,
    connection.toNodeId,
  ]);

  //add nodes with no connections as self-edges to ensure they are included
  const connectedNodeIds = new Set<string>();
  for (const connection of connections) {
    connectedNodeIds.add(connection.formNodeId);
    connectedNodeIds.add(connection.toNodeId);
  }

  for (const node of nodes) {
    if (!connectedNodeIds.has(node.id)) {
      edges.push([node.id, node.id]);
    }
  }

  //perform topological sort
  let sortedNodeIds: string[]; // Initialized with an empty array
  try {
    sortedNodeIds = toposort(edges);
    //remove duplicates while preserving order
    sortedNodeIds = [...new Set(sortedNodeIds)];
  } catch (error) {
    if (error instanceof Error && error.message.includes("Cyclic")) {
      throw new Error(
        "Cyclic dependency detected in node connections. Please remove cycles and try again."
      );
    }
    throw error; // re-throw other errors
  }

  //map sorted ids back to nodes
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  return sortedNodeIds.map((id) => nodeMap.get(id)!).filter(Boolean);
};

export const  sendWorkflowExecution = async (data: {
  workflowId: string;
  [key: string]: any;
}) =>{
 return inngest.send({
  name: "workflows/execute.workflow",
  data,
 })
}
