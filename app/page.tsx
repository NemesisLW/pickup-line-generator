import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/background.png"
          alt="Background"
          fill
          className="object-cover object-center 2xl:object-fill"
          quality={100}
          priority
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-[90%] md:max-w-[80%] lg:max-w-[70%] text-center">
        <div className="">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
            Pickup Line
            <br />
            Generator
          </h1>
        </div>
        <Button
          asChild
          className="px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 text-sm md:text-lg text-white rounded-full hover:bg-rose-600 transition duration-300 shadow-xl"
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

      {/* Semi-transparent overlay to ensure text readability */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-transparent opacity-50 rounded-3xl"></div> */}
    </main>
  );
}
