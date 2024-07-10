import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#FED8D8] p-4">
      {/* Background Image */}
      <div className="relative w-full">
        <Image
          src="/background.png"
          alt="Background"
          fill
          className="rounded-3xl object-cover object-center"
          quality={100}
          priority
        />

        {/* Content Overlay */}
        <div className="relative -left-2 z-10 flex w-full flex-col items-center justify-center gap-16 p-8 text-center md:gap-24 md:p-12 lg:-left-4 lg:-top-20 lg:gap-36 lg:p-48">
          {/* <div className="mb-12 lg:mb-24"> */}
          <div className="mb-12 mt-2 sm:mt-0 lg:mb-24">
            <h1 className="text-2xl leading-tight text-white md:text-3xl lg:text-5xl">
              Pickup Line
              <br />
              Generator
            </h1>
          </div>
          <Button
            asChild
            className="mb-24 h-8 w-[150px] rounded-full px-4 py-2 text-base text-white shadow-xl transition duration-300 hover:bg-rose-600 md:h-12 md:w-[200px] md:px-6 md:py-3 md:text-xl lg:w-[300px] lg:text-3xl"
          >
            <Link href="/generate">
              <span className="flex items-center justify-center space-x-1 sm:space-x-2">
                <Image
                  src="/ph_heart-fill.svg"
                  width={16}
                  height={17}
                  alt="Heart"
                  className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5"
                />
                <span>Generate one for me</span>
                <Image
                  src="/ph_heart-fill.svg"
                  width={16}
                  height={17}
                  alt="Heart"
                  className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5"
                />
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
