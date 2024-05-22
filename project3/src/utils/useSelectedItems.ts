import { useState } from "react";

function useSelectedItems(initialState: string[]) {
  const [selectedItems, setSelectedItems] = useState<string[]>(initialState);

  const handleItemChange = (items: string[]) => {
    setSelectedItems(items);
  };

  return [selectedItems, handleItemChange] as const;
}

export default useSelectedItems;
