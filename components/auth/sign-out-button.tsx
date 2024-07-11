import { signOut } from "@/lib/supabase/actions";
import React from "react";
import { Button } from "../ui/button";

function SignOutButton() {
  return (
    <form className="flex w-full justify-end px-4">
      <Button
        type="submit"
        formAction={signOut}
        className="h-8 w-16 rounded-3xl bg-[#B5002C]/[0.13] px-4 py-2 text-xl text-[#B5002C] transition-colors hover:bg-[#B5002C]/[0.2] md:h-12 md:w-24 md:text-3xl"
      >
        Signout
      </Button>
    </form>
  );
}

export default SignOutButton;
