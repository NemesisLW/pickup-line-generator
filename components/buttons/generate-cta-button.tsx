import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";

function GenerateButton({
  className,
  text = "Generate one for me",
  isServerAction = false,
  pending = false,
  formAction,
}: GenerateButtonProps) {
  return (
    <Button
      className={cn(
        className,
        "h-8 rounded-full px-4 py-2 text-base text-white shadow-xl transition duration-300 hover:bg-rose-600 md:h-12 md:px-6 md:py-2.5 md:text-3xl",
        pending && "opacity-70 cursor-not-allowed",
      )}
      type={isServerAction ? "submit" : "button"}
      aria-disabled={isServerAction && pending}
      disabled={isServerAction && pending}
      formAction={formAction}
    >
      <span className="flex items-center justify-center space-x-1 sm:space-x-2">
        {pending ? (
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
        ) : (
          <>
            <Image
              src="/ph_heart-fill.svg"
              width={16}
              height={17}
              alt="Heart"
              className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5"
            />
            <span>{text}</span>
            <Image
              src="/ph_heart-fill.svg"
              width={16}
              height={17}
              alt="Heart"
              className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5"
            />
          </>
        )}
      </span>
    </Button>
  );
}

export default GenerateButton;
