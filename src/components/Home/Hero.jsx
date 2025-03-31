"use client";

import Image from "next/image";
import { FlipWords } from "../ui/flip-words";
import { useRouter } from "next/navigation";

function Hero() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="w-full">
        <div className="flex justify-center items-center h-full">
          <div className="w-1/2 flex flex-col gap-10">
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
            <button
              onClick={() => {router.push("/all-cars")}}
              className="group relative overflow-hidden bg-[#1572D3] hover:bg-blue-700 text-white font-medium px-7 py-3 rounded-lg shadow-lg transition-all duration-300 w-56 h-14">
              <div className="relative w-full h-full">
                <span className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out transform group-hover:translate-x-full">
                  Book your Ride
                </span>
                <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out transform -translate-x-full group-hover:translate-x-0">
                  <Image
                    src="/buttonCar.png"
                    width={70}
                    height={70}
                    alt="car"
                    className="animate-bounce-horizontal"
                  />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-end">
          <Image
            src="/heroCarImage.png"
            width={800}
            height={800}
            alt="car Image"
          ></Image>
        </div>
      </div>
    </div>
  );
}

export default Hero;
