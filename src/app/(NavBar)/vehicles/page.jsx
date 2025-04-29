"use client";

import { useEffect, useState } from "react";
import SideBar from "@/components/SideBar";
import Card from "@/components/ui/Card";
import { Filter, ChevronDown } from "lucide-react";
import { getAllVehicle } from "../../../../actions/vehicle";
import { BarLoader } from "react-spinners";

function Vehicles() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    let filtered = data;

    if (filters.type && filters.type !== "") {
      filtered = filtered.filter((vehicle) => vehicle.type === filters.type);
    }

    if (filters.gearType) {
      filtered = filtered.filter(
        (vehicle) => vehicle.gearType === filters.gearType
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter(
        (vehicle) => vehicle.price >= filters.minPrice
      );
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(
        (vehicle) => vehicle.price <= filters.maxPrice
      );
    }

    setFilteredData(filtered);
  }, [data, filters]);

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
  }, []);

  return data.length > 0 ? (
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
          <ChevronDown
            size={16}
            className={`transform transition-transform ${
              isSidebarOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Main content area with sidebar and product grid */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar - hidden on mobile unless toggled */}
        <div
          className={`md:w-72 shrink-0  ${isSidebarOpen ? "block" : "hidden md:block"}`}
        >
          <SideBar onFilterChange={setFilters} />
        </div>

        {/* Product grid - responsive layout */}
        {filteredData.length > 0 ? (
          <div>
            <div className="flex-1">
              <div className="flex flex-wrap justify-center gap-4">
                {filteredData.map((vehicle, index) => (
                  <Card key={index} data={vehicle} />
                ))}
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-4 py-2 border rounded-md bg-blue-600 text-white">
                  1
                </button>
                <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
                  2
                </button>
                <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
                  3
                </button>
                <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          </div>
        ) : (
          <div className="w-full text-2xl text-center">
            <h2>OPPS! sorry there is no vehicle availabale right now</h2>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30">
      <BarLoader color="#3b82f6" height={6} width={150} />
    </div>
  );
}

export default Vehicles;
