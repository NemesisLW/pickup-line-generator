import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

function page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
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
      <div className="relative z-10 -left-4 -top-20 flex flex-col items-center justify-center w-full text-center gap-36 p-8 md:p-12 lg:p-48">
        <div className="mb-12 lg:mb-24">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
            Pickup Line
            <br />
            Generator
          </h1>
        </div>
        <Button
          asChild
          className="h-12 w-[27%] px-4 py-2 md:px-6 md:py-3 text-base md:text-3xl text-white rounded-full hover:bg-rose-600 transition duration-300 shadow-xl mb-24"
        >
          <Link href="/generate">
            <span className="flex items-center space-x-2">
              <Image
                src="/ph_heart-fill.svg"
                width={16}
                height={17}
                alt="Heart"
              />
              <span>Generate one for me</span>
              <Image
                src="/ph_heart-fill.svg"
                width={16}
                height={17}
                alt="Heart"
              />
            </span>
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default page;
