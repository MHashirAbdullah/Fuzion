import { prefetchWorkflow } from "@/features/workflows/server/prefectch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import {
  Editor,
  EditorError,
  EditorLoading,
} from "@/features/editor/components/editor";
import { EditorHeader } from "@/features/editor/components/editor-header";

interface PageProps {
  params: Promise<{
    workflowsId: string;
  }>;
}
const Page = async ({ params }: PageProps) => {
  await requireAuth();
  const { workflowsId } = await params;
  prefetchWorkflow(workflowsId);
  return (
    <HydrateClient>
      <ErrorBoundary fallback={<EditorError />}>
        <Suspense fallback={<EditorLoading />}>
          <EditorHeader workflowId={workflowsId}/>
          <main className="flex-1">
            <Editor workflowId={workflowsId} />
          </main>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};
export default Page;
