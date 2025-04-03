"use client";

import Badge from "../ui/Badge";
import Card from "../ui/Card";
import { useRouter } from "next/navigation";

function PopularDeals() {
  //for a testing data
  const cars = [
    {
      image: "/car1.svg",
      name: "BMW M4",
      passenger: "4",
      type: "Automatic",
      airConditioning: "Air Conditioning",
      doors: "4",
      rating: "4.8",
      price: "1000",
      rental: "City Rentals",
    },
    {
      "image": "https://pngimg.com/d/toyota_PNG1917.png",
      "name": "Toyota Corolla",
      "passenger": "5",
      "type": "Auto",
      "airConditioning": "Air Conditioning",
      "doors": "4",
      "rating": "4.5",
      "price": "4000",
      "rental": "City Rentals"
    },
    {
      "image": "https://www.pngplay.com/wp-content/uploads/13/Honda-Civic-EG-Hatch-Transparent-File.png",
      "name": "Honda Civic",
      "passenger": "5",
      "type": "Manual",
      "airConditioning": "Air Conditioning",
      "doors": "4",
      "rating": "4.3",
      "price": "3800",
      "rental": "Drive Easy"
    },
    {
      "image": "https://pngimg.com/d/mustang_PNG30.png",
      "name": "Ford Mustang",
      "passenger": "4",
      "type": "Auto",
      "airConditioning": "Air Conditioning",
      "doors": "2",
      "rating": "4.8",
      "price": "10000",
      "rental": "Luxury Rides"
    },
  ];

  const router = useRouter();

  return (
    <div className="flex flex-col gap-10 items-center mt-20">
      <Badge text="POPULAR RENTAL DEALS" />
      <span className="font-semibold text-xl md:text-3xl">
        Most popular cars rental deals
      </span>
      <div className="flex justify-center items-center flex-wrap gap-4 mt-4">
        {cars.map((car, index) => (
          <Card key={index} data={car} />
        ))}
      </div>
      <button
        onClick={() => {
          router.push("/vehicles");
        }}
        className="bg-[#1572D31A] text-[#1572D3] text-center px-6 py-2 rounded-md mt-4 cursor-pointer hover:bg-black hover:text-white hover:scale-105 transition-all duration-300"
      >
        Explore More
      </button>
    </div>
  );
}

export default PopularDeals;
