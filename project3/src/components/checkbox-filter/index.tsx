import "./styles.scss";
import React, { useState, useEffect } from "react";

interface CheckboxFilterProps {
  title: string;
  filter: string[];
  onChangeCallback: (selectedFilters: string[]) => void;
}

const CheckboxFilter: React.FC<CheckboxFilterProps> = ({
  title,
  filter,
  onChangeCallback,
}) => {
  const [selectedFilters, setselectedFilters] = useState<string[]>([]);

  const handleCheckboxChange = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setselectedFilters(selectedFilters.filter((item) => item !== filter));
    } else {
      setselectedFilters([...selectedFilters, filter]);
    }
  };

  useEffect(() => {
    onChangeCallback(selectedFilters);
  }, [selectedFilters, onChangeCallback]);

  return (
    <div className="checkbox-filter__container">
      <p
        className="checkbox-filter__title checkbox-filter__title--bold"
        tabIndex={0}
      >
        {title}
      </p>
      {filter.map((item) => (
        <label key={item}>
          <input
            type="checkbox"
            checked={selectedFilters.includes(item)}
            onChange={() => handleCheckboxChange(item)}
          />
          {item}
        </label>
      ))}
    </div>
  );
};

export default CheckboxFilter;
