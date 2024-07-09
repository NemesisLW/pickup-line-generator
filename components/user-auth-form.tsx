import React, { Suspense } from "react";
import Image from "next/image";

import { login } from "@/lib/actions";
import { cn } from "@/lib/utils";

import { buttonVariants } from "./ui/button";

function UserAuthForm() {
  return (
    <form className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-4 text-center items-center">
        <Image
          src="/logo.svg"
          alt="logo"
          width={43}
          height={43}
          className="mb-4"
          priority
        />
        <h1 className="text-2xl font-semibold tracking-tight">
          Pickup line generator
        </h1>
        <p className="text-sm text-[#AAB5C0]">
          Generate pickup line for your crush now!
        </p>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <button
          type="submit"
          className={cn(
            buttonVariants({ variant: "default" }),
            "bg-zinc-50 rounded-full text-black font-semibold"
          )}
          formAction={login}
        >
          <Image
            src="/google.svg"
            alt="google"
            width={20}
            height={20}
            className="mr-2"
          />
          Sign up with Google
        </button>
      </Suspense>
    </form>
  );
}

export default UserAuthForm;
