ALTER TABLE "Node" RENAME COLUMN "worflowId" TO "workflowId";

-- Rename the foreign key constraint if you want (optional)
ALTER TABLE "Node" RENAME CONSTRAINT "Node_worflowId_fkey" TO "Node_workflowId_fkey";
