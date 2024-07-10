import React from "react";

import { signOut } from "@/lib/actions";

import { Button } from "./ui/button";

function SignOutButton() {
  return (
    <form>
      <Button
        type="submit"
        formAction={signOut}
        className="px-4 py-2 bg-pink-200 text-pink-700 rounded-full hover:bg-pink-300 transition-colors"
      >
        Sign out
      </Button>
    </form>
  );
}

export default SignOutButton;
