"use client"

import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'

function RentalNavBar() {

    const router = useRouter()

  return (
    <div className="flex justify-between gap-4 p-4 pt-8 text-xl"> 
      <div 
        onClick={() => {router.push("/")}}
        className="flex items-center cursor-pointer">
        <Image src='/LogoBlack.png' width={120} height={120} alt="RentRide"></Image>
      </div>
      <div className="hidden lg:flex gap-8 text-center items-center justify-center">
        <div onClick={() => {router.push("/rental")}} className="cursor-pointer text-black hover:scale-110 transition-all duration-300">My Cars</div>
        <div onClick={() => {router.push("/vehicles")}} className="cursor-pointer text-black hover:scale-110 transition-all duration-300">Rides</div>
        <div onClick={() => {router.push("")}} className="cursor-pointer text-white bg-black px-2 py-1 rounded-sm hover:scale-110 transition-all duration-300">Dashboard</div>
      </div>
    </div>
  )
}

export default RentalNavBar
