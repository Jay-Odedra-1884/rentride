"use client";

import { useEffect, useState } from "react";
import SideBar from "@/components/SideBar";
import Card from "@/components/ui/Card";
import { Filter, ChevronDown } from "lucide-react";
import { getAllVehicle } from "../../../../actions/vehicle";
import { BarLoader } from "react-spinners";
import { useRouter, useSearchParams } from "next/navigation";

function Vehicles() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({});

  // for multiple vehicle cards
  const [currentPage, setCurrentPage] = useState(1);
  const vehiclesPerPage = 12;

  const totalPages = Math.ceil(filteredData.length / vehiclesPerPage);
  const startIndex = (currentPage - 1) * vehiclesPerPage;
  const endIndex = startIndex + vehiclesPerPage;
  const paginatedVehicles = filteredData.slice(startIndex, endIndex);

  //for location and date component
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  //getting location data from Home page
  useEffect(() => {
    const loc = searchParams.get("location") || "";
    const dt = searchParams.get("date") || "";

    if (loc || dt) {
      setSelectedLocation(loc);
      setSelectedDate(dt);
      setSearchTriggered(true);
    }
  }, [searchParams]);

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

  useEffect(() => {
    // console.log(data);
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

    // Ensure both location and date are selected before filtering
    if (
      searchTriggered &&
      selectedLocation.trim() !== "" &&
      selectedDate.trim() !== ""
    ) {
      const selectedTimestamp = new Date(selectedDate).getTime();

      filtered = filtered.filter((vehicle) => {
        const matchesLocation = vehicle.location
          .toLowerCase()
          .includes(selectedLocation.toLowerCase());

        const availableStart = new Date(vehicle.startDate).getTime();
        const availableEnd = new Date(vehicle.endDate).getTime();

        const isAvailable =
          selectedTimestamp <= availableStart &&
          selectedTimestamp >= availableEnd;

        return matchesLocation && isAvailable;
      });
    } else {
      filtered = []; // Hide all vehicles unless location + date are entered
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [data, filters, selectedLocation, selectedDate, searchTriggered]);

  console.log(data);

  return data.length > 0 ? (
    <div className="container mx-auto px-4 py-10">
      {/* Title */}
      <div className="mb-10 flex flex-col md:flex-row md:justify-between gap-4">
        <div className="pl-4">
          <h1 className="text-4xl font-bold text-gray-800">
            Explore All Vehicles
          </h1>
          <p className="text-gray-500 mt-1">
            Find your perfect ride — fast, easy, and reliable
          </p>
        </div>

        {/* location and date selectors */}
        <div className="w-full max-w-4xl h-auto sm:h-15 mx-auto text-sm lg:text-base flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-gray-100 rounded-xl p-4 shadow-sm">
          {/* Location input */}
          <div className="flex flex-row-reverse sm:flex-row items-center gap-2 w-full sm:w-2/5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-gray-600"
            >
              <path
                fillRule="evenodd"
                d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              value={selectedLocation}
              onChange={(e) => {
                setSearchTriggered(false);
                setSelectedLocation(e.target.value);
              }}
              placeholder="Location (City/Town)"
              className="w-full bg-transparent items-center text-base sm:text-lg placeholder-gray-500 outline-none"
            />
          </div>

          {/* Divider (hide on mobile) */}
          <div className="hidden sm:block w-px bg-gray-400 h-6"></div>

          {/* Date input */}
          <div className="flex items-center w-full sm:w-1/3">
            <input
              type="datetime-local"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-transparent text-base sm:text-lg text-gray-700 outline-none"
            />
          </div>

          {/* Search button */}
          <button
            onClick={() => {
              const query = new URLSearchParams();
              if (selectedLocation) query.set("location", selectedLocation);
              if (selectedDate) query.set("date", selectedDate);
              router.push(`/vehicles?${query.toString()}`);
              setSearchTriggered(true);
            }}
            className="w-full sm:w-32 bg-[#1572D3] text-white font-semibold py-2 rounded-lg transition hover:bg-black hover:scale-[1.03]"
          >
            Search
          </button>
        </div>
      </div>

      {/* Mobile filter button - only visible on small screens */}
      <div className="md:hidden mb-4 flex justify-between items-center">
        <button
          className="flex items-center space-x-2 bg-white border px-4 py-2 rounded-md shadow-sm hover:shadow-md transition"
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

      {/* Main content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div
          className={`md:w-72 shrink-0 ${isSidebarOpen ? "block" : "hidden md:block"}`}
        >
          <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
            <SideBar onFilterChange={setFilters} />
          </div>
        </div>

        {/* Vehicle Grid Logic */}
        {selectedLocation && selectedDate ? (
          filteredData.length > 0 ? (
            <div className="flex-1">
              <div className="flex flex-wrap justify-center gap-4">
                {paginatedVehicles.map((vehicle, index) => (
                  <Card key={index} data={vehicle} />
                ))}
              </div>
              {/* Pagination */}
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button
                    className="px-4 py-2 border rounded-md hover:bg-gray-50 disabled:opacity-50"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-4 py-2 border rounded-md ${
                        currentPage === i + 1
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    className="px-4 py-2 border rounded-md hover:bg-gray-50 disabled:opacity-50"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          ) : (
            <div className="text-center text-xl mt-10">
              No vehicles available for the selected location and time.
            </div>
          )
        ) : (
          <div className="text-center text-xl mt-10 text-gray-500">
            Please enter location and date to view available vehicles.
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
