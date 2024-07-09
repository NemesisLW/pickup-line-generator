import React from "react";

import { signOut } from "@/lib/actions";

import { Button } from "./ui/button";

function SignOutButton() {
  return (
    <form>
      <Button type="submit" formAction={signOut}>
        Sign out
      </Button>
    </form>
  );
}

export default SignOutButton;
