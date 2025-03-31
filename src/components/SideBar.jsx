'use client'

import { useState } from 'react';
import { ChevronDown, ChevronUp, X, Filter, ArrowUpDown } from 'lucide-react';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedVehicleTypes, setSelectedVehicleTypes] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortOption, setSortOption] = useState('');

  // Filter sections data
  const vehicleTypes = [
    'SUV', 'Sedan', 'Hatchback', 'Convertible', 'Truck', 'Van', 'Electric'
  ];
  
  const brands = [
    'Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Tesla', 'Audi', 'Hyundai'
  ];

  const sortOptions = [
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest Arrivals' },
    { value: 'popular', label: 'Most Popular' },
  ];

  // Toggle vehicle type selection
  const toggleVehicleType = (type) => {
    if (selectedVehicleTypes.includes(type)) {
      setSelectedVehicleTypes(selectedVehicleTypes.filter(item => item !== type));
    } else {
      setSelectedVehicleTypes([...selectedVehicleTypes, type]);
    }
  };

  // Toggle brand selection
  const toggleBrand = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(item => item !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  // Handle price range change
  const handleMinPriceChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange([value, priceRange[1]]);
  };

  const handleMaxPriceChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange([priceRange[0], value]);
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Filter section component
  const FilterSection = ({ title, children, isCollapsible = true }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
      <div className="border-b border-gray-200 py-4">
        <div 
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => isCollapsible && setIsExpanded(!isExpanded)}
        >
          <h3 className="font-medium text-gray-900">{title}</h3>
          {isCollapsible && (
            isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />
          )}
        </div>
        {isExpanded && (
          <div className="mt-2">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile filter button */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-md"
        >
          <Filter size={18} />
          <span>Filters</span>
        </button>
        
        {/* Mobile sort dropdown */}
        <div className="relative">
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="appearance-none bg-gray-100 px-4 py-2 pr-8 rounded-md focus:outline-none"
          >
            <option value="">Sort By</option>
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <ArrowUpDown size={16} className="absolute right-2 top-3 pointer-events-none" />
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setIsOpen(false)}>
      </div>

      {/* Sidebar for mobile (slide-in) and desktop */}
      <div 
        className={`
          fixed lg:sticky top-0 left-0 h-full overflow-y-auto bg-white z-50 
          transition-transform duration-300 ease-in-out
          w-4/5 lg:w-64 
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-4 h-full">
          {/* Mobile header with close button */}
          <div className="flex justify-between items-center lg:hidden">
            <h2 className="text-lg font-medium">Filters</h2>
            <button onClick={() => setIsOpen(false)}>
              <X size={24} />
            </button>
          </div>

          {/* Desktop-only sort options */}
          <div className="hidden lg:block">
            <FilterSection title="Sort By">
              <div className="space-y-2">
                {sortOptions.map(option => (
                  <div key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      id={option.value}
                      name="sort"
                      value={option.value}
                      checked={sortOption === option.value}
                      onChange={handleSortChange}
                      className="mr-2"
                    />
                    <label htmlFor={option.value}>{option.label}</label>
                  </div>
                ))}
              </div>
            </FilterSection>
          </div>

          {/* Price Range */}
          <FilterSection title="Price Range">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="w-5/12">
                  <label htmlFor="min-price" className="block text-sm mb-1">Min</label>
                  <input
                    type="number"
                    id="min-price"
                    value={priceRange[0]}
                    onChange={handleMinPriceChange}
                    min="0"
                    max={priceRange[1]}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <span className="text-gray-500">-</span>
                <div className="w-5/12">
                  <label htmlFor="max-price" className="block text-sm mb-1">Max</label>
                  <input
                    type="number"
                    id="max-price"
                    value={priceRange[1]}
                    onChange={handleMaxPriceChange}
                    min={priceRange[0]}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="10000"
                value={priceRange[0]}
                onChange={handleMinPriceChange}
                className="w-full"
              />
              <input
                type="range"
                min="0"
                max="10000"
                value={priceRange[1]}
                onChange={handleMaxPriceChange}
                className="w-full"
              />
            </div>
          </FilterSection>

          {/* Vehicle Type */}
          <FilterSection title="Vehicle Type">
            <div className="space-y-2">
              {vehicleTypes.map(type => (
                <div key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`vehicle-${type}`}
                    checked={selectedVehicleTypes.includes(type)}
                    onChange={() => toggleVehicleType(type)}
                    className="mr-2"
                  />
                  <label htmlFor={`vehicle-${type}`}>{type}</label>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* Brands */}
          <FilterSection title="Brands">
            <div className="space-y-2">
              {brands.map(brand => (
                <div key={brand} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="mr-2"
                  />
                  <label htmlFor={`brand-${brand}`}>{brand}</label>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* Year */}
          <FilterSection title="Year">
            <div className="space-y-2">
              {['Decorated', 'None'].map(slelect => (
                <div key={slelect} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`year-${slelect}`}
                    className="mr-2"
                  />
                  <label htmlFor={`year-${slelect}`}>{slelect}</label>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* Apply Filters button - mobile only */}
          <div className="mt-6 lg:hidden">
            <button 
              className="w-full bg-blue-600 text-white py-3 rounded-md font-medium"
              onClick={() => setIsOpen(false)}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;