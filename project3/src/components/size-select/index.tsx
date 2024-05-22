import React from "react";
import { SizeDictionary } from "../../models/components-props";
import { Select, SelectItem } from "@nextui-org/react";

interface SizeProps {
  dictionary: SizeDictionary;
  onSelectSize: (size: string) => void;
}

const SizeSelect: React.FC<SizeProps> = ({ dictionary, onSelectSize }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSize = e.target.value;
    onSelectSize(selectedSize);
  };

  return (
    <div className="">
      <Select
        label="Select a size"
        aria-hidden={false}
        classNames={{ label: "text-[black]" }}
        onChange={handleChange}
        aria-label="Select a size"
        tabIndex={0}
      >
        {Object.keys(dictionary).map((sizeKey) => (
          <SelectItem
            as={"option"}
            key={sizeKey}
            value={sizeKey}
            arian-hidden={null}
            tabIndex={0}
          >
            {sizeKey}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default SizeSelect;
