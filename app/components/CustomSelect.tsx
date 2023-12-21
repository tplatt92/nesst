import React from "react";
import { SelectElementProps } from "@/types/types";

const CustomSelect: React.FC<SelectElementProps> = ({
  id,
  value,
  onChange,
  options,
}) => (
  <select
    id={id}
    value={value}
    onChange={onChange}
    className="w-full p-2 pl-4 border border-white rounded-full mt-2 bg-black placeholder-white"
    data-testid="test-select"
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default CustomSelect;
