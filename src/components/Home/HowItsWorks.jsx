"use client";

import Badge from "../ui/Badge";

function HowItsWorks() {
  return (
    <div className="flex justify-center items-center flex-col gap-10 mt-40 mb-40"> 
        <Badge text="How Its Work" width="w-30" />
        <span className="font-semibold text-3xl">Rent with following 3 working steps</span>
        <div className="flex justify-between w-1/2">
            <div className="w-1/5 text-center flex flex-col gap-1 justify-center items-center">
                <Badge image={"/location-tick.svg"} width="w-26" height="h-26" imageHeight={42} imageWidth={42} className="mb-2" />
                <p className="text-lg font-semibold">Choose location</p>
                <p className="text-gray-400">Choose your and find your best car</p>
            </div>
            <div className="w-1/5 text-center flex flex-col gap-1 justify-center items-center">
                <Badge image={"/car.svg"} width="w-26" height="h-26" imageHeight={42} imageWidth={42} className="mb-2" />
                <p className="text-lg font-semibold">Pick-up date</p>
                <p className="text-gray-400">Select your pick up date and time to book your car</p>
            </div>
            <div className="w-1/5 text-center flex flex-col gap-1 justify-center items-center">
                <Badge image={"/calendar.svg"} width="w-26" height="h-26" imageHeight={42} imageWidth={42} className="mb-2" />
                <p className="text-lg font-semibold">Book your car</p>
                <p className="text-gray-400">Book your car and we will deliver it directly to you</p>
            </div>
        </div>
    </div>
  )
}

export default HowItsWorks
