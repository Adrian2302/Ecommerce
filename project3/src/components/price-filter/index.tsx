import "./styles.scss";
import React, { useState, useEffect } from "react";

interface PriceFilterProps {
  onChangeCallback: (selectedRanges: string[]) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ onChangeCallback }) => {
  const priceRanges = [
    "$0   - $100",
    "$100 - $200",
    "$200 - $300",
    "$300 - $400",
    "$400 - $500",
    "$500 - $600",
    "$600+",
  ];
  const [selectedRanges, setSelectedRanges] = useState<string[]>([]);

  const handleCheckboxChange = (range: string) => {
    if (selectedRanges.includes(range)) {
      setSelectedRanges(selectedRanges.filter((item) => item !== range));
    } else {
      setSelectedRanges([...selectedRanges, range]);
    }
  };

  useEffect(() => {
    onChangeCallback(selectedRanges);
  }, [selectedRanges, onChangeCallback]);

  return (
    <div className="checkbox-filter__container">
      <p
        className="checkbox-filter__title checkbox-filter__title--bold"
        tabIndex={0}
      >
        Prices
      </p>
      {priceRanges.map((range) => (
        <label key={range}>
          <input
            type="checkbox"
            checked={selectedRanges.includes(range)}
            onChange={() => handleCheckboxChange(range)}
          />
          {range}
        </label>
      ))}
    </div>
  );
};

export default PriceFilter;
