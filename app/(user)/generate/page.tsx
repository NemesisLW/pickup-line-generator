import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import SignOutButton from "@/components/sign-out-button";

export default async function Page() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <p>Hello {data.user.user_metadata.full_name}!</p>
      <SignOutButton />
    </div>
  );
}
