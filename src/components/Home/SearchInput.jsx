"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";


function SearchInput() {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const query = new URLSearchParams();
    if (location) query.set("location", location);
    if (date) query.set("date", date);

    router.push(`/vehicles?${query.toString()}`);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-xl font-semibold text-gray-400">
        Search What You Need!
      </p>
      <div className="w-full text-sm lg:text-xl lg:w-1/2 h-20 flex items-center gap-2 bg-gray-100 rounded-xl p-2">
        <div className="w-3/5 h-full flex items-center text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            placeholder="Location (City/Town)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full text-xl bg-transparent outline-none border-none ml-2"
          />
        </div>
        <div className="h-1/2 border-2 border-gray-400"></div>
        <div className="w-2/5 h-full flex items-center">
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Enter Date"
            className="w-full text-xl text-gray-400 bg-transparent outline-none border-none ml-2"
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-[#1572D3] w-1/5 text-white font-semibold py-2 rounded-lg ml-4 transition-all duration-300 hover:bg-black hover:scale-105"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchInput;
