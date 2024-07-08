import Image from "next/image";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-pink-100">
      {/* Background Image */}
      {/* <div className="relative w-full max-w-screen-2xl"> */}
      <Image
        src="/background.png"
        alt="Background"
        fill
        className="object-cover z-0"
        quality={100}
        priority
      />
      {/* Content Overlay */}
      <div className="relative z-10 p-4 md:p-8 text-center max-w-lg md:max-w-2xl lg:max-w-4xl">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Pickup Line Generator
        </h1>

        <Button className="px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 text-sm md:text-lg font-semibold text-white  rounded-full hover:bg-primary/50 transition duration-300">
          Generate one for me
        </Button>
      </div>
      {/* </div> */}

      {/* Semi-transparent overlay to ensure text readability */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-transparent opacity-50 rounded-3xl"></div> */}
    </main>
  );
}
