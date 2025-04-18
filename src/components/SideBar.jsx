import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

function SideBar({ onFilterChange }) {
  const [type, setType] = useState("");
  const [gearType, setGearType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleGearTypeChange = (e) => {
    setGearType(e.target.value);
  };

  useEffect(() => {
    onFilterChange({ type, gearType, minPrice, maxPrice });
  }, [type, gearType, minPrice, maxPrice, onFilterChange]);

  return (
    <div>
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-lg">Select Vehicle Type</h2>
        <div className="flex gap-1 justify-start ml-2">
          <input
            type="radio"
            id="ALL"
            value=""
            defaultChecked
            name="type"
            onChange={handleTypeChange}
          />
          <label htmlFor="ALL">All</label>
        </div>
        <div className="flex gap-1 justify-start ml-2">
          <input
            type="radio"
            id="CAR"
            value="CAR"
            name="type"
            onChange={handleTypeChange}
          />
          <label htmlFor="CAR">Car</label>
        </div>
        <div className="flex gap-1 justify-start ml-2">
          <input
            type="radio"
            id="TRUCK"
            value="TRUCK"
            name="type"
            onChange={handleTypeChange}
          />
          <label htmlFor="TRUCK">Truck</label>
        </div>
        <div className="flex gap-1 justify-start ml-2">
          <input
            type="radio"
            id="BIKE"
            value="BIKE"
            name="type"
            onChange={handleTypeChange}
          />
          <label htmlFor="BIKE">Bike</label>
        </div>
        <div className="flex gap-1 justify-start ml-2">
          <input
            type="radio"
            id="SUV"
            value="SUV"
            name="type"
            onChange={handleTypeChange}
          />
          <label htmlFor="SUV">Suv</label>
        </div>
        <div className="flex gap-1 justify-start ml-2">
          <input
            type="radio"
            id="SEDAN"
            value="SEDAN"
            name="type"
            onChange={handleTypeChange}
          />
          <label htmlFor="SEDAN">Sedan</label>
        </div>
        <div className="flex gap-1 justify-start ml-2">
          <input
            type="radio"
            id="VAN"
            value="VAN"
            name="type"
            onChange={handleTypeChange}
          />
          <label htmlFor="VAN">Van</label>
        </div>
        <div className="flex gap-1 justify-start ml-2">
          <input
            type="radio"
            id="ELECTRIC"
            value="ELECTRIC"
            name="type"
            onChange={handleTypeChange}
          />
          <label htmlFor="ELECTRIC">Electric</label>
        </div>
        <div className="flex gap-1 justify-start ml-2">
          <input
            type="radio"
            id="LUXURY"
            value="LUXURY"
            name="type"
            onChange={handleTypeChange}
          />
          <label htmlFor="LUXURY">Luxury</label>
        </div>
      </div>
      <hr className="mt-2" />
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-lg">Select Gear Type</h2>
        <div className="flex gap-1 justify-start ml-2">
          <input
            type="radio"
            id="AUTOMATIC"
            value="AUTOMATIC"
            name="gearType"
            onChange={handleGearTypeChange}
          />
          <label htmlFor="AUTOMATIC">Automatic</label>
        </div>
        <div className="flex gap-1 justify-start ml-2">
          <input
            type="radio"
            id="MANUAL"
            value="MANUAL"
            name="gearType"
            onChange={handleGearTypeChange}
          />
          <label htmlFor="MANUAL">Manual</label>
        </div>
      </div>
      <hr className="mt-2"/>
      <div className="flex flex-col gap-1">
        
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg">Price</h2>
            <RotateCcw className="w-5 h-5" onClick={() => {setMinPrice(""); setMaxPrice("")}}/>
        </div>
        <div className="flex gap-2">
          <div className="bg-gray-200 rounded-sm py-1 px-1">
            <input
              type="number"
              placeholder="Min"
              className="bg-transparent outline-none border-none w-full"
              onChange={(e) => setMinPrice(e.target.value)}
              value={minPrice}
            />
          </div>
          <span>To</span>
          <div className="bg-gray-200 rounded-sm py-1 px-1">
            <input
              type="number"
              placeholder="Max"
              className="bg-transparent outline-none border-none w-full"
              onChange={(e) => setMaxPrice(e.target.value)}
              value={maxPrice}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
