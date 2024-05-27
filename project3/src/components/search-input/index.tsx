import "./styles.scss";
import React, { useState, ChangeEvent } from "react";
import { Input } from "@nextui-org/react";

interface SearchInputProps {
  onChangeCallback?: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onChangeCallback }) => {
  const [value, setValue] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    onChangeCallback && onChangeCallback(inputValue);
  };

  return (
    <Input
      className="searchbar"
      variant="bordered"
      type="text"
      value={value}
      onChange={handleChange}
      label="Search product by name."
    />
  );
};

export default SearchInput;
