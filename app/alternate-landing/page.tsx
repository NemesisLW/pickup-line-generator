import GenerateButton from "@/components/buttons/generate-cta-button";
import Image from "next/image";
import React from "react";

function page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
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
      {/* Content Overlay */}
      <div className="relative -left-2 z-10 flex w-full flex-col items-center justify-center gap-16 p-8 text-center md:gap-24 md:p-12 lg:-left-4 lg:-top-20 lg:gap-36 lg:p-48">
        <div className="mb-12 mt-2 sm:mt-0 lg:mb-24">
          <h1 className="text-2xl leading-tight text-white md:text-3xl lg:text-5xl">
            Pickup Line
            <br />
            Generator
          </h1>
        </div>
        <GenerateButton />
      </div>
    </main>
  );
}

export default page;
