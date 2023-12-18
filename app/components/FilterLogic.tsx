import React, { useState } from 'react';

interface Property {
  price: number;
  beds: number;
  baths: number;
  // Add other property attributes here
}

interface FilterProps {
  properties: Property[];
  setProperties: React.Dispatch<React.SetStateAction<Property[]>>;
}

const FilterComponent: React.FC<FilterProps> = ({ properties, setProperties }) => {
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [minBeds, setMinBeds] = useState<number | null>(null);
  const [minBaths, setMinBaths] = useState<number | null>(null);

  const filterProperties = () => {
    const filteredProperties = properties.filter(property => {
      return (
        (!minPrice || property.price >= minPrice) &&
        (!maxPrice || property.price <= maxPrice) &&
        (!minBeds || property.beds >= minBeds) &&
        (!minBaths || property.baths >= minBaths)
      );
    });

    setProperties(filteredProperties);
  };

  const handleReset = () => {
    setMinPrice(null);
    setMaxPrice(null);
    setMinBeds(null);
    setMinBaths(null);
    setProperties(properties);
  };

  return (
    <div>
      {/* Add your filter inputs and buttons here */}
      <button onClick={filterProperties}>Apply Filters</button>
      <button onClick={handleReset}>Reset Filters</button>
    </div>
  );
};

export default FilterComponent;