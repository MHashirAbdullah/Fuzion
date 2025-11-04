"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
const Page = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());
  const createWorkflow = useMutation(trpc.createWorkflow.mutationOptions(
    {
      onSuccess: ()=>{
        toast.success("Workflow creation triggered");
      }
    }
  ));
  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center flex-col gap-y-6">
      <div>{JSON.stringify(data)}</div>
      <Button
        onClick={() => createWorkflow.mutate()}
        disabled={createWorkflow.isPending}
      >
        Create workflow
      </Button>
      {data && <Button onClick={() => authClient.signOut()}>LogOut</Button>}
    </div>
  );
};

export default Page;
