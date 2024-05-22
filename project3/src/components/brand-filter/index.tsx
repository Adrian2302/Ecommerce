import React, { useState, useEffect } from "react";

interface BrandFilterProps {
  brands: string[];
  onChangeCallback: (selectedBrands: string[]) => void;
}

const BrandFilter: React.FC<BrandFilterProps> = ({
  brands,
  onChangeCallback,
}) => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const handleBrandChange = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((item) => item !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  useEffect(() => {
    onChangeCallback(selectedBrands);
  }, [selectedBrands, onChangeCallback]);

  return (
    <div>
      <h2>Filter by Brand</h2>
      {brands.map((brand) => (
        <label key={brand}>
          <input
            type="checkbox"
            checked={selectedBrands.includes(brand)}
            onChange={() => handleBrandChange(brand)}
          />
          {brand}
        </label>
      ))}
    </div>
  );
};

export default BrandFilter;
