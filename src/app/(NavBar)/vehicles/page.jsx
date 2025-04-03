'use client';

import { useState } from 'react';
import SideBar from "@/components/SideBar";
import Card from "@/components/ui/Card";
import { Filter, ChevronDown } from 'lucide-react';

function Vehicles() {

  //for a testing purpose only data
  const vehicles =[
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
      "image": "https://i.pinimg.com/736x/9e/ca/e5/9ecae5a5505b76b0f41b69eae06be1f9.jpg",
      "name": "Mahindra Thar",
      "passenger": "4",
      "type": "Manual",
      "airConditioning": "Air Conditioning",
      "doors": "3",
      "rating": "4.5",
      "price": "5000",
      "rental": "City Rentals"
    },
    {
      "image": "https://wallpapers.com/images/hd/white-mahindra-bolero-side-view-v56o5ghhb4nm6s7r-2.png",
      "name": "Mahindra Bolero",
      "passenger": "7",
      "type": "Manual",
      "airConditioning": "Air Conditioning",
      "doors": "5",
      "rating": "4.9",
      "price": "4000",
      "rental": "Drive Easy"
    },
    {
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwWGnI_AZmR9GFc4atD5_7M6MqRMG4WZIg70U5DkRdscl_-rA3Qz6OFmzpVXHnuaDzzpI&usqp=CAU",
      "name": "Mahindra Scorpio",
      "passenger": "5",
      "type": "Auto",
      "airConditioning": "Air Conditioning",
      "doors": "4",
      "rating": "4.6",
      "price": "5500",
      "rental": "Outdoor Adventures"
    },
    {
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyh-qiYNEhQn_Xy2BTTfwEROvoNGSGnSYmFQ&s",
      "name": "Jeep Wrangler",
      "passenger": "5",
      "type": "Manual",
      "airConditioning": "Non A/C",
      "doors": "4",
      "rating": "4.3",
      "price": "7000",
      "rental": "Adventure Rentals"
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
    {
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi5asRqXLs97s7mc8_dpyFqdBgHiPgPivZQg&s",
      "name": "Tata Ace",
      "passenger": "2",
      "type": "Manual",
      "airConditioning": "Non A/C",
      "doors": "2",
      "rating": "4.2",
      "price": "3500",
      "rental": "Heavy Load Movers"
    },
    {
      "image": "https://images.jdmagicbox.com/quickquotes/images_main/ashok-leyland-dost-pick-up-van-2219902646-u1u1munq.jpg",
      "name": "Ashok Leyland Dost",
      "passenger": "2",
      "type": "Manual",
      "airConditioning": "Air Conditioning",
      "doors": "2",
      "rating": "4.4",
      "price": "4000",
      "rental": "Truck Hub"
    },
    {
      "image": "https://i.pinimg.com/736x/2a/c3/dd/2ac3dd76c89d2b38ff4b3672740cd25f.jpg",
      "name": "Royal Enfield Classic 350",
      "passenger": "2",
      "type": "Manual",
      "airConditioning": "Non A/C",
      "doors": "0",
      "rating": "4.7",
      "price": "1500",
      "rental": "Bike Rentals"
    },
    {
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsKhf6zeYGMUrV12MF5weTcjAgsiB5LC1Ylg&s",
      "name": "Ather 450X",
      "passenger": "2",
      "type": "Auto",
      "airConditioning": "Non A/C",
      "doors": "0",
      "rating": "4.8",
      "price": "1800",
      "rental": "Eco Rides"
    },
    {
      "image": "https://cdn.bikedekho.com/processedimages/ola-electric/2025-s1-pro/source/2025-s1-pro679ce24f98f96.jpg?imwidth=880",
      "name": "Ola S1 Pro",
      "passenger": "2",
      "type": "Auto",
      "airConditioning": "Non A/C",
      "doors": "0",
      "rating": "4.6",
      "price": "1600",
      "rental": "Green Wheels"
    },
    {
      "image": "https://c4.wallpaperflare.com/wallpaper/60/647/828/hyundai-elantra-avante-side-view-wallpaper-thumb.jpg",
      "name": "Hyundai Elantra",
      "passenger": "5",
      "type": "Auto",
      "airConditioning": "Air Conditioning",
      "doors": "4",
      "rating": "4.6",
      "price": "4500",
      "rental": "Elite Rentals"
    },
    {
      "image": "https://www.pngplay.com/wp-content/uploads/13/BMW-3-Series-2019-Transparent-Images.png",
      "name": "BMW 3 Series",
      "passenger": "5",
      "type": "Auto",
      "airConditioning": "Air Conditioning",
      "doors": "4",
      "rating": "4.7",
      "price": "9000",
      "rental": "Prestige Wheels"
    },
    {
      "image": "https://as1.ftcdn.net/jpg/05/70/87/04/1000_F_570870490_e4qBslQl1elGp2BuaoUDb2ajdqt1ncDn.jpg",
      "name": "Mercedes-Benz C-Class",
      "passenger": "5",
      "type": "Auto",
      "airConditioning": "Air Conditioning",
      "doors": "4",
      "rating": "4.8",
      "price": "10000",
      "rental": "Luxury Rides"
    },
    {
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn19Ji9HXyC65tXqHW_8ivNHQT4BV6dO8CAQ&s",
      "name": "Audi A4",
      "passenger": "5",
      "type": "Auto",
      "airConditioning": "Air Conditioning",
      "doors": "4",
      "rating": "4.6",
      "price": "9500",
      "rental": "Elite Rentals"
    },
    {
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr4UvQo6nRNuEUdwjHyA9OULFFb6mAXeR75Q&s",
      "name": "Nissan Versa",
      "passenger": "5",
      "type": "Manual",
      "airConditioning": "Air Conditioning",
      "doors": "4",
      "rating": "4.2",
      "price": "3200",
      "rental": "Budget Cars"
    },
    
  ]
  
  


  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
          <h1 className="text-3xl font-semibold">Explore all vehicles</h1>
        <hr className="my-4" />
      </div>

      {/* Mobile filter button - only visible on small screens */}
      <div className="md:hidden mb-4 flex justify-between items-center">
        <button 
          className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-md"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Filter size={18} />
          <span>Filters</span>
          <ChevronDown size={16} className={`transform transition-transform ${isSidebarOpen ? 'rotate-180' : ''}`} />
        </button>
        
        <select className="border rounded-md p-2 focus:outline-none">
          <option>Sort</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>

      {/* Main content area with sidebar and product grid */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar - hidden on mobile unless toggled */}
        <div className={`md:w-64 ${isSidebarOpen ? 'block' : 'hidden md:block'}`}>
          <SideBar />
        </div>

        {/* Product grid - responsive layout */}
        <div className="flex-1">
          <div className="flex flex-wrap justify-center gap-4">
            {vehicles.map((vehicle, index) => (
              <Card key={index} data={vehicle} />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button className="px-4 py-2 border rounded-md hover:bg-gray-50">Previous</button>
              <button className="px-4 py-2 border rounded-md bg-blue-600 text-white">1</button>
              <button className="px-4 py-2 border rounded-md hover:bg-gray-50">2</button>
              <button className="px-4 py-2 border rounded-md hover:bg-gray-50">3</button>
              <button className="px-4 py-2 border rounded-md hover:bg-gray-50">Next</button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vehicles;