import GenerateButton from "@/components/buttons/generate-cta-button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#FED8D8] md:bg-transparent p-4 md:p-0">
      <div className="absolute inset-0 hidden md:block">
        <Image
          src="/background.png"
          alt="Background"
          fill
          className="object-cover object-center"
          quality={100}
          priority
        />
      </div>

      {/* Mobile Design */}
      <div className="relative w-full md:hidden">
        <Image
          src="/background.png"
          alt="Background"
          fill
          className="rounded-3xl object-cover object-center"
          quality={100}
          priority
        />
        <div className="relative -left-2 z-10 flex w-full flex-col items-center justify-center gap-16 p-8 text-center">
          <div className="mb-12 mt-2">
            <h1 className="text-2xl leading-tight text-white">
              Pickup Line
              <br />
              Generator
            </h1>
          </div>
          <Link href="/generate">
            <GenerateButton className="mb-24 w-[150px]" />
          </Link>
        </div>
      </div>

      {/* Desktop Design */}
      <div className="hidden md:flex relative -left-2 z-10 min-h-screen flex-col items-center justify-start pt-20 2xl:pt-8 w-full">
        <div className="text-center mb-64 relative -left-1.5">
          <h1 className="text-[42px] lg:text-5xl leading-tight text-white">
            Pickup Line
            <br />
            Generator
          </h1>
        </div>
        <div className="mb-32 lg:mb-40">
          <Link href="/generate">
            <GenerateButton className="w-[200px] md:w-[300px]" />
          </Link>
        </div>
      </div>
    </main>
  );
}
