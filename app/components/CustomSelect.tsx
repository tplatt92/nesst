//component for drop down menus in account forms 
import React from "react";
import { SelectElementProps } from "@/types/types";

const CustomSelect: React.FC<SelectElementProps> = ({
  id,
  value,
  onChange,
  options,
  name,
}) => (
  <select
    id={id}
    value={value}
    onChange={onChange}
    name={name}
    className="w-full p-2 pl-4 border border-white rounded-full mt-2 bg-black placeholder-white"
    data-testid="test-select"
  >
    {/* [maps over options array to create options] */}
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default CustomSelect;
