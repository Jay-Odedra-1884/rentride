"use client"

import Badge from "../ui/Badge"
import Card from "../ui/Card"
import { useRouter } from "next/navigation"

function PopularDeals() {

  const router = useRouter()

  return (
    <div className="flex flex-col gap-10 items-center mt-20">
      <Badge text="POPULAR RENTAL DEALS" />
      <span className="font-semibold text-xl md:text-3xl">Most popular cars rental deals</span>
      <div className="flex justify-center items-center flex-wrap gap-4 mt-4">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <button
      onClick={() => {router.push("/vehicles")}}
      className="bg-[#1572D31A] text-[#1572D3] text-center px-6 py-2 rounded-md mt-4 cursor-pointer hover:bg-black hover:text-white hover:scale-105 transition-all duration-300">Explore More</button>
    </div>
  )
}

export default PopularDeals
