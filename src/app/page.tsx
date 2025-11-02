"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
const Page = () => {
  const { data } = authClient.useSession();
  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center">
      {JSON.stringify(data)}
      {data && (
        <Button onClick={() => authClient.signOut()}>LogOut</Button>
      )}
    </div>
  );
};

export default Page;
