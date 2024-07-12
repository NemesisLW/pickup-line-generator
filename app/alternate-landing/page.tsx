import GenerateButton from "@/components/buttons/generate-cta-button";
import Image from "next/image";
import Link from "next/link";

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
          <div className="mb-12 mt-2 sm:mt-0 lg:mb-24">
            <h1 className="text-2xl leading-tight text-white md:text-3xl lg:text-5xl">
              Pickup Line
              <br />
              Generator
            </h1>
          </div>
          <Link href="/generate">
            <GenerateButton className="mb-24 w-[150px] md:w-[200px] lg:w-[300px]" />
          </Link>
        </div>
      </div>
    </main>
  );
}
