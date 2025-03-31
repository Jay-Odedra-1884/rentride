"use client"

import Badge from "../ui/Badge"
import Card from "../ui/Card"

function PopularDeals() {
  return (
    <div className="">
      <Badge text="POPULAR RENTAL DEALS" />
      <span className="font-semibold text-xl md:text-3xl">Most popular cars rental deals</span>
      <div>
        <Card />
      </div>
    </div>
  )
}

export default PopularDeals
