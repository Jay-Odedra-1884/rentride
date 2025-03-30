"use client";

import Image from "next/image";
import { FlipWords } from "../ui/flip-words";

function Hero() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="w-full">
        <div className="flex justify-center items-center h-full">
          <div className="w-1/2">
            <h2 className="text-4xl mt-10 mb-10 lg:m-0 lg:text-6xl font-semibold">
              Find, book and rent a car{" "}
              <span className="text-[#1572D3]">
                <FlipWords words={["Easily", "At best price", "Hassle-free"]} />{" "}
                <Image
                  className="-rotate-3"
                  src="/vector1.svg"
                  width={160}
                  height={150}
                  alt="..."
                ></Image>
              </span>
            </h2>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-end">
            <Image src="/heroCarImage.png" width={800} height={800} alt="car Image"></Image>
        </div>
      </div>
    </div>
  );
}

export default Hero;
