import React from "react";
import { useFormStatus } from "react-dom";
import GenerateButton from "../generate-cta-button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

function PickupLineInputForm({
  formAction,
}: {
  formAction: (payload: FormData) => void;
}) {
  const { pending } = useFormStatus();

  return (
    <form
      className="flex flex-col text-xl md:text-2xl lg:space-y-4"
      action={formAction}
    >
      <div>
        <label
          htmlFor="crushDescription"
          className="mb-1 block text-left text-[#A5455C]"
        >
          Tell us about your crush
        </label>
        <Textarea
          id="crushDescription"
          name="crushDescription"
          rows={4}
          placeholder={"She is a 10 but...\nHe likes football...."}
          className="w-full resize-none placeholder:text-[#DCDCDC] focus:outline-none focus:ring-0 md:text-lg"
          required
        />
      </div>
      <div>
        <label htmlFor="style" className="mb-1 block text-left text-[#A5455C]">
          Style
        </label>
        <Input
          id="style"
          name="style"
          type="text"
          autoComplete="off"
          placeholder="eg: Funny"
          className="w-full placeholder:text-[#DCDCDC] focus:outline-none focus:ring-0 md:text-lg"
          required
        />
      </div>
      <div className="pt-4 md:pt-8">
        <GenerateButton className="w-full" pending={pending} isServerAction />
      </div>
    </form>
  );
}

export default PickupLineInputForm;
