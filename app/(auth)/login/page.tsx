import React from "react";
import { Inter } from "next/font/google";
import Link from "next/link";

import { cn } from "@/lib/utils";
import UserAuthForm from "@/components/user-auth-form";

const inter = Inter({ subsets: ["latin"] });

function LoginPage() {
  return (
    <div
      className={cn(
        "container flex h-screen w-screen flex-col items-center justify-between p-8 md:p-12 lg:p-24",
        inter.className
      )}
    >
      <div className="flex-grow flex items-center justify-center">
        <UserAuthForm />
      </div>
      <p className="px-8 text-center text-sm text-[#AAB5C0]">
        By signing up, you agree to the{" "}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Use
        </Link>{" "}
        ,{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Notice
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;