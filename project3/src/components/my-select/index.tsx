import "./styles.scss";
import React, { useState } from "react";

interface MySelectProps {
  dictionary: string[];
  onChange: (size: string) => void;
  label: string;
}

const MySelect: React.FC<MySelectProps> = ({ dictionary, onChange, label }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSize = e.target.value;
    setSelectedOption(e.target.value);
    onChange(selectedSize);
  };

  return (
    <div className="my-select my-select--color">
      <label
        className="my-select__label"
        htmlFor="my-select-input"
        tabIndex={0}
      >
        {label}:
      </label>
      <select
        className="my-select__option my-select__option--color"
        name="my-select-input"
        id="my-select-input"
        value={selectedOption}
        onChange={handleChange}
      >
        <option value=""></option>
        {dictionary.map((option) => (
          <option key={option} value={option} aria-label={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MySelect;
