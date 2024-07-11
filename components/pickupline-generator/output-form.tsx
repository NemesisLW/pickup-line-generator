import { OutputSchemaType } from "@/lib/schema";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { copyToClipboard } from "@/lib/utils";
import Image from "next/image";

function OutputForm({ pickupLines }: { pickupLines: string[] }) {
  return (
    <div className="mx-auto w-full max-w-lg space-y-4">
      {pickupLines.map((line, index) => (
        <Card key={index} className="border-2 border-[#FF2157] bg-white">
          <CardContent className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-[#FF2157]">
                Pickup line {index + 1}
              </h3>
              <button
                onClick={() => copyToClipboard(line)}
                className="text-[#FF2157] hover:text-[#A5455C]"
              >
                <Image src="/copy.svg" alt="copy" width={20} height={20} />
              </button>
            </div>
            <p className="text-lg text-[#333333]">Pickup Line {index + 1}</p>
            <p className="mt-2 text-sm text-[#A5455C]">{line}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default OutputForm;
