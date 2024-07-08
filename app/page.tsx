import Image from "next/image";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-pink-100">
      {/* Background Image */}
      <Image
        src="/background.png"
        alt="Background"
        fill
        className="object-cover z-0"
        quality={100}
        priority
      />
      {/* Content Overlay */}
      <div className="relative z-10 p-4 md:p-8 text-center max-w-lg md:max-w-2xl lg:max-w-4xl lg:p-12">
        <h1 className="text-3xl md:text-5xl lg:text-6xl  text-white mb-6">
          Pickup Line
          <br />
          Generator
        </h1>

        <Button className="px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 text-sm md:text-lg font-semibold text-white  rounded-full hover:bg-rose-600 transition duration-300">
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
        </Button>
      </div>

      {/* Semi-transparent overlay to ensure text readability */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-transparent opacity-50 rounded-3xl"></div> */}
    </main>
  );
}
