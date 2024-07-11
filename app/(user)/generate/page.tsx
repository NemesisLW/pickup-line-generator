import Image from "next/image";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import PickupLineInputForm from "@/components/pickupline-input-form";
import SignOutButton from "@/components/sign-out-button";

export default async function Page() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="absolute inset-0">
        <Image
          src="/background.png"
          alt="Background"
          fill
          className="object-cover object-center"
          quality={100}
          priority
        />
      </div>
      <div className="relative z-10 flex w-full flex-col items-center justify-center p-8 text-center">
        <SignOutButton />
        <PickupLineInputForm />
      </div>
      {/* Semi-transparent overlay to ensure text readability */}
      <div className="absolute inset-0 bg-white bg-opacity-90"></div>
    </div>
  );
}
