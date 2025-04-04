'use client';

import { useEffect, useState } from 'react';
import SideBar from "@/components/SideBar";
import Card from "@/components/ui/Card";
import { Filter, ChevronDown } from 'lucide-react';
import { getAllVehicle } from '../../../../actions/vehicle';

function Vehicles() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [data, setData] = useState([]); 

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const AllVehicle = await getAllVehicle(); 
        setData(AllVehicle);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };
    fetchVehicles();
    console.log(data)
  }, []); 

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
            {data.map((vehicle, index) => (
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