import React from "react";

interface FiltersProps {
  title: string;
  items: string[];
  onChange: (type: string, value: string, checked: boolean) => void;
}

const Filters: React.FC<FiltersProps> = ({ title, items, onChange }) => {
  const handleCheckboxChange = (value: string, checked: boolean) => {
    onChange(title.toLowerCase(), value, checked);
  };

  return (
    <div>
      <h3>{title}</h3>
      {items.map((item) => (
        <div key={item}>
          <label>
            <input
              type="checkbox"
              onChange={(e) => handleCheckboxChange(item, e.target.checked)}
            />
            {item}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Filters;
